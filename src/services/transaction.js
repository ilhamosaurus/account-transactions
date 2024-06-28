const db = require('../lib/db');
const { validationResult } = require('express-validator');
const { Type } = require('@prisma/client');
const { getAccountByUserId } = require('../data/account');
const getInvNumber = require('../util/inv');
const { getServiceByCode } = require('../data/service');

const getBalance = async (req, res) => {
  const id = req.userId;

  try {
    const balance = await db.account.findUnique({
      where: {
        userId: id,
      },
      select: {
        balance: true,
      },
    });

    if (!balance) {
      return res
        .status(404)
        .send({ status: 103, message: 'Rekening tidak ditemukan' });
    }

    return res.status(200).send({
      status: 0,
      message: 'Get balance berhasil',
      data: balance,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: `Failed to get balance: ${error}` });
  }
};

const topupBalance = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      status: 102,
      message: errors.array().map((e) => e.msg),
      data: null,
    });
  }

  const id = req.userId;
  const amount = req.body.top_up_amount;
  const invNumber = await getInvNumber(id);
  if (!invNumber) {
    return res
      .status(404)
      .send({ status: 103, message: 'Rekening tidak ditemukan' });
  }

  try {
    const balance = await db.account.update({
      where: {
        userId: id,
      },
      data: {
        balance: {
          increment: amount,
        },
        Transaction: {
          create: {
            total_amount: amount,
            transaction_type: Type.TOPUP,
            description: 'Top up Balance',
            invoice_number: invNumber,
          },
        },
      },
      select: {
        balance: true,
      },
    });

    if (!balance) {
      return res
        .status(404)
        .send({ status: 103, message: 'Rekening tidak ditemukan' });
    }

    return res.status(200).send({
      status: 0,
      message: 'Top Balance berhasil',
      data: balance,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ error: `Failed to top up balance: ${error}` });
  }
};

const payment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map((e) => e.msg) });
  }

  const id = req.userId;
  const { service_code } = req.body;
  const service = await getServiceByCode(service_code.toUpperCase());
  if (!service) {
    return res
      .status(404)
      .send({ status: 102, message: 'Service atau layanan tidak ditemukan' });
  }

  const account = await getAccountByUserId(id);
  const invNumber = await getInvNumber(id);
  if (!invNumber || !account) {
    return res
      .status(404)
      .send({ status: 103, message: 'Rekening tidak ditemukan' });
  }
  if (account.balance < service.service_tariff) {
    return res
      .status(400)
      .send({ status: 102, message: 'Saldo tidak mencukupi' });
  }

  try {
    const transaction = await db.$transaction(async (tx) => {
      await tx.account.update({
        where: {
          id: account.id,
        },
        data: {
          balance: {
            decrement: service.service_tariff,
          },
        },
      });

      return await tx.transaction.create({
        data: {
          accountId: account.id,
          transaction_type: Type.PAYMENT,
          invoice_number: invNumber,
          description: service.service_name,
          total_amount: service.service_tariff,
        },
      });
    });

    const data = {
      invoice_number: transaction.invoice_number,
      service_code: service.service_code,
      service_name: service.service_name,
      transaction_type: transaction.transaction_type,
      total_amount: transaction.total_amount,
      created_on: transaction.created_on,
    };

    return res
      .status(201)
      .send({ status: 0, message: 'Transaksi Berhasil', data });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ status: 101, message: `Failed to create transaction: ${error}` });
  }
};

const getTransactionHistory = async (req, res) => {
  const offset = req.query.offset;
  const limit = req.query.limit;
  const id = req.userId;

  const account = await getAccountByUserId(id);
  if (!account) {
    return res
      .status(404)
      .send({ status: 103, message: 'Rekening tidak ditemukan' });
  }

  const skip = offset ? parseInt(offset) : null;
  const take = limit ? parseInt(limit) : null;

  try {
    if (skip && take) {
      const transaction = await db.transaction.findMany({
        where: {
          accountId: account.id,
        },
        select: {
          invoice_number: true,
          created_on: true,
          description: true,
          total_amount: true,
          transaction_type: true,
        },
        skip: (skip - 1) * take,
        take: take,
        orderBy: {
          created_on: 'desc',
        },
      });

      if (!transaction || transaction.length === 0) {
        return res
          .status(404)
          .send({ status: 103, message: 'Transaksi tidak ditemukan' });
      }

      return res.status(200).send({
        status: 0,
        message: 'Sukses',
        data: {
          offset: skip,
          limit: transaction.length > take ? take : transaction.length,
          record: transaction,
        },
      });
    }
    const transaction = await db.transaction.findMany({
      where: {
        accountId: account.id,
      },
      select: {
        invoice_number: true,
        created_on: true,
        description: true,
        total_amount: true,
        transaction_type: true,
      },
      orderBy: {
        created_on: 'desc',
      },
    });

    if (!transaction || transaction.length === 0) {
      return res
        .status(404)
        .send({ status: 103, message: 'Transaksi tidak ditemukan' });
    }

    return res.status(200).send({
      status: 0,
      message: 'Sukses',
      data: { offset: 1, limit: transaction.length, record: transaction },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: 103, message: 'Terjadi kesalahan' });
  }
};

module.exports = { getBalance, topupBalance, payment, getTransactionHistory };

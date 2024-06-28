const db = require('../lib/db');

const getAllServices = async (req, res) => {
  try {
    const services = await db.$queryRaw`SELECT * FROM services`;

    res.status(200).send({
      status: 0,
      message: 'Sukses',
      data: services,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: `Failed to retreive services data: ${error}`,
    });
  }
};

module.exports = { getAllServices };

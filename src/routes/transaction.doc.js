/**
 * @swagger
 * /balance:
 *  get:
 *    summary: Get user balance
 *    tags:
 *      - Transaction
 *    description: Get user balance
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Get user balance
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                  example: 0
 *                message:
 *                  type: string
 *                  example: Sukses
 *                data:
 *                  type: object
 *                  properties:
 *                    balance:
 *                      type: number
 *                      example: 100000
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                  example: 108
 *                message:
 *                  type: string
 *                  example: Token tidak valid atau kadaluawarsa
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                  example: 103
 *                message:
 *                  type: string
 *                  example: Failed to get balance
 * /topup:
 *  post:
 *    summary: Topup balance
 *    tags:
 *      - Transaction
 *    description: Topup balance
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              top_up_amount:
 *                type: number
 *                example: 100000
 *            required:
 *              - top_up_amount
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                  example: 0
 *                message:
 *                  type: string
 *                  example: Topup Balance berhasil
 *                data:
 *                  type: object
 *                  properties:
 *                    balance:
 *                      type: number
 *                      example: 200000
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                  example: 102
 *                message:
 *                  type: string
 *                  example: Nilai top up harus dengan angka positif
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                  example: 108
 *                message:
 *                  type: string
 *                  example: Token tidak valid atau kadaluawarsa
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                  example: 103
 *                message:
 *                  type: string
 *                  example: Failed to topup
 * /transaction:
 *  post:
 *    summary: Make transaction
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Transaction
 *    description: Make transaction
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              service_code:
 *                type: string
 *                example: voucher_game
 *            required:
 *              - service_code
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                  example: 0
 *                message:
 *                  type: string
 *                  example: Transaksi berhasil
 *                data:
 *                  type: object
 *                  properties:
 *                    invoice_number:
 *                      type: string
 *                      example: INV20240628-001
 *                    service_code:
 *                      type: string
 *                      example: voucher_game
 *                    service_name:
 *                      type: string
 *                      example: Voucher Game
 *                    transaction_type:
 *                      type: string
 *                      example: PAYMENT
 *                    total_amount:
 *                      type: number
 *                      example: 100000
 *                    created_on:
 *                      type: string
 *                      example: 2024-06-28T00:00:00.000Z
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                  example: 102
 *                message:
 *                  type: string
 *                  example: Service atau layanan tidak ditemukan
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                  example: 108
 *                message:
 *                  type: string
 *                  example: Token tidak valid atau kadaluawarsa
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                  example: 103
 *                message:
 *                  type: string
 *                  example: Failed to make transaction
 * /transaction/history:
 *  get:
 *    summary: Get transaction history
 *    tags:
 *      - Transaction
 *    description: Get transaction history
 *    parameters:
 *      - in: query
 *        name: offset
 *        schema:
 *          type: integer
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                  example: 0
 *                message:
 *                  type: string
 *                  example: Sukses
 *                data:
 *                  type: object
 *                  properties:
 *                    offset:
 *                      type: number
 *                      example: 1
 *                    limit:
 *                      type: number
 *                      example: 10
 *                    records:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          invoice_number:
 *                            type: string
 *                            example: INV20240628-001
 *                          service_code:
 *                            type: string
 *                            example: voucher_game
 *                          service_name:
 *                            type: string
 *                            example: Voucher Game
 *                          transaction_type:
 *                            type: string
 *                            example: PAYMENT
 *                          total_amount:
 *                            type: number
 *                            example: 100000
 *                          created_on:
 *                            type: string
 *                            example: 2024-06-28T00:00:00.000Z
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                  example: 108
 *                message:
 *                  type: string
 *                  example: Token tidak valid atau kadaluawarsa
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                  example: 103
 *                message:
 *                  type: string
 *                  example: Failed to get transaction history
 *
 */

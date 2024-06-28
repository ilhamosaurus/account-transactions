/**
 * @swagger
 * /register:
 *  post:
 *    summary: Register new user
 *    tags:
 *      - Auth
 *    description: User registration with unique email and password
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: 0Jg9U@example.com
 *              password:
 *                type: string
 *                example: password123
 *              first_name:
 *                type: string
 *                example: John
 *              last_name:
 *                type: string
 *                example: Doe
 *            required:
 *              - email
 *              - password
 *              - first_name
 *              - last_name
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                  example: 201
 *                message:
 *                  type: string
 *                  example: Registrasi telah berhasil, silahkan login
 *                data:
 *                  type: integer
 *                  nullable: true
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
 *                  example: Email sudah terdaftar
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
 *                  example: Failed to register
 *
 * /login:
 *  post:
 *    summary: Login user
 *    tags:
 *      - Auth
 *    description: User login with unique email and password
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: 0Jg9U@example.com
 *              password:
 *                type: string
 *                example: password123
 *            required:
 *              - email
 *              - password
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
 *                  example: Login success
 *                data:
 *                  type: object
 *                  properties:
 *                    token:
 *                      type: string
 *                      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjYyYzY0MjUwNzUxOTIzNCIsImlhdCI6MTY0MjM5NzUzN30.TnNpXkUZ6F0pZVX5nNn0Yt5X7YR9jCj7l2kM0mHqXo
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
 *                  example: Email atau password tidak sesuai
 *      401:
 *        description: Unauthorized
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
 *                  example: Email atau password salah
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
 *                  example: Failed to login
 */

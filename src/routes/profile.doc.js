/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get profile
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Profile
 *     description: Get profile
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: Sukses
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: 0Jg9U@example.com
 *                     first_name:
 *                       type: string
 *                       example: John
 *                     last_name:
 *                       type: string
 *                       example: Doe
 *                     profile_image:
 *                       type: string
 *                       example: http://localhost:3000/image.png
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 108
 *                 message:
 *                   type: string
 *                   example: Token tidak valid atau kadaluawarsa
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 103
 *                 message:
 *                   type: string
 *                   example: Failed to get profile
 * /profile/update:
 *  put:
 *    summary: Update profile
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Profile
 *    description: Update profile
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              first_name:
 *                type: string
 *                example: John
 *              last_name:
 *                type: string
 *                example: Doe
 *            required:
 *              - first_name
 *              - last_name
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
 *                    first_name:
 *                      type: string
 *                      example: John
 *                    last_name:
 *                      type: string
 *                      example: Doe
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
 *                  example: Failed to update profile
 * /profile/image:
 *  put:
 *    summary: Upload profile image
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Profile
 *    description: Upload profile image
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              file:
 *                type: string
 *                format: binary
 *            required:
 *              - file
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
 *                    email:
 *                      type: string
 *                      example: 0Jg9U@example.com
 *                    first_name:
 *                      type: string
 *                      example: John
 *                    last_name:
 *                      type: string
 *                      example: Doe
 *                    profile_image:
 *                      type: string
 *                      example: http://localhost:3000/image.png
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
 *                  example: Format Gambar tidak sesuai
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
 *                  example: Failed to upload profile image
 */

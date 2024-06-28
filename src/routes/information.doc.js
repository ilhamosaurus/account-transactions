/**
 * @swagger
 * /banner:
 *   get:
 *     summary: Get all banners
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Information
 *     responses:
 *       200:
 *         description: The list of all banners
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       banner_name:
 *                         type: string
 *                         example: Banner 1
 *                       banner_image:
 *                         type: string
 *                         example: https://nutech-integrasi.app/dummy.jpg
 *                       description:
 *                         type: string
 *                         example: Lerem Ipsum Dolor sit amet
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
 *                   example: Unauthorized
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
 *                   example: Failed to get banners
 * /services:
 *   get:
 *     summary: Get all services
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Information
 *     responses:
 *       200:
 *         description: The list of all services
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       service_code:
 *                         type: string
 *                         example: PGN
 *                       service_name:
 *                         type: string
 *                         example: PGN
 *                       service_icon:
 *                         type: string
 *                         example: https://nutech-integrasi.app/dummy.jpg
 *                       service_tariff:
 *                         type: number
 *                         example: 50000
 *
 */

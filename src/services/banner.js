const db = require('../lib/db');

const getAllBanners = async (req, res) => {
  try {
    const banners = await db.banner.findMany({
      select: {
        banner_name: true,
        banner_image: true,
        description: true,
      },
    });
    res.status(200).send({
      status: 0,
      message: 'Sukses',
      data: banners,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: `Failed to retreive banners data: ${error}` });
  }
};

module.exports = {
  getAllBanners,
};

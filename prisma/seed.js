const { PrismaClient } = require('@prisma/client');
const service = require('./static/service');
const banner = require('./static/banner');
const prisma = new PrismaClient();

const serviceSeeding = async () => {
  try {
    const createdServices = await prisma.$transaction(async (tx) => {
      let result = [];
      for (const item of service) {
        const service = await tx.service.create({
          data: item,
        });

        result.push(service);
      }

      return result;
    });

    console.log('createdServices: ', createdServices);
  } catch (error) {
    console.error(error);
  }
};

const bannerSeeding = async () => {
  try {
    const createdBanners = await prisma.$transaction(async (tx) => {
      let result = [];
      for (const item of banner) {
        const banner = await tx.banner.create({
          data: item,
        });
        result.push(banner);
      }

      return result;
    });

    console.log('createdBanners: ', createdBanners);
  } catch (error) {
    console.error(error);
  }
};

const main = async () => {
  // await serviceSeeding();
  // await bannerSeeding();
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

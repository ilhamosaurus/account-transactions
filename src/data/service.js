const db = require('../lib/db');

const getServiceCodes = async () => {
  try {
    const services = await db.service.findMany({
      select: {
        service_code: true,
      },
    });
    if (!services) return null;
    const serviceCodes = services.map((s) => s.service_code);
    return serviceCodes;
  } catch (error) {
    console.error(error);
  }
};

const getServiceByCode = async (service_code) => {
  try {
    const service = await db.service.findUnique({
      where: {
        service_code,
      },
    });
    if (!service) return null;

    return service;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getServiceCodes,
  getServiceByCode,
};

const db = require('../lib/db');

const getServiceCodes = async () => {
  try {
    const services = await db.$queryRaw`
      SELECT service_code FROM services`;

    if (!services) return null;
    const serviceCodes = services.map((s) => s.service_code);
    return serviceCodes;
  } catch (error) {
    console.error(error);
  }
};

const getServiceByCode = async (service_code) => {
  try {
    const service = await db.$queryRaw`
      SELECT * FROM services
      WHERE service_code = ${service_code}`;

    if (!service) return null;

    return service[0];
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getServiceCodes,
  getServiceByCode,
};

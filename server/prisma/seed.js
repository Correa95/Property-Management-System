// import { properties } from "../date/properties";
// import { tenants } from "../date/tenant";
// import { units } from "../date/unit";
// import { lease } from "../date/lease";
// import { payments } from "../date/payment";
const { admin } = require("../../data/admin.js");
const { properties } = require("../../data/property.js");
const { tenants } = require("../../data/tenant.js");
const { units } = require("../../data/unit.js");
const { lease } = require("../../data/lease.js");
const { payments } = require("../../data/payment.js");

const prisma = require("./index.js");

const seed = async () => {
  // TODO: Create Users, Places and Vacations

  // const createAdmin = async () => {
  //   const admin = [
  //     {
  //       firstName: "Mario",
  //       lastName: "Correa",
  //       email: " mariocorrea@gmail.com",
  //       phone: "555 - 358 - 7672",
  //       role: "ADMIN",
  //       properties: [],
  //       maintenanceRequests: [],
  //     },
  //   ];
  await prisma.admin.createMany({ data: admin });
  await prisma.property.createMany({ data: properties });
  await prisma.user.createMany({ data: admin });
  await createUsers();
  await prisma.tenant.createMany({ data: tenants });
  await prisma.unit.createMany({ data: units });
  await prisma.lease.createMany({ data: lease });
  await prisma.payment.createMany({ data: payments });
  // await prisma.maintenanceRequest.createMany({
  //   data: prisma.maintenanceRequests,
  // });
};

// await createTenants();
// await createProperties();
// await createUsers();
// await createUnits();
// await createLeases();
// await createPayments();
// await createMaintenanceRequests();
// };
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

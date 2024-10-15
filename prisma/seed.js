// import { properties } from "../date/properties";
// import { tenants } from "../date/tenant";
// import { units } from "../date/unit";
// import { lease } from "../date/lease";
// import { payments } from "../date/payment";
const { properties } = require("../data/property");
const { tenants } = require("../data/tenant");
const { units } = require("../data/unit");
const { lease } = require("../data/lease");
const { payments } = require("../data/payment");

const prisma = require("../prisma");

const seed = async () => {
  // TODO: Create Users, Places and Vacations

  const createAdmin = async () => {
    const admin = [
      {
        firstName: "Mario",
        lastName: "Correa",
        email: " mariocorrea@gmail.com",
        phone: "555 - 358 - 7672",
        role: "ADMIN",
        properties: [],
        maintenanceRequests: [],
      },
    ];
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
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

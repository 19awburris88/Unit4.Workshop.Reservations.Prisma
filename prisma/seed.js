const prisma = require("./index");

const seed = async () => {
  await prisma.customer.createMany({
    data: [
      { name: "Austin", email: "austin@me.com" },
      { name: "Nathaniel", email: "nathaniel@me.com" },
      { name: "Trevor", email: "trevor@me.com" },
      { name: "Jason", email: "jason@me.com" },
    ],
  });

  await prisma.restaurant.createMany({
    data: [
      { name: "The Mexican", location: "Dallas" },
      { name: "Milktooth", location: "Indianapolis" },
      { name: "King & Duke", location: "Atlanta" },
    ],
  });

  const austin = await prisma.customer.findUnique({ where: { email: "austin@me.com" } });
  const mexican = await prisma.restaurant.findFirst({ where: { name: "The Mexican" } });

  await prisma.reservation.create({
    data: {
      date: new Date("2025-06-01T19:00:00Z"),
      partyCount: 2,
      customerId: austin.id,
      restaurantId: mexican.id,
    },
  });

  const nathaniel = await prisma.customer.findUnique({ where: { email: "nathaniel@me.com" } });
  const milktooth = await prisma.restaurant.findFirst({ where: { name: "Milktooth" } });

  await prisma.reservation.create({
    data: {
      date: new Date("2025-07-04T12:00:00Z"),
      partyCount: 5,
      customerId: nathaniel.id,
      restaurantId: milktooth.id,
    },
  });

  const trevor = await prisma.customer.findUnique({ where: { email: "trevor@me.com" } });
  const kingAndDuke = await prisma.restaurant.findFirst({ where: { name: "King & Duke" } });

  await prisma.reservation.create({
    data: {
      date: new Date("2025-08-15T18:30:00Z"),
      partyCount: 4,
      customerId: trevor.id,
      restaurantId: kingAndDuke.id,
    },
  });
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

const express = require("express");
const morgan = require("morgan");
const prisma = require("./prisma");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/customers", async (req, res) => {
  const customers = await prisma.customer.findMany();
  res.json(customers);
});

app.get("/api/restaurants", async (req, res) => {
  const restaurants = await prisma.restaurant.findMany();
  res.json(restaurants);
});

app.get("/api/reservations", async (req, res) => {
  const reservations = await prisma.reservation.findMany({
    include: {
      customer: true,
      restaurant: true,
    },
  });
  res.json(reservations);
});

app.post("/api/customers/:id/reservations", async (req, res) => {
  const { id } = req.params;
  const { restaurantId, date, partyCount } = req.body;

  const reservation = await prisma.reservation.create({
    data: {
      date: new Date(date),
      partyCount,
      customerId: parseInt(id),
      restaurantId,
    },
  });

  res.status(201).json(reservation);
});

app.delete("/api/customers/:customerId/reservations/:id", async (req, res) => {
  const { id } = req.params;

  await prisma.reservation.delete({
    where: {
      id: parseInt(id),
    },
  });

  res.sendStatus(204);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

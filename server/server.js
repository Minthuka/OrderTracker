require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Order = require("./order.model");

const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" })); // allow image base64

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));


// --- Create order ---
app.post("/orders", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.json(order);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// --- Get all orders ---
app.get("/orders", async (req, res) => {
  const orders = await Order.find().sort({ _id: -1 });
  res.json(orders);
});

// --- Delete single order ---
app.delete("/orders/:id", async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// --- Delete ALL ---
app.delete("/orders", async (req, res) => {
  await Order.deleteMany({});
  res.json({ success: true });
});


app.listen(process.env.PORT, () => {
  console.log("API running on port", process.env.PORT);
});

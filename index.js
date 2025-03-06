const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const vendorRoutes = require("./routes/vendorRoutes");
const firmRoutes = require("./routes/firmRoutes");
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
dotEnv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((error) => console.log(error));

app.use(bodyParser.json());
app.use("/vendor", vendorRoutes);
app.use("/firm", firmRoutes);
app.use("/product", productRoutes);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to SUBY API" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started running at ${PORT}`);
});

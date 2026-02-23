const http = require("http");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./db/connectDB");
const rabbitMQ = require("./service/rabbit");

const router = require("./routes/admin.routes");
const clotheRouter = require("./routes/clothe.routes");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/admin", router);
app.use("/clothes", clotheRouter);
app.use("/images", express.static("uploads"));

async function startServer() {
  try {
    await connectDB();          // FIRST Mongo
    await rabbitMQ.connect();   // THEN RabbitMQ

    server.listen(8002, () => {
      console.log("Product Service running on port 8002");
    });
  } catch (err) {
    console.error("Failed to start Product Service:", err.message);
    process.exit(1);
  }
}

startServer();

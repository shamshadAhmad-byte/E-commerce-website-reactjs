const amqp = require("amqplib");


let connection = null;
let channel = null;
let isConnecting = false;

async function connect() {
  if (isConnecting) return;
  isConnecting = true;

  try {
    connection = await amqp.connect(process.env.RABBITMQ_URL);

    connection.on("error", (err) => {
      console.error("RabbitMQ connection error", err.message);
    });

    connection.on("close", () => {
      console.warn("RabbitMQ connection closed. Reconnecting...");
      channel = null;
      connection = null;
      setTimeout(connect, 5000);
    });

    channel = await connection.createChannel();

    channel.on("error", (err) => {
      console.error("RabbitMQ channel error", err.message);
    });

    channel.on("close", () => {
      console.warn("RabbitMQ channel closed");
      channel = null;
    });

    console.log("Connected to RabbitMQ");
  } catch (err) {
    console.error("RabbitMQ connection failed", err.message);
    setTimeout(connect, 5000);
  } finally {
    isConnecting = false;
  }
}

async function publishToQueue(queue, data) {
  if (!channel) await connect();
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)), {
    persistent: true,
  });
}

async function subscribeToQueue(queue, callback) {
  if (!channel) await connect();
  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, (msg) => {
    if (!msg) return;

    try {
      const data = JSON.parse(msg.content.toString());
      callback(data);
      channel.ack(msg);
    } catch (err) {
      console.error("Consumer error", err.message);
      channel.nack(msg, false, true); // requeue
    }
  });
}

module.exports = {
  connect,
  publishToQueue,
  subscribeToQueue,
};

const express = require("express");
const connectDB = require("./database/index");
const app = express();
const eventRouter = require("./routers/event.router");

const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", eventRouter);

app.listen(PORT, () => {
  console.log("Servrer is listening to port", PORT);
  connectDB();
});

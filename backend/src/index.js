const express = require("express");
const cors = require("cors");

const userRouter = require("./routers/userRouter");
const addressRouter = require("./routers/addressRouter");

const app = express();
const port = 2404;

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(addressRouter);

app.listen(port, () => {
  console.log("API Running at", port);
});

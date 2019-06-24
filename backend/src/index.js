const express = require("express");
const cors = require("cors");
const corsPrefetch = require("cors-prefetch-middleware");
const imagesUpload = require("images-upload-middleware");
const serveStatic = require("serve-static");

const userRouter = require("./routers/userRouter");
const addressRouter = require("./routers/addressRouter");
const productRouter = require("./routers/productRouter");
const homeRouter = require("./routers/homeRouter");
const wishlistRouter = require("./routers/wishlistRouter");
const ordersRouter = require("./routers/ordersRouter");
const app = express();
const port = 2404;

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(addressRouter);
app.use(productRouter);
app.use(homeRouter);
app.use(wishlistRouter);
app.use(ordersRouter);
// app.use("/static", express.static("./static"));
// app.use("/", corsPrefetch);

// app.post(
//   "/multiple",
//   imagesUpload(
//     "./server/static/multipleFiles",
//     `http://localhost:${port}/static/multipleFiles`,
//     true
//   )
// );

app.listen(port, () => {
  console.log("API Running at", port);
});

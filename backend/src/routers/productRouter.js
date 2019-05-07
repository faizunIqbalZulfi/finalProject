const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const connection = require("../connections/connection");

const uploadDir = path.join(__dirname, "../uploads");

const storage = multer.diskStorage({
  // Destination
  destination: function(req, file, cb) {
    cb(null, uploadDir);
  },
  // Filename
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.fieldname + path.extname(file.originalname));
  }
});

const upstore = multer({
  storage,
  limits: {
    fileSize: 10000000 // Byte
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload image file (jpg, jpeg, or png)"));
    }

    cb(undefined, true);
  }
});

//addproduct
router.post("/add/product", (req, res) => {
  const sql = `INSERT INTO products SET ?`;
  const sql2 = `SET @product_id = (SELECT MAX(product_id) FROM products)`;

  connection.query(sql, req.body, (err, result) => {
    if (err) return res.send(err);
    connection.query(sql2, (err, result) => {
      if (err) return res.send(err);
      res.send("success");
    });
  });
});

//addstock
router.post("/add/stock", (req, res) => {
  const sql = `INSERT INTO stock (product_id, qty) VALUES (@product_id, ${
    req.body.qty
  })`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);

    res.send("success");
  });
});

//addimage
router.post("/add/image", upstore.array("image", 10), (req, res) => {
  const value = req.files.map(file => {
    return `(@product_id, '${file.filename}')`;
  });
  const sql = `INSERT INTO images (product_id, name_image) VALUES ${value.join()}`;
  connection.query(sql, (err, result) => {
    if (err) return res.send(err);

    res.send("success");
  });
});

//getallproducts
router.get("/get/products", (req, res) => {
  const sql = `SELECT p.product_id, product_name, description, price, qty, category1, category2, updated_at
   FROM products p JOIN stock s ON p.product_id = s.product_id`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);

    res.send(result);
  });
});

//getproduct
// router.get("/get/product/:product_id", (req, res) => {
//   const sql = `SELECT product_name, description, price, qty, category1, category2 FROM products p
//   JOIN stock s ON p.product_id = s.product_id
//   WHERE p.product_id = ${req.params.product_id}`;

//   connection.query(sql, (err, result) => {
//     if (err) return res.send(err);

//     res.send(result);
//   });
// });

//showimage
router.get("/show/image/:img", (req, res) => {
  res.sendFile(`${uploadDir}/${req.params.img}`);
});

//getimageproduct
router.get("/get/image/:product_id", (req, res) => {
  const sql = `SELECT image_id, product_id, name_image FROM images WHERE product_id = ${
    req.params.product_id
  }`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);
    // const images = result.map(image => {
    //   return `http://localhost:2404/show/image/${image.name_image}`;
    // });

    res.send(result);
  });
});

//deleteimageproduct
router.delete("/delete/image/:image_id", (req, res) => {
  const sql = `SELECT * FROM images WHERE image_id = ${req.params.image_id}`;
  const sql2 = `DELETE FROM images WHERE image_id = ${req.params.image_id}`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);

    fs.unlink(`${uploadDir}/${result[0].name_image}`, err => {
      connection.query(sql2, (err, result) => {
        if (err) return res.send(err);
        res.send(result);
      });
    });
  });
});

//editproduct
router.patch("/edit/product/:product_id", (req, res) => {
  Object.keys(req.body).forEach(key => {
    if (!req.body[key]) {
      req.body[key] = null;
    }
  });
  const sql = `UPDATE products SET ? WHERE product_id =${
    req.params.product_id
  }`;

  connection.query(sql, req.body, (err, result) => {
    if (err) return res.send(err);

    res.send(result);
  });
});

//editstock
router.patch("/edit/stock/:product_id", (req, res) => {
  const sql = `UPDATE stock SET ? WHERE product_id =${req.params.product_id}`;

  connection.query(sql, req.body, (err, result) => {
    if (err) return res.send(err);

    res.send(result);
  });
});

//editimage
router.post(
  "/edit/image/:product_id",
  upstore.array("image", 10),
  (req, res) => {
    const value = req.files.map(file => {
      return `(${req.params.product_id}, '${file.filename}')`;
    });
    const sql = `INSERT INTO images (product_id, name_image) VALUES ${value.join()}`;
    connection.query(sql, (err, result) => {
      if (err) return res.send(err);

      res.send(result);
    });
  }
);

module.exports = router;

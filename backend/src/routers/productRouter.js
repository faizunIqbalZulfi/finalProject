const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const connection = require("../connections/connection");

const uploadDir = path.join(__dirname, "../uploads/product");

const storage = multer.diskStorage({
  // Destination
  destination: function(req, file, cb) {
    cb(null, uploadDir);
  },
  // Filename
  filename: function(req, file, cb) {
    // var check = true;
    if (file.originalname === "default.jpg") {
      console.log(file);
      // check = !check;
      cb(null, Date.now() + file.fieldname + file.originalname);
    } else {
      cb(null, Date.now() + file.fieldname + path.extname(file.originalname));
    }
  }
});

const upstore = multer({
  storage,
  limits: {
    fileSize: 10000000 // Byte
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg||jpeg||png)$/)) {
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

//addsize
router.post("/add/size", (req, res) => {
  const sql = `SELECT size FROM size`;
  const sql2 = `INSERT INTO size (size) value (35.5),(36),(37),(37.5),(38),(38.5),(39),(40),(41),(42),(43),(44)`;
  // console.log(req.body);

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);

    if (result.length !== 0) return res.send("finish");
    connection.query(sql2, (err, result) => {
      if (err) return res.send(err);

      res.send(result);
    });
  });
});

// getsize
router.get("/get/size", (req, res) => {
  const sql = `SELECT * FROM size`;
  connection.query(sql, (err, result) => {
    if (err) return res.send(err);

    res.send(result);
  });
});

//addstock
router.post("/add/stock", (req, res) => {
  req.body = req.body.filter(size => {
    return size.size !== "";
  });

  const arrSize = req.body.map(size => {
    return size.size;
  });

  console.log(arrSize);

  const sql = `SELECT * FROM size WHERE size in (${arrSize})`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);
    const value = result.map((item, i) => {
      return `(@product_id, ${item.size_id}, ${req.body[i].qty})`;
    });

    const sql2 = `INSERT INTO stock (product_id, size_id , qty) VALUES ${value.join()}`;
    connection.query(sql2, (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    });
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

//getallproductshome
router.get("/get/products", (req, res) => {
  const sql = `SELECT p.product_id, product_name, description, price, SUM(s.qty) as qty, category1, category2, created_at
   FROM products p 
   JOIN stock s ON p.product_id = s.product_id
   JOIN size sz ON sz.size_id = s.size_id
   GROUP BY p.product_id, product_name, description, price, category1, category2`;

  const sql2 = `SELECT s.stock_id, s.product_id, sz.size_id, sz.size, s.qty FROM stock s
  RIGHT JOIN size sz ON sz.size_id = s.size_id`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);
    let products = result;
    connection.query(sql2, (err, result) => {
      if (err) return res.send(err);
      res.send({ products, size: result });
    });
  });
});

// // getproduct;
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

//geteditimageproduct
router.get("/getedit/image/:product_id", (req, res) => {
  const sql = `SELECT name_image FROM images WHERE product_id = ${
    req.params.product_id
  }
  AND name_image LIKE  '%default%'`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);

    res.send(result);
  });
});

//getimageproduct
router.get("/get/image/:product_id", (req, res) => {
  const sql = `SELECT image_id, product_id, name_image FROM images WHERE product_id = ${
    req.params.product_id
  }`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);

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
  console.log(req.body);

  req.body = req.body.filter(product => {
    return product.qty !== "";
  });

  Object.keys(req.body).forEach(key => {
    if (!req.body[key].stock_id) {
      req.body[key].stock_id = 0;
    }
  });

  for (let i = 0; i < req.body.length; i++) {
    const sql = `select * from stock where product_id = ${
      req.params.product_id
    } && size_id = ${req.body[i].size_id}`;

    connection.query(sql, (err, result) => {
      if (err) return res.send(err);

      if (result.length !== 0) {
        console.log("ada");
        const sql = `update stock set qty = ${
          req.body[i].qty
        } where product_id = ${req.params.product_id}
        && size_id = ${req.body[i].size_id}`;

        connection.query(sql, (err, result) => {
          if (err) return res.send(err);
        });
      } else {
        console.log("gak ada");
        const sql = `insert into stock (product_id, size_id, qty)
        values (${req.params.product_id}, ${req.body[i].size_id},
          ${req.body[i].qty})`;

        connection.query(sql, (err, result) => {
          if (err) return res.send(err);
        });
      }
    });
  }

  console.log(req.body);

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
      console.log("routerimage");

      res.send(result);
    });
  }
);

//deleteproduct
router.delete("/delete/product/:product_id", (req, res) => {
  const sql = `select name_image from images where product_id = ${
    req.params.product_id
  }`;
  const sql2 = `delete from products where product_id = ${
    req.params.product_id
  }`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);

    for (let index = 0; index < result.length; index++) {
      fs.unlink(`${uploadDir}/${result[index].name_image}`, err => {});
    }
    connection.query(sql2, (err, result) => {
      if (err) return res.send(err);
      console.log("deleteproduct");

      res.send(result);
    });
  });
});

//detailproduct
router.get("/detail/product/:product_id", (req, res) => {
  const sql = `SELECT * FROM products WHERE product_id = ${
    req.params.product_id
  }`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);
    var product = result;

    const sql = `SELECT * FROM stock st 
    JOIN size s ON st.size_id = s.size_id
    WHERE st.product_id = ${req.params.product_id}`;
    connection.query(sql, (err, result) => {
      if (err) return res.send(err);
      var stock = result;

      const sql = `SELECT * FROM images WHERE product_id = ${
        req.params.product_id
      }`;
      connection.query(sql, (err, result) => {
        if (err) return res.send(err);
        var images = result;

        const sql = `SELECT * FROM size`;
        connection.query(sql, (err, result) => {
          if (err) return res.send(err);
          var size = result;
          res.send({ product, stock, images, size });
        });
      });
    });
  });
});

//getallproductsshop
router.get("/get/products/shop/:gender", (req, res) => {
  Object.keys(req.query).forEach(key => {
    if (req.query[key] === "0") {
      delete req.query[key];
    }
  });
  console.log(typeof req.query.category);

  if (req.query.category) {
    const sql = `SELECT p.category1, p.category2, p.created_at, i.name_image, p.price,
    p.product_id, p.product_name, s.size  FROM products p
    JOIN images i ON p.product_id = i.product_id
    JOIN stock st ON p.product_id = st.product_id
    JOIN size s ON st.size_id = s.size_id
    WHERE i.name_image LIKE '%default%'
    AND p.category1 = '${req.params.gender}'
    AND p.category2 = '${req.query.category}'`;

    connection.query(sql, (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    });
  } else {
    const sql = `SELECT p.category1, p.category2, p.created_at, i.name_image, p.price,
    p.product_id, p.product_name, s.size  FROM products p
    JOIN images i ON p.product_id = i.product_id
    JOIN stock st ON p.product_id = st.product_id
    JOIN size s ON st.size_id = s.size_id
    WHERE i.name_image LIKE '%default%'
    AND p.category1 = '${req.params.gender}'`;

    connection.query(sql, (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    });
  }
});

module.exports = router;

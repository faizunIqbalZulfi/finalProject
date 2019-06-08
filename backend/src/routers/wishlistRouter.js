const router = require("express").Router();

const connection = require("../connections/connection");

// addtowishlistfromcart
router.post("/add/wishlist/cart/:wishcart_id", (req, res) => {
  const sql = `UPDATE wishcart SET status = "w" WHERE wishcart_id = ${
    req.params.wishcart_id
  }`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);

    res.send(result);
  });
});

// addwishlist
router.post("/add/wishlist", (req, res) => {
  const { product_id, user_id, size, status } = req.body;
  const sql = `SELECT size_id FROM size WHERE size = ${size}`;

  connection.query(sql, req.body, (err, result) => {
    if (err) return res.send(err);
    var { size_id } = result[0];

    const sql = `SELECT * FROM wishcart where user_id = ${user_id}
    AND product_id = ${product_id}
    AND size_id = ${size_id}
    AND status = '${status}'`;

    connection.query(sql, (err, result) => {
      if (err) return res.send(err);

      if (result.length) return res.send("sudah ada");

      const sql = `INSERT INTO wishcart (user_id, product_id, size_id, status)
        VALUES (${user_id}, ${product_id}, ${size_id}, '${status}')`;

      connection.query(sql, (err, result) => {
        if (err) return res.send(err);

        res.send(result);
      });
    });
  });
});

//getwishlist
router.get("/get/wishlist/:user_id", (req, res) => {
  const sql = `SELECT w.wishcart_id,
  w.user_id,
  w.product_id,
  w.size_id,
  w.qty,
  w.created_at,
  p.product_name,
  p.description,
  p.price,
  p.category1,
  p.category2,
  s.size,
  i.name_image
  FROM wishcart w
  JOIN users u ON w.user_id = u.user_id
  JOIN products p ON w.product_id = p.product_id
  JOIN size s ON w.size_id = s.size_id
  JOIN images i ON p.product_id = i.product_id
  WHERE w.user_id = ${
    req.params.user_id
  } AND i.name_image LIKE '%default%' AND status = "w"`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);

    res.send(result);
  });
});

//deletewishlist
router.delete("/delete/wishlist/:wishcart_id", (req, res) => {
  const sql = `DELETE FROM wishcart WHERE wishcart_id = ${
    req.params.wishcart_id
  }`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);

    res.send(result);
  });
});

// addtocartfromwishlist
router.post("/add/cart/wishlist/:wishcart_id", (req, res) => {
  const sql = `SELECT * FROM wishcart WHERE wishcart_id = ${
    req.params.wishcart_id
  }`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);

    var { user_id, product_id, size_id, qty, status } = result[0];

    const sql = `SELECT * FROM wishcart WHERE user_id = ${user_id}
    AND product_id = ${product_id}
    AND size_id = ${size_id}
    AND status = "c"`;

    connection.query(sql, (err, result) => {
      if (err) return res.send(err);

      if (result.length) {
        const sql = `UPDATE wishcart SET qty = ${result[0].qty + qty} 
        WHERE wishcart_id = ${result[0].wishcart_id}`;
        connection.query(sql, (err, result) => {
          if (err) return res.send(err);

          const sql = `DELETE FROM wishcart WHERE wishcart_id = ${
            req.params.wishcart_id
          }`;
          connection.query(sql, (err, result) => {
            if (err) return res.send(err);
            res.send(result);
          });
        });
      } else {
        const sql = `UPDATE wishcart SET status = "c" WHERE wishcart_id = ${
          req.params.wishcart_id
        }`;

        connection.query(sql, (err, result) => {
          if (err) return res.send(err);

          res.send(result);
        });
      }
    });
  });
});

// addtocart
router.post("/add/cart", (req, res) => {
  const { product_id, user_id, size, status } = req.body;
  const sql = `SELECT size_id FROM size WHERE size = ${size}`;

  connection.query(sql, req.body, (err, result) => {
    if (err) return res.send(err);
    var { size_id } = result[0];

    const sql = `SELECT * FROM wishcart where user_id = ${user_id}
    AND product_id = ${product_id}
    AND size_id = ${size_id}
    AND status = '${status}'`;

    connection.query(sql, (err, result) => {
      if (err) return res.send(err);

      if (result.length) {
        const sql = `UPDATE wishcart SET qty = ${result[0].qty + 1}
        WHERE wishcart_id = ${result[0].wishcart_id}`;

        connection.query(sql, (err, result) => {
          if (err) return res.send(err);

          return res.send(result);
        });
      } else {
        const sql = `INSERT INTO wishcart (user_id, product_id, size_id, status)
          VALUES (${user_id}, ${product_id}, ${size_id}, '${status}')`;

        connection.query(sql, (err, result) => {
          if (err) return res.send(err);

          res.send(result);
        });
      }
    });
  });
});

//getcart
router.get("/get/cart/:user_id", (req, res) => {
  const sql = `SELECT w.wishcart_id,
    w.user_id,
    w.product_id,
    w.size_id,
    w.qty,
    w.created_at,
    p.product_name,
    p.description,
    p.price,
    p.category1,
    p.category2,
    s.size,
    i.name_image
    FROM wishcart w
    JOIN users u ON w.user_id = u.user_id
    JOIN products p ON w.product_id = p.product_id
    JOIN size s ON w.size_id = s.size_id
    JOIN images i ON p.product_id = i.product_id
    WHERE w.user_id = ${
      req.params.user_id
    } AND i.name_image LIKE '%default%' AND status = "c"`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);

    res.send(result);
  });
});

// getSizeProduct
router.get("/get/size/product/:product_id", (req, res) => {
  const sql = `SELECT * FROM stock st 
  JOIN size s ON st.size_id = s.size_id
  WHERE st.product_id = ${req.params.product_id}`;
  console.log(req.params.product_id);

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);

    res.send(result);
  });
});

// editcart
router.patch("/edit/cart", (req, res) => {
  const { product_id, wishcart_id, user_id, size, qty } = req.body;
  const sql = `SELECT * FROM size WHERE size = ${size}`;
  connection.query(sql, (err, result) => {
    if (err) return res.send(err);
    var { size_id } = result[0];

    const sql = `SELECT * FROM wishcart WHERE user_id = ${user_id}
    AND product_id = ${product_id}
    AND size_id = ${result[0].size_id}`;
    connection.query(sql, (err, result) => {
      if (err) return res.send(err);

      if (result.length) {
        const sql = `UPDATE wishcart SET qty = ${qty +
          result[0].qty} WHERE wishcart_id = ${result[0].wishcart_id}`;

        connection.query(sql, (err, result) => {
          if (err) return res.send(err);

          const sql = `DELETE FROM wishcart WHERE wishcart_id = ${wishcart_id}`;
          connection.query(sql, (err, result) => {
            if (err) return res.send(err);

            res.send(result);
          });
        });
      } else {
        const sql = `UPDATE wishcart SET qty = ${qty}, size_id = ${size_id} WHERE wishcart_id = ${wishcart_id}`;

        connection.query(sql, (err, result) => {
          if (err) return res.send(err);

          res.send(result);
        });
      }
    });
  });
});

module.exports = router;

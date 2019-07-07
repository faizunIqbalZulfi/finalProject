const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const connection = require("../connections/connection");

const { createPdf } = require("../htmltopdf/htmltopdf");

const uploadDir = path.join(__dirname, "../uploads/paymentConfirm");
const pdfDir = path.join(__dirname, "../uploads/invoice");
// const pdfName = `result${Date.now()}.pdf`

const storage = multer.diskStorage({
  // Destination
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  // Filename
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.fieldname + path.extname(file.originalname));
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

//showimage
router.get("/show/paymentconfirm/:img", (req, res) => {
  res.sendFile(`${uploadDir}/${req.params.img}`);
});

//getshipers
router.get("/shipers", (req, res) => {
  const sql = `SELECT * FROM shipers`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  });
});

//getpayments
router.get("/payments", (req, res) => {
  const sql = `SELECT * FROM paymentmethod`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  });
});

// addshippers
router.post(`/add/shippers`, (req, res) => {
  const sql = `insert into shipers set ?`

  connection.query(sql, req.body, (err, result) => {
    if (err) return res.send(err)

    res.send(result)
  })
})

// deleteshippers
router.delete("/delete/shippers/:shipper_id", (req, res) => {
  const sql = `delete from shipers where shipper_id = ${req.params.shipper_id}`
  connection.query(sql, (err, result) => {
    if (err) return res.send(err)

    res.send(result)
  })
})

// editshippers
router.patch(`/edit/shippers/:shipper_id`, (req, res) => {
  const sql = `update shipers set ? where shipper_id = ${req.params.shipper_id}`

  connection.query(sql, req.body, (err, result) => {
    if (err) return res.send(err)

    res.send(result)
  })
})

// addpaymentmethod
router.post("/add/paymentmethod", (req, res) => {
  const sql = `INSERT INTO paymentmethod SET ?`;

  connection.query(sql, req.body, (err, result) => {
    if (err) return res.send(err);

    res.send(result);
  });
});

// deletepaymentmethod
router.delete(`/delete/paymentmethod/:paymentmethod_id`, (req, res) => {
  const sql = `Delete from paymentmethod where paymentmethod_id = ${req.params.paymentmethod_id}`

  connection.query(sql, (err, result) => {
    if (err) return res.send(err)

    res.send(result)
  })
})

// editpaymentmethod
router.patch(`/edit/paymentmethod/:paymentmethod_id`, (req, res) => {
  const sql = `update paymentmethod set ? where paymentmethod_id = ${req.params.paymentmethod_id}`
  connection.query(sql, req.body, (err, result) => {
    if (err) return res.send(err)

    res.send(result)
  })
})

//addorders&orderdetails&removewishcart
router.post("/addorders", (req, res) => {
  const sql = `INSERT INTO orders (user_id, address, paymentmethod_id, shipper_id, pricetotal) 
    VALUES (${req.body.user_id}, '${req.body.address}', ${
    req.body.paymentmethod_id
    }, ${req.body.shipper_id}, ${req.body.pricetotal})`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);
    const value = req.body.wishcart.map(obj => {
      return `(${result.insertId}, ${obj.product_id}, ${obj.size_id}, ${
        obj.price
        }, ${obj.qty})`;
    });
    const sql = `INSERT INTO orderdetails (order_id, product_id, size_id, price, qty)
      VALUES ${value.join(",")}`;
    connection.query(sql, (err, result) => {
      if (err) return res.send(err);
      const value = req.body.wishcart.map(obj => {
        return obj.wishcart_id;
      });
      const sql = `DELETE FROM wishcart WHERE wishcart_id IN (${value.join(
        ","
      )})`;
      connection.query(sql, (err, result) => {
        if (err) return res.send(err);
        res.send(result);
      });
    });
  });
});

// getorderuser_id
router.get("/get/order/:user_id", (req, res) => {
  const sql = `SELECT o.order_id, o.invoice, o.address, o.paymentmethod_id, o.paymentconfirm, o.status, SUM(o.pricetotal+s.price) AS pricetotal,
    s.company_name, s.category, s.estimasi, s.phone, pm.bank_name, pm.no_rek, pm.an_bank FROM orders o 
    JOIN shipers s ON s.shipper_id = o.shipper_id
    JOIN paymentmethod pm ON pm.paymentmethod_id = o.paymentmethod_id
    WHERE o.user_id = ${req.params.user_id}
    GROUP BY o.order_id`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);
    return res.send(result);
  });
});

// deleteorderuser
router.delete("/delete/orderuser/:order_id", (req, res) => {
  const sql = `DELETE FROM orders WHERE order_id = ${req.params.order_id}`;
  connection.query(sql, (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  });
});

// editorderuser
router.patch("/update/orderuser/:order_id", (req, res) => {
  const sql = `UPDATE orders SET paymentmethod_id = ${req.body.paymentmethod_id}
     WHERE order_id = ${req.params.order_id}`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);

    res.send(result);
  });
});

// updateorders
router.patch("/update/status/order/:order_id", (req, res) => {
  const sql = `UPDATE orders SET status = '${
    req.body.status
    }' WHERE order_id = ${req.params.order_id}`;
  connection.query(sql, (err, result) => {
    if (err) return res.send(err);

    // getproductordered
    const sql = `SELECT od.product_id, od.orderdetail_id , od.qty, od.size_id From orderdetails od 
  JOIN orders o ON od.order_id = o.order_id
  WHERE o.order_id =${req.params.order_id} AND o.status = 'delivered'`;
    connection.query(sql, (err, result) => {
      if (err) return res.send(err);

      // console.log(result);

      if (result.length) {
        var qtyOrder = result.map(obj => {
          return obj.qty;
        });
        var condition = result.map(obj => {
          return `(product_id = ${obj.product_id} AND size_id = ${obj.size_id})`;
        });

        // getproductanddecreaseqty
        const sql = `SELECT stock_id, product_id, qty, size_id FROM stock
      WHERE ${condition.join(" OR ")}`;
        connection.query(sql, (err, result) => {
          if (err) return res.send(err);
          var value = result.map((obj, i) => {
            return `(${obj.stock_id}, ${obj.product_id}, ${
              obj.size_id
              }, ${obj.qty - qtyOrder[i]})`;
          });

          // updateqtyproductafterordered
          const sql = `INSERT INTO stock
            (stock_id, product_id, size_id, qty)
            VALUES ${value.join(",")} ON DUPLICATE KEY UPDATE
            qty = VALUES(qty);`;
          connection.query(sql, (err, result) => {
            if (err) return res.send(err);

            // createpdf
            const sql = `SELECT u.first_name, u.last_name, od.orderdetail_id, p.description, o.order_id, p.product_id, p.price AS priceProduct, od.qty, SUM(o.pricetotal+sh.price) AS priceGrand, 
            o.created_at, o.address, o.updated_at, p.product_name, p.category1, p.category2, sh.price AS priceShipment,
            s.size FROM orderdetails od
            JOIN orders o ON o.order_id = od.order_id
            JOIN products p ON od.product_id = p.product_id
            JOIN size s ON s.size_id = od.size_id
            JOIN shipers sh ON sh.shipper_id = o.shipper_id
            JOIN users u ON u.user_id = o.user_id
            WHERE od.order_id = ${req.params.order_id}
            GROUP BY od.orderdetail_id`;

            connection.query(sql, (err, result) => {
              if (err) return res.send(err);

              var data = result
              var pdfName = `result$${Date.now()}.pdf`

              const sql = `UPDATE orders SET invoice = '${pdfName}' WHERE order_id = ${req.params.order_id}`
              connection.query(sql, async (err, result) => {
                if (err) return res.send(err)
                await createPdf(data, pdfName)

                res.send(result);
              })
            });
          });
        });

      } else {
        res.send(result);
      }
    });
  });
});

// confirmpayment
router.patch(
  "/uploadproof/orders/:order_id",
  upstore.single("paymentconfirm"),
  (req, res) => {
    const sql = `UPDATE orders SET paymentconfirm = '${
      req.file.filename
      }' WHERE order_id = ${req.params.order_id}`;
    connection.query(sql, (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    });
  }
);

// getorders
router.get("/get/order", (req, res) => {
  const sql = `SELECT o.order_id, o.status, o.address, o.pricetotal, o.paymentconfirm, o.created_at, o.updated_at,
    s.company_name, s.category, s.price, s.phone, pm.bank_name, pm.no_rek, u.username FROM orders o 
    JOIN shipers s ON s.shipper_id = o.shipper_id
    JOIN paymentmethod pm ON pm.paymentmethod_id = o.paymentmethod_id
    JOIN users u ON u.user_id = o.user_id order by o.status desc`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);
    return res.send(result);
  });
});

// getorderdetails
router.get("/get/orderdetails/:order_id", (req, res) => {
  const sql = `SELECT * FROM orderdetails od
    JOIN products p ON od.product_id = p.product_id
    JOIN size s ON s.size_id = od.size_id
    JOIN images i ON i.product_id = p.product_id
    WHERE order_id = ${req.params.order_id}
    AND name_image LIKE '%default%'`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);

    res.send(result);
  });
});

// // getdatafotinvoice
// router.get("/get/orderdetails/invoice/:order_id", (req, res) => {
//   const sql = `SELECT u.first_name, u.last_name, od.orderdetail_id, p.description, o.order_id, p.product_id, p.price AS priceProduct, od.qty, SUM(o.pricetotal+sh.price) AS priceTotal, 
//     o.created_at, o.updated_at, p.product_name, p.category1, p.category2, a.name, a.address_name, sh.price AS priceShipment,
//     a.no_telp, a.city, a.province, a.pos_code, a.address1, s.size FROM orderdetails od
//     JOIN orders o ON o.order_id = od.order_id
//     JOIN products p ON od.product_id = p.product_id
//     JOIN addresses a ON a.address_id = o.address_id
//     JOIN size s ON s.size_id = od.size_id
//     JOIN shipers sh ON sh.shipper_id = o.shipper_id
//     JOIN users u ON u.user_id = o.user_id
//     WHERE od.order_id = ${req.params.order_id}
//     GROUP BY od.orderdetail_id`;

//   connection.query(sql, async (err, result) => {
//     if (err) return res.send(err);
//     // console.log(result);

//     createPdf(result);
//     res.send(result);
//   });
// });

//showimage
router.get("/show/invoice/:pdf", (req, res) => {
  res.sendFile(`${pdfDir}/${req.params.pdf}`);
});



// router.post("/test", (req, res) => {
//   const sql = `insert into test set ?`

//   connection.query(sql, req.body, (err, result) => {
//     if (err) return res.send(err)
//     const sql = `select * from test`
//     connection.query(sql, (err, result) => {
//       if (err) return res.send(err)

//       res.send(result[0].address)
//     })
//   })
// })

module.exports = router;

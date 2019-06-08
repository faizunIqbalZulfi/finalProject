const router = require("express").Router();

const connection = require("../connections/connection");

router.get("/gethome/product", (req, res) => {
  const sql = `SELECT * FROM products p 
  JOIN images i ON p.product_id = i.product_id
  WHERE i.name_image LIKE '%default%'
  ORDER BY p.product_id DESC
  LIMIT 6`;
  connection.query(sql, (err, result) => {
    if (err) return res.send(err);

    res.send(result);
    // const arrProduct = result;
    // const arrProduct_id = result.map(product => {
    //   return product.product_id;
  });

  // var arrImage = arrProduct_id.map(key => {
  // const sql = `SELECT * FROM images WHERE product_id = ${key} LIMIT 1`;

  // connection.query(sql, (err, result) => {
  //   if (err) return res.send(err);
  //   console.log(result);
  //   return result;
  // });
  // });
  // res.send(arrImage);

  // const sql = `SELECT * FROM images WHERE product_id in (${arrProduct_id})`;
  // connection.query(sql, (err, result) => {
  //   if (err) return res.send(err);
  //   res.send({ products: arrProduct, images: result });
  // });
  //   });
});

module.exports = router;

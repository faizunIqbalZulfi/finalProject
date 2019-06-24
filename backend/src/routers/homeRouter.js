const router = require("express").Router();

const connection = require("../connections/connection");

//getproductnewarrival
router.get("/gethome/product/newarrival", (req, res) => {
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
});

// "product_id": 56,
// "product_name": "LeBron Witness III PRM",
// "description": "LeBron's in LA now, but his heart will always be in Akron. The LeBron Witness III PRM ushers in the next chapter of the King's career while paying tribute to his roots.",
// "price": 1549000,
// "category1": "Women",
// "category2": "Basketball",
// "created_at": "2019-06-04T04:31:06.000Z",
// "updated_at": "2019-06-04T04:31:06.000Z",
// "image_id": 290,
// "name_image": "1559622666537imagedefault.jpg"

// getproductbestseller
router.get("/gethome/product/bestseller", (req, res) => {
  const sql = `SELECT p.product_id, COUNT(p.product_id) AS sum, p.product_name, p.price, p.category1, p.category2,
    i.name_image FROM orderdetails o
    JOIN products p ON o.product_id = p.product_id 
    JOIN images i ON p.product_id = i.product_id
    WHERE i.name_image LIKE '%default%'
    GROUP BY p.product_id, p.product_name, p.price, p.category1, p.category2,
    i.name_image
    LIMIT 6`;
  connection.query(sql, (err, result) => {
    if (err) return res.send(err);

    res.send(result);
    // const arrProduct = result;
    // const arrProduct_id = result.map(product => {
    //   return product.product_id;
  });
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

module.exports = router;

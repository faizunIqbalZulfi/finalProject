const router = require("express").Router();

const connection = require("../connections/connection");

//getaddress
router.get("/address/:user_id", (req, res) => {
  const sql = `SELECT * FROM addresses WHERE user_id = ${req.params.user_id}`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);

    res.send(result);
  });
});

//editaddress
router.get("/edit/address/:address_id", (req, res) => {
  const sql = `SELECT * FROM addresses WHERE address_id = ${
    req.params.address_id
  }`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);

    res.send(result);
  });
});

module.exports = router;

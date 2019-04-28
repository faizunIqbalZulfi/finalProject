const router = require("express").Router();

const connection = require("../connections/connection");
const { editUserSuccess } = require("../../../frontend/src/config/message");

//getaddress
router.get("/address/:user_id", (req, res) => {
  const sql = `SELECT * FROM addresses WHERE user_id = ${req.params.user_id}`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);

    res.send(result);
  });
});

//editaddress
router.patch("/edit/address/:address_id", (req, res) => {
  Object.keys(req.body).forEach(key => {
    if (!req.body[key]) {
      delete req.body[key];
    }
  });
  const sql = `UPDATE addresses SET ? WHERE address_id = ${
    req.params.address_id
  }`;

  connection.query(sql, req.body, (err, result) => {
    if (err) return res.send(err);

    res.send(editUserSuccess);
  });
});

module.exports = router;

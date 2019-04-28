const router = require("express").Router();

const connection = require("../connections/connection");
const {
  editSuccess,
  deleteSuccess,
  addAddressSucces
} = require("../../../frontend/src/config/message");

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
      req.body[key] = null;
    }
  });
  const sql = `UPDATE addresses SET ? WHERE address_id = ${
    req.params.address_id
  }`;

  connection.query(sql, req.body, (err, result) => {
    if (err) return res.send(err.sqlMessage);

    res.send(editSuccess);
  });
});

//deleteaddress
router.delete("/delete/address/:address_id", (req, res) => {
  const sql = `DELETE FROM addresses WHERE address_id = ${
    req.params.address_id
  }`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);

    res.send(deleteSuccess);
  });
});

//addaddress
router.post("/add/address", (req, res) => {
  Object.keys(req.body).forEach(key => {
    if (!req.body[key]) {
      req.body[key] = null;
    }
  });
  const sql = `INSERT INTO addresses SET ?`;

  connection.query(sql, req.body, (err, result) => {
    if (err) return res.send(err.sqlMessage);

    res.send(addAddressSucces);
  });
});

module.exports = router;

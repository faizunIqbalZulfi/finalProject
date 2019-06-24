const router = require("express").Router();

const connection = require("../connections/connection");
const {
  editSuccess,
  deleteSuccess,
  addAddressSucces
} = require("../../../frontend/src/config/message");

//getaddress
router.get("/address/:user_id", (req, res) => {
  const sql = `SELECT * FROM addresses WHERE user_id = ${
    req.params.user_id
  } ORDER BY status DESC`;

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
    // console.log(result);

    // res.send(result);
    res.send(editSuccess);
  });
});

//setdefaultaddress
router.patch("/setdefault/address/:address_id/:user_id", (req, res) => {
  const sql = `UPDATE addresses SET status = null WHERE user_id = ${
    req.params.user_id
  } AND status = 'default'`;

  connection.query(sql, req.body, (err, result) => {
    if (err) return res.send(err.sqlMessage);

    const sql = `UPDATE addresses SET status = 'default' WHERE address_id = ${
      req.params.address_id
    }`;
    connection.query(sql, (err, result) => {
      if (err) return res.send(err);

      res.send(editSuccess);
    });
  });
});

//deleteaddress
router.delete("/delete/address/:address_id/:user_id", (req, res) => {
  const sql = `DELETE FROM addresses WHERE address_id = ${
    req.params.address_id
  }`;
  console.log(req.params);

  connection.query(sql, (err, result) => {
    if (err) return res.send(err.sqlMessage);
    const sql = `SELECT * FROM addresses WHERE user_id = ${
      req.params.user_id
    } AND status = 'default'`;
    connection.query(sql, (err, result) => {
      if (err) return res.send(err.sqlMessage);
      if (!result.length) {
        const sql = `UPDATE addresses SET status = 'default' WHERE user_id = ${
          req.params.user_id
        } LIMIT 1`;
        connection.query(sql, (err, result) => {
          if (err) return res.send(err.sqlMessage);
          res.send(deleteSuccess);
        });
      } else {
        res.send(deleteSuccess);
      }
    });
  });
});

//addaddress
router.post("/add/address", (req, res) => {
  console.log(req.body);
  const sql = `SELECT * FROM addresses WHERE user_id = ${
    req.body.user_id
  } AND status = 'default'`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);
    if (!result.length) {
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
    } else {
      const value = Object.keys(req.body).map(key => {
        return `'${req.body[key]}'`;
      });
      console.log(`(${value.join(",")},null)`);

      const sql = `INSERT INTO addresses (user_id, address1, address_name, no_telp, pos_code, city, name, province, status)
      VALUES (${value.join(",")},null)`;
      connection.query(sql, (err, result) => {
        if (err) return res.send(err.sqlMessage);
        res.send(addAddressSucces);
      });
    }
  });
});

module.exports = router;

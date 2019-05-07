const router = require("express").Router();
const bcrypt = require("bcrypt");
const isEmail = require("validator/lib/isEmail");

const { sendMail } = require("../mails/nodemailer");
const connection = require("../connections/connection");
const {
  registerSuccess,
  editSuccess
} = require("../../../frontend/src/config/message");

//verify
router.get("/verify", (req, res) => {
  const sql = `UPDATE users SET verified = TRUE WHERE email = '${
    req.query.email
  }'`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);

    res.send(result);
  });
});

//register
router.post("/register/user", async (req, res) => {
  Object.keys(req.body).forEach(key => {
    if (!req.body[key]) {
      req.body[key] = null;
    }
  });
  const data = req.body;
  const sql = `INSERT INTO users SET ?`;

  console.log(req.body);

  if (req.body.email === null || !isEmail(req.body.email))
    return res.send("invalid email");

  if (req.body.password === null) return res.send("password empty");
  req.body.password = await bcrypt.hash(req.body.password, 8);

  connection.query(sql, data, (err, result) => {
    if (err) return res.send(err.sqlMessage);

    sendMail(req.body.email);

    res.send(registerSuccess);
  });
});

//login
router.post("/login/user", (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM users WHERE email = '${email}'`;
  console.log(req.body);

  connection.query(sql, async (err, result) => {
    if (err) return res.send(err);

    if (!result[0]) return res.send("user not found");

    if (!result[0].verified) return res.send("please, verify your email");

    const hash = await bcrypt.compare(password, result[0].password);

    if (!hash) return res.send("email and password not match");

    res.send(result);
  });
});

//getuser
router.get("/user/:user_id", (req, res) => {
  const sql = `SELECT * FROM users WHERE user_id = ${req.params.user_id}`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);

    res.send(result);
  });
});

//edituse
router.patch("/edit/user/:user_id", (req, res) => {
  Object.keys(req.body).forEach(key => {
    if (!req.body[key]) {
      req.body[key] = null;
    }
  });
  const sql = `UPDATE users SET ? WHERE user_id =${req.params.user_id}`;
  const sql2 = `SELECT * FROM users WHERE user_id = ${req.params.user_id}`;

  if (req.body.email === null || !isEmail(req.body.email))
    return res.send("invalid email");

  connection.query(sql, req.body, (err, result) => {
    if (err) return res.send(err);

    connection.query(sql2, (err, result) => {
      if (err) return res.send(err);

      res.send(editSuccess);
    });
  });
});

//editpassword
router.patch("/edit/password/:user_id", (req, res) => {
  const { password, newPass, coNewPass } = req.body;
  const sql = `SELECT * FROM users WHERE user_id = ${req.params.user_id}`;
  const sql2 = `UPDATE users SET ? WHERE user_id = ${req.params.user_id}`;

  connection.query(sql, async (err, result) => {
    if (err) return res.send(err);

    const hash = await bcrypt.compare(password, result[0].password);

    if (!hash) return res.send("wrong password");

    if (newPass !== coNewPass) return res.send("password not match");

    req.body.password = await bcrypt.hash(newPass, 8);
    req.body.newPass = "";
    req.body.coNewPass = "";

    Object.keys(req.body).forEach(key => {
      if (!req.body[key]) {
        delete req.body[key];
      }
    });

    connection.query(sql2, req.body, (err, result) => {
      if (err) return res.send(err);

      res.send(editSuccess);
    });
  });
});

//deleteuser
router.delete("/delete/user/:user_id", (req, res) => {
  const sql = `DELETE FROM users WHERE user_id = ${req.params.user_id}`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err.sqlMessage);

    res.send("delete user success");
  });
});

module.exports = router;

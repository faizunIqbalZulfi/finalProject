const router = require("express").Router();
const bcrypt = require("bcrypt");
const isEmail = require("validator/lib/isEmail");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const connection = require("../connections/connection");
const {
  registerSuccess,
  editSuccess
} = require("../../../frontend/src/config/message");
const sendVerify = require("../emails/nodemailer")

const uploadDir = path.join(__dirname, "../uploads/avatar");

const storage = multer.diskStorage({
  // Destination
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  // Filename
  filename: function (req, file, cb) {
    // var check = true;
    // if (file.originalname === "default.jpg") {
    //   console.log(file);
    //   // check = !check;
    //   cb(null, Date.now() + file.fieldname + file.originalname);
    // } else {
    cb(null, Date.now() + file.fieldname + path.extname(file.originalname));
    // }
  }
});

const upstore = multer({
  storage,
  limits: {
    fileSize: 10000000 // Byte
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg||png)$/)) {
      return cb(new Error("Please upload image file (jpg, jpeg, or png)"));
    }

    cb(undefined, true);
  }
});

//verify
router.patch("/edit/status/:status/:user_id", (req, res) => {
  const sql = `UPDATE users SET status = ${req.params.status} WHERE user_id = '${
    req.params.user_id
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
  if (req.body.username === null) return res.send("username empty")

  if (req.body.email === null || !isEmail(req.body.email))
    return res.send("invalid email");

  if (req.body.password === null) return res.send("password empty");
  req.body.password = await bcrypt.hash(req.body.password, 8);

  connection.query(sql, data, (err, result) => {
    if (err) return res.send(err.sqlMessage);

    // sendMail(req.body.email);

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

    if (!result[0].status) return res.send("banned");

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

//edituser
router.patch("/edit/user/:user_id", upstore.single("avatar"), (req, res) => {
  console.log(req.body);

  // Object.keys(req.body).forEach(key => {
  //   if (!req.body[key]) {
  //     req.body[key];
  //   }
  // });

  const sql = `UPDATE users SET ? WHERE user_id =${req.params.user_id}`;

  if (req.body.email === "" || !isEmail(req.body.email))
    return res.send("invalid email");

  connection.query(sql, req.body, (err, result) => {
    if (err) return res.send(err);

    console.log(req.file);
    console.log(req.files);

    if (!req.file) return res.send(editSuccess);

    const sql = `UPDATE users SET avatar = '${
      req.file.filename
      }' WHERE user_id = ${req.params.user_id}`;
    connection.query(sql, (err, result) => {
      if (err) return res.send(err);

      res.send(editSuccess);
    });
    // res.send(editSuccess);
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

//showavatar
router.get("/show/avatar/:img", (req, res) => {
  res.sendFile(`${uploadDir}/${req.params.img}`);
});

//deleteavatar
router.delete("/delete/avatar/:user_id", (req, res) => {
  const sql = `SELECT avatar FROM users WHERE user_id = ${req.params.user_id}`;

  connection.query(sql, (err, result) => {
    if (err) return res.send(err);

    const sql = `UPDATE users SET avatar = null WHERE user_id = ${
      req.params.user_id
      }`;

    fs.unlink(`${uploadDir}/${result[0].avatar}`, err => {
      if (err) return res.send(err);

      connection.query(sql, (err, result) => {
        if (err) return res.send(err);

        res.send(editSuccess);

        // return res.send(editSuccess);
      });
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

// getalluser
router.get("/get/alluser", (req, res) => {
  const sql = `SELECT * FROM users order by role`;
  connection.query(sql, (err, result) => {
    if (err) return res.send(err);

    res.send(result);
  });
});

// forgotpass
router.get("/send/email/:email", (req, res) => {
  const sql = `select * from users where email = '${req.params.email}'`
  connection.query(sql, async (err, result) => {
    if (err) return res.send(err)
    if (!result.length) return res.send("user not found")

    var password = await Date.now()
    var hashPassword = await bcrypt.hash(password.toString(), 8);

    const sql = `update users set password = '${hashPassword}' 
    where email = '${req.params.email}'`
    connection.query(sql, (err, result) => {
      if (err) return res.send(err)

      sendVerify(req.params.email, password)
      res.send("success")
    })



  })
})


module.exports = router;

const UserModel = require("../../database/models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const { key, keyPub } = require("../../keys");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email }).exec();
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({}, key, {
          subject: user._id.toString(),
          expiresIn: 3600 * 24 * 30 * 6,
          algorithm: "RS256",
        });

        res.cookie("token", token, { httpOnly: true });
        res.json(user);
      } else {
        res.status(400).json("Mauvais email/password");
      }
    } else {
      res.status(400).json("Mauvais email/password");
    }
  } catch (e) {
    res.status(400).json("Mauvais email/password");
  }
});

router.get("/me", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const decodedToken = jwt.verify(token, keyPub);
      const currentUser = await UserModel.findById(decodedToken.sub)
        .select("-password -__v")
        .exec();
      if (currentUser) {
        res.json(currentUser);
      } else {
        return res.json(null);
      }
    } catch (e) {
      return res.json(null);
    }
  } else {
    return res.json(null);
  }
});

router.delete("", (req, res) => {
  res.clearCookie("token");
  res.end();
});

module.exports = router;

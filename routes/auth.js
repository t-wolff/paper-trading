const express = require("express");
const {
  register,
  login,
  // getMe,
  // updateDetails,
} = require("../controllers/auth");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
// router.get("/me", protect, getMe);  not working yet
// router.put("/updatedetails", protect, updateDetails); not working yet 

module.exports = router;

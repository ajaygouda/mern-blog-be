const express = require("express");
const router = express.Router();

const { register, addBlog } = require("../controllers/blogController")


router.route("/register").post(register);
router.route("/posts").post(addBlog);


module.exports = router;
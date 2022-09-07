const studentController = require("../controllers/student");
const auth = require("../middleware/auth");

const express = require("express");

const router = express.Router();

router.post("/login", studentController.loginStudent);
router.post("/signup", studentController.signupStudent);
router.get("/validate", studentController.validate);
router.get("/profile", auth, studentController.getStudent);

module.exports = router;

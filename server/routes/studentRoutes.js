const studentController = require("../controllers/student");

const express = require("express");

const router = express.Router();

router.post("/login", studentController.loginStudent);
router.post("/signup", studentController.signupStudent);
router.get("/signup", studentController.getStudents);

module.exports = router;

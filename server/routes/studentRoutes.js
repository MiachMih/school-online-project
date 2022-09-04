const studentController = require("../controllers/student");

const express = require("express");

const router = express.Router();

router.get("/", studentController.getStudents);
router.post("/", studentController.signupStudent);

module.exports = router;

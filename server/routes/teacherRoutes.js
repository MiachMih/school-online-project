const teacherController = require("../controllers/teacher");
const auth = require("../middleware/auth");

const express = require("express");

const router = express.Router();

router.post("/signup", teacherController.signupTeacher);
router.post("/login", teacherController.loginTeacher);
router.get("/profile", auth, teacherController.getTeacher);
router.put("/profile", auth, teacherController.updateTeacher);
router.get("/validate", teacherController.validate);

module.exports = router;

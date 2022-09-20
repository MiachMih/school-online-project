const classesController = require("../controllers/classes");
const auth = require("../middleware/auth");

const express = require("express");

const router = express.Router();

router.get("/get-classes", auth, classesController.getClasses);
router.post("/new-class", auth, classesController.addNewClass);
router.put("/add-student-to-class", auth, classesController.addStudentToClass);
router.put(
  "/add-student-by-password",
  auth,
  classesController.addStudentToClassByPassword
);
router.get("/get-class-password", auth, classesController.getClassPassword);
router.get(
  "/get-all-prerequisites",
  auth,
  classesController.getAllPrerequisites
);

module.exports = router;

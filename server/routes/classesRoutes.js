const classesController = require("../controllers/classes");
const yearController = require("../controllers/year");
const auth = require("../middleware/auth");
const paginate = require("../middleware/paginate");
const Classes = require("../models/classes");

const express = require("express");

const router = express.Router();

router.get(
  "/get-classes/:category",
  auth,
  paginate(Classes, "asc", "subject"),
  classesController.getClasses
);
router.get("/get-class-by-id/:id", auth, classesController.getClassById);
router.post("/new-class", auth, classesController.addNewClass);
router.put("/add-student-to-class", auth, classesController.addStudentToClass);
router.put("/update-class", auth, classesController.updateClass);
router.put(
  "/add-student-by-password",
  auth,
  classesController.addStudentToClassByPassword
);
router.get("/get-class-password", auth, classesController.getClassPassword);
router.get(
  "/get-class-prerequisites",
  auth,
  classesController.getClassPrerequisites
);
router.put("/start-year", auth, classesController.startYear);
router.put(
  "/remove-student-from-class",
  auth,
  classesController.dropStudentFromClass
);
router.get("/get-classes-names", auth, classesController.getClassesNames);

// Change year status
router.get("/is-year-inprogress", auth, yearController.getIsYearInProgress);
router.put(
  "/toggle-year-inprogress",
  auth,
  yearController.toggleYearInProgress
);

module.exports = router;

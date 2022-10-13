const subjectController = require("../controllers/subject");
const auth = require("../middleware/auth");

const express = require("express");
const router = express.Router();

router.get("/get-subjects", auth, subjectController.getSubjects);
router.post("/add-subject", auth, subjectController.addSubject);

module.exports = router;

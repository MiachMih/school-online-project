const announcementController = require("../controllers/announcement");
const auth = require("../middleware/auth");
const paginate = require("../middleware/paginate");
const Announcement = require("../models/announcement");
const express = require("express");
const router = express.Router();

router.post("/add-announcement", auth, announcementController.addAnnouncement);

module.exports = router;

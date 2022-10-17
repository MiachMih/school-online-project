const announcementController = require("../controllers/announcement");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.post("/add-announcement", auth, announcementController.addAnnouncement);
router.get("/get-announcements/*", auth, announcementController.paginate);
router.get("/get-max-pages/*", auth, announcementController.getMaxPages);

module.exports = router;

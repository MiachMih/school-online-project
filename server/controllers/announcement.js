const Announcement = require("../models/announcement");
const mongoose = require("mongoose");

exports.addAnnouncement = async (req, res, next) => {
  const { header, message, img } = req.body;

  try {
    if (!(header && message && img)) {
      return res.status(400).json({ message: "Need all inputs" });
    }
    const result = await Announcement.create({
      header,
      message,
      img,
    });

    return res.status(201).json({ result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getMaxPages = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const totalItemCount = await Announcement.countDocuments({});
    const result = Math.ceil(totalItemCount / limit);
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.paginate = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 10;
    const announcements = await Announcement.find({})
      .skip(page * limit)
      .limit(limit)
      .exec();
    const result = announcements;
    return res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

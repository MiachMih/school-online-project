const Announcement = require("../models/announcement");

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

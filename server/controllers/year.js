const Year = require("../models/year");
const Student = require("../models/student");
const mongoose = require("mongoose");
const Classes = require("../models/classes");

exports.getIsYearInProgress = async (req, res, next) => {
  try {
    const response = await Year.find({});
    res.status(200).json({ result: response[0].isYearInProgress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleYearInProgress = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const response = await Year.find({}).session(session);
    await Year.updateOne(
      { _id: response[0]._id },
      { isYearInProgress: !response[0].isYearInProgress }
    ).session(session);
    const result = await Year.findById(response[0]._id).session(session);

    // make all current classes transfer into previous classes taken
    if (!result.isYearInProgress) {
      await Student.update(
        {},
        [
          {
            $set: {
              previous_subjects_taken: {
                $concatArrays: ["$current_classes", "$previous_subjects_taken"],
              },
            },
          },
        ],
        { multi: true }
      ).session(session);
    }

    // clear the current_classes
    if (!result.isYearInProgress) {
      await Student.update({}, [
        {
          $set: {
            current_classes: [],
          },
        },
      ]).session(session);
    }

    // make all student's registered classes transfer into current classes
    if (result.isYearInProgress) {
      await Student.update(
        {},
        [
          {
            $set: {
              current_classes: "$registering_next_year_classes",
            },
          },

          {
            $addFields: {
              "current_classes.letter_grade": "A",
            },
          },
        ],
        { multi: true }
      ).session(session);
    }

    // empty registering_next_year_classes cart
    if (result.isYearInProgress) {
      await Student.updateMany(
        {},
        { $set: { registering_next_year_classes: [] } }
      ).session(session);
    }

    // clear student_list inside classes when the year ends
    if (!result.isYearInProgress) {
      await Classes.updateMany(
        {},
        {
          $set: { student_list: [] },
        }
      ).session(session);
    }

    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ result: result.isYearInProgress });
  } catch (error) {
    session.abortTransaction();
    res.status(500).json({ message: error.message });
  }
};

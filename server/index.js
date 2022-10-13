const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");
const classesRoutes = require("./routes/classesRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const subjectRoutes = require("./routes/subjectRoutes");

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const PORT = 5000;
const CONNECTION_URL =
  "mongodb+srv://nik_5467:C6qMkPCcaXNP0M3g@cluster0.kqpphjd.mongodb.net/?retryWrites=true&w=majority";

app.use(cors());

app.use("/student", studentRoutes);
app.use("/classes", classesRoutes);
app.use("/teacher", teacherRoutes);
app.use("/subject", subjectRoutes);

mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "./student-slice";
import teacherSlice from "./teacher-slice";
const store = configureStore({
  reducer: { student: studentSlice.reducer, teacher: teacherSlice.reducer },
});

export default store;

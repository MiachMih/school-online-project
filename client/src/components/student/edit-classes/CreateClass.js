import React, { useState } from "react";
import styles from "./CreateClass.module.css";

//TODO: might want to optimize by changing useState to useRef
// for some of the inputs
function CreateClass() {
  const [class_info, setClassInfo] = useState({
    class_name: "",
    teacher_name: "",
    class_description: "",
    class_prerequisites: [],
    schedule: {
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false,
    },
  });

  function submitHandler(e) {}

  function changeHandler(e) {
    setClassInfo((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });
  }

  function prerequisitesChangeHandler(e) {}

  function scheduleChangeHandler(e) {
    setClassInfo((state) => {
      return {
        ...state,
        schedule: { ...state.schedule, [e.target.name]: e.target.checked },
      };
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form onSubmit={submitHandler} className={styles.form}>
          <h1 className={styles.title}>Add New Class</h1>
          <div className={styles.inputs}>
            <label>Class Name</label>
            <input
              type="text"
              name="class_name"
              onChange={changeHandler}
            ></input>
          </div>
          <div className={styles.inputs}>
            <label>Teacher Name</label>
            <input
              type="text"
              name="teacher_name"
              onChange={changeHandler}
            ></input>
          </div>
          <div className={styles.inputs}>
            <label>Class Description</label>
            <input
              type="text"
              name="class_description"
              onChange={changeHandler}
            ></input>
          </div>
          <div className={styles.prerequisites}>
            <div className={styles.inputs}>
              <label>Class Prerequisites</label>
              <input
                type="text"
                name="class_prerequisites"
                onChange={prerequisitesChangeHandler}
              ></input>
            </div>
          </div>
          <div className={styles.schedule}>
            <div className={styles.inputs}>
              <label>Mo</label>
              <input
                type="checkbox"
                name="Monday"
                onChange={scheduleChangeHandler}
              />
            </div>
            <div className={styles.inputs}>
              <label>Tu</label>
              <input
                type="checkbox"
                name="Tuesday"
                onChange={scheduleChangeHandler}
              />
            </div>
            <div className={styles.inputs}>
              <label>We</label>
              <input
                type="checkbox"
                name="Wednesday"
                onChange={scheduleChangeHandler}
              />
            </div>
            <div className={styles.inputs}>
              <label>Th</label>
              <input
                type="checkbox"
                name="Thursday"
                onChange={scheduleChangeHandler}
              />
            </div>
            <div className={styles.inputs}>
              <label>Fr</label>
              <input
                type="checkbox"
                name="Friday"
                onChange={scheduleChangeHandler}
              />
            </div>
            <div className={styles.inputs}>
              <label>Sa</label>
              <input
                type="checkbox"
                name="Saturday"
                onChange={scheduleChangeHandler}
              />
            </div>
            <div className={styles.inputs}>
              <label>Su</label>
              <input
                type="checkbox"
                name="Sunday"
                checked={class_info.schedule.Sunday}
                onChange={scheduleChangeHandler}
              />
            </div>
          </div>
          {/*TODO: add optional password functionality*/}
          {/* <div className={styles.inputs}>
            <label>Password</label>
            <input type="text" name="password" onChange={changeHandler}></input>
          </div> */}
          <button type="submit">Create Class</button>
        </form>
      </div>
    </div>
  );
}

export default CreateClass;

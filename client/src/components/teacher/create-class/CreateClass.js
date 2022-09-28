import React, { useEffect, useState, useRef } from "react";
import styles from "./CreateClass.module.css";
import { useDispatch } from "react-redux";
import { newClass, fetchClassesNames } from "../../../store/classes-slice";
import Form, {
  Title,
  Text,
  Dropdown,
  Checkbox,
  Schedule,
} from "../../form/Form";

function CreateClass(props) {
  const prerequisitesRef = useRef();
  const [classesList, setClassesList] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({
    class_name: "",
    teacher_name: "",
    class_description: "",
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
  const dispatch = useDispatch();

  function submitHandler(e) {
    e.preventDefault();
    const prerequisites = prerequisitesRef.current.state.value.map((item) => {
      const [class_id, prerequisite_class_name] = item.split(",");
      return { class_id, prerequisite_class_name };
    });
    const data = {
      class_name: form.class_name,
      teacher_name: form.teacher_name,
      class_description: form.class_description,
      class_prerequisites: prerequisites,
      schedule: form.schedule,
    };
    dispatch(newClass(data));
  }

  useEffect(() => {
    const getClassesNames = async () => {
      const response = await dispatch(fetchClassesNames());
      const result = response.map((item) => {
        return {
          key: item.class_name,
          text: item.class_name,
          value: item._id + "," + item.class_name,
        };
      });
      setClassesList(result);
      setIsLoading(false);
    };
    getClassesNames();
  }, []);

  function changeHandler(e) {
    setForm((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });
  }

  function scheduleChangeHandler(e) {
    setForm((state) => {
      return {
        ...state,
        schedule: { ...state.schedule, [e.target.name]: e.target.checked },
      };
    });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Form onSubmit={submitHandler} btnName="create">
        <Title>Create Class</Title>
        <Text onChange={changeHandler} name="class_name">
          Class Name
        </Text>
        <Text onChange={changeHandler} name="teacher_name">
          Teacher Name
        </Text>
        <Text onChange={changeHandler} name="class_description">
          Class Description
        </Text>
        <Dropdown ref={prerequisitesRef} options={classesList}>
          Prerequisites
        </Dropdown>
        <Schedule>
          <Checkbox onChange={scheduleChangeHandler} name="Monday">
            Mo
          </Checkbox>
          <Checkbox onChange={scheduleChangeHandler} name="Tuesday">
            Tu
          </Checkbox>
          <Checkbox onChange={scheduleChangeHandler} name="Wednesday">
            We
          </Checkbox>
          <Checkbox onChange={scheduleChangeHandler} name="Thursday">
            Th
          </Checkbox>
          <Checkbox onChange={scheduleChangeHandler} name="Friday">
            Fr
          </Checkbox>
          <Checkbox onChange={scheduleChangeHandler} name="Saturday">
            Sa
          </Checkbox>
          <Checkbox onChange={scheduleChangeHandler} name="Sunday">
            Su
          </Checkbox>
        </Schedule>
      </Form>
    </div>
  );
}

export default CreateClass;

import React, { useEffect, useState } from "react";
import { DynamicSingleDropdown, DynamicDropdown } from "../../form/Form";
import { BasicCard, View, Editable } from "../../form/Profile";
import { useDispatch } from "react-redux";
import {
  fetchClassesNames,
  fetchSubjects,
  updateClass,
} from "../../../store/classes-slice";

function SearchResult(props) {
  const { searchResult } = props;
  const dispatch = useDispatch();
  const [prerequisiteOptions, setPrerequisiteOptions] = useState([]);
  const [studentOptions, setStudentOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [viewEditSwitch, setViewEditSwitch] = useState(true);
  const [edit, setEdit] = useState(resetEdit());

  function toggleHandler() {
    setViewEditSwitch((state) => {
      return !state;
    });
    setEdit(resetEdit());
  }

  function resetEdit() {
    const class_prerequisites = props?.searchResult?.class_prerequisites?.map(
      (item) => {
        return item.class_id;
      }
    );

    const student_list = props?.searchResult?.student_list?.map((item) => {
      return item.student_id;
    });

    const result = {
      ...props.searchResult,
      class_prerequisites: class_prerequisites,
      student_list: student_list,
    };

    return result;
  }

  useEffect(() => {
    async function fetchClasses() {
      const response = await dispatch(fetchClassesNames());
      const result = response?.map((item) => {
        return {
          key: item._id,
          value: item._id,
          text: item.class_name,
        };
      });
      setOptions(result);
    }
    fetchClasses();

    async function fetchAllSubjects() {
      const responseSubjects = await dispatch(fetchSubjects());
      const resultSubjects = responseSubjects?.map((item) => {
        return {
          key: item.name,
          value: item.name,
          text: item.name,
        };
      });
      setSubjectOptions(resultSubjects);
    }
    fetchAllSubjects();
    const prerequisites = searchResult?.class_prerequisites?.map((item) => {
      return item.prerequisite_class_name;
    });
    setPrerequisiteOptions(prerequisites);

    const student_list = searchResult?.student_list?.map((item) => {
      return {
        key: item.student_id,
        value: item.student_id,
        text: item.student_name,
      };
    });
    setStudentOptions(student_list);
    setEdit(resetEdit());
  }, [searchResult]);

  const view_list = [
    { label: "ID", name: "_id" },
    { label: "Password", name: "password" },
  ];
  const editable_list = [
    { label: "Class Description", name: "class_description", type: "text" },
    { label: "Teacher Name", name: "teacher_name", type: "text" },
  ];

  function prerequisiteChangeHandler(e, { value }) {
    setEdit((state) => {
      return { ...state, class_prerequisites: value };
    });
  }

  function subjectChangeHandler(e, { value }) {
    setEdit((state) => {
      return { ...state, subject: value };
    });
  }

  function editHandler(e) {
    return setEdit({ ...edit, [e.target.name]: e.target.value });
  }

  async function saveHandler(e) {
    e.preventDefault();
    const response = await dispatch(updateClass(edit));
    // console.log(response);
    toggleHandler();
    props.setSearchResult(response);
  }

  return (
    <BasicCard
      onSave={saveHandler}
      onClick={toggleHandler}
      viewEditSwitch={viewEditSwitch}
    >
      {view_list.map((item, index) => {
        return (
          <View key={index} label={item.label}>
            {searchResult[item.name]}
          </View>
        );
      })}

      {editable_list.map((item, index) => {
        return (
          <Editable
            key={index}
            viewEditSwitch={viewEditSwitch}
            label={item.label}
            name={item.name}
            type={item.type}
            edit={edit}
            onChange={editHandler}
          />
        );
      })}

      {!viewEditSwitch && (
        <DynamicDropdown
          options={options}
          value={edit.class_prerequisites}
          onChange={prerequisiteChangeHandler}
        >
          Prerequisites
        </DynamicDropdown>
      )}

      {viewEditSwitch && (
        <View label={"Prerequisites"}>
          {prerequisiteOptions.map((item, index) => {
            return <React.Fragment key={index}>{item}, </React.Fragment>;
          })}
          {prerequisiteOptions.length === 0 && <>None</>}
        </View>
      )}

      {!viewEditSwitch && (
        <DynamicSingleDropdown
          options={subjectOptions}
          value={edit.subject}
          onChange={subjectChangeHandler}
        >
          Subject
        </DynamicSingleDropdown>
      )}
      {viewEditSwitch && <View label={"Subject"}>{edit.subject}</View>}
    </BasicCard>
  );
}

export default SearchResult;

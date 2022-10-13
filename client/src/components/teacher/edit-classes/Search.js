import React, { useEffect, useState } from "react";
import Form, { SingleDropdown } from "../../form/Form";
import { useDispatch } from "react-redux";
import {
  fetchClassesNames,
  fetchClassById,
} from "../../../store/classes-slice";

function Search(props) {
  const dispatch = useDispatch();
  const [classNames, setClassNames] = useState([]);
  const [classChoice, setClassChoice] = useState("");

  useEffect(() => {
    async function getClassesNames() {
      const response = await dispatch(fetchClassesNames());
      const result = response.map((item) => {
        return {
          key: item._id,
          text: item.class_name,
          value: item._id,
        };
      });
      setClassNames(result);
    }
    getClassesNames();
  }, []);

  // TODO: upon submission request data to the server and add data to the searchResults component
  async function submitHandler(e) {
    e.preventDefault();
    const response = await dispatch(fetchClassById({ id: classChoice }));
    props.setSearchResult(response);
  }

  function changeHandler(e, { value }) {
    setClassChoice(value);
  }

  return (
    <div>
      <Form onSubmit={submitHandler} btnName={"Search"}>
        <SingleDropdown options={classNames} onChange={changeHandler}>
          Class Name
        </SingleDropdown>
      </Form>
    </div>
  );
}

export default Search;

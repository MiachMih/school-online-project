import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSubjects } from "../../../store/classes-slice";
import Form, { SingleDropdown } from "../../form/Form";

function Search() {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await dispatch(fetchSubjects());
      const result = response.map((item) => {
        return { key: item.name, value: item.name, text: item.name };
      });
      setOptions(result);
    }

    fetchData();
  }, []);

  function submitHandler(e) {
    e.preventDefault();
    const newRoute = "/student/add-classes/" + subject;
    return navigate(newRoute, { replace: true });
  }

  function clickHandler(e) {
    setSubject(e.target.textContent);
  }

  return (
    <Form btnName="Search" onSubmit={submitHandler}>
      <SingleDropdown options={options} onChange={clickHandler}>
        Search by Subject
      </SingleDropdown>
    </Form>
  );
}

export default Search;

import React, { useRef, useState } from "react";
import Form, { Input, File } from "../../form/Form";
import { useDispatch } from "react-redux";
import { addAnnouncement } from "../../../store/announcement-slice";

function Announcement() {
  const [img, setImg] = useState("");
  const dispatch = useDispatch();
  const headRef = useRef();
  const msgRef = useRef();

  async function submitHandler(e) {
    e.preventDefault();
    const data = {
      header: headRef.current.value,
      message: msgRef.current.value,
      img,
    };
    try {
      await dispatch(addAnnouncement(data));
    } catch (err) {
      return;
    }
    e.target.reset();
  }

  return (
    <Form btnName="Submit" onSubmit={submitHandler}>
      <Input ref={headRef} type="text">
        Header
      </Input>
      <Input ref={msgRef} type="textarea">
        Message
      </Input>
      <File setImg={setImg}>Picture</File>
    </Form>
  );
}

export default Announcement;

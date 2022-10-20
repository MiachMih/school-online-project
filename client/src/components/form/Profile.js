import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./Profile.module.css";
import { Container } from "./Form";

export function View(props) {
  const { label } = props;
  return (
    <div className={styles["info-field"]}>
      <div className={styles.label}>
        <span>{label}</span>
      </div>
      <div className={styles.info}>
        <span>{props.children}</span>
      </div>
    </div>
  );
}

export function Edit(props) {
  const { label, value, name, type } = props;
  return (
    <div className={styles["info-field"]}>
      <div className={styles.label}>
        <span>{label}</span>
      </div>
      <div className={styles.edit}>
        <input
          type={type}
          name={name}
          onChange={props.onChange}
          value={value}
        />
      </div>
    </div>
  );
}

export function Editable(props) {
  const { viewEditSwitch, label, name, type, edit } = props;
  return (
    <>
      {viewEditSwitch ? (
        <View label={label}>{edit[name]}</View>
      ) : (
        <Edit
          label={label}
          name={name}
          type={type}
          value={edit[name]}
          onChange={props.onChange}
        />
      )}
    </>
  );
}

export function BasicCard(props) {
  const { viewEditSwitch } = props;
  return (
    <div className={`${styles.card} ${styles["card-body"]}`}>
      {props.children}
      <div className={styles["info-field"]}>
        <button className={styles.btn} onClick={props.onClick}>
          Edit
        </button>
        {!viewEditSwitch && (
          <button className={styles.btn} onClick={props.onSave}>
            Save
          </button>
        )}
      </div>
    </div>
  );
}

function Card(props) {
  const { profile_data, editable_list = [], view_list = [] } = props;
  const [viewEditSwitch, setViewEditSwitch] = useState(true);
  const [edit, setEdit] = useState({ ...profile_data });
  const dispatch = useDispatch();
  function editHandler(e) {
    return setEdit({ ...edit, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    setEdit({ ...profile_data });
  }, [profile_data]);

  function toggleHandler() {
    setViewEditSwitch((state) => {
      return !state;
    });
    setEdit({ ...profile_data });
  }

  function saveHandler() {
    dispatch(props.saveHandler(edit));
  }

  return (
    <Container>
      <BasicCard
        onClick={toggleHandler}
        onSave={saveHandler}
        viewEditSwitch={viewEditSwitch}
      >
        {profile_data &&
          view_list.map((item, index) => {
            return (
              <View key={index} label={item.label}>
                {profile_data[item.name]}
              </View>
            );
          })}
        {profile_data &&
          editable_list.map((item, index) => {
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
      </BasicCard>
    </Container>
  );
}

export default Card;

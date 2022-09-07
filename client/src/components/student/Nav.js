import React from "react";
import { CgProfile } from "react-icons/cg";
import styles from "./Nav.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { studentActions } from "../../store/student-slice";

function Nav(props) {
  const dispatch = useDispatch();

  function logoutHandler() {
    dispatch(studentActions.logout());
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <header>Menu</header>

          <ul className={styles.navigation}>
            <li>
              <Link to="/student/profile" className={styles.btn}>
                <CgProfile className={`${styles.icon} ${styles.nested}`} />
                <span>Profile</span>
              </Link>
            </li>

            <li>
              <button className={`${styles.btn} ${styles.nested}`}>
                <CgProfile className={`${styles.icon} ${styles.nested}`} />
                <span>Manage Classes</span>
              </button>
              <ul className={styles.flyout}>
                <li>
                  <Link to="/student/schedule" className={styles.btn}>
                    Schedule
                  </Link>
                </li>
                <li>
                  <Link to="/student/edit-classes" className={styles.btn}>
                    Add/Drop Classes
                  </Link>
                </li>
                <li>
                  <Link to="/student/history" className={styles.btn}>
                    My History
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="billing" className={styles.btn}>
                <CgProfile className={`${styles.icon} ${styles.nested}`} />
                <span>Billing</span>
              </Link>
            </li>

            <li>
              <Link to="announcement" className={styles.btn}>
                <CgProfile className={`${styles.icon} ${styles.nested}`} />
                <span>Announcement</span>
              </Link>
            </li>

            <li>
              <Link onClick={logoutHandler} to="/login" className={styles.btn}>
                <CgProfile className={`${styles.icon} ${styles.nested}`} />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.content}>{props.children}</div>
      </div>
    </>
  );
}

export default Nav;

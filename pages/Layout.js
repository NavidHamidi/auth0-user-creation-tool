import React from "react";
import styles from "../styles/Form.module.css";

const Layout = ({children}) => {
  return (
    <div className={styles.App}>
      <div className={styles.AppHeader}>
        <h1>Auth0 user creation tool</h1>
        {children}
      </div>
    </div>
  );
};

export default Layout;

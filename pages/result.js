import React from "react";
import { useRouter } from "next/router";
import Layout from "./Layout";
import styles from "../styles/Result.module.css";

const Result = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  };

  const title =
    router.query.data === "201" ? (
      <h2>User has been created</h2>
    ) : (
      <h2>User has not been created : error {router.query.data}</h2>
    );

  return (
    <Layout>
      <div className={styles.resultContainer}>
        {title}
        <button className={styles.backButton} onClick={handleBack}>
          Back to home page
        </button>
      </div>
    </Layout>
  );
};

export default Result;

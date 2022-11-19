import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Form.module.css";
import Layout from "./Layout";

function Form() {
  const router = useRouter();
  // Customize your company domain
  const domain = "@gmail.com"
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [job, setJob] = useState("consultant");

  const handleFirstName = (event) => {
    setFirstname(event.target.value);
  };

  const handleLastName = (event) => {
    setLastname(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const form = {
        firstname: firstname,
        lastname: lastname,
        email: firstname + "." + lastname + domain,
        job: job,
      };

      fetch("/api/createuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      .then(res => {
        router.push({
            pathname: '/result',
            query: {'data': res.status}
          }, res.status === 201 ? '/success' : '/error');
        })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className={styles.FormContainer}>
        <form onSubmit={handleSubmit} id="userCreationForm">
          <div className={styles.labelContainer}>
            <label className={styles.label}>First Name</label>
            <input
              type="text"
              value={firstname}
              onChange={(event) => handleFirstName(event)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.labelContainer}>
            <label className={styles.label}>Last Name</label>
            <input
              type="text"
              value={lastname}
              onChange={(event) => handleLastName(event)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.labelContainer}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              value={firstname + "." + lastname + domain}
              className={styles.input}
              disabled
            />
          </div>
          <div className={styles.labelContainer}>
            <label className={styles.label}>Job</label>
            <select
              name="job"
              form="userCreationForm"
              value={job}
              onChange={(event) => setJob(event.target.value)}
              className={styles.input}
              required
            >
              <option value="consultant">Consultant</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          <div className={styles.SubmitContainer}>
            <input type="submit" value="Submit" className={styles.FormSubmit} />
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default Form;

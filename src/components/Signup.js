import { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

function Signup({ handleLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Trying to establish history based on different blog. set equal to imported useHistory
  let history = useHistory();
  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      username: username,
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
    };
    // with credentials was removed
    let headers = {
      Authorization: "*",
    };
    axios
      .post(
        "http://localhost:3001/users",
        { user },
        { withCrednetials: true },
        { headers: headers }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "created") {
          handleLogin(res.data);
          redirect();
        } else {
          setErrorMsg(res.data.errors);
          alert(errorMsg);
        }
      })
      .catch((error) => console.log("api errors:", error));
  }
  function redirect() {
    history.push("/");
  }
  // error handling function
  // handleErrors = () => {
  //     return (
  //       <div>
  //         <ul>
  //         {this.state.errors.map(error => {
  //         return <li key={error}>{error}</li>
  //           })}
  //         </ul>
  //       </div>
  //     )
  //   };

  return (
    <div className="Signup">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="FirstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="LastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button placeholder="submit" type="submit">
          Sign Up
        </button>
        <div>
          or <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
export default Signup;

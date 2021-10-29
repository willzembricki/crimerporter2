import { Link } from "react-router-dom";

function Home({ handleLogout, user, isLoggedIn }) {
  console.log(isLoggedIn);

  if (!isLoggedIn) {
    return (
      <div className="homepage">
        <Link to="/login">Log In</Link>
        <br></br>
        <Link to="/signup">Sign Up</Link>
      </div>
    );
  } else {
    return (
      <div>
        <br></br>
        <button onClick={() => handleLogout()}>Log Out</button>
      </div>
    );
  }
}

export default Home;

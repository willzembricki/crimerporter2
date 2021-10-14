import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="homepage">
      <Link to="/login">Log In</Link>
      <br></br>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}

export default Home;

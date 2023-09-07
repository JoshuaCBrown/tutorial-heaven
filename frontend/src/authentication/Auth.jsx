import { Link, Outlet } from "react-router-dom";


export default function Auth() {
  return (
    <div className="add-resource-countainer">
      <div className="add-nav">
        <ul>
          <li>
            <Link to="/auth/login">Login</Link>
          </li>
          <li>
            <Link to="/auth/register">Register</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}
import { Link, Outlet } from "react-router-dom";
import AddVideo from "./AddVideo";
import AddArticle from "./AddArticle";
import AddText from "./AddText";

export default function AddResource() {
  return (
    <div className="add-resource-countainer">
      <div className="add-nav">
        <ul>
          <li>
            <Link to="/addresource/addvideo">Video</Link>
          </li>
          <li>
            <Link to="/addresource/addarticle">Article</Link>
          </li>
          <li>
            <Link to="/addresource/addtext">Text/Self Post</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}

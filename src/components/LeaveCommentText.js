import { useContext} from "react";
import MainContext from "../MainContext";

function LeaveCommentText() {
  const { position } = useContext(MainContext);
  return (
    <div
      className="leave-comment-text"
      style={{
        position: "fixed",
        top: position.y[1],
        left: position.x[1] + 20,
      }}
    >
      Click to write a comments
    </div>
  );
}

export default LeaveCommentText;

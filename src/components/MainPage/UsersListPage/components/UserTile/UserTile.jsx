import { useNavigate } from "react-router-dom";
import "./UserTile.scss";
import falseLike from "../../../../../svg/falseLike.svg";
import trueLike from "../../../../../svg/trueLike.svg";
import { useDispatch } from "react-redux";
import { addInLikesListAction } from "../../../../../redux/actionCreators/addInLikesListAction";
import { removeFromLikesListAction } from "../../../../../redux/actionCreators/removeFromLikesListAction";
import axios from "axios";
import store from "../../../../../redux/store";

const UserTile = ({ user, like }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate(`./user-profile/${user.id}`);
  };

  const handleLike = async (ev) => {
    ev.stopPropagation();

    const likesJson = {
      token: localStorage.getItem("token"),
    };

    if (like) dispatch(removeFromLikesListAction(user.id));
    else dispatch(addInLikesListAction(user.id));

    likesJson.likes = store.getState().likesList;

    await axios.patch(
      `https://e855c61df68ddceb.mokky.dev/likes/${localStorage.getItem(
        "userId"
      )}`,
      likesJson
    );
  };

  return (
    <div id="userTile" onClick={handleClick}>
      <img src={user.avatar} id="avatar" />
      <h2>{`${user.first_name} ${user.last_name}`}</h2>
      <button id="likeButton" onClick={handleLike}>
        <img src={like ? trueLike : falseLike} alt="" />
      </button>
    </div>
  );
};

export default UserTile;

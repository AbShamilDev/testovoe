import { useNavigate } from "react-router-dom";
import "./UserTile.scss";

const UserTile = ({ user }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`./user-profile/${user.id}`);
  };

  return (
    <div id="userTile" onClick={handleClick}>
      <img src={user.avatar} />
      <h2>{`${user.first_name} ${user.last_name}`}</h2>
    </div>
  );
};

export default UserTile;

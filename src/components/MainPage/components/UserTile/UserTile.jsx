import "./UserTile.scss";

const UserTile = ({ user }) => {
  console.log(user);
  return (
    <div id="userTile">
      <img src={user.avatar} />
      <h2>{`${user.first_name} ${user.last_name}`}</h2>
    </div>
  );
};

export default UserTile;

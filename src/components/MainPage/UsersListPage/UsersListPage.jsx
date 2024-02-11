import "./UsersListPage.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUsersListAction } from "../../../redux/actionCreators/setUsersListAction";
import axios from "axios";
import UserTile from "./components/UserTile/UserTile";
import UsersPaginator from "./components/UsersPaginator/UsersPaginator";
import { enablePaginateAction } from "../../../redux/actionCreators/enablePaginateAction";
import { setLikesListAction } from "../../../redux/actionCreators/setLikesListAction";

const UsersListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.usersList);
  const likesList = useSelector((state) => state.likesList);

  const fetchLikesList = async () => {
    await axios
      .get(
        `https://e855c61df68ddceb.mokky.dev/likes?token=${localStorage.getItem(
          "token"
        )}`
      )
      .then((res) => {
        localStorage.setItem("userId", res.data[0].id);
        dispatch(setLikesListAction(res.data[0].likes));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchUsersList = async () => {
    await axios
      .get("https://reqres.in/api/users?page=1")
      .then((res) => {
        dispatch(setUsersListAction(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    !localStorage.getItem("token") && navigate("/");
    fetchLikesList();
    !usersList.length && fetchUsersList();
  }, []);

  console.log(likesList.includes(1));

  return (
    <div>
      <header id="listHeader">
        <h1>Наша команда</h1>
        <h2>
          {`Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций.`}
        </h2>
      </header>
      <section>
        <div id="UserTilesList">
          {usersList.map((user) => (
            <UserTile
              key={user.name}
              like={likesList.includes(+user.id)}
              user={user}
            />
          ))}
        </div>
      </section>
      <UsersPaginator />
    </div>
  );
};

export default UsersListPage;

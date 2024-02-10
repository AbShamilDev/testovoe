import "./UsersListPage.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUsersListAction } from "../../../redux/actionCreators/setUsersListAction";
import axios from "axios";
import UserTile from "./components/UserTile/UserTile";
import UsersPaginator from "./components/UsersPaginator/UsersPaginator";
import { enablePaginateAction } from "../../../redux/actionCreators/enablePaginateAction";

const UsersListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.usersList);

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
    if (!localStorage.getItem("token")) navigate("/");
    !usersList.length && fetchUsersList();
  }, []);
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
            <UserTile key={user.name} user={user} />
          ))}
        </div>
      </section>
      <UsersPaginator />
    </div>
  );
};

export default UsersListPage;

import { useEffect, useState } from "react";
import "./MainPage.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUsersListAction } from "../../redux/actions/setUsersListAction";
import axios from "axios";
import UserTile from "./components/UserTile/UserTile";

const MainPage = () => {
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

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
    fetchUsersList();
  }, []);

  return (
    <div id="mainPage">
      <header>
        <h1>Наша команда</h1>
        <h2>
          {`Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций.`}
        </h2>
      </header>
      <section>
        <div id="UserTilesList">
          {usersList.map((user) => (user = <UserTile user={user} />))}
        </div>
      </section>
      <button onClick={logout}>Выход</button>
    </div>
  );
};

export default MainPage;

import { Route, Routes, useNavigate } from "react-router-dom";
import "./MainPage.scss";
import UsersListPage from "./UsersListPage/UsersListPage";
import UserInfoPage from "./UserInfoPage/UserInfoPage";
import logoutSvg from "../../svg/logout.svg";
const MainPage = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div id="mainPage">
      <Routes>
        <Route path="/" element={<UsersListPage />} />
        <Route path="/user-profile/:id" element={<UserInfoPage />} />
      </Routes>
      <button id="logoutButton" onClick={logout}>
        <p>Выход</p>
        <img src={logoutSvg} alt="" />
      </button>
    </div>
  );
};

export default MainPage;

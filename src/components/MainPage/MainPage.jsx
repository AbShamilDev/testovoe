import { useEffect } from "react";
import "./MainPage.scss";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
  });
  return (
    <div id="mainPage">
      <header>
        <h1>Наша команда</h1>
        <h2>
          {`Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций.`}
        </h2>
      </header>
      <button>Выход</button>
    </div>
  );
};

export default MainPage;

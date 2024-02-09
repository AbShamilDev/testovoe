import { useEffect, useState } from "react";
import "./StartPage.scss";
import UniversalForm from "./UniversalForm/UniversalForm";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const [action, setAction] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) navigate("./main");
  }, []);

  return (
    <div id="startPage">
      {!action ? (
        <div id="startButtons">
          <button
            onClick={() => {
              setAction("registration");
            }}
          >
            Зарегистрироваться
          </button>
          <button
            onClick={() => {
              setAction("login");
            }}
          >
            Войти
          </button>
        </div>
      ) : (
        <UniversalForm login={action === "login"} />
      )}
    </div>
  );
};

export default StartPage;

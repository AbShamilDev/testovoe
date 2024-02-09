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
            id="regButton"
            onClick={() => {
              document.getElementById("logButton").classList.add("hide");

              setTimeout(() => {
                setAction("registration");
              }, 200);
            }}
          >
            Зарегистрироваться
          </button>
          <button
            id="logButton"
            onClick={() => {
              document.getElementById("regButton").classList.add("hide");
              setTimeout(() => {
                setAction("login");
              }, 200);
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

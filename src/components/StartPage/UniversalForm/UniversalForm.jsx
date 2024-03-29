import { useState } from "react";
import "./UniversalForm.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import showPassSvg from "../../../svg/eyeOpen.svg";
import hidePassSvg from "../../../svg/eyeClose.svg";

const UniversalForm = (props) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    passwordRep: "",
  });
  const [logFailed, setLogFailed] = useState(false);
  const [showPass, setShowPass] = useState({ 1: false, 2: false });
  const navigate = useNavigate();

  const isValid = (inputs) => {
    const emailRegExp =
      /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1}))@([-0-9A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u;
    let valid = true;

    if (!inputs.name && !props.login) {
      valid = false;
      document.getElementById("nameInput").classList.add("invalid");
    }

    if (!inputs.email || !emailRegExp.test(inputs.email)) {
      valid = false;
      document.getElementById("emailInput").classList.add("invalid");
    }

    if (!inputs.password) {
      valid = false;
      document.getElementById("passwordInput").classList.add("invalid");
    }

    if (inputs.password !== inputs.passwordRep && !props.login) {
      valid = false;
      document.getElementById("passwordRepeatInput").classList.add("invalid");
    }

    return valid;
  };
  const removeInvalid = (event) => {
    if (event.target.classList.length !== 0)
      event.target.classList.remove("invalid");
    logFailed && setLogFailed(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValid(inputs)) return;

    const json = {
      email: inputs.email,
      password: inputs.password,
    };
    await axios
      .post("https://reqres.in/api/register", json)
      .then((res) => {
        window?.localStorage?.setItem("token", res.data.token);
        window?.localStorage?.setItem("email", inputs.email);
        navigate("/main");
      })
      .catch((err) => {
        console.log(err);
        setLogFailed(true);
      });
  };

  const handleInput = (event) => {
    switch (event.target.name) {
      case "name":
        removeInvalid(event);
        setInputs({ ...inputs, name: event.target.value });
        break;
      case "email":
        removeInvalid(event);
        setInputs({ ...inputs, email: event.target.value });
        break;
      case "password":
        removeInvalid(event);
        setInputs({ ...inputs, password: event.target.value });
        break;
      case "passwordRepeat":
        removeInvalid(event);
        setInputs({ ...inputs, passwordRep: event.target.value });
        break;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      id="universalForm"
      className={`${props.login ? "loginShowAnim" : "registShowAnim"} ${
        logFailed ? "failed" : null
      }`}
    >
      <span id="title">{props.login ? "Вход" : "Регистрация"}</span>
      {props.login ? null : (
        <div>
          <label htmlFor="name">Имя</label>
          <input
            type="text"
            name="name"
            placeholder="Артур"
            value={inputs.name}
            id="nameInput"
            onChange={handleInput}
          />
          <span>Данные некорректны</span>
        </div>
      )}
      <div>
        <label htmlFor="email">Электронная почта</label>
        <input
          type="text"
          name="email"
          placeholder="example@mail.ru"
          id="emailInput"
          onChange={handleInput}
        />
        <span>Данные некорректны</span>
      </div>
      <div>
        <label htmlFor="password">Пароль</label>
        <input
          type={showPass[1] ? "text" : "password"}
          name="password"
          placeholder="******"
          id="passwordInput"
          onChange={handleInput}
        />
        <span>Данные некорректны</span>
        <button
          type="button"
          className="showPass"
          onClick={() => {
            setShowPass({ ...showPass, 1: !showPass[1] });
          }}
        >
          <img src={showPass[1] ? showPassSvg : hidePassSvg} alt="" />
        </button>
      </div>
      {props.login ? null : (
        <div>
          <label htmlFor="passwordRepeat">Подтвердите</label>
          <input
            type={showPass[2] ? "text" : "password"}
            name="passwordRepeat"
            placeholder="******"
            id="passwordRepeatInput"
            onChange={handleInput}
          />
          <span>Пароли не совпадают</span>
          <button
            type="button"
            className="showPass"
            onClick={() => {
              setShowPass({ ...showPass, 2: !showPass[2] });
            }}
          >
            <img src={showPass[2] ? showPassSvg : hidePassSvg} alt="" />
          </button>
        </div>
      )}
      <button type="submit" id="loginButton">
        {props.login ? "Войти" : "Зарегистрироваться"}
      </button>
      <span id="loginErrorSpan" className={`${logFailed ? "failed" : null}`}>
        Данные некорректны, вход не произведен
      </span>
    </form>
  );
};

export default UniversalForm;

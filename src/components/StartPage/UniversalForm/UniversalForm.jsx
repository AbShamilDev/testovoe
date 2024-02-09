import { useState } from "react";
import "./UniversalForm.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UniversalForm = (props) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    passwordRep: "",
  });
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
        navigate("/main");
      })
      .catch((res) => {
        console.log(res.data);
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
      className={props.login ? "loginShowAnim" : "registShowAnim"}
    >
      <p id="title">{props.login ? "Вход" : "Регистрация"}</p>
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
          type="password"
          name="password"
          placeholder="******"
          id="passwordInput"
          onChange={handleInput}
        />
        <span>Данные некорректны</span>
      </div>
      {props.login ? null : (
        <div>
          <label htmlFor="passwordRepeat">Подтвердите</label>
          <input
            type="password"
            name="passwordRepeat"
            placeholder="******"
            id="passwordRepeatInput"
            onChange={handleInput}
          />
          <span>Пароли не совпадают</span>
        </div>
      )}
      <button type="submit">
        {props.login ? "Войти" : "Зарегистрироваться"}
      </button>
    </form>
  );
};

export default UniversalForm;

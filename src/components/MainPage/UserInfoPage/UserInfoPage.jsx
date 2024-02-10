import axios from "axios";
import "./UserInfoPage.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import phoneSvg from "../../../svg/phone.svg";
import emailSvg from "../../../svg/email.svg";
import backSvg from "../../../svg/backArrow.svg";
const UserInfoPage = () => {
  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();
  const params = useParams();

  const fetchData = async () => {
    let temp = {};
    await axios.get(`https://reqres.in/api/users/${params.id}`).then((res) => {
      temp = { ...res.data.data };
    });
    await axios
      .get(`https://e855c61df68ddceb.mokky.dev/users-info?id=${params.id}`)
      .then((res) => {
        console.log(res.data);
        setUserInfo({ ...temp, ...res.data[0] });
      });
  };

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/../");
    fetchData();
  }, []);

  return (
    <div id="userInfoPage">
      <header id="profileHeader">
        <img src={userInfo ? userInfo.avatar : ""} alt="" />
        <div id="headerInfo">
          <h1>
            {userInfo ? `${userInfo.first_name} ${userInfo.last_name}` : ""}
          </h1>
          <p>{userInfo ? `${userInfo.role}` : ""}</p>
        </div>
      </header>
      <section id="mainInfo">
        <div id="description">
          <p>{userInfo ? `${userInfo.description}` : ""}</p>
        </div>
        <div id="contacts">
          <div id="phoneDiv">
            <img src={phoneSvg} alt="" />
            <p>{userInfo ? `${userInfo.phone}` : ""}</p>
          </div>
          <div id="emailDiv">
            <img src={emailSvg} alt="" />
            <p>{userInfo ? `${userInfo.email}` : ""}</p>
          </div>
        </div>
      </section>
      <button id="backButton" onClick={goBack}>
        <p>Назад</p>
        <img src={backSvg} alt="" />
      </button>
    </div>
  );
};

export default UserInfoPage;

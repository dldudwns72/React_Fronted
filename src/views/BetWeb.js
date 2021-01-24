import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, Row, Col } from "antd";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import styled from "styled-components";

import "react-big-calendar/lib/css/react-big-calendar.css";

import Login from "./Login";

const localizer = momentLocalizer(moment);
const myEventsList = [];

// 사용시 style을 반영해줄 것들을 설정후 세미콜론으로 마무리
const CenterDiv = styled.div`
  border: solid 20px lightblue;
  padding: 5px 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 520px;
  height: 250px;
  margin-left: -220px;
  margin-top: -170px;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-itmes: center;
`;

const LeftLabel = styled.label`
  display: flex;
  text-align: left;
`;

const BetWeb = (props) => {
  // useState를 여러개 쓸 경우 Spread Syntax를 활용하여 나눈다
  const [userInput, setUserInput] = useState({
    userName: "",
    userPassword: "",
  });

  const [isUser, setIsUser] = useState(false);
  const [userInfomation, setUserInfomation] = useState([]);

  const { userName, userPassword } = userInput;

  function apiCallData() {
    axios("/getusers", {
      method: "GET",
    }).then((res) => {
      {
        setUserInfomation(res.data);
      }
    });
  }

  useEffect(() => {
    apiCallData();
  }, []);

  // target name을 받아와 변수 변경
  const onChange_UserValue = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  const createUser = () => {
    axios("/createuser", {
      method: "POST",
      data: {
        name: userName,
        phoneNumber: userPassword,
      },
    }).then((res) => {
      {
        console.log(res.data);
      }
    });
  };

  const LoginCheck = () => {
    userInfomation.map((user, Index) => {
        console.log("user:", user.name, user.phoneNumber);
        console.log("userName:", userName);
        console.log("userPassword:", userPassword);

        if (user.name === userName && user.phoneNumber === userPassword) {
          return <Login />;
        }
      }).filter((f) => f !== undefined);
  };

  return (
    <>
      <CenterDiv>
        <h2>
          <strong>Login</strong>
        </h2>
        <Row>
          <Col style={{ marginRight: "10px" }}>
            <LeftLabel>ID</LeftLabel>
            <input type='text' value={userName} name='userName' onChange={onChange_UserValue} />
          </Col>

          <Col style={{ marginRight: "10px" }}>
            <LeftLabel>PW</LeftLabel>
            <input type='password' value={userPassword} name='userPassword' onChange={onChange_UserValue} />
          </Col>

          {/* 위치 조정이 왜 안되누 */}
          <Col>
            <Button style={{position : "relative" , top:"20px"}} type='primary' size="middle" onClick={() => LoginCheck()}>
              로그인
            </Button>
          </Col>
        </Row>

        {/* <Calendar
             localizer={localizer}
             events={myEventsList}

             startAccessor="start"
             endAccessor="end"
             style={{ height: 500 }}
            /> */}
      </CenterDiv>
      {}
    </>
  );
};

export default BetWeb;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, Row, Col } from "antd";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import styled from "styled-components";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const myEventsList = [];

// 사용시 style을 반영해줄 것들을 설정후 세미콜론으로 마무리
const CenterDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  margin-top: -0.5em;
  margin-left: -50%;
  text-align: center;
`;

const BetWeb = (props) => {
  
  // useState를 여러개 쓸 경우 Spread Syntax를 활용하여 나눈다
  const [userInput, setUserInput] = useState({
      userName : '',
      userPassword: '',
  })

  const {userName,userPassword} = userInput;



  function apiCallData() {
    axios("/getusers", {
      method: "GET",
    }).then((res) => {
      {
        console.log(res.data);
      }
    });
  }

  useEffect(() => {
    apiCallData();
  }, []);

  // target name을 받아와 변수 변경gg
  const onChange_UserValue = (e) => {
    setUserInput({
        ...userInput,
        [e.target.name] : e.target.value
    })
  };

  const createUser = () => {
    axios("/createuser", {
      method: "POST",
      data: {
        name: userName,
        phoneNumber: "987654321",
      },
    }).then((res) => {
      {
        console.log(res.data);
      }
    });
  };

  const selectEvent = () => {
    console.log("Sdf");
  };

  return (
    <>
      <CenterDiv>
        <Row>
          <Col className='float-center'>
            <label>ID</label>
            <input type='text' value={userName} name = "userName" onChange={onChange_UserValue} />
          </Col>

          <Col>
            <label>PW</label>
            <input type='password' value={userPassword} name= "userPassword" onChange={onChange_UserValue} />
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
    </>
  );
};

export default BetWeb;

import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from "axios";

export default function SessionsPage() {


  
  const { idFilme } = useParams();
  const [sessions, setSessions] = useState([]);
  const [poster, setPoster] = useState('');
  const [titulo, setTitulo] = useState('');
  


  useEffect(()=>{

  const sessions = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`;

  const promise = axios.get(sessions);

  promise.then((response) => {
    console.log(response.data);
     setSessions(response.data.days)
     setPoster(response.data.posterURL);
     setTitulo(response.data.title)
  }); 
  // se der certo

  promise.catch((erro) => {
    console.log(erro.response.data);
  }); // se der errado

  },[]);

  return (
    <PageContainer data-test="movie-day" >
      Selecione o horário
      <div key="days">
        {sessions.map ((day) => (
          <SessionContainer data-test="showtime">
          {day.weekday} - {day.date}
          <ButtonsContainer>
          {day.showtimes.map(showtime => (
           <Link to={`/assentos/${showtime.id}`}> <button key={showtime.id}>{showtime.name}</button> </Link>
            ))}
          </ButtonsContainer>
        </SessionContainer>
        ))}
        

      </div>
      <FooterContainer>
        <div>
          {}
          <img data-test="footer"
            src={poster} alt="poster"/></div>
        <div>
          <p>{titulo}</p>
        </div>
      </FooterContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
  div {
    margin-top: 20px;
  }
`;
const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: "Roboto";
  font-size: 20px;
  color: #293845;
  padding: 0 20px;
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
  button {
    margin-right: 20px;

    background: #e8833a;
    border-radius: 3px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    align-items: center;
    text-align: center;
    letter-spacing: 0.02em;
    color: #ffffff;
    width: 82px;
    height: 43px;
    border: none;
  }
  a {
    text-decoration: none;
  }
`;
const FooterContainer = styled.div`
  width: 100%;
  height: 120px;
  background-color: #c3cfd9;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  position: fixed;
  bottom: 0;

  div:nth-child(1) {
    box-shadow: 0px 2px 4px 2px #0000001a;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin: 12px;
    img {
      width: 50px;
      height: 70px;
      padding: 8px;
    }
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    p {
      text-align: left;
      &:nth-child(2) {
        margin-top: 10px;
      }
    }
  }
`;

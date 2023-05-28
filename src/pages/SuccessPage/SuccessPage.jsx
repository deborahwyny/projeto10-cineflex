import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SuccessPage({ username, movie, date, cpf, movieTitle, ids, sessoa,days }) {
  const { idSessao } = useParams();
  console.log(username);
  console.log(ids)


  // const { state } = useLocation();
  // const { filmes, dadosReserva } = state;


  return (
    <PageContainer>
      <h1>
        Pedido feito <br /> com sucesso!
      </h1>

      <TextContainer data-test="movie-info">
        <strong>
          <p>Filme e sessão</p>
        </strong>
        <p>{movieTitle}</p>
        <p>{date}</p>
      </TextContainer>

      <TextContainer data-test="seats-info">
        <strong>
          <p>Ingressos</p>
        </strong>
        {ids.map((id) => (
  <p key={id}>{id}</p>
))}
        
      </TextContainer>

      <TextContainer data-test="go-home-btn">
        <strong>
          <p>Comprador</p>
        </strong>
        <p>{username}</p>
        <p>CPF: {cpf} </p>
      </TextContainer>

     <Link data-test="go-home-btn" to="/"> <button>Voltar para Home</button></Link>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  color: #293845;
  margin: 30px 20px;
  padding-bottom: 120px;
  padding-top: 70px;
  a {
    text-decoration: none;
  }
  button {
    margin-top: 50px;
    width: 225px;
    height: 42px;
    background: #e8833a;
    border-radius: 3px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    align-items: center;
    text-align: center;
    letter-spacing: 0.04em;
    color: #ffffff;
    border: none;
  }
  h1 {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #247a6b;
  }
`;
const TextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 30px;
  strong {
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

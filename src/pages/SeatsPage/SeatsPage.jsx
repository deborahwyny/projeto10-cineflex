import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";








export default function SeatsPage({ setUsername, setcpf, setDate, setMovieTitle, setIds, setSessao}) {
  const { idSessao } = useParams();
  const [assentos, setAssentos] = useState([]);
  const [selecionado, setSelecionado] = useState([]);
  const [infos, setInfos] = useState({});
  const [nome, setNome] = useState("");
	const [cpf, setCpf] = useState("");
  const navigate = useNavigate();


 


  useEffect (() =>{
  const assentos = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`;

  const promise = axios.get(assentos);

  promise.then((response) =>{
    console.log(JSON.stringify(response.data));
    setAssentos(response.data.seats);
    setInfos(response.data)

  });

  promise.catch((erro)=> {
    console.log(erro.response.data);

  });
},[]);

function clicou(lugar){

  if(lugar.isAvailable === false){
    alert('Esse assento não está disponível')
    return
  }

   if(selecionado.includes(lugar)) {
    const newArray = selecionado.filter(item => item !== lugar);
    setSelecionado(newArray)
   }else{
    
    setSelecionado([...selecionado, lugar])

   }

}
console.log(selecionado)
console.log(setSessao)

function envioDados(event){
  setUsername(nome)
    setcpf(cpf)
    setDate(infos.day.weekday)
    setMovieTitle(infos.movie.title)
    setIds(selecionado.map((lugar) => lugar.name));
    setSessao(infos.name);
    
  const dadosReserva = {
    ids: selecionado.map((lugar) => lugar.id),
    name: nome,
    cpf: cpf,
  };

  const filmes = {
    titulo: infos.movie.title,
    dia: infos.day.weekday,
    sessao: infos.name
    
  };
  

		event.preventDefault()
  const requisicao = axios.post('https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many',dadosReserva, filmes)
    navigate("/sucesso", { state: { filmes, dadosReserva } });

  

}


  return (
    <PageContainer>
      Selecione o(s) assento(s)
      <SeatsContainer>
        {assentos.map((lugar, index)=>
        <> 
        {
          selecionado.includes(lugar) ? 
          <SeatItemSelecionado onClick={() => clicou(lugar)}>{index + 1}</SeatItemSelecionado>
          : <SeatItem onClick={() => clicou(lugar)} isAvailable={lugar.isAvailable}>{index + 1}</SeatItem>
        }
        </>
        )}
        
      </SeatsContainer>
      <CaptionContainer>
        <CaptionItem>
          <CaptionCircle01 />
          Selecionado
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle02 />
          Disponível
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle03 />
          Indisponível
        </CaptionItem>
      </CaptionContainer>
      <FormContainer onSubmit={envioDados}>
        Nome do Comprador:
        <input data-test="client-name"  type="nome" required value={nome} placeholder="Digite seu nome..." onChange={e => setNome(e.target.value)} />
        CPF do Comprador:
        <input data-test="client-cpf" type="cpf" required value={cpf} placeholder="Digite seu CPF..." onChange={e => setCpf(e.target.value)}/>
        <button data-test="book-seat-btn" type="submit">Reservar Assento(s)</button>
      </FormContainer>
      <FooterContainer>
        <div>
        
            <img data-test="footer"
              src={infos.movie?.posterURL}
              alt="poster"
            />
        </div>
        <div>
          <p>{infos.movie?.title}</p>
          <p>{`${infos.day?.weekday} - ${infos.name}`}</p>
        </div>
      </FooterContainer>
    </PageContainer>
  );

      }
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
`;
const SeatsContainer = styled.div`
  width: 330px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
const FormContainer = styled.form`
  width: calc(100vw - 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  font-size: 18px;
  button {
    align-self: center;
    background: #e8833a;
    border-radius: 3px;
    width: 225px;
    height: 42px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    align-items: center;
    text-align: center;
    letter-spacing: 0.04em;

    color: #ffffff;
  }
  input {
    width: calc(100vw - 60px);
  }
`;
const CaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-between;
  margin: 20px;
`;
const CaptionCircle01 = styled.div`
  background: #1aae9e;
  border: 1px solid #0e7d71;
  border-radius: 17px;
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;
const CaptionCircle02 = styled.div`
  background: #c3cfd9;
  border: 1px solid #7b8b99;
  border-radius: 17px;
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;
const CaptionCircle03 = styled.div`
  background: #fbe192;
  border: 1px solid #f7c52b;
  border-radius: 17px;
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;
const CaptionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`;
const SeatItem = styled.div`
  border: 1px solid blue; 
  background-color: ${({ isAvailable }) => isAvailable ? "#C3CFD9" : "#FBE192"};
  height: 25px;
  width: 25px;
  border-radius: 25px;
  font-family: "Roboto";
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;

const SeatItemSelecionado =styled.div`
border: 1px solid blue; 
background-color: #1AAE9E;
height: 25px;
width: 25px;
border-radius: 25px;
font-family: "Roboto";
font-size: 11px;
display: flex;
align-items: center;
justify-content: center;
margin: 5px 3px;
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

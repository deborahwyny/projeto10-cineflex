import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { useState } from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios"




export default function App() {

    const [username, setUsername] = useState("")
    const [cpf, setcpf] = useState("")
    const [movieTitle, setMovieTitle] = useState("")
    const [date, setDate] = useState("")
    const [sessoa, setSessao] = useState ("")
    const [ids, setIds] = useState("")
    const [days, setDays] = useState("")

    axios.defaults.headers.common['Authorization'] = 'ufs6rqUwCkDYvURpjxAObPdf';
    
    return (
        <BrowserRouter>
           <Link to="/"><NavContainer>CINEFLEX</NavContainer></Link>

           <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/assentos/:idSessao" element={<SeatsPage   setUsername={setUsername}
                    setcpf={setcpf}
                    movieTitle={movieTitle}
                    setDate={setDate}
                    setMovieTitle={setMovieTitle}
                    setIds={setIds}
                    setSessao={setSessao}
                />}/>
            <Route path="/sessoes/:idFilme" element={<SessionsPage setDays={setDays}/> }/>
            <Route path="/sucesso" element={<SuccessPage username={username} cpf={cpf} movieTitle={movieTitle} date={date} ids={ids} sessoa={sessoa} days={days}/>  }/>
            </Routes>
            
        </BrowserRouter>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`

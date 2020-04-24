import React, { useState, useEffect } from "react";
import "./styles.css";
import api from "../../../services/api";
import ehAutenticado from "../../../services/auth";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

function Login() {
    const [email, setEmail] = useState([]);
    const [senha, setSenha] = useState([]);

    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        const response = api.post("/usuario//authenticate", {
            email: email,
            senha: senha,
        }).then(response =>{
            sessionStorage.setItem("nome", response.data.usuario.nome);
            sessionStorage.setItem("sessionid", response.data.usuario._id);
            sessionStorage.setItem("Token", response.data.token);

            // history.push('/home')
            window.location.href = "/home";
        }).catch(error => {
            alert("Usuário ou senha Inválidos");
        })
    }

    function handleCadastro(e) {
        history.push("/cadastro-usuario");
    }

    useEffect(() => {
        function autenticado() {
            if (ehAutenticado()) {
                window.location.href = "/home";
            }
        }
        autenticado();
    }, []);
    return (
        <div className="logon-container">
            <section className="form">
                <form onSubmit={handleSubmit}>
                    <h1>Faça seu login</h1>
                    <input
                        placeholder="Email"
                        type="email"
                        value={email}
                        placeholder="Digite seu Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        value={senha}
                        placeholder="Digite sua Senha"
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <button className="button">Entrar</button>
                    <Link className="back-link" to="/cadastro-usuario">
                        <FiLogIn
                            className="FiLogin"
                            size={16}
                            color="#4983ee"
                        />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
        </div>
    );
}

export default Login;

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, option, Button, Col } from "react-bootstrap";

import api from "../../../services/api";
import "./styles.css";

function CadastroUsuario() {
    const history = useHistory();

    const [nome, setNome] = useState("");
    const [funcao, setFuncao] = useState("Desenvolvedor");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [senha2, setSenha2] = useState("");

    const [validated, setValidated] = useState(false);


    function validador(){
        if(email.indexOf('@globalhitss.com.br') > 0 || email.indexOf('@primesys.com.br') > 0 ||
                 email.indexOf('@embratel.com.br') > 0 ||  
                        email.indexOf('@claro.com.br') > 0 ){
            if(nome.length > 0){
                if(senha.length >= 6 & senha === senha2){
                    setValidated(true);
                }else {
                    alert("Confirme corretamente sua senha de 6 caracteres.")
                }
            }else {
                    alert("Favor escrever seu nome.")
                }
        }else {
                    alert("Digite o email correto. \nEmail necessita ser da GlobalHitss, Primesys, Embratel ou Claro.")
                }
    }



    async function handleSubmit(event) {
        validador();
        console.log(validated)
        if (validated === false) {
            event.preventDefault();
            
        }else{
        
        event.preventDefault();
        //event.preventDefault();
            const data = {
                nome,
                funcao,
                email,
                senha,
            };

            const response = await api.post("/usuario/cadastro", data);
            console.log(response.data);
            history.push("/home");
        }
    }

    return (
        <>
            <h1>Cadastro de usuário</h1>
            <div className="cadastro-container">               
                
                <form onSubmit={handleSubmit}>
                    
                    <section>
                    <input placeholder="Digite seu nome" onChange={(e) => setNome(e.target.value)} value={nome}/>
                    <select onChange={(e) => setFuncao(e.target.value)} value={funcao}>
                         <option>Desenvolvedor</option>
                         <option>PM</option>
                         <option>Funcional</option>
                       </select>
                       </section>
                     <input placeholder="Digite seu email"  onChange={(e) => setEmail(e.target.value)} value={email}/>
                       

                       <input placeholder="Digite sua senha" type="password"  onChange={(e) => setSenha(e.target.value)} value={senha}/>
                       <input placeholder="Confirme sua senha sua senha" type="password"  onChange={(e) => setSenha2(e.target.value)} value={senha2}/>
                       <button className="button" type="submit">Cadastrar</button>

                </form>

{/* 



                    <Form.Row>
                        <Form.Group as={Col} md="6" controlId="nome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Nome"
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="6" controlId="funcao">
                            <Form.Label>Função</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={(e) => setFuncao(e.target.value)}
                                value={funcao}
                                required
                            >
                                <option>Desenvolvedor</option>
                                <option>PM</option>
                                <option>Funcional</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Escolha a Função
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="6" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Escreva o Email
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="6" controlId="senha">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Senha"
                                required
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Digite a senha
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row> */}

            </div>
        </>
    );
}

export default CadastroUsuario;

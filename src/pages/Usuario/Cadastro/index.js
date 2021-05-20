import React, { useState } from "react";
import { useHistory ,Link} from "react-router-dom";
import api from "../../../services/api";
import "./styles.css";
import {MdKeyboardBackspace} from 'react-icons/md';

function CadastroUsuario() {
    const history = useHistory();

    const [nome, setNome] = useState("");
    const [funcao, setFuncao] = useState("Desenvolvedor");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [senha2, setSenha2] = useState("");

    const [validated, setValidated] = useState(false);


    function validador(){
       
	    if(nome.length > 0){
		    if(senha.length >= 6 & senha === senha2){
			    setValidated(true);
		    }
		    else 
		    {
			    alert("Confirme corretamente sua senha de 6 caracteres.")
		    }
	    }
	    else 
	    {
		    alert("Favor escrever seu nome.")
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
        <div className='usuarios-cadastro'>
            <h1>Cadastro de usuário<Link to={`/home`}><MdKeyboardBackspace color="#4983ee"/></Link></h1>
            <div className="cadastro-usuario-container">               
                
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




            </div>
            </div>
        </>
    );
}

export default CadastroUsuario;

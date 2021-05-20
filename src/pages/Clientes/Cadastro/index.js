import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import api from "../../../services/api";
import querystring from "query-string";
import "./styles.css";

function CadastroCliente() {
    const history = useHistory();

    const [cliente, setClientes] = useState("");
    const [cliente_id, setCliente_id] = useState("");
    const [solicitantes, setSolicitantes] = useState("");
    const [nome, setNome] = useState("");
    const [ramo, setRamo] = useState("");
    const [validated, setValidated] = useState("");
    const [_id, set_id] = useState("");

    async function handleSubmit(e) {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        e.preventDefault();
        const idCliente = querystring.parse(window.location.search).idCliente;
        const data = {
            _id,
            cliente_id,
            nome,
            solicitantes,
            ramo,
        };
        if (form.checkValidity() !== false) {
            if (idCliente !== undefined) {
                await api.post("/cliente/update", data, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "Token"
                        )}`,
                    },
                });
            } else {
                await api.post("/cliente/cadastro", data, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "Token"
                        )}`,
                    },
                });
            }
            history.push(`/clientes`);
        }
    }

    useEffect(() => {
        async function carregaClientes() {
            const idCliente = querystring.parse(window.location.search)
                .idCliente;
            setCliente_id(idCliente);

            if (idCliente) {
                const response = await api.get(`/cliente/id/${idCliente}`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "Token"
                        )}`,
                    },
                });
                setClientes(response.data.clientes);
                setSolicitantes(
                    response.data.clientes.solicitantes
                        .map((sol) => " " + sol + " ")
                        .toString()
                );
                setNome(response.data.clientes.nome);
                setRamo(response.data.clientes.ramo);
                set_id(response.data.clientes._id);
                setCliente_id(response.data.clientes.cliente_id);
            }
        }

        carregaClientes();
    }, []);

    function Titulo() {
        if (cliente_id) {
            return <h1>Atualizar Cliente {nome}</h1>;
        } else {
            return <h1>Cadastro Cliente </h1>;
        }
    }

    return (
        <>
            <Titulo />

            <form onSubmit={handleSubmit}>

            <div className="primeiro">
            <label>Nome</label>
            <input onChange={(e) => setNome(e.target.value)} placeholder="Nome do Cliente" value={nome}></input>
            </div>

            <div className="segundo">
            <label>Ramo</label>
            <input onChange={(e) => setRamo(e.target.value)} placeholder="Ramo" value={ramo}></input>
            
            <label>Solicitante</label>
            <input onChange={(e) => setSolicitantes(e.target.value)} placeholder="Solicitentes" value={solicitantes}></input>
            
            </div>
            
            </form>
            
        </>
    );
}

export default CadastroCliente;

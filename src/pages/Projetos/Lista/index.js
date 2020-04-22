import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "./styles.css";
import api from "../../../services/api";
import { IoMdAdd } from "react-icons/io";

function ListaProjetos() {
    const history = useHistory();

    const [projetos, setProjetos] = useState([{}]);

    function trataData(dataRaw) {
        if (dataRaw) {
            return (
                dataRaw.substr(8, 2) +
                "-" +
                dataRaw.substr(5, 2) +
                "-" +
                dataRaw.substr(0, 4)
            );
        } else {
            return "00/00/0000";
        }
    }

    function handleEntrar(id) {
        if (id !== undefined) {
            history.push(`/cadastro-projeto?idBusca=${id}`);
        }
    }

    function handleCadastrar() {
        history.push("/cadastro-projeto");
    }

    useEffect(() => {
        async function carrageProjetos() {
            const response = await api
                .get("/projeto/info", {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "Token"
                        )}`,
                    },
                })
                .then((response) => {
                    setProjetos(response.data.projetos);
                });
        }
        carrageProjetos();
    }, []);

    return (
        <>
            
            <h1>
                Lista de Projetos{" "}
                <Link onClick={handleEntrar}>
                    <IoMdAdd color="#4983ee" />
                </Link>
            </h1>
            <div align="center">
            <table id="projetos">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Cliente</th>
                        <th>Título</th>
                        <th>PM</th>
                        <th>Funcional</th>
                        <th>Prazo</th>
                        <th>Prioridade</th>
                    </tr>
                </thead>
                <tbody>
                    {projetos.map((projeto) => (
                        <tr key={projeto._id}>
                            <td>{projeto.projeto_id}</td>
                            <td>
                                {projeto.cliente === undefined ||
                                projeto.cliente === null
                                    ? ""
                                    : projeto.cliente.nome}
                            </td>
                            <td>
                                <Link
                                    to={`/cadastro-projeto?idBusca=${projeto._id}`}
                                >
                                    {projeto.titulo}
                                </Link>
                            </td>
                            <td>
                                {projeto.pm === undefined || projeto.pm === null
                                    ? ""
                                    : projeto.pm.nome}
                            </td>
                            <td>
                                {projeto.funcional === undefined ||
                                projeto.funcional === null
                                    ? ""
                                    : projeto.funcional.nome}
                            </td>
                            <td>{projeto.prazo}</td>
                            <td>{projeto.prioridade}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            </div>
            </>
    );
}

export default ListaProjetos;

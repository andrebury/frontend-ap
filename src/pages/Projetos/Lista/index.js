import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import api from "../../../services/api";
import { IoMdAdd } from "react-icons/io";
import {orderBy} from 'lodash';

function ListaProjetos() {

    const [projetos, setProjetos] = useState([{}]);

    useEffect(() => {
        async function carrageProjetos() {
            await api
                .get("/projeto/info", {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "Token"
                        )}`,
                    },
                })
                .then((response) => {
                    setProjetos(orderBy(response.data.projetos,['prazo'],['asc']))
                });
        }
        carrageProjetos();
    }, []);

    return (
        <>
            
            <h1>
                Lista de Projetos{" "}
                <Link to={'/cadastro-projeto'}>
                    <IoMdAdd color="#4983ee" />
                </Link>
            </h1>
            <div align="center">
            <table id="projetos">
                <thead>
                    <tr>
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
                            <td>
                                {projeto.cliente === undefined ||
                                projeto.cliente === null
                                    ? ""
                                    : projeto.cliente.nome}
                            </td>
                            <td>
                                <Link
                                    to={`/projeto/${projeto._id}`}
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

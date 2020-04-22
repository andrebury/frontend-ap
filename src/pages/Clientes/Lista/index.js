import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import { useHistory, Link } from "react-router-dom";
import "./styles.css";
import { IoMdAdd } from "react-icons/io";
function Clientes() {
    const history = useHistory();

    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        async function carregaClientes() {
            const response = await api.get("/cliente/info", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
                },
            });
            setClientes(response.data.clientes);
            console.log(response.data.clientes);
        }

        carregaClientes();
    }, []);

    function handleEntrar(idCliente) {
        if (idCliente.length > 10) {
            history.push(`/cadastro-cliente?idCliente=${idCliente}`);
        } else {
            history.push(`/cadastro-cliente`);
        }
    }

    return (
        <>
            <h1>
                Clientes{" "}
                <Link onClick={handleEntrar}>
                    <IoMdAdd color="#4983ee" />
                </Link>
            </h1>
            <div align="center">
            <table id="clientes">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Ramo</th>
                        <th>Solicitantes</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente._id}>
                            <td>{cliente.cliente_id}</td>
                            <td>
                                <Link
                                    to={`/cadastro-cliente?idCliente=${cliente._id}`}
                                >
                                    {cliente.nome}
                                </Link>
                            </td>
                            <td>{cliente.ramo}</td>
                            <td>
                                {cliente.solicitantes
                                    .map((sol) => " " + sol + " ")
                                    .toString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            
        </>
    );
}

export default Clientes;

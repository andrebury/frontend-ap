import React, { useEffect, useState } from "react";
import {  Button, Modal, Form } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import './styles.css'
import {orderBy} from 'lodash';
import api from "../../../services/api";
import {NavbarSuperior} from '../../components/NavBar'

function Tarefas({match}) {
    const history = useHistory();

    const [show, setShow] = useState(false);
    const [tarefas, setTarefas] = useState([]);
    const [observacoes, setObservacoes] = useState("");
    const [idSelecionado, setIdSelecionado] = useState("");
    const [idProjeto, setIdProjeto] = useState("");

    const handleClose = () => setShow(false);

    const dataAmericana = (date) =>{

        if(date == undefined || date == ''){
            return date
        }else{
            return date.substring(6,10) + '-' + date.substring(3,5) + '-' + date.substring(0,2)
        }
        
    }

    const dataBrasil = (date) =>{

        if(date == undefined || date == ''){
            return date
        }else{
            return date.substring(8,10) + '/' + date.substring(5,7) + '/' + date.substring(0,4)
        }
    }


    async function handleSave(e) {
        const t = tarefas.filter((tarefa) => e.target.name === tarefa._id);

        console.log("tarefa_id " + t[0]._id);
        const data = {
            _id: t[0]._id,
            projeto: t[0].projeto,
            observacoes: observacoes,
            cliente: t[0].cliente,
            titulo: t[0].titulo,
            descricao: t[0].descricao,
            solicitante: t[0].solicitante,
            pm: t[0].pm,
            funcional: t[0].funcional,
            prazo: t[0].prazo,
            inicio: t[0].inicio,
            fim: t[0].fim,
            status: t[0].status,
            horas: t[0].horas,
            prioridade: t[0].prioridade,
            desenvolvedor: t[0].desenvolvedor,
        };

        const response = await api.post("/tarefa/update", data, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
            },
        });
        console.log(response);
        console.log(data);
        setShow(false);
        t[0].observacoes = observacoes;
    }

    function handleShow(e) {
        setShow(true);
        setIdSelecionado(e.target.name);
        console.log("idselect: " + e.target.name);
        const ob = tarefas.filter((tarefa) => tarefa._id === e.target.name);
        const data = new Date();
        const dataStr =
            (data.getDate() <= 9 ? "0" + data.getDate() : data.getDate()) +
            "/" +
            (data.getUTCMonth() + 1 <= 9
                ? "0" + (data.getUTCMonth() + 1)
                : data.getUTCMonth() + 1) +
            "/" +
            data.getFullYear() +
            " - " +
            (data.getHours() < 10 ? "0" + data.getHours() : data.getHours()) +
            ":" +
            (data.getMinutes() < 10
                ? "0" + data.getMinutes()
                : data.getMinutes());
        setObservacoes(
            (ob[0].observacoes.length > 0 ? ob[0].observacoes + "\n" : "") +
                dataStr +
                ": "
        );
    }


    useEffect(() => {
        async function carregaTarefas() {
            const idBusca = match.params.projeto_id

            if (!idBusca) {
                history.push("/lista-projetos");
            }
            setIdProjeto(idBusca);

            let response = await api.post(
                "/tarefa/info",
                { projeto: idBusca },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "Token"
                        )}`,
                    },
                }
            );

            response.data.tarefas.map((dia) => {
                dia.prazo = dataAmericana(dia.prazo)
            })

            response.data.tarefas = orderBy(response.data.tarefas, ['prazo'], ['asc'])

            response.data.tarefas.map((dia) => {
                dia.prazo = dataBrasil(dia.prazo)
            })

            setTarefas(response.data.tarefas);
            setObservacoes(response.data.tarefas.observacoes);
        }
        carregaTarefas();
    }, []);

    return (
        <>       
        <NavbarSuperior/>

        <div className='tarefas-lista'>
            <h1>
                Tarefas{" "}
                <Link to={`/cadastro-tarefa/${idProjeto}`} >
                    <IoMdAdd color="#4983ee" />
                </Link>
            </h1>
            <div align="center">
            <table id="lista-tarefas">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Projeto</th>
                        <th>Desenvolvedor</th>
                        <th>Início</th>
                        <th>Prazo</th>
                        <th>Status</th>
                        <th>Prioridade</th>
                        <th>Observações</th>
                    </tr>
                </thead>
                <tbody>
                    {tarefas.map((tarefa) => (
                        <tr key={tarefa._id}>
                            <td>
                                <Link
                                    to={`/tarefa/${idProjeto}/${tarefa._id}`}
                                >
                                    {tarefa.titulo}{" "}
                                </Link>
                            </td>
                            <td>
                                {tarefa.projeto === null
                                    ? ""
                                    : tarefa.projeto.titulo}
                            </td>
                            <td>{tarefa.desenvolvedor.nome}</td>
                            <td>{tarefa.inicio}</td>
                            <td>{tarefa.prazo}</td>
                            <td>{tarefa.status}</td>
                            <td>{tarefa.prioridade}</td>
                            <td>
                                <Link name={tarefa._id} onClick={handleShow}>
                                    Escrever
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Observações</Modal.Title>
                </Modal.Header>
                <Modal.Body>Escreva sua nota para a tarefa:</Modal.Body>
                <Modal.Footer>
                    <Form.Control
                        as="textarea"
                        rows="5"
                        value={observacoes}
                        onChange={(e) => setObservacoes(e.target.value)}
                    />

                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button
                        variant="primary"
                        name={idSelecionado}
                        onClick={handleSave}
                    >
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
            </div>
       </>
    );
}
export default Tarefas;

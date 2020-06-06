import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Calendar from "react-calendar";
import "./styles.css";
import { Table, Button, Modal, Form } from "react-bootstrap";
import api from "../../services/api";
import "react-calendar/dist/Calendar.css";
import { 
  parseISO, 
  format, 
  formatRelative, 
  formatDistance,
} from 'date-fns';

import {orderBy} from 'lodash';

//import pt from 'date-fns/locales/pt';

function Inicio() {
    const history = useHistory();

    const [tarefas, setTarefas] = useState([
        {
            _id: "",
            status: "",
            prioridade: "",
            tarefa_id: "",
            titulo: "",
            projeto: { titulo: "" },
            desenvolvedor: { nome: "" },
        },
    ]);
    const [solicitadas, setSolicitadas] = useState([]);
    const [observacoes, setObservacoes] = useState("");
    const [show, setShow] = useState(false);
    const [idSelecionado, setIdSelecionado] = useState("");
    const [agenda, setAgenda] = useState(new Date());
    const [alertas, setAlertas] = useState([]);


    function calendarioOnClick(e) {
        //console.log(e);
        setAgenda(e.target);
    }



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


 
    const handleClose = () => setShow(false);

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
        console.log({'idselect' : e.target});
        let ob = []
        if(e.target.id === 'res'){
            ob = tarefas.filter((tarefa) => tarefa._id === e.target.name);
        }else{
            ob = solicitadas.filter((tarefa) => tarefa._id === e.target.name);
        }
        
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
            data.getHours() +
            ":" +
            data.getMinutes();
        setObservacoes(ob[0].observacoes + (ob[0].observacoes.length > 0 ? "\n": "") + dataStr + ": ");
    }

    useEffect(() => {
        async function carrageTarefas() {
            const sessionid = sessionStorage.getItem("sessionid");

            let pendencias = await api.post(
                "/tarefa/info",
                {
                    desenvolvedor: sessionid,
                },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "Token"
                        )}`,
                    },
                }
            );

            let solicitadas = await api.post(
                "/tarefa/info",
                {
                    solicitante: sessionid,
                },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "Token"
                        )}`,
                    },
                }
            );
            console.log({'voce_solicitou' : solicitadas.data.tarefas})
            console.log({'solicitado_a_voce' : pendencias.data.tarefas})
            //Colocar todas as datas de prazo no formato americano
            solicitadas.data.tarefas.map((dia) => {
                console.log('solicitadas prazo: ' + dia.prazo)
                dia.prazo = dataAmericana(dia.prazo)
            })

            pendencias.data.tarefas.map((dia) => {
                console.log('pendencias prazo: ' + dia.prazo)
                dia.prazo = dataAmericana(dia.prazo)
            })
            
            //ordenar com o lodash por prazo. Data mais próximas até a mais distante
            solicitadas.data.tarefas = orderBy(solicitadas.data.tarefas, ['prazo'], ['asc'])
            pendencias.data.tarefas = orderBy(pendencias.data.tarefas, ['prazo'], ['asc'])

            //Colocar todas as datas de prazo no formato brasileiro
            solicitadas.data.tarefas.map((dia) => {
                dia.prazo = dataBrasil(dia.prazo)
            })

            pendencias.data.tarefas.map((dia) => {
                dia.prazo = dataBrasil(dia.prazo)
            })

            //setar no state
            setSolicitadas(solicitadas.data.tarefas);
            setTarefas(pendencias.data.tarefas);

        }
        carrageTarefas();
    }, []);

    return (
        <>
            <div className="container-inicio">
                <div className="lista-tarefas">
                    <h1>Tarefas Pendentes do Usuário</h1>
                    <table id="tarefas">
                        <thead>
                            <tr>
                                <th>Projeto</th>
                                <th>Título</th>
                                <th>Prazo</th>
                                <th>Solicitante</th>
                                <th>Status</th>
                                <th>Observações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tarefas.map((tarefa) => (
                                <tr key={tarefa._id}>
                                <td style={{width: 280 }}>{tarefa.projeto.titulo}</td>
                                    <td>
                                        <Link
                                            to={`/tarefa/${tarefa.projeto._id}/${tarefa._id}`}
                                        >
                                            {tarefa.titulo}
                                        </Link>
                                    </td>
                                    
                                    <td>{tarefa.prazo}</td>
                                    <td style={{width: 180 }}>{tarefa.solicitante !== undefined ? tarefa.solicitante.nome : ''}</td>
                                    <td>{tarefa.status}</td>
                                    <td>
                                        <Link
                                            id="res"
                                            name={tarefa._id}
                                            onClick={handleShow}
                                        >
                                            Escrever
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h1 style={{marginTop:10}}>Tarefas Solicitadas pelo Usuário</h1>

                    <table id="tarefas">
                        <thead>
                            <tr>
                                <th>Projeto</th>
                                <th>Título</th>
                                <th>Prazo</th>
                                <th>Responsavel</th>
                                <th>Status</th>
                                <th>Observações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {solicitadas.map((tarefa) => (
                                <tr key={tarefa._id}>
                                <td style={{width: 280 }}>{tarefa.projeto.titulo}</td>
                                    <td>
                                        <Link
                                            to={`/tarefa/${tarefa.projeto._id}/${tarefa._id}`}
                                        >
                                            {tarefa.titulo}
                                        </Link>
                                    </td>
                                    
                                    <td>{tarefa.prazo}</td>
                                    <td style={{width: 180 }}>{tarefa.desenvolvedor !== undefined ? tarefa.desenvolvedor.nome : ''}</td>
                                    <td>{tarefa.status}</td>
                                    <td>
                                        <Link
                                            name={tarefa._id}
                                            id="sol"
                                            onClick={handleShow}
                                        >
                                            Escrever
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                <div className="container-direita">
                    {/* <div className="alertas">
                        <h1>Alertas</h1>
                        <span>adicionar : </span>
                        <input></input>
                        <button>Adicionar</button>
                    </div> */}
                    <div className="calendario">
                        <h1>Agenda</h1>

                        <Calendar
                            className="Calendar"
                            onChange={(e) => calendarioOnClick(e)}
                            value={agenda}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Inicio;

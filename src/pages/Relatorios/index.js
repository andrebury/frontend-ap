import React, { useEffect, useState } from "react";
import {  Button, Modal, Form } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
// import { IoMdAdd } from "react-icons/io";
import './styles.css'
import {orderBy} from 'lodash';
import api from "../../services/api";

function Tarefas({match}) {
    const history = useHistory();

    const [show, setShow] = useState(false);
    const [tarefas, setTarefas] = useState([]);
    const [tarefasTemp, setTarefasTemp] = useState([]);
    const [observacoes, setObservacoes] = useState("");
    const [idSelecionado, setIdSelecionado] = useState("");
    const [statusselected, setStatusselected] = useState('Todos');
    const [responsavel, setResponsavel] = useState("");
    const [responsavelSelecionado, setResponsavelSelecionado] = useState("");
    const [responsaveisAPI, setResponsaveisAPI] = useState(["Escolha..."]);

    
    const handleClose = () => setShow(false);

    const dataAmericana = (date) =>{

        if(date === undefined || date === ''){
            return date
        }else{
            return date.substring(6,10) + '-' + date.substring(3,5) + '-' + date.substring(0,2)
        }
        
    }

    const dataBrasil = (date) =>{

        if(date === undefined || date === ''){
            return date
        }else{
            return date.substring(8,10) + '/' + date.substring(5,7) + '/' + date.substring(0,4)
        }
    }


    async function handleSave(e) {
        const t = tarefas.filter((tarefa) => e.target.name === tarefa._id);

        // console.log("tarefa_id " + t[0]._id);
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
        // console.log(response);
        // console.log(data);
        setShow(false);
        t[0].observacoes = observacoes;
    }

    function handleShow(e) {
        setShow(true);
        setIdSelecionado(e.target.name);
        // console.log("idselect: " + e.target.name);
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
            
            let response = await api.post(
                "/tarefa/info",
                { },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "Token"
                        )}`,
                    },
                }
            );
                // console.log(response.data)
            response.data.tarefas.map((dia) => {
                dia.prazo = dataAmericana(dia.prazo)
            })

            
            response.data.tarefas = orderBy(response.data.tarefas, ['prazo'], ['asc'])
            response.data.tarefas = orderBy(response.data.tarefas, ['status'], ['asc'])
            
            response.data.tarefas.map((dia) => {
                dia.prazo = dataBrasil(dia.prazo)
            })

            setTarefas(response.data.tarefas);
            setTarefasTemp(response.data.tarefas);
            setObservacoes(response.data.tarefas.observacoes);
        }
        carregaTarefas();
    }, []);

    useEffect(() => {
        async function loadInfo() {
            await api
                .post(
                    "/userinfo/info",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem(
                                "Token"
                            )}`,
                        },
                    }
                )
                .then((response) => {
                    console.log(response.data);
                    setResponsaveisAPI(response.data.usr);
                    setResponsavelSelecionado(response.data.usr[0]._id);
                    setResponsavel(response.data.usr[0].nome);
                });                
            };
            loadInfo()
    }, []);


    function handleResponsavel(e) {
        setResponsavel(e.target.value);
        setResponsavelSelecionado(e.target.selectedOptions[0].id);
        let tarefat = []
        if(e.target.value != "Todos")
        {
            if(tarefas.length > 0)
            {
                if(statusselected != 'Todos'){
                    tarefat = tarefas.filter(element => ((element.status === statusselected) && (element.desenvolvedor._id === e.target.selectedOptions[0].id)));
                }else{
                    tarefat = tarefas.filter(element => (element.desenvolvedor._id === e.target.selectedOptions[0].id));
                }
                setTarefasTemp(tarefat)
            }
            console.log(e.target.value)
        }
        else
        {
            setResponsavel("Todos");
            setResponsavelSelecionado("Todos");
            if(statusselected != 'Todos'){
                tarefat = tarefas.filter(element => (element.status === statusselected));
                setTarefasTemp(tarefat)
            }else{
                setTarefasTemp(tarefas)
            }
            
        }
    }
    
    function HandleStatusselected(e) {       
        setStatusselected(e.target.value);
        let tarefat = []
        if(e.target.value != "Todos")
        {   
            if(tarefas.length > 0)
            {
                if(responsavel != 'Todos'){
                    tarefat = tarefas.filter(element => (element.desenvolvedor._id === responsavelSelecionado && element.status === e.target.value));                    
                }else{
                    tarefat = tarefas.filter(element => (element.status === e.target.value));
                }
                setTarefasTemp(tarefat)
            }            
        }
        else
        {
            if(responsavel != 'Todos'){
                tarefat = tarefas.filter(element => (element.desenvolvedor._id === responsavelSelecionado));
                setTarefasTemp(tarefat)
            }else{
                setTarefasTemp(tarefas)
            }
            
        }
    }
     

    return (
        <>       
            <div className='relatorios-lista'>
            <h1>
                Relatório de Tarefas
            </h1>
            <div className="lista-relatorios-container">
                <section>
            <section>
            <label>Status</label>

            <select value={statusselected} onChange={HandleStatusselected} className="status-filtro">
                <option value="Todos" name="Todos">Todos</option>
                <option value="Finalizado" name="Finalizados">Finalizados</option>
                <option value="Desenvolvimento" name="Desenvolvimento">Desenvolvimento</option>
                <option value="Aguardando GMUD" name="Aguardando GMUD">Aguardando GMUD</option>
                <option value="Desenho" name="Desenho">Desenho</option>
                <option value="Homologando" name="Homologando">Homologando</option>
            </select>

            <label>Responsável</label>
            <select required onChange={handleResponsavel} value={responsavel.nome} className="responsavel-filtro">
                <option key='Todos' name="Todos" id="Todos">
                    {" "}Todos
                </option>
            {responsaveisAPI.map((responsavel) => (
                <option key={responsavel._id} name={responsavel._id} id={responsavel._id}>
                    {" "}{responsavel.nome}
                </option>
            ))}
            </select>
            </section>
            </section>
            </div>
            <div>
            {/* <table id="lista-tarefas">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Projeto</th>
                        <th>Desenvolvedor</th>
                        <th>Início</th>
                        <th>Prazo</th>
                        <th>Status</th>
                        <th>Prioridade</th>
                    </tr>
                </thead>
                <tbody>
                    {tarefasTemp.map((tarefa) => (
                        <tr key={tarefa._id}>
                            <td>
                                <Link
                                    to={`/tarefa/${tarefa.projeto._id}/${tarefa._id}`}
                                >
                                    {tarefa.titulo}{" "}
                                </Link>
                            </td>
                            <td>
                                <Link
                                    to={`/projeto/${tarefa.projeto._id}`}
                                >
                                {tarefa.projeto === null
                                    ? ""
                                    : tarefa.projeto.titulo}
                                </Link>
                            </td>
                            <td>{tarefa.desenvolvedor.nome}</td>
                            <td>{tarefa.inicio}</td>
                            <td>{tarefa.prazo}</td>
                            <td>{tarefa.status}</td>
                            <td>{tarefa.prioridade}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table> */}
            <div className="projetos-lista">
            {tarefasTemp.map((tarefa) => (
                    <div className="tarefa-unit">
                        <div className="tarefa-infos">
                                <h5><Link
                                            to={`/tarefa/${tarefa.projeto._id}/${tarefa._id}`}
                                        >
                                            {tarefa.titulo}
                                        </Link></h5>
                                <span><Link
                                            id="res"
                                            name={tarefa._id}
                                            onClick={handleShow}
                                        >
                                            Observações
                                        </Link></span>
                        </div>
                        <p><b>Projeto:</b> <Link
                                to={`/projeto/${tarefa.projeto._id}`}>
                                    {tarefa.projeto.titulo.length > 50 ? tarefa.projeto.titulo.substring(0,48) + '...' :tarefa.projeto.titulo}
                                </Link></p>

                            <section>
                                {/* <span><b>Descrição: </b>{tarefa.descricao === undefined ? '' : tarefa.descricao.length > 120 ? tarefa.descricao.substring(0,118) + '...' :tarefa.descricao} </span>       */}
                                                     
                                <span><b>Prazo:</b> {tarefa.prazo}</span>
                                <span><b>Status:</b> {tarefa.status}</span>
                                <span><b>Solicitante: </b>{tarefa.solicitante !== undefined ? tarefa.solicitante.nome : ''}</span>
                                <span><b>Responsável: </b>{tarefa.desenvolvedor !== undefined ? tarefa.desenvolvedor.nome : ''}</span>

                            </section>
                    </div>
                 ))}
                 </div>
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

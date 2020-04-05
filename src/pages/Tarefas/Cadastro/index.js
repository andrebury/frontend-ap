import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Form, Button, Col } from "react-bootstrap";
import querystring from "query-string";

import api from "../../../services/api";

function Tarefas() {
    const history = useHistory();

    const [titulo, setTitulo] = useState("");
    const [tarefa_id, setTarefa_id] = useState("");
    const [solicitante, setSolicitante] = useState("");
    const [horas, setHoras] = useState(0);
    const [prioridade, setPrioridade] = useState("Média");
    const [prazo, setPrazo] = useState();
    const [descricao, setDescricao] = useState("");
    const [responsavel, setResponsavel] = useState("");
    const [inicio, setInicio] = useState();
    const [fim, setFim] = useState("");
    const [status, setStatus] = useState("Desenho");
    const [_id, set_id] = useState("");
    const [nomeProjeto, setNomeProjeto] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [responsavelSelecionado, setResponsavelSelecionado] = useState("");
    const [solicitanteSelecionado, setSolicitanteSelecionado] = useState("");
    const [responsaveisAPI, setResponsaveisAPI] = useState(["Escolha..."]);
    const [validated, setValidated] = useState(false);

    async function handleSubmit(e) {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        e.preventDefault();
        const data = {
            _id,
            titulo,
            projeto: querystring.parse(window.location.search).idProjeto,
            solicitante: solicitanteSelecionado,
            desenvolvedor: responsavelSelecionado,
            inicio,
            fim,
            status,
            prazo,
            horas,
            descricao,
            prioridade,
            observacoes,
        };

        if (form.checkValidity() !== false) {
            if (
                querystring.parse(window.location.search).idBusca !== undefined
            ) {
                await api.post("/update/tarefa", data);
            } else {
                await api.post("/cadastro/tarefa", data);
            }
            history.push(
                `/tarefas?idBusca=${
                    querystring.parse(window.location.search).idProjeto
                }`
            );
        }
    }

    function handleResponsavel(e) {
        const dID = responsaveisAPI.filter(
            (d) => d.nome.toLowerCase() === e.target.value.toLowerCase()
        );

        setResponsavel(e.target.value);
        setResponsavelSelecionado(dID[0]._id);
    }

    function handleSolicitante(e) {
        const dID = responsaveisAPI.filter(
            (d) => d.nome.toLowerCase() === e.target.value.toLowerCase()
        );

        setSolicitante(e.target.value);
        setSolicitanteSelecionado(dID[0]._id);
    }

    useEffect(() => {
        async function loadInfo() {
            await api.post("/usuario", {}).then((response) => {
                console.log(response.data);
                setResponsaveisAPI(response.data);
                setResponsavelSelecionado(response.data[0]._id);
                setResponsavel(response.data[0].nome);

                setSolicitanteSelecionado(sessionStorage.getItem("sessionid"));
                setSolicitante(sessionStorage.getItem("nome"));
            });

            const idBusca = querystring.parse(window.location.search).idBusca;

            if (idBusca) {
                const tarefaInfo = await api.get("/tarefa/" + idBusca);
                setTarefa_id(tarefaInfo.data.tarefa_id);
                setNomeProjeto(tarefaInfo.data.projeto.titulo);
                setTitulo(tarefaInfo.data.titulo);
                setStatus(tarefaInfo.data.status);
                setSolicitante(tarefaInfo.data.solicitante.nome);
                setSolicitanteSelecionado(tarefaInfo.data.solicitante._id);
                setHoras(tarefaInfo.data.horas);
                setPrioridade(tarefaInfo.data.prioridade);
                setInicio(tarefaInfo.data.inicio);
                setPrazo(tarefaInfo.data.prazo);
                setFim(tarefaInfo.data.fim);
                setDescricao(tarefaInfo.data.descricao);
                set_id(tarefaInfo.data._id);
                setResponsavel(tarefaInfo.data.desenvolvedor);
                setObservacoes(tarefaInfo.data.observacoes);
            } else {
                await api
                    .get(
                        `/projeto/${
                            querystring.parse(window.location.search).idProjeto
                        }`
                    )
                    .then((response) => {
                        setNomeProjeto(response.data.titulo);
                    });
            }
        }
        loadInfo();
    }, []);

    function Titulo() {
        if (tarefa_id) {
            return <p>Atualizar Tarefa {titulo}</p>;
        } else {
            return <p>Cadastro Tarefa </p>;
        }
    }

    return (
        <>
            <div>
                <Titulo />
            </div>
            <div>
                <Form noValidate onSubmit={handleSubmit} validated={validated}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="titulo">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Título da Tarefa"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Digite o Título da Tarefa
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="projeto">
                            <Form.Label>Projeto</Form.Label>
                            <Form.Control type="text" value={nomeProjeto} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="solicitante">
                            <Form.Label>Solicitante</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={handleSolicitante}
                                value={solicitante}
                            >
                                {responsaveisAPI.map((solres) => (
                                    <option key={solres._id} name={solres._id}>
                                        {" "}
                                        {solres.nome}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">
                            Informe o Solicitante
                        </Form.Control.Feedback>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="responsavel">
                            <Form.Label>Responsável</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={handleResponsavel}
                                value={responsavel.nome}
                            >
                                {responsaveisAPI.map((responsavel) => (
                                    <option
                                        key={responsavel._id}
                                        name={responsavel._id}
                                    >
                                        {" "}
                                        {responsavel.nome}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="horas">
                            <Form.Label>Horas</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Horas"
                                required
                                value={horas}
                                onChange={(e) => setHoras(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="prioridade">
                            <Form.Label>Prioridade</Form.Label>
                            <Form.Control
                                as="select"
                                value={prioridade}
                                onChange={(e) => setPrioridade(e.target.value)}
                            >
                                <option>Alta</option>
                                <option>Média</option>
                                <option>Baixa</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option>Desenho</option>
                                <option>Aguardando GMUD</option>
                                <option>Desenvolvimento</option>
                                <option>Homologando</option>
                                <option>Finalizado</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="inicio">
                            <Form.Label>Início</Form.Label>
                            <Form.Control
                                type="date"
                                required
                                value={inicio}
                                onChange={(e) => setInicio(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Defina a data de início
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="fim">
                            <Form.Label>Fim</Form.Label>
                            <Form.Control
                                type="date"
                                value={fim}
                                onChange={(e) => setFim(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="prazo">
                            <Form.Label>Prazo</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Prazo"
                                required
                                value={prazo}
                                onChange={(e) => setPrazo(e.target.value)}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="descricao">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="5"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="observacoes">
                            <Form.Label>Observações</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="5"
                                value={observacoes}
                                onChange={(e) => setObservacoes(e.target.value)}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Col md={{ span: 6, offset: 3 }}>
                        <Button type="submit">Salvar</Button>
                    </Col>
                    <br></br>
                </Form>
            </div>
        </>
    );
}

export default Tarefas;

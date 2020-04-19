import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import querystring from "query-string";
import { Form, Button, Col } from "react-bootstrap";

import api from "../../../services/api";

function CadastroProjetos() {
    const history = useHistory();

    const [clientes, setClientes] = useState(["Escolha..."]);
    const [titulo, setTitulo] = useState("");
    const [projeto_id, setProjeto_id] = useState("");
    const [funcional, setFuncional] = useState("");
    const [horas, setHoras] = useState(0);
    const [prioridade, setPrioridade] = useState("Média");
    const [prazo, setPrazo] = useState("00/00/0000");
    const [descricao, setDescricao] = useState("");
    const [cliente, setCliente] = useState("");

    const [funcsAPI, setFuncsAPI] = useState(["Escolha..."]);
    const [pmsAPI, setPmsAPI] = useState(["Escolha..."]);

    const [inicio, setInicio] = useState("00/00/0000");
    const [pm, setPm] = useState("");
    const [status_projeto, setStatus_projeto] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [_id, set_id] = useState("");
    const [idBusca, setIdBusca] = useState("");
    const [clienteSelecionado, setClienteSelecionado] = useState("");
    const [pmSelecionado, setPmSelecionado] = useState("");
    const [funcionalSelecionado, setFuncionalSelecionado] = useState("");
    const [validated, setValidated] = useState(false);

    function trataData(dataRaw) {
        let dataF = new Date(dataRaw).toLocaleDateString("pt-BR");

        return (
            dataRaw.substr(6, 4) +
            "-" +
            dataRaw.substr(3, 2) +
            "-" +
            dataRaw.substr(0, 2)
        );
    }

    async function handleSave(e) {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        e.preventDefault();

        const dataSave = {
            _id: _id,
            titulo: titulo,
            status_projeto: status_projeto,
            cliente: clienteSelecionado,
            funcional: funcionalSelecionado,
            horas: horas,
            prioridade: prioridade,
            inicio: inicio,
            prazo: prazo,
            descricao: descricao,
            pm: pmSelecionado,
            observacoes: observacoes,
        };
        console.log({ datasave: dataSave });

        if (form.checkValidity() !== false) {
            if (idBusca !== undefined) {
                await api.post("/projeto/update", dataSave, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "Token"
                        )}`,
                    },
                });
            } else {
                await api.post("/projeto/cadastro", dataSave, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "Token"
                        )}`,
                    },
                });
            }

            history.push("/lista-projetos");
        }
    }

    async function HandleTarefa(e) {
        history.push(`/tarefas?idBusca=${idBusca}`);
    }

    useEffect(() => {
        async function loadInfo() {
            await api
                .get("/cliente/info", {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "Token"
                        )}`,
                    },
                })
                .then((response) => {
                    setClientes(response.data.clientes);
                    setClienteSelecionado(
                        response.data.clientes[0] !== undefined
                            ? response.data.clientes[0]._id
                            : ""
                    );
                    setCliente(
                        response.data.clientes[0] !== undefined
                            ? response.data.clientes[0].nome
                            : ""
                    );
                });

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
                    const fapi = response.data.usr.filter(
                        (funcs) => funcs.funcao === "Funcional"
                    );
                    const papi = response.data.usr.filter(
                        (pm) => pm.funcao === "PM"
                    );

                    setFuncsAPI(fapi);
                    setPmsAPI(papi);

                    setPmSelecionado(papi[0] !== undefined ? papi[0]._id : "");
                    setPm(papi[0] !== undefined ? papi[0].nome : "");

                    setFuncionalSelecionado(
                        fapi[0] !== undefined ? fapi[0]._id : ""
                    );
                    setFuncional(fapi[0] !== undefined ? fapi[0].nome : "");
                });

            const idBusca = querystring.parse(window.location.search).idBusca;
            setIdBusca(idBusca);

            if (idBusca) {
                await api
                    .get(`/projeto/id/${idBusca}`, {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem(
                                "Token"
                            )}`,
                        },
                    })
                    .then((response) => {
                        setTitulo(response.data.projetos.titulo);
                        setStatus_projeto(
                            response.data.projetos.status_projeto
                        );
                        setCliente(response.data.projetos.cliente);
                        setFuncional(response.data.projetos.funcional);
                        setHoras(response.data.projetos.horas);
                        setPrioridade(response.data.projetos.prioridade);
                        setInicio(response.data.projetos.inicio);
                        setPrazo(response.data.projetos.prazo);
                        setDescricao(response.data.projetos.descricao);
                        setPm(response.data.projetos.pm);
                        setObservacoes(response.data.projetos.observacoes);
                        setProjeto_id(response.data.projetos.projeto_id);
                        set_id(response.data.projetos._id);

                        setPmSelecionado(
                            response.data.projetos.pm === null ||
                                response.data.projetos.pm === undefined
                                ? ""
                                : response.data.projetos.pm._id
                        );
                        setFuncionalSelecionado(
                            response.data.projetos.funcional === null ||
                                response.data.projetos.funcional === undefined
                                ? ""
                                : response.data.projetos.funcional._id
                        );
                        setClienteSelecionado(
                            response.data.projetos.cliente === null ||
                                response.data.projetos.cliente === undefined
                                ? ""
                                : response.data.projetos.cliente._id
                        );

                        console.log(response.data.projetos.pm);
                        console.log(response.data.projetos.funcional);
                        console.log(response.data.projetos.cliente);
                    });
            }
        }
        loadInfo();
    }, []);

    function Tarefas() {
        if (_id.length > 10) {
            return (
                <Button type="button" name="tarefa" onClick={HandleTarefa}>
                    Tarefas
                </Button>
            );
        } else {
            return "";
        }
    }

    function Titulo() {
        if (projeto_id) {
            return <h1>Atualizar Projeto {titulo}</h1>;
        } else {
            return <h1>Cadastro Projetos </h1>;
        }
    }

    function HandleCliente(e) {
        const cID = clientes.filter(
            (c) => c.nome.toLowerCase() === e.target.value.toLowerCase()
        );
        console.log(cID[0]._id);

        setCliente(e.target.value);
        setClienteSelecionado(cID[0]._id);
    }

    function HandlePm(e) {
        const pID = pmsAPI.filter(
            (p) => p.nome.toLowerCase() === e.target.value.toLowerCase()
        );
        console.log(pID[0]._id);

        setPm(e.target.value);
        setPmSelecionado(pID[0]._id);
    }

    function handleFuncional(e) {
        const fID = funcsAPI.filter(
            (f) => f.nome.toLowerCase() === e.target.value.toLowerCase()
        );
        console.log(fID[0]._id);

        setFuncional(e.target.value);
        setFuncionalSelecionado(fID[0]._id);
    }

    return (
        <>
            <div>
                <Titulo />
            </div>

            <div>
                <Form noValidate onSubmit={handleSave} validated={validated}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="titulo">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Título do Projeto"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Digite o Título do Projeto
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="cliente">
                            <Form.Label>Cliente</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={HandleCliente}
                                value={cliente.nome}
                                required
                            >
                                <option>Escolha...</option>
                                {clientes.map((cliente) => (
                                    <option
                                        key={cliente._id}
                                        name={cliente._id}
                                    >
                                        {" "}
                                        {cliente.nome}
                                    </option>
                                ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Escolha o cliente
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="status_projeto">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                value={status_projeto}
                                onChange={(e) =>
                                    setStatus_projeto(e.target.value)
                                }
                            >
                                <option>Aprovado</option>
                                <option>Desenho</option>
                                <option>Desenvolvimento</option>
                                <option>Testes</option>
                                <option>Homologação</option>
                                <option>Pós Implantação</option>
                                <option>Finalizado</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="pm">
                            <Form.Label>PM</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={HandlePm}
                                value={pm.nome}
                            >
                                <option>Escolha...</option>
                                {pmsAPI.map((pm) => (
                                    <option key={pm._id} name={pm._id}>
                                        {" "}
                                        {pm.nome}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="funcional">
                            <Form.Label>Funcional</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={(e) => handleFuncional(e)}
                                value={funcional.nome}
                            >
                                <option>Escolha...</option>
                                {funcsAPI.map((func) => (
                                    <option key={func._id} name={func._id}>
                                        {" "}
                                        {func.nome}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
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
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="inicio">
                            <Form.Label>Início</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Início"
                                required
                                value={inicio}
                                onChange={(e) => setInicio(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Escolha a data início
                            </Form.Control.Feedback>
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

                    <Col md={{ span: 6, offset: 3 }}>
                        <Tarefas />
                    </Col>
                </Form>
            </div>
        </>
    );
}

export default CadastroProjetos;

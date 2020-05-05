import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import querystring from "query-string";
import './styles.css'
import api from "../../../services/api";

function CadastroProjetos() {
    const history = useHistory();

    const [clientes, setClientes] = useState(["Escolha"]);
    const [titulo, setTitulo] = useState("");
    const [projeto_id, setProjeto_id] = useState("");
    const [funcional, setFuncional] = useState(["Escolha"]);
    const [horas, setHoras] = useState(0);
    const [prioridade, setPrioridade] = useState("Média");
    const [prazo, setPrazo] = useState("00/00/0000");
    const [descricao, setDescricao] = useState("");
    const [cliente, setCliente] = useState("");

    const [funcsAPI, setFuncsAPI] = useState(["Escolha"]);
    const [pmsAPI, setPmsAPI] = useState(["Escolha"]);

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

    function validador(){
        let arrayvars = [titulo, clienteSelecionado, status_projeto, pm, funcionalSelecionado, prioridade, inicio]
        arrayvars.forEach((vars) => {
            console.log(vars + ' ' + vars.length + '' + (vars === undefined))
            if(vars.length === 0 || vars === undefined){
                return false
            }
        })
        return true
    }


    function handleSave(e) {
        e.preventDefault();
        let validated = validador()
        if (validated === false) {
            setValidated(false)
            alert("Preencha corretamente os campos!")            
        }else{
        setValidated(true)
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
        let apipath = '';
        if (_id !== "") {
            apipath = '/projeto/update'
        }else{
            apipath = '/projeto/cadastro'
        }

        api.post(apipath, dataSave, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem(
                    "Token"
                )}`,
            },
        }).then(resp => {
                
                console.log(resp)
                if(_id === ""){
                    set_id(resp.data.projetos._id)
                    alert('Projeto Cadastrado!');
                }else {
                    alert('Projeto Salvo!');
                }

            }).catch(err => {
                alert('Ocorreu um erro. Tente novamente!')
                setValidated(false)
            });;
            
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
                        setStatus_projeto(response.data.projetos.status_projeto);
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
                <button className="button" type="button" name="tarefa" onClick={HandleTarefa}>
                    Tarefas
                </button>
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
                <Titulo />

            <div className="cadastro-container">
                <form onSubmit={handleSave}>
                    <section className="primeiro">
                    <div className="titulo">
                    <label>Título</label>
                    <input type="text" maxLength="60" placeholder="Título do Projeto" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>
                    </div>
                    <div className="cliente">
                    <label>Cliente</label>
                    <select onChange={HandleCliente} value={cliente.nome}>
                        {clientes.map((cliente) => (
                            <option
                                key={cliente._id}
                                name={cliente._id}
                            >
                                {" "}
                                {cliente.nome}
                            </option>
                        ))}
                    </select>
                    </div>
                    <div className="status">
                    <label>Status</label>
                    <select value={status_projeto} onChange={(e) => setStatus_projeto(e.target.value)}>
                        <option>Aprovado</option>
                        <option>Desenho</option>
                        <option>Desenvolvimento</option>
                        <option>Testes</option>
                        <option>Homologação</option>
                        <option>Pós Implantação</option>
                        <option>Finalizado</option>
                    </select>
                    </div>
                    </section>
                    <section className="segundo">
                    <div className="pm">
                    <label>PM</label>
                        <select onChange={HandlePm} value={pm.nome}>
                                {pmsAPI.map((pm) => (
                                    <option key={pm._id} name={pm._id}>
                                        {" "}
                                        {pm.nome}
                                    </option>
                                ))}
                        </select>
                        </div>
                        <div className="funcional">
                        <label>Funcional</label>
                        <select onChange={(e) => handleFuncional(e)} value={funcional.nome}>
                            {funcsAPI.map((func) => (
                                <option key={func._id} name={func._id}>
                                    {" "}
                                    {func.nome}
                                </option>
                            ))}
                        </select>
                        </div>
                        <div className="prioridade">
                        <label>Prioridade</label>
                        <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
                            <option>Alta</option>
                            <option>Média</option>
                            <option>Baixa</option>
                    </select>
                    </div>
                    </section>
                    
                    <section className="quarto">
                        <div className="horas">
                        <label>Horas</label>
                        <input type="number" placeholder="Horas do Projeto" value={horas} onChange={(e) => setHoras(e.target.value)}/>
                        </div>
                        <div className="inicio">
                        <label>Início</label>
                        <input type="date" value={inicio} onChange={(e) => setInicio(e.target.value)}/>
                        </div>
                        <div className="prazo">
                        <label>Prazo</label>
                        <input type="date" value={prazo} onChange={(e) => setPrazo(e.target.value)}/>
                        </div>
                    </section>
                    <div className="descricao">
                    <label>Descrição</label>
                        <textarea rows="2" value={descricao} onChange={(e) => setDescricao(e.target.value)}/>
                    </div>
                    <div className="observacoes">
                    <label>Observações</label>
                        <textarea rows="2" value={observacoes} onChange={(e) => setObservacoes(e.target.value)}/>
                    </div>
                        <button className="button" type="submit">Salvar</button>
                        <Tarefas/>
                </form>
            </div>
        </>
    );
}

export default CadastroProjetos;

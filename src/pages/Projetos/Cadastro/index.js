import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import './styles.css'
import api from "../../../services/api";

function CadastroProjetos({match}) {
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
    const [status_projeto, setStatus_projeto] = useState("Aprovado");
    const [observacoes, setObservacoes] = useState("");
    const [_id, set_id] = useState("");
    const [idBusca, setIdBusca] = useState("");
    const [clienteSelecionado, setClienteSelecionado] = useState("");
    const [pmSelecionado, setPmSelecionado] = useState("");
    const [funcionalSelecionado, setFuncionalSelecionado] = useState("");

      const formattedDateToPicker = (data) => {
        if(data === "" | data === null | data === NaN | data === undefined ){
            return ""
        }else {
            
            return data.substr(6,4) + '-' + data.substr(3,2) + '-' +  data.substr(0,2)
        }
        
    }


    const formattedDateToDB = (data) => {
        let dt = data === null ? new Date() : new Date(data)

        dt.setDate(dt.getDate() + 1)

        return dt.toLocaleDateString("pt-BR")        
    }


    function handleSave(e) {
        console.log(e)
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

        api.post(match.params.projeto_id ? '/projeto/update': '/projeto/cadastro', dataSave, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem(
                    "Token"
                )}`,
            },
        }).then(resp => {
                alert('Projeto Salvo!')
                history.push('/lista-projetos')
            }).catch(err => (
                alert('Ocorreu um erro. Tente novamente!')
            ));            
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
                        fapi[0] !== undefined ? fapi[0]._id : "");
                    setFuncional(fapi[0] !== undefined ? fapi[0].nome : "");
                });

            const projeto_id = match.params.projeto_id
            setIdBusca(projeto_id);

            if (projeto_id) {
                await api
                    .get(`/projeto/id/${projeto_id}`, {
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


    async function HandleTarefa(e) {
        history.push(`/tarefas/${idBusca}`);
    }

    return (
        <>
                <Titulo />

            <div className="cadastro-container">
                <form onSubmit={handleSave}>
                    <section className="primeiro">
                    <div className="titulo">
                    <label>Título</label>
                    <input required type="text" maxLength="60" placeholder="Título do Projeto" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>
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
                    <select required value={status_projeto} onChange={(e) => setStatus_projeto(e.target.value)}>
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
                        <select required onChange={HandlePm} value={pm.nome}>
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
                        <select required onChange={(e) => handleFuncional(e)} value={funcional.nome}>
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
                        <select required value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
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
                        <input required type="date" value={formattedDateToPicker(inicio)} onChange={(e) => setInicio(formattedDateToDB(e.target.value))} />
                        </div>
                        <div className="prazo">
                        <label>Prazo</label>
                        <input required type="date" value={formattedDateToPicker(prazo)} onChange={(e) => setPrazo(formattedDateToDB(e.target.value))}/>
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

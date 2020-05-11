import React, { useState, useEffect } from "react";
import { useHistory , Link} from "react-router-dom";

import {MdKeyboardBackspace} from 'react-icons/md';
import './styles.css'

import api from "../../../services/api";

function Tarefas({match}) {
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
    const [projetoID, setProjetoID] = useState("");

    const formattedDateToPicker = (data) => {
        if(data === "" | data === null | data === NaN | data === undefined){
            return ""
        }else {
            console.log(data)
            return data.substr(6,4) + '-' + data.substr(3,2) + '-' +  data.substr(0,2)
        }
        
    }

    const formattedDateToDB = (data) => {
        let dt = data === null ? new Date() : new Date(data)

        dt.setDate(dt.getDate() + 1)

        return dt.toLocaleDateString("pt-BR")        
    }


    function handleSubmit(e) {
        e.preventDefault();        
        const data = {
            _id,
            titulo,
            projeto: projetoID,
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

            api.post(match.params.tarefa_id !== undefined ?'/tarefa/update' : '/tarefa/cadastro', data, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "Token"
                    )}`,
                },
            }).then(resp => {
                alert('Tarefa Salva!');
                history.push(`/tarefas/${projetoID}`)
            }).catch(err => {
                alert('Ocorreu um erro. Tente novamente!')
            });        
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

                    setSolicitanteSelecionado(
                        sessionStorage.getItem("sessionid")
                    );
                    setSolicitante(sessionStorage.getItem("nome"));
                });

            const idBusca = match.params.tarefa_id

            if (idBusca) {
                const tarefaInfo = await api.get("/tarefa/id/" + idBusca, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "Token"
                        )}`,
                    },
                });
                console.log(tarefaInfo.data)
                setTarefa_id(tarefaInfo.data.tarefas.tarefa_id);
                setNomeProjeto(tarefaInfo.data.tarefas.projeto.titulo);
                setTitulo(tarefaInfo.data.tarefas.titulo);
                setStatus(tarefaInfo.data.tarefas.status);
                setSolicitante(tarefaInfo.data.tarefas.solicitante.nome);
                setSolicitanteSelecionado(
                    tarefaInfo.data.tarefas.solicitante._id
                );
                setHoras(tarefaInfo.data.tarefas.horas);
                setPrioridade(tarefaInfo.data.tarefas.prioridade);
                setInicio(tarefaInfo.data.tarefas.inicio);
                setPrazo(tarefaInfo.data.tarefas.prazo);
                setFim(tarefaInfo.data.tarefas.fim);
                setDescricao(tarefaInfo.data.tarefas.descricao);
                set_id(tarefaInfo.data.tarefas._id);
                setResponsavel(tarefaInfo.data.tarefas.desenvolvedor);
                setObservacoes(tarefaInfo.data.tarefas.observacoes);
                setProjetoID(tarefaInfo.data.tarefas.projeto._id);
            } else {
                await api
                    .get(
                        `/projeto/id/${
                            match.params.projeto_id
                        }`,
                        {
                            headers: {
                                Authorization: `Bearer ${sessionStorage.getItem(
                                    "Token"
                                )}`,
                            },
                        }
                    )
                    .then((response) => {
                        setNomeProjeto(response.data.projetos.titulo);
                        setProjetoID(response.data.projetos._id);
                    });
            }
        }
        loadInfo();
    }, []);

    function Titulo() {
        if (tarefa_id) {
            return <h1> <Link to={`/tarefas/${projetoID}`}> <MdKeyboardBackspace color="#4983ee"/> </Link>{" "}Atualizar Tarefa {titulo}</h1>
        } else {
            return <h1><Link to={`/tarefas/${projetoID}`}><MdKeyboardBackspace color="#4983ee" /></Link>{" "}Cadastro Tarefa</h1>
        }
    }

    return (
        <>
            <Titulo />

            <div className="cadastro-container">
            <form onSubmit={handleSubmit}>
            <section className="primeiro">
            <div>
            <label>Título</label>
            <input required type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>
             </div>
             <div>
             <label>Projeto</label>
            <input type="text" value={nomeProjeto} onChange={(e) => setNomeProjeto(e.target.value)}/>
            </div>
            <div>
            <label>Solicitante</label>

            <select required value={solicitante} onChange={handleSolicitante}>
            {responsaveisAPI.map((solres) => (
                <option key={solres._id} name={solres._id}>
                    {" "}
                    {solres.nome}
                </option>
            ))}
            
            </select>
            </div>
            <div>
            <label>Responsável</label>
            <select required onChange={handleResponsavel} value={responsavel.nome}>
            {responsaveisAPI.map((responsavel) => (
                <option
                    key={responsavel._id}
                    name={responsavel._id}
                >
                    {" "}
                    {responsavel.nome}
                </option>
            ))}
            </select>
            </div>            
            </section>
            
            <section className="segundo">
            
            <div>
            <label>Horas</label>
            <input type="number" value={horas} onChange={(e) => setHoras(e.target.value)}/>
            </div>
            <div>
            <label>Início</label>
            <input required type="date" value={formattedDateToPicker(inicio)} onChange={(e) => setInicio(formattedDateToDB(e.target.value))}/>
            </div>
            <div>
            <label>Fim</label>
            <input type="date" value={formattedDateToPicker(fim)} onChange={(e) => setFim(formattedDateToDB(e.target.value))}/>
            </div>
            <div>
            <label>Prazo</label>
            <input required type="date" value={formattedDateToPicker(prazo)} onChange={(e) => setPrazo(formattedDateToDB(e.target.value))}/>
            </div>
                <div>
            <label>Prioridade</label>
            <select required value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
                <option>Alta</option>
                <option>Média</option>
                <option>Baixa</option>
            </select>

            </div>
            <div>
            <label>Status</label>
            <select required value={status} onChange={(e) => setStatus(e.target.value)}>
                <option>Desenho</option>
                <option>Aguardando GMUD</option>
                <option>Desenvolvimento</option>
                <option>Homologando</option>
                <option>Finalizado</option>
            </select>

            </div>
            </section>
            
            <div>
            <label>Descrição</label>
            <textarea rows="4" value={descricao} onChange={(e) => setDescricao(e.target.value)}/>
            </div>

            <div>
            <label>Observações</label>
            <textarea rows="4" value={observacoes} onChange={(e) => setObservacoes(e.target.value)}/>
            </div>
            <button className="button" type="submit">Salvar</button>
  
            </form>

            </div>
        </>
    );
}

export default Tarefas;

import React, { useEffect, useState } from 'react'
import {  Link } from 'react-router-dom'

import api from '../../../../services/api'
import './styles.css'

function Preview(props) {
    const [info, setInfo] = useState({})
    const [observacoes_projetos, setObservacoes_projetos] = useState('')
    const [observacoes_tarefas, setObservacoes_tarefas] = useState('')
    const [status, setStatus] = useState('')
    const [status_projeto, setStatus_projeto] = useState('')

    function handleSubmit() {
        let dataSave = {}
        if (props.dados.tipo === 'projeto') {
            dataSave = props.dados.dados.projetos
            dataSave.observacoes = observacoes_projetos
            setObservacoes_projetos('')
        } else {
            dataSave = props.dados.dados.tarefas
            dataSave.observacoes = observacoes_tarefas
            setObservacoes_tarefas('')
        }

        api.post(
            props.dados.tipo === 'projeto'
                ? '/projeto/update'
                : '/tarefa/update',
            dataSave,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('Token')}`,
                },
            }
        )
            .then((resp) => {
                alert('Salvo!')
            })
            .catch((err) => alert('Ocorreu um erro. Tente novamente!'))
    }

    if (props.dados) {
        if (props.dados.tipo === 'projeto') {
            return (
                <>
                <div className='preview-cadastro'>
                <section>

                    <h4>Projeto: 
                    <Link to={`/projeto/${props.dados.dados.projetos._id}`}> {props.dados.dados.projetos.titulo}
                                    </Link></h4>
                    <h4>Cliente: {props.dados.dados.projetos.cliente.nome}</h4>
                    </section>
                    <section>
                    <div className="status">
                        <label>
                            {' '}
                            <h4>Status: </h4>
                        </label>
                        <select
                            required
                            value={props.dados.dados.projetos.status_projeto}
                            onChange={(e) => {
                                setStatus_projeto(e.target.value)
                                props.dados.dados.projetos.status_projeto =
                                    e.target.value
                            }}
                        >
                            <option>Pré Aprovação</option>
                            <option>Análise de Impacto</option>
                            <option>Aprovado</option>
                            <option>Desenho</option>
                            <option>Desenvolvimento</option>
                            <option>Testes</option>
                            <option>Homologação</option>
                            <option>Pós Implantação</option>
                            <option>Finalizado</option>
                        </select>
                    </div>{' '}
                    <h4>Prazo:</h4> <span>{props.dados.dados.projetos.prazo}</span></section>
                    <h4>Descrição:</h4> <span>{props.dados.dados.projetos.descricao}</span>
                    <h4>Observações:</h4>{' '}
                    <textarea
                        value={
                            observacoes_projetos === ''
                                ? props.dados.dados.projetos.observacoes
                                : observacoes_projetos
                        }
                        onChange={(event) =>
                            setObservacoes_projetos(event.target.value)
                        }
                    />{' '}
                    <center>
                        <button
                            name="alteraProjeto"
                            onClick={handleSubmit}
                            className="button"
                            type="submit"
                        >
                            Salvar
                        </button>
                    </center>
                    </div>
                </>
            )
        } else if (props.dados.tipo === 'tarefa') {
            console.log(props.dados.dados.tarefas)

            return (
                <>
                                <div className='preview-cadastro'>

                    <h4>Tarefa: <Link to={`/tarefa/${props.dados.dados.tarefas.projeto._id}/${props.dados.dados.tarefas._id}`}> {props.dados.dados.tarefas.titulo}</Link></h4>
                    <section><h4>Projeto:  <Link to={`/projeto/${props.dados.dados.tarefas.projeto._id}`}> {props.dados.dados.tarefas.projeto.titulo}</Link></h4></section>
                    <section><label>{' '}<h4>Status: </h4></label>
                        <select
                            required
                            value={props.dados.dados.tarefas.status}
                            onChange={(e) => {
                                setStatus(e.target.value)
                                props.dados.dados.tarefas.status =
                                    e.target.value
                            }}
                        >
                            <option>Desenho</option>
                            <option>Aguardando GMUD</option>
                            <option>Desenvolvimento</option>
                            <option>Homologando</option>
                            <option>Finalizado</option>
                        </select>
                    {' '}
                    <h4>Prazo: </h4>
                    {props.dados.dados.tarefas.prazo}</section>
                    <h4>Descrição: </h4>
                    <span>{props.dados.dados.tarefas.descricao}</span>
                    <h4>Observações: </h4>
                    <textarea
                        value={
                            observacoes_tarefas === ''
                                ? props.dados.dados.tarefas.observacoes
                                : observacoes_tarefas
                        }
                        onChange={(event) =>
                            setObservacoes_tarefas(event.target.value)
                        }
                    />
                    <center>
                        <button
                            name="alteraTarefa"
                            onClick={handleSubmit}
                            className="button"
                            type="submit"
                        >
                            Salvar
                        </button>
                    </center>
                    </div>
                </>
            )
        } else {
            return 'clique em algo'
        }
    } else {
        return 'clique em algo'
    }
}

export default Preview

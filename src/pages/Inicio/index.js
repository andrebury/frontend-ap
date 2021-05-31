import React, { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import './styles.css'
import { Table, Button, Modal, Form } from 'react-bootstrap'
import api from '../../services/api'
import Preview from './components'
import { orderBy } from 'lodash'

//import pt from 'date-fns/locales/pt';

function Inicio() {
    const [tarefas, setTarefas] = useState([])
    const [infoPreview, setInfoPreview] = useState({})
    const [solicitadas, setSolicitadas] = useState([])
    const [observacoes, setObservacoes] = useState('')
    const [show, setShow] = useState(false)
    const [idSelecionado, setIdSelecionado] = useState('')

    function Timeline() {
        const coresArray = [
            `#836FFF`,
            `RoyalBlue`,
            `DarkTurquoise`,
            `PowderBlue`,
        ]
        let datasArray = []
        let pos = 0
        tarefas.map((tarefa) => {
            tarefa.corTimeline = coresArray[pos]
            // console.log(tarefa.corTimeline)
            pos = pos === coresArray.length - 1 ? 0 : pos + 1
        })

        const mesTexto = [
            'jan',
            'fev',
            'mar',
            'abr',
            'mai',
            'jun',
            'jul',
            'ago',
            'set',
            'out',
            'nov',
            'dez',
        ]
        for (let index = 0; index <= 25; index++) {
            const diasAtras = new Date(Date.now())
            diasAtras.setDate(diasAtras.getDate())
            diasAtras.setDate(diasAtras.getDate() + index)

            datasArray.push({
                diaReduzido:
                    (diasAtras.getDate() < 10
                        ? '0' + diasAtras.getDate()
                        : diasAtras.getDate()) +
                    '/' +
                    mesTexto[diasAtras.getMonth()],
                diaTotal:
                    diasAtras.getFullYear() +
                    '-' +
                    (diasAtras.getMonth() + 1 < 10
                        ? '0' + (diasAtras.getMonth() + 1)
                        : diasAtras.getMonth() + 1) +
                    '-' +
                    (diasAtras.getDate() < 10
                        ? '0' + diasAtras.getDate()
                        : diasAtras.getDate()),
                diaSemana: diasAtras.getDay(),
            })
        }
        
        return (
            <>
                <table id="timeline">
                    <thead>
                        <tr>
                            <th style={{ width: 300, fontSize: 16 }}>Tarefa</th>
                            <th style={{ width: 300, fontSize: 16 }}>
                                Projeto
                            </th>
                            {datasArray.map((dia) => {
                                if (
                                    dia.diaSemana === 6 ||
                                    dia.diaSemana === 0
                                ) {
                                    if (datasArray.indexOf(dia) === 0) {
                                        return (
                                            <th
                                                //colspan="1"
                                                style={{ textAlign: 'center' }}
                                            >
                                                Domingo
                                            </th>
                                        )
                                    } else if (dia.diaSemana === 0) {
                                        return <th>Domingo</th>
                                    } else {
                                        return (
                                            <th
                                                //colspan="2"
                                                style={{ textAlign: 'center' }}
                                            >
                                                Sábado
                                            </th>
                                        )
                                    }
                                }

                                if (
                                    dia.diaSemana !== 0 &&
                                    dia.diaSemana !== 6
                                ) {
                                    return (
                                        <th style={{ textAlign: 'center' }}>
                                            {dia.diaReduzido}
                                        </th>
                                    )
                                }
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {tarefas.map((tarefa) => (
                            <tr key={tarefa._id}>
                                <td>
                                    
                                        <Link
                                            id={tarefa._id}
                                            name="tarefa"
                                            onClick={ativaPreview}
                                        >
                                            {tarefa.titulo.length > 50 ? tarefa.titulo.substring(
                                                  0,
                                                  48
                                              ) + '...'
                                            : tarefa.titulo}
                                        </Link>
                                </td>
                                <td>
                                <Link
                                        id={tarefa.projeto._id}
                                        name="projeto"
                                        onClick={ativaPreview}
                                    >
                                        {tarefa.projeto.titulo.length > 50
                                            ? tarefa.projeto.titulo.substring(
                                                  0,
                                                  48
                                              ) + '...'
                                            : tarefa.projeto.titulo}
                                    </Link>
                                </td>
                                {datasArray.map((dia) => {
                                    // console.log('tarefa: ' + tarefa.titulo + ', dia: ' + dia.diaSemana)

                                    if (
                                        dia.diaSemana === 6 ||
                                        dia.diaSemana === 0
                                    ) {
                                        return (
                                            <td
                                                style={{ borderStyle: 'solid',backgroundColor:'gray',color:'#d3d3d3' }}
                                            ></td>
                                        )
                                        // , backgroundColor: 'gray'
                                    }
                                    if (
                                        (dia.diaTotal >=
                                            dataAmericana(tarefa.inicio)) &
                                            (dia.diaTotal <=
                                                dataAmericana(tarefa.prazo)) &&
                                        dia.diaSemana !== 0 &&
                                        dia.diaSemana !== 6
                                    ) {
                                        return (
                                            <td
                                                style={{
                                                    borderStyle: 'none',
                                                    backgroundColor:
                                                        tarefa.corTimeline,
                                                }}
                                            ></td>
                                        )
                                    } else {
                                        return <td></td>
                                    }
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        )
    }

    const dataAmericana = (date) => {
        if (date === undefined || date === '') {
            return date
        } else {
            return (
                date.substring(6, 10) +
                '-' +
                date.substring(3, 5) +
                '-' +
                date.substring(0, 2)
            )
        }
    }

    const dataBrasil = (date) => {
        if (date === undefined || date === '') {
            return date
        } else {
            return (
                date.substring(8, 10) +
                '/' +
                date.substring(5, 7) +
                '/' +
                date.substring(0, 4)
            )
        }
    }

    useEffect(() => {
        async function carrageTarefas() {
            const sessionid = sessionStorage.getItem('sessionid')

            let pendencias = await api.post(
                '/tarefa/info',
                {
                    desenvolvedor: sessionid,
                    status: [
                        'Desenho',
                        'Aguardando GMUD',
                        'Desenvolvimento',
                        'Homologando',
                    ],
                },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            'Token'
                        )}`,
                    },
                }
            )

            let solicitadas = await api.post(
                '/tarefa/info',
                {
                    solicitante: sessionid,
                    status: [
                        'Desenho',
                        'Aguardando GMUD',
                        'Desenvolvimento',
                        'Homologando',
                    ],
                },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            'Token'
                        )}`,
                    },
                }
            )

            //Colocar todas as datas de prazo no formato americano
            solicitadas.data.tarefas.map((dia) => {
                dia.prazo = dataAmericana(dia.prazo)
            })

            pendencias.data.tarefas.map((dia) => {
                dia.prazo = dataAmericana(dia.prazo)
            })

            //ordenar com o lodash por prazo. Data mais próximas até a mais distante
            solicitadas.data.tarefas = orderBy(
                solicitadas.data.tarefas,
                ['prazo'],
                ['asc']
            )
            pendencias.data.tarefas = orderBy(
                pendencias.data.tarefas,
                ['prazo'],
                ['asc']
            )

            //Colocar todas as datas de prazo no formato brasileiro
            solicitadas.data.tarefas.map((dia) => {
                dia.prazo = dataBrasil(dia.prazo)
            })

            pendencias.data.tarefas.map((dia) => {
                dia.prazo = dataBrasil(dia.prazo)
            })

            //setar no state
            setSolicitadas(solicitadas.data.tarefas)
            setTarefas(pendencias.data.tarefas)            
        }
        carrageTarefas()
    }, [])

    async function ativaPreview(e) {
        let name = e.target.name
        let id = e.target.id

        if (e.target) {
            if (e.target.name === 'projeto') {
                console.log('projetos')
                let projetosP = await api.get(`/projeto/id/${id}`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            'Token'
                        )}`,
                    },
                })

                setInfoPreview({ dados: projetosP.data, tipo: name })
            } else if (e.target.name === 'tarefa') {
                let tarefasP = await api.get(`/tarefa/id/${id}`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            'Token'
                        )}`,
                    },
                })

                setInfoPreview({ dados: tarefasP.data, tipo: name })
            } else {
                setInfoPreview({ dados: {}, tipo: 'default' })
            }
        }
    }

    return (
        <>
            <div className="container-inicio">
                <div className="container-timeline">
                    <h2>Planner - Tarefas</h2>
                    <Timeline />
                </div>

                <div className="tarefas-calendario">
                    <div>
                        <h1>Tarefas Solicitadas pelo Usuário</h1>
                        {solicitadas.map((tarefa) => (
                            <div className="tarefa-box">
                                <div className="tarefa-infos">
                                    <h5>
                                        <Link
                                            id={tarefa._id}
                                            name="tarefa"
                                            onClick={ativaPreview}
                                        >
                                            {tarefa.titulo.length > 50 ? tarefa.titulo.substring(
                                                  0,
                                                  48
                                              ) + '...'
                                            : tarefa.titulo}
                                        </Link>
                                    </h5>
                                </div>
                                <p>
                                    <b>Projeto:</b>{' '}
                                    <Link
                                        id={tarefa.projeto._id}
                                        name="projeto"
                                        onClick={ativaPreview}
                                    >
                                        {tarefa.projeto.titulo.length > 50
                                            ? tarefa.projeto.titulo.substring(
                                                  0,
                                                  48
                                              ) + '...'
                                            : tarefa.projeto.titulo}
                                    </Link>
                                </p>
                                <section>
                                    <span>
                                        <b>Prazo:</b> {tarefa.prazo}
                                        <b> Status:</b> {tarefa.status}
                                        <b> Responsável: </b>
                                        {tarefa.desenvolvedor !== undefined
                                            ? tarefa.desenvolvedor.nome
                                            : ''}
                                    </span>
                                </section>
                            </div>
                        ))}
                    </div>
                    <div className="lista-tarefas">
                        <h1>Tarefas Pendentes do Usuário</h1>
                        {tarefas.map((tarefa) => (
                            <div className="tarefa-box">
                                <div className="tarefa-infos">
                                    <h5>
                                        <Link
                                            id={tarefa._id}
                                            name="tarefa"
                                            onClick={ativaPreview}
                                        >
                                            {tarefa.titulo.length > 50 ? tarefa.titulo.substring(
                                                  0,
                                                  48
                                              ) + '...'
                                            : tarefa.titulo}
                                        </Link>
                                    </h5>
                                </div>
                                <p>
                                    <b>Projeto:</b>{' '}
                                    <Link
                                        id={tarefa.projeto._id}
                                        name="projeto"
                                        onClick={ativaPreview}
                                    >
                                        {tarefa.projeto.titulo.length > 50
                                            ? tarefa.projeto.titulo.substring(
                                                  0,
                                                  48
                                              ) + '...'
                                            : tarefa.projeto.titulo}
                                    </Link>
                                </p>

                                <section>
                                    <span>
                                        <b>Prazo:</b> {tarefa.prazo}
                                        <b> Status:</b> {tarefa.status}
                                        <b> Solicitante: </b>
                                        {tarefa.solicitante !== undefined
                                            ? tarefa.solicitante.nome
                                            : ''}
                                    </span>
                                </section>
                            </div>
                        ))}
                    </div>
                    <div className="tarefas-preview">
                        <h1>Informações Detalhadas</h1>
                        <Preview dados={infoPreview} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Inicio

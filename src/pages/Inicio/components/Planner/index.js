import React from 'react'
import {Link} from 'react-router-dom'


function Planner (props){
   
    
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


    const coresArray = [
            `#836FFF`,
            `RoyalBlue`,
            `DarkTurquoise`,
            `PowderBlue`,
        ]
        let datasArray = []
        let pos = 0
        if(props.tarefas){
            props.tarefas.map((tarefa) => {
                tarefa.corTimeline = coresArray[pos]

                pos = pos === coresArray.length - 1 ? 0 : pos + 1
            })
        }
        

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
        if(!props.tarefas ){
            return <div>Carregando</div>
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
                        {props.tarefas.map((tarefa) => (
                            <tr key={tarefa._id}>
                                <td>
                                    
                                        <Link
                                            id={tarefa._id}
                                            name="tarefa"
                                            onClick={props.ativaPreview}
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
                                        onClick={props.ativaPreview}
                                        
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

export default Planner;
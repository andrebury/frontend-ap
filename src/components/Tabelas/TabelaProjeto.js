import React, {useEffect,useState} from 'react';
import {Table} from 'react-bootstrap';
import api from '../../services/api'

function TabelaProjeto() {
  const [projetos, setProjetos] = useState([]);

  function trataData(dataRaw){
    //let dataF = new Date(dataRaw).toLocaleDateString('pt-BR')

    return dataRaw.substr(6,4) + '-' + dataRaw.substr(3,2) + '-' +  dataRaw.substr(0,2)
  }

  useEffect(() => {
    async function carrageProjetos() {
      console.log(projetos)

      const response = await api.get('/projetos')
      console.log(response.data)
      setProjetos(trataData(response.data))
    }
      carrageProjetos();
  },[])
  
  return (
    <Table striped bordered hover responsive="xl">
          <thead>
            <tr>
              <th>#</th>
              <th>Cliente</th>
              <th>Título</th>
              <th>PM</th>
              <th>Funcional</th>
              <th>Prazo</th>
              <th>Prioridade</th>
            </tr>
          </thead>
          <tbody>
          {projetos.map(projeto =>(
            <tr>
              <td>{projeto.projeto_id}</td>
              <td>{projeto.cliente}</td>
              <td>{projeto.titulo}</td>
              <td>{projeto.pm}</td>
              <td>{projeto.funcional}</td>
              <td>{trataData(projeto.prazo)}</td>
              <td>{projeto.prioridade}</td>
            </tr>
          ))}
            
          </tbody>
        </Table>
  );
}

export default TabelaProjeto;


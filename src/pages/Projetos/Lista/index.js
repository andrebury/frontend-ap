import React, {useEffect,useState} from 'react';
import {useHistory} from 'react-router-dom'

import {Table, Button} from 'react-bootstrap';
import api from '../../../services/api'

function ListaProjetos() {
  const history = useHistory();

  const [projetos, setProjetos] = useState([{}]);

  function trataData(dataRaw){
    if(dataRaw){
      return dataRaw.substr(8,2) + '-' + dataRaw.substr(5,2) + '-' +  dataRaw.substr(0,4)
    }else{
      return '00/00/0000'
    }
    
  }

  function handleEntrar(id){
    if(id !== undefined){
      history.push(`/cadastro-projeto?idBusca=${id}`)
    }
  } 
  
  function handleCadastrar(){
    history.push('/cadastro-projeto')
  }
  

  useEffect(() => {
    async function carrageProjetos() {

      const response = await api.get('/projetos')
        .then(response => {
          setProjetos(response.data)
        })
    }
      carrageProjetos();
  },[])

  return (
      <div classname="tabela-lista">
        <p>Lista de Projetos</p>
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
              <th>Visualizar</th>
            </tr>
          </thead>
          <tbody>
          {projetos.map(projeto =>(
            <tr key={projeto._id} >
              <td>{projeto.projeto_id}</td>
              <td>{projeto.cliente === undefined || projeto.cliente === null ? '' : projeto.cliente.nome}</td>
              <td>{projeto.titulo}</td>
              <td>{projeto.pm === undefined || projeto.pm === null ? '' : projeto.pm.nome}</td>
              <td>{projeto.funcional === undefined || projeto.funcional === null ? '' : projeto.funcional.nome}</td>
              <td>{projeto.prazo}</td>
              <td>{projeto.prioridade}</td>
              <td><Button 
                variant="light" 
                size="sm" 
                type="button" 
                name={projeto._id}
                onClick={() => handleEntrar(projeto._id)}>Entrar</Button></td>
            </tr>
          ))}
            
          </tbody>
        </Table>
        <Button type="button" name="tarefa" onClick={handleCadastrar}>Cadastrar</Button>
      </div>
  );
}

export default ListaProjetos;

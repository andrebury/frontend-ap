import React,{useState, useEffect} from 'react';
import api from '../../../services/api'
import {Table, Button,Modal,Form} from 'react-bootstrap';
import {useHistory} from 'react-router-dom'


function Clientes() {
  const history = useHistory();

  const [clientes, setClientes] = useState([])


  useEffect(() => {  
    async function carragaClientes(){
      const response = await api.get('/clientes')
      setClientes(response.data)
      console.log(response.data)
    }


    carragaClientes();
},[])

function handleEntrar(idCliente) {
  
  if(idCliente.length > 10){
    history.push(`/cadastro-cliente?idCliente=${idCliente}`)

  }else{
    history.push(`/cadastro-cliente`)
  }
  
}



  return (
    <>
    <p>Clientes</p>
    <Table striped bordered hover responsive="xl">
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Ramo</th>
          <th>Solicitantes(separados por vírgula)</th>
          <th>Alterar</th>
        </tr>
      </thead>
      <tbody>
      {clientes.map(cliente =>(
        <tr key={cliente._id} >
          <td>{cliente.cliente_id}</td>
          <td>{cliente.nome}</td>
          <td>{cliente.ramo}</td>
          <td>{cliente.solicitantes.map(sol => ' ' + sol + ' ' ).toString()}</td>
          <td><Button 
                variant="light" 
                size="sm" 
                type="button" 
                name={cliente._id}
                onClick={() => handleEntrar(cliente._id)}>Entrar</Button></td>
        </tr>
      ))}
        
      </tbody>
    </Table>
    <Button type="button" name="tarefa" onClick={handleEntrar}>Cadastrar</Button>
</>
  );
}

export default Clientes;

import React, {useEffect,useState} from 'react';
import {Table, Button,Modal,Form} from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import querystring from 'query-string'

import api from '../../../services/api'


function Tarefas() {
  const history = useHistory();

  const [show, setShow] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [nomeProjeto, setNomeProjeto] = useState([]);
  const [observacoes, setObservacoes] = useState('')
  const [idSelecionado, setIdSelecionado] = useState('');
  const [idProjeto, setIdProjeto] = useState('')

  const handleClose = () => setShow(false);

  async function handleSave(e){

    const t = tarefas.filter(tarefa => e.target.name === tarefa._id)
    
    console.log('tarefa_id ' + t[0]._id)
    const data = {
      _id : t[0]._id ,
      projeto: t[0].projeto,
      observacoes : observacoes ,
      cliente: t[0].cliente,
      titulo: t[0].titulo,
      descricao : t[0].descricao,
      solicitante : t[0].solicitante_cliente,
      pm : t[0].pm,
      funcional : t[0].funcional,
      prazo : t[0].prazo,
      inicio : t[0].inicio,
      fim : t[0].fim,
      status : t[0].status,
      horas : t[0].horas,
      prioridade : t[0].prioridade,
      desenvolvedor : t[0].desenvolvedor  
    }

    const response = await api.post('/update/tarefa',data)
    console.log(response)
    console.log(data)
    setShow(false);
    t[0].observacoes = observacoes
  }

  function handleShow(e){
    setShow(true);
    setIdSelecionado(e.target.name)
    console.log('idselect: ' + e.target.name)
    const ob = tarefas.filter(tarefa => tarefa._id === e.target.name)
    const data = new Date()
    const dataStr = (data.getDate() <= 9 ? '0' + data.getDate() : data.getDate())  + '/' + ((data.getUTCMonth() + 1) <= 9 ? '0' + (data.getUTCMonth() + 1) : (data.getUTCMonth() + 1)) + '/' + data.getFullYear() + ' - ' + data.getHours() + ':' + data.getMinutes()
    setObservacoes(ob[0].observacoes + '\n' + dataStr + ': ')
   
  }

  function trataData(dataRaw){
    const dataF = new Date(dataRaw)
    return dataF.toLocaleDateString('pt-BR')
  }

  function handleEntrar(idaTar) {
    console.log('idBusca2: ' + idProjeto)
    console.log('idaTar: ' + idaTar)

    if(idaTar.length > 10){
      history.push(`/cadastro-tarefa?idBusca=${idaTar}&idProjeto=${idProjeto}`)

    }else{
      history.push(`/cadastro-tarefa?idProjeto=${idProjeto}`)
    }
    
  }


  useEffect(() => {
    
    async function carregaTarefas() {
      
      const idBusca = querystring.parse(window.location.search).idBusca
      if(!idBusca){
        history.push('/lista-projetos')
      }
      setIdProjeto(idBusca)
      console.log('idBusca: ' + querystring.parse(window.location.search).idBusca)


      const response = await api.post('/tarefas',{'projeto': idBusca})

      setTarefas(response.data)
      console.log(response.data)
      setObservacoes(response.data.observacoes)
    }
    carregaTarefas();
  },[])

  return (
      <div classname="tabela-lista">
        <p>Tarefas</p>
        <Table striped bordered hover responsive="xl">
          <thead>
            <tr>
              <th>#</th>
              <th>Título</th>
              <th>Projeto</th>
              <th>Desenvolvedor</th>
              <th>Início</th>
              <th>Status</th>
              <th>Prioridade</th>
              <th>Visualizar</th>
              <th>Observações</th>
            </tr>
          </thead>
          <tbody>
          {tarefas.map(tarefa =>(
            <tr key={tarefa._id} >
              <td>{tarefa.tarefa_id}</td>
              <td>{tarefa.titulo}</td>
              <td>{tarefa.projeto === null ? '' : tarefa.projeto.titulo}</td>
              <td>{tarefa.desenvolvedor.nome}</td>
              <td>{tarefa.inicio}</td>
              <td>{tarefa.status}</td>
              <td>{tarefa.prioridade}</td>
              <td><Button 
                variant="light" 
                size="sm" 
                type="button" 
                name={tarefa._id}
                onClick={() => handleEntrar(tarefa._id)}>Entrar</Button></td>
              <td><Button variant="light" size="sm" name={tarefa._id} onClick={handleShow}>Escrever</Button></td>
            </tr>
          ))}
            
          </tbody>
        </Table>
        <Button type="button" name="tarefa" onClick={handleEntrar}>Cadastrar</Button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Observações</Modal.Title>
        </Modal.Header>
        <Modal.Body>Escreva sua nota para a tarefa:</Modal.Body>
        <Modal.Footer>        
            <Form.Control 
              as="textarea"
              rows="5"
              value={observacoes}
              onChange={e => setObservacoes(e.target.value)}/>

          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" name={idSelecionado} onClick={handleSave}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>


      </div>
  );
}
export default Tarefas;


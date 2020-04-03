import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'

import {Form,Button,Col} from 'react-bootstrap';
import api from '../../services/api'
import querystring from 'query-string'


function FormCadastroProjeto({onSubmit}) {
  const history = useHistory();

  const [clientes, setClientes] = useState([]);
  const [titulo,setTitulo] = useState('')
  const [projeto_id,setProjeto_id] = useState('')
  const [solicitante_cliente,setSolicitante_Cliente] = useState('')
  const [funcional,setFuncional] = useState('')
  const [horas,setHoras] = useState(0)
  const [prioridade,setPrioridade] = useState('Média')
  const [prazo,setPrazo] = useState()
  const [descricao,setDescricao] = useState('')
  const [cliente,setCliente] = useState('')
  const [inicio,setInicio] = useState()
  const [pm,setPm] = useState('')
  const [status_projeto,setStatus_projeto] = useState('')
  const [observacoes,setObservacoes] = useState('')
  const [_id,set_id] = useState('')
  const [idBusca, setIdBusca] = useState('')

  function trataData(dataRaw){
    let dataF = new Date(dataRaw).toLocaleDateString('pt-BR')

    return dataRaw.substr(6,4) + '-' + dataRaw.substr(3,2) + '-' +  dataRaw.substr(0,2)
  }

  async function handleSave(e){
    if(idBusca !== undefined){


      await api.post('/update/projeto', {
        _id,
        titulo,
        status_projeto,
        cliente,
        solicitante_cliente,
        funcional,
        horas,
        prioridade,
        inicio,
        prazo,
        descricao,
        pm,
        observacoes
      })
      history.push('/lista-projetos');

    }
    else
    {
      await api.post('/cadastro/projeto', {
        titulo,
        status_projeto,
        cliente,
        solicitante_cliente,
        funcional,
        horas,
        prioridade,
        inicio,
        prazo,
        descricao,
        pm,
        observacoes
    })
      history.push('/lista-projetos');
      
    }
  }


  async function HandleTarefa(e) {
    history.push(`/tarefas/idBusca=${idBusca}`);
  };


  useEffect(() => {
    
    async function loadInfo() {
      const responseClientes = await api.get('/clientes')
      setClientes(responseClientes.data);

      const values = querystring.parse(window.location.search)
      const idBusca = values.idBusca
      setIdBusca(idBusca)

      console.log(window.location.search);
      console.log(values.idBusca)
      
      
      
      
      sessionStorage.removeItem('idBusca')
      

      if(idBusca){
        const projetoInfo = await api.get(`/projeto/${idBusca}`)
        console.log(projetoInfo.data)
        
        setTitulo(projetoInfo.data.titulo)
        setStatus_projeto(projetoInfo.data.status_projeto)
        setCliente(projetoInfo.data.cliente.nome)
        setSolicitante_Cliente(projetoInfo.data.solicitante_cliente)
        setFuncional(projetoInfo.data.funcional)
        setHoras(projetoInfo.data.horas)
        setPrioridade(projetoInfo.data.prioridade)

        setInicio(projetoInfo.data.inicio)
        setPrazo(projetoInfo.data.prazo)
      

        setDescricao(projetoInfo.data.descricao)
        setPm(projetoInfo.data.pm)
        setObservacoes(projetoInfo.data.observacoes)
        setProjeto_id(projetoInfo.data.projeto_id)
        set_id(projetoInfo.data._id)
        sessionStorage.removeItem('idBusca')
        
      }

    }
      loadInfo();
      
  },[])



  function Tarefas(){  
    if(_id.length > 10){
      return <Button type="button" name="tarefa" onClick={HandleTarefa}>Tarefas</Button>
    } else {
      return ''
      
    }
  }

  function Titulo(){
    if(projeto_id){
      return <p>Atualizar Projeto {projeto_id}</p>
    }else{
      return <p>Cadastro Projetos </p>
    }
  }

    return (
      <>
      <div>
        <Titulo/>
      </div>
     
      <div>
        <Form noValidate onSubmit={handleSave}>

        <Form.Row>
          <Form.Group as={Col} controlId="titulo">
            <Form.Label>Título</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Título do Projeto"
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
            />
        </Form.Group>


        <Form.Group as={Col}  controlId="cliente">
          <Form.Label>Cliente</Form.Label>
          <Form.Control 
            as="select" 
            onChange={e => setCliente(e.target.value)}
            value={cliente}>
            <option>Escolha...</option>
            {clientes.map(cliente =>(
              <option key={cliente._id}> { cliente.nome }</option>
            ))}
          </Form.Control>
        </Form.Group>


        <Form.Group as={Col} controlId="status_projeto">
          <Form.Label>Prioridade</Form.Label>
          <Form.Control 
          as="select"
          value={status_projeto}
          onChange={e => setStatus_projeto(e.target.value)}>
            <option>Aprovado</option>
            <option>Desenho</option>
            <option>Desenvolvimento</option>
            <option>Testes</option>
            <option>Homologação</option>
            <option>Pós Implantação</option>
            <option>Finalizado</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col}  controlId="solicitante_cliente">
          <Form.Label>Cliente Solicitante</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Cliente Solicitante" 
            required 
            value={solicitante_cliente}
            onChange={e => setSolicitante_Cliente(e.target.value)}/>
          <Form.Control.Feedback type="invalid">
            Informe o Cliente Solicitante
          </Form.Control.Feedback>
        </Form.Group>


        <Form.Group as={Col} controlId="pm">
          <Form.Label>PM</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="PM" 
            required 
            value={pm.nome}
            onChange={e => setPm(e.target.value)}/>
        </Form.Group>


        <Form.Group as={Col} controlId="funcional">
          <Form.Label>Funcional</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Funcional" 
            required
            value={funcional.nome}
            onChange={e => setFuncional(e.target.value)}/>
        </Form.Group>
        </Form.Row>




        <Form.Row>
        <Form.Group as={Col} controlId="horas">
          <Form.Label>Horas</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Horas" 
            required 
            value={horas}
            onChange={e => setHoras(e.target.value)}/>
        </Form.Group>

        <Form.Group as={Col} controlId="prioridade">
          <Form.Label>Prioridade</Form.Label>
          <Form.Control 
          as="select"
          value={prioridade}
          onChange={e => setPrioridade(e.target.value)}>
            <option>Alta</option>
            <option>Média</option>
            <option>Baixa</option>
          </Form.Control>
        </Form.Group>
        </Form.Row>



        <Form.Row>
        <Form.Group as={Col} controlId="inicio">
          <Form.Label>Início</Form.Label>
          <Form.Control 
            type="date" 
            placeholder="Início" 
            required
            value={inicio}
            onChange={e => setInicio(e.target.value)}/>
            
        </Form.Group>


          <Form.Group as={Col} controlId="prazo">
            <Form.Label>Prazo</Form.Label>
            <Form.Control 
              type="date" 
              placeholder="Prazo" 
              required
              value={prazo}
              onChange={e => setPrazo(e.target.value)}/>
              
          </Form.Group>
        </Form.Row>


        <Form.Row>
          <Form.Group  as={Col} controlId="descricao">
            <Form.Label>Descrição</Form.Label>
            <Form.Control 
              as="textarea" 
              rows="5"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}/>
          </Form.Group>
        </Form.Row>






        <Form.Row>
          <Form.Group  as={Col} controlId="observacoes">
            <Form.Label>Observações</Form.Label>
            <Form.Control 
              as="textarea"
              rows="5"
              value={observacoes}
              onChange={e => setObservacoes(e.target.value)}/>
          </Form.Group>
        </Form.Row>


        <Col md={{ span: 6, offset: 3 }}><Button type="submit">Salvar</Button></Col>
        <br></br>

        <Col md={{ span: 6, offset: 3 }}><Tarefas/></Col>

    </Form>
      </div>
      </>
 );
}

export default FormCadastroProjeto;
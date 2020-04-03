import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'

import {Form,Button,Col} from 'react-bootstrap';
import api from '../../services/api'
import querystring from 'query-string'




function FormCadastroTarefa() {
  const history = useHistory();

  const [titulo,setTitulo] = useState('')
  const [tarefa_id,setTarefa_id] = useState('')
  const [solicitante,setSolicitante] = useState('')
  const [projeto,setProjeto] = useState('')
  const [horas,setHoras] = useState(0)
  const [prioridade,setPrioridade] = useState('Média')
  const [prazo,setPrazo] = useState()
  const [descricao,setDescricao] = useState('')
  const [desenvolvedor,setDesenvolvedor] = useState('')
  const [inicio,setInicio] = useState()
  const [fim,setFim] = useState('')
  const [status,setStatus] = useState('Desenho')
  const [_id,set_id] = useState('')
  const [nomeProjeto,setNomeProjeto] = useState('')
  const [observacoes,setObservacoes] = useState('')

  function trataData(dataRaw){
    let dataF = new Date(dataRaw).toLocaleDateString('pt-BR')

    return dataF.substr(6,4) + '-' + dataF.substr(3,2) + '-' +  dataF.substr(0,2)
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      _id,
      titulo,
      projeto,
      solicitante,
      desenvolvedor,
      inicio,
      fim,
      status,
      prazo,
      horas,
      descricao,
      prioridade,
      observacoes
    }

    if(querystring.parse(window.location.search).idBusca !== undefined){
      
      await api.post('/update/tarefa', data)
    }
    else{
      await api.post('/cadastro/tarefa', data)
    }
  };


  useEffect(() => {
    async function loadInfo() {

      const idBusca = querystring.parse(window.location.search).idBusca

      if(idBusca){
        const tarefaInfo = await api.get('/tarefa/' + idBusca)
        setTarefa_id(tarefaInfo.data.tarefa_id)
        setNomeProjeto(tarefaInfo.data.projeto.titulo)
        setTitulo(tarefaInfo.data.titulo)
        setStatus(tarefaInfo.data.status)
        setSolicitante(tarefaInfo.data.solicitante)
        setHoras(tarefaInfo.data.horas)
        setPrioridade(tarefaInfo.data.prioridade)
        setInicio(trataData(tarefaInfo.data.inicio))
        setPrazo(trataData(tarefaInfo.data.prazo))
        setFim(trataData(tarefaInfo.data.fim))
        setDescricao(tarefaInfo.data.descricao)
        set_id(tarefaInfo.data._id)
        setDesenvolvedor(tarefaInfo.data.desenvolvedor)
        setObservacoes(tarefaInfo.data.observacoes)
        console.log('update')
        
        }else{
          sessionStorage.removeItem('update')
        }
    }
      loadInfo();
  },[])

  function Titulo(){
    if(tarefa_id){
      return <p>Atualizar Tarefa {tarefa_id}</p>
    }else{
      return <p>Cadastro Tarefa </p>
    }
  }

    return (
      <>
      <div>
        <Titulo/>
      </div>
        <div>
            <Form noValidate onSubmit={handleSubmit}>

            <Form.Row>
            <Form.Group as={Col} controlId="titulo">
                <Form.Label>Título</Form.Label>
                <Form.Control
                required
                type="text"
                placeholder="Título da Tarefa"
                value={titulo}
                onChange={e => setTitulo(e.target.value)}
                />
            </Form.Group>


            <Form.Group as={Col}  controlId="projeto">
            <Form.Label>Projeto</Form.Label>
            <Form.Control
                type="text"
                value={nomeProjeto}
                />
            </Form.Group>



            <Form.Group as={Col}  controlId="solicitante">
            <Form.Label>Solicitante</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="Solicitante" 
                required 
                value={solicitante}
                onChange={e => setSolicitante(e.target.value)}/>
            <Form.Control.Feedback type="invalid">
                Informe o Solicitante
            </Form.Control.Feedback>
            </Form.Group>

            </Form.Row>
            <Form.Row>

            <Form.Group as={Col} controlId="pm">
            <Form.Label>Desenvolvedor</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="Desenvolvedor" 
                required 
                value={desenvolvedor.nome}
                onChange={e => setDesenvolvedor(e.target.value)}/>
            </Form.Group>


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


            <Form.Group as={Col} controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Control 
            as="select"
            value={status}
            onChange={e => setStatus(e.target.value)}>
                <option>Desenho</option>
                <option>Aguardando GMUD</option>
                <option>Desenvolvimento</option>
                <option>Homologando</option>
                <option>Finalizado</option>
            </Form.Control>
            </Form.Group>
            </Form.Row>



            <Form.Row>
            <Form.Group as={Col} controlId="inicio">
            <Form.Label>Início</Form.Label>
            <Form.Control 
                type="date" 
                required
                value={inicio}
                onChange={e => setInicio(e.target.value)}/>
                
            </Form.Group>

            <Form.Group as={Col} controlId="fim">
            <Form.Label>Fim</Form.Label>
            <Form.Control 
                type="date" 
                required
                value={fim}
                onChange={e => setFim(e.target.value)}/>            
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


        </Form>
    </div>
    </>
 );
}

export default FormCadastroTarefa;
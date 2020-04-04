import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import {Form, option,Button,Col} from 'react-bootstrap';
import api from '../../../services/api'
import querystring from 'query-string'


function CadastroCliente() {
    const history = useHistory();

    const [cliente, setClientes] = useState('')
    const [cliente_id, setCliente_id] = useState('')
    const [solicitantes, setSolicitantes] = useState('')
    const [nome, setNome] = useState('')
    const [ramo, setRamo] = useState('')
    const [validated, setValidated] = useState('')
    const [_id, set_id] = useState('')

    
    async function handleSubmit(e){
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
        }
        setValidated(true);
        e.preventDefault();
        const idCliente = querystring.parse(window.location.search).idCliente
        const data = {
            _id,
            cliente_id,
            nome,
            solicitantes,
            ramo,
        }
        if(form.checkValidity() !== false){
            if(idCliente !== undefined){
        
                await api.post('/update/cliente', data)
              }
              else{

                await api.post('/cadastro/cliente', data)
              }
              history.push(`/clientes`);
            }
    }


    useEffect(() => {  
        async function carregaClientes(){           
            
            const idCliente = querystring.parse(window.location.search).idCliente
            setCliente_id(idCliente)
            
            if(idCliente){
                const response = await api.get(`cliente/${idCliente}`)
                setClientes(response.data)
                setSolicitantes(response.data.solicitantes.map(sol => ' ' + sol + ' ' ).toString())
                setNome(response.data.nome)
                setRamo(response.data.ramo)
                set_id(response.data._id)
                setCliente_id(response.data.cliente_id)
            }    
    }


        carregaClientes();
    },[])
    
    function Titulo(){
        if(cliente_id){
          return <p>Atualizar Cliente {nome}</p>
        }else{
          return <p>Cadastro Cliente </p>
        }
      }
    
    return (
        <>
        <Titulo/>
        
        
            <Form noValidate onSubmit={handleSubmit} validated={validated} >

            <Form.Row>
            <Form.Group as={Col} controlId="nome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                required
                type="text"
                placeholder="Nome do Cliente"
                value={nome}
                onChange={e => setNome(e.target.value)}
                required/>
            <Form.Control.Feedback type="invalid" >
              Digite o Nome do Cliente
          </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="ramo">
                <Form.Label>Ramo</Form.Label>
                <Form.Control
                required
                type="text"
                placeholder="Ramo do Cliente"
                value={ramo}
                onChange={e => setRamo(e.target.value)}
                required/>
            <Form.Control.Feedback type="invalid" >
              Digite o Ramo do Cliente
          </Form.Control.Feedback>
            </Form.Group>
            </Form.Row>

            <Form.Row>

            <Form.Group as={Col}  controlId="solicitantes">
            <Form.Label>Solicitante</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="Solicitantes" 
                required 
                value={solicitantes}
                onChange={e => setSolicitantes(e.target.value)} required/>
            <Form.Control.Feedback type="invalid">
                Informe os Solicitantes separados por vírgula
            </Form.Control.Feedback>
            </Form.Group>
            </Form.Row>
            <Col md={{ span: 6, offset: 3 }}><Button type="submit">Salvar</Button></Col>
            <br></br>
        </Form>
        </>
    )
}

export default CadastroCliente;
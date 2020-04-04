import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import {Form, option,Button,Col} from 'react-bootstrap';

import api from '../../../services/api'

function CadastroUsuario() {
  const history = useHistory();

  const [nome,setNome] = useState('')
  const [funcao,setFuncao] = useState('Desenvolvedor')
  const [email,setEmail] = useState('')
  const [senha,setSenha] = useState(0)
  const [validated, setValidated] = useState(false);

  async function handleAddProjeto(data) {

  }

  async function handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    //event.preventDefault();
    if(form.checkValidity() !== false){
      const data = {
          nome,
          funcao,
          email,
          senha,
      }

      const response = await api.post('/cadastro/usuario', data)
      console.log(response.data)
      history.push('/home');
    }
};

  return (
      <>
      <div>
        <p>Cadastro Usuário</p>
      </div>
      <div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="nome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Nome"
              onChange={e => setNome(e.target.value)} required
            />
        </Form.Group>


        <Form.Group as={Col}  md="6" controlId="funcao">
          <Form.Label>Função</Form.Label>
          <Form.Control 
            as="select" 
            onChange={e => setFuncao(e.target.value)}
            value={funcao} required>
            <option>Desenvolvedor</option>
            <option>PM</option>
            <option>Funcional</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid" >
            Escolha a Função
          </Form.Control.Feedback>
        </Form.Group>



      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="6" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Email" 
            required 
            onChange={e => setEmail(e.target.value)} required/>
          <Form.Control.Feedback type="invalid" >
          Escreva o Email
          </Form.Control.Feedback>
        </Form.Group>


        <Form.Group as={Col} md="6" controlId="senha">
          <Form.Label>Senha</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Senha" 
            required 
            onChange={e => setSenha(e.target.value)} required/>
            <Form.Control.Feedback type="invalid" >
            Digite a senha
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>

      <Button type="submit">Cadastrar</Button>
    </Form>
      </div>

    </>
  );
}

export default CadastroUsuario;

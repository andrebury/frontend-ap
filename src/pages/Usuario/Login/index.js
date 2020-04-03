import React, {useState, useEffect} from 'react';
import './styles.css'
import api from '../../../services/api'
import ehAutenticado from '../../../services/auth'
import {Form, Button,Container,Row,Col} from 'react-bootstrap';
import {useHistory} from 'react-router-dom'

function Login() {
  
  const [email, setEmail] = useState([]);
  const [senha, setSenha] = useState([]);

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await api.post('/usuario',{email : email, senha : senha})

    if(response.data.length !== 0){
      
      alert("Você está logado " + response.data[0].nome)
      sessionStorage.setItem('nome', response.data[0].nome)
      sessionStorage.setItem('sessionid',response.data[0]._id)
      
      // history.push('/home')
      window.location.href='/home';
      
    }else{
      alert('Usuário ou senha Inválidos')
    }

  }
  function handleCadastro(e){
    history.push('/cadastro-usuario')
  }

  useEffect(() => {
    function autenticado(){
      if(ehAutenticado()){
        window.location.href='/home';
      }
    }
    autenticado()
  },[])
  return (
    <div className="Login-form">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <p align="left"><Form.Label>Email</Form.Label></p>
          <Form.Control 
            type="email" 
            placeholder="Digite seu email cadastrado" 
            onChange={e => setEmail(e.target.value)}
            />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <p align="left"><Form.Label>Senha</Form.Label></p>
          <Form.Control 
            type="password" 
            placeholder="Digite a senha" 
            onChange={e => setSenha(e.target.value)}
            />
        </Form.Group>
          <Container>
            <Row>
              <Col md={2}><Button variant="primary" type="button" styles='margin-right: 10px' onClick={handleCadastro}>Cadastrar</Button></Col>
              <Col md={{ span: 4, offset: 4 }}><Button variant="primary" type="submit">Entrar</Button></Col>
            </Row>
          </Container>
      </Form>
    </div>
  );
}

export default Login;

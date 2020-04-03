import React, {useState, useEffect}  from 'react';
import './App.css';
import Routes from './routes'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';


function App() {
  const [nome, setNome] = useState('')
  function handleLogout(e){
    sessionStorage.removeItem('sessionid')
    sessionStorage.removeItem('nome')
  }
  sessionStorage.getItem('nome')

  function loadInfo() {
    setNome(sessionStorage.getItem('nome'))
  }
  useEffect(() => {

    loadInfo();
    

  },[])

  const Usuario = () => {
    if(nome !== null){
      return ( <>Usuário: <a onClick={handleLogout} href='/'>{nome}</a></>)
    }
    else{
      return ''
    }
  }

  return (
    <div className="App">
     
     <div className="container">
     <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/home"><h3>Acompanhamento de Projetos</h3></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Início</Nav.Link>
            <NavDropdown title="Projetos" id="basic-nav-dropdown">
              <NavDropdown.Item href="/cadastro-projeto">Novo Projeto</NavDropdown.Item>
              <NavDropdown.Item href="/lista-projetos">Lista Projetos</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/arquivos">Arquivos</Nav.Link>
          </Nav>
          {/* <Form inline onSubmit={handlesubmit}>
            <FormControl 
              type="text" 
              placeholder="Buscar Projeto" 
              className="mr-sm-2"
              onChange={handleChange}/>          
              <Button variant="outline-success" type="submit">Buscar</Button>     
          </Form> */}
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  <Usuario/>
                </Navbar.Text>
              </Navbar.Collapse>
        </Navbar.Collapse>
      </Navbar>
      <div className="content">
        <Routes/>
      </div>
      </div>
    </div>
  );
}

export default App;

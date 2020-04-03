import React , {useState} from 'react';
import {Navbar, Nav, Form, Button, NavDropdown, FormControl} from 'react-bootstrap';


function Superiornavbar({history}) {
  const [projetoid, setProjetoid] = useState();

  function handleSubmit(e) {
    sessionStorage.setItem('idBusca', projetoid)

    history.push('/lista-projetos')
  }


  return (
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
          <Form inline onSubmit={handleSubmit}>
            <FormControl 
              type="text" 
              placeholder="Buscar Projeto" 
              className="mr-sm-2"
              onChange={e => setProjetoid(e.target.value)} />
              <Button variant="outline-success" type="submit">Buscar</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
  );
}

export default Superiornavbar;


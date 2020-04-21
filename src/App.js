import React, { useState, useEffect } from "react";
import "./App.css";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Routes from "./routes";

function App() {
  const [nome, setNome] = useState("");
  function handleLogout(e) {
    sessionStorage.removeItem("sessionid");
    sessionStorage.removeItem("nome");
  }
  sessionStorage.getItem("nome");

  function loadInfo() {
    setNome(sessionStorage.getItem("nome"));
  }
  useEffect(() => {
    loadInfo();
  }, []);

  const Usuario = () => {
    if (nome !== null) {
      return (
        <>
          Usuário:{" "}
          <a onClick={handleLogout} href="/">
            {nome}
          </a>
        </>
      );
    } else {
      return "";
    }
  };
  const NavbarSuperior = () => {
      if(window.location.pathname !== '/' & window.location.pathname !== '/cadastro-usuario'){
        return (
                <>
                <Navbar bg="light" expand="xl" fixed="top">
                <Navbar.Brand href="/home">
                    <h3>Acompanhamento de Projetos</h3>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/home">Início</Nav.Link>
                    
                    <NavDropdown title="Projetos" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/cadastro-projeto">
                        Novo Projeto
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/lista-projetos">
                        Lista Projetos
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/arquivos">Arquivos</Nav.Link>
                    <Nav.Link href="/clientes">Clientes</Nav.Link>
                    <Nav.Link href="/relatorio">Relatorios</Nav.Link>
                    </Nav>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <Usuario />
                    </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar.Collapse>
                </Navbar>
                </>
            )
      }else{
        return (
                <>
                    <Navbar bg="light" expand="xl" fixed="top">
                    <Navbar.Brand href="/home">
                        <h3>Acompanhamento de Projetos</h3>
                    </Navbar.Brand>
                    </Navbar>
                </>
      )
      }
      
  }


  return (
    <div className="App">
        <NavbarSuperior/>
          <Routes />
    </div>
  );
}

export default App;

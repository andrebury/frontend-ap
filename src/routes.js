import { BrowserRouter, Switch, Route , Redirect} from 'react-router-dom';
import React from 'react';
import ehAutenticado from './services/auth'
import Login from './pages/Usuario/Login';
import Arquivos from './pages/Arquivos';
import Clientes from './pages/Clientes/Lista';
import CadastroClientes from './pages/Clientes/Cadastro';

import CadastroProjetos from './pages/Projetos/Cadastro';
import CadastroUsuario from './pages/Usuario/Cadastro';

import ListaProjetos from './pages/Projetos/Lista';
import Tarefas from './pages/Tarefas/Lista';
import CadastroTarefa from './pages/Tarefas/Cadastro';
import Inicio from './pages/Inicio';


const PrivateRoute = ({component: Component, ...rest }) => (
    <Route { ...rest } render={props => (
        ehAutenticado() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname: '/', state: { from: props.location } }} />
        )
    )} />
    )

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <PrivateRoute path="/arquivos" component={Arquivos} />
                <PrivateRoute path="/clientes" component={Clientes} />
                <PrivateRoute path="/cadastro-cliente" component={CadastroClientes} />

                <Route path="/cadastro-usuario" component={CadastroUsuario} />

                <PrivateRoute path="/cadastro-projeto" component={CadastroProjetos} />
                <PrivateRoute path="/lista-projetos" component={ListaProjetos} />
                <PrivateRoute path="/projeto/:projeto_id" component={CadastroProjetos} />


                <PrivateRoute path="/tarefas/:projeto_id" component={Tarefas} />
                <Route path="/cadastro-tarefa/:projeto_id" component={CadastroTarefa} />
                <Route path="/tarefa/:projeto_id/:tarefa_id" component={CadastroTarefa} />
                
                <PrivateRoute path="/home" component={Inicio} />
            </Switch>
        
        </BrowserRouter>
    );
}

export default Routes;
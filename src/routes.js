import { BrowserRouter, Switch, Route , Redirect} from 'react-router-dom';
import React from 'react';
import ehAutenticado from './services/auth'
import Login from './pages/Usuario/Login';
import Arquivos from './pages/Arquivos';
import Clientes from './pages/Clientes';
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
                <Route path="/cadastro-usuario" component={CadastroUsuario} />

                <PrivateRoute path="/cadastro-projeto" component={CadastroProjetos} />
                <PrivateRoute path="/lista-projetos" component={ListaProjetos} />
                <PrivateRoute path="/projetos/:projeto_id" component={ListaProjetos} />


                <PrivateRoute path="/tarefas" component={Tarefas} />
                <Route path="/cadastro-tarefa" component={CadastroTarefa} />

                <PrivateRoute path="/home" component={Inicio} />
            </Switch>
        
        </BrowserRouter>
    );
}

export default Routes;
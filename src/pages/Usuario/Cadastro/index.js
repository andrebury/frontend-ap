import React from 'react';
import {useHistory} from 'react-router-dom'

import FormCadastroUsuario from '../../../components/Formularios/FormCadastroUsuario'

import api from '../../../services/api'

function CadastroUsuario() {
  const history = useHistory();

  async function handleAddProjeto(data) {
    const response = await api.post('/cadastro/usuario', data)
    console.log(response.data)
    history.push('/home');
  }

  return (
      <>
      <div>
        <p>Cadastro Usuário</p>
      </div>
      <FormCadastroUsuario onSubmit={handleAddProjeto} />

    </>
  );
}

export default CadastroUsuario;

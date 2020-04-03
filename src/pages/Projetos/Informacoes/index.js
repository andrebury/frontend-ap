import React from 'react';
import {useHistory} from 'react-router-dom'

import './styles.css'
import FormInfoProjeto from '../../../components/Formularios/FormInfoProjeto'

import api from '../../../services/api'

function CadastroProjetos() {
  const history = useHistory();

  async function handleAddProjeto(data) {
    const response = await api.post('/cadastro/projeto', data)
    console.log(response)
    history.push('/lista-projetos');
  }

  return (
      <>
      <div>
        <p>Informações do Projeto</p>
      </div>
      <FormInfoProjeto onSubmit={handleAddProjeto} />

    </>
  );
}

export default CadastroProjetos;

import React from 'react';

const Condominio = ({ nome, cnpj, endereco, responsavel, children }) => {
  const nomeContent = nome ? (
    <t>
      <b>Condomínio </b>
      <ul>
        <b>Nome: </b> {nome} <br />
        <b>CNPJ: </b> {cnpj} <br />
        <b>Endereço </b> {endereco}
      </ul>
    </t>
  ) : null;

  const responsavelContent = responsavel ? (
    <t>
      <b>Responsável </b> {responsavel}
    </t>
  ) : null;

  return (
    <ui>
      <header>
        <ui>
        </ui>
      </header>
      <content>
        <card>
          <ui>
            {nomeContent}
            {responsavelContent}
            {children}
          </ui>
        </card>
      </content>
    </ui>
  );
};

export default Condominio;

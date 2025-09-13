import React from 'react';

const Cliente = ({ nome, endereco, children }) => {
  const nomeContent = nome ? (
    <t>
      <b>Nome </b> {nome}
    </t>
  ) : null;

  const enderecoContent = endereco ? (
    <t>
      <b>Endereço </b>
      {endereco}
    </t>
  ) : null;

  return (
    <ui>
      <header>
        <ui>
          Cliente
        </ui>
      </header>
      <content>
        <card>
          <ui>
            {nomeContent}
            {enderecoContent}
            {children}
          </ui>
        </card>
      </content>
    </ui>
  );
};

export default Cliente;

import React from 'react';

const DocTitle = ({ subtitle, emissao, validade, children }) => {
  const subtitleContent = subtitle ? (
    <t style={{ fontWeight: 700, color: 'var(--sv-azul-bebe)' }}>
      {subtitle}
    </t>
  ) : null;

  return (
    <>
      {subtitleContent}
      <t style={{ fontWeight: 700, color: '#003b6b' }}>
        {children}
      </t>
      <t id="doc_id" style={{
        background: '#fff',
        width: '100%',
        padding: '.2em',
        margin: '.2em 0 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '1em',
        fontSize: '.8em'
      }}>
        <b>Data de Emissão: </b>
        <t>{emissao}</t>
        <t style={{ fontWeight: 700, padding: '0 .5em' }}> | </t>
        <b>Validade da Proposta: </b>
        <t>{validade}</t>
      </t>
    </>
  );
};

export default DocTitle;

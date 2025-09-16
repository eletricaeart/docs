import React from 'react';

const DocTitle = ({ subtitle, emissao, validade, children }) => {
  const titleStyle = {
    fontWeight: 700,
    color: '#003b6b',
  };

  const subtitleStyle = {
    fontWeight: 700,
    color: 'var(--sv-azul-bebe)',
  };

  const detailsStyle = {
    background: '#fff',
    width: '100%',
    padding: '0.2em',
    margin: '0.2em 0 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    gap: '1em',
    fontSize: '0.8em',
  };

  const separatorStyle = {
    fontWeight: 700,
    padding: '0 0.5em',
  };

  return (
    <div className="doc-title">
      {subtitle && (
        <p style={subtitleStyle}>
          {subtitle}
        </p>
      )}
      <p style={titleStyle}>
        {children}
      </p>
      <div id="doc_id" style={detailsStyle}>
        <b>Data de Emissão: </b>
        <span>{emissao}</span>
        <span style={separatorStyle}> | </span>
        <b>Validade da Proposta: </b>
        <span>{validade}</span>
      </div>
    </div>
  );
};

export default DocTitle;

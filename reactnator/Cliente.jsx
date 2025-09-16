import React from 'react';

const Cliente = ({ nome, endereço, children }) => {
  return (
    // The root element in the original script was <ui>, replaced by a div.
    <div className="cliente-container">
      <header className="cliente-header">
        {/* This inner <ui> tag is also replaced by a div */}
        <div>
          Cliente
        </div>
      </header>
      {/* The <content> tag is replaced by a div */}
      <div className="cliente-content">
        {/* The <card> tag is replaced by a div */}
        <div className="card">
          {/* Final <ui> tag replaced by a div */}
          <div>
            {nome && (
              <p>
                <b>Nome: </b> {nome}
              </p>
            )}
            {endereço && (
              <p>
                <b>Endereço: </b> {endereço}
              </p>
            )}
            {/* Render any other nested elements */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cliente;

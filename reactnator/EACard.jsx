import React from 'react';

const EACard = ({ section }) => {
  // Paths assuming the 'assets' folder is moved to 'public/assets' in a typical React setup.
  const eaLogos = {
    local: "/assets/eaLogos/ea300.png",
    name: "/assets/eaLogos/ea-Name.png",
  };

  const bgs = {
    bg4: "/assets/bgs/bg4.png",
  };

  const eaCardStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800&family=Poppins:wght@500;700;800;900&display=swap');
    
    [data-section="dual"] {
      display: flex;
      flex-direction: row;
    }
    [data-section="dual"] > * {
      flex: 1;
    }
    
    .ea-card {
      background: var(--card-lv1);
      background: var(--sv-sombra-azul);
      color: var(--appbar-title);
      font-size: 2.5vw;
      display: grid !important;
      grid-template-columns: .35fr .65fr;
      width: 100%;
      aspect-ratio: 3.8/1;
      padding: 1vw;
      inset: 0;
      color: #f5f5f5;
      filter: var(--appbar-filter-shadow);
    }
    .ea-card * {
      font-family: "poppins" !important;
    }
    .ea-card .ea-logo {
      display: flex;
      height: 100%;
      aspect-ratio: 1;
    }
    .ea-logo .content {
      align-items: center;
    }
    .ea-card .ea-logo img {
      width: 100%;
      aspect-ratio: 1;
      border-radius: 100vw;
      border: #0003 solid .10em;
    }
    .ea-card > .description {
      display: flex;
      flex-direction: column; /* Changed to column for better structure */
      width: 100%;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 2.25vw;
      height: 95%;
      aspect-ratio: 1.8 / 1;
    } 
    .ea-card > .description h1 {
      margin: 0;
      padding-bottom: 0.5em;
    }
    .ea-name {
      display: flex;
      width: 100%;
    }
    .ea-name > img {
      width: 100%;
    }
    .ea-card > .description .t-block {
      display: block;
    }
  `;

  const testStyle = `
    .ea-card[data-section="dual"] {
      background-image: url("${bgs.bg4}");
      background-color: #0009;
      background-size: cover;
    }
  `;

  return (
    <div className="ea-card" data-section={section}>
      <style>{eaCardStyle}</style>
      <style>{testStyle}</style>
      <div className="ea-logo">
        <div className="content">
          <img 
            src={eaLogos.local}
            alt="ea-logo" 
          />
        </div>
      </div>
      <div className="description">
        <div className="ea-name">
          <img 
            src={eaLogos.name}
            alt="ea-Name" 
          />
        </div>
        <h5>
          CNPJ 32.858.892/0001-52 - IM 67358/0001
        </h5>
        <p className="t-block">
          Rua José Alves Maciel, 40 - Aviação <br />
          Praia Grande - São Paulo - SP - Cep 11702-440
        </p>
        <p className="t-block">
          <a href="tel:+5513997685853">
            <strong>Fone </strong> ( 13 ) 99768-5853 <br />
          </a>
          <a href="https://wa.me/5513997685853">
            <strong>Whatsapp </strong> ( 13 ) 99768-5853 <br />
          </a>
          <a href="mailto:rafa.julia.forever@gmail.com">
            <strong>E-mail </strong> rafa.julia.forever@gmail.com <br />
          </a>
        </p>
      </div>
    </div>
  );
}

export default EACard;
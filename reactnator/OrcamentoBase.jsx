import React from 'react';

// Importando todos os componentes que criamos
import EACard from './EACard';
import DocTitle from './DocTitle';
import Cliente from './Cliente';
import Article from './Article';
import Section from './Section';
import Signatures from './Signatures';
import generatePDF from './DownloadPDF';

// CSS: É recomendado importar os estilos globais no componente principal da sua aplicação (ex: App.js)
// import '../assets/theme/globals.css'; 
// A biblioteca html2pdf também precisa ser incluída no seu index.html

const OrcamentoBase = ({
  docTitle = "SERVIÇOS DE PINTURA E ELÉTRICA",
  docSubtitle = "PROPOSTA DE ORÇAMENTO",
  emissaoDate = "00/00/2025",
  validadeDate = "15 dias",
  clientName = "Nome do Cliente",
  clientAddress = "Endereço do Cliente",
  investmentValue = "R$ 0,00",
  paymentMethod = "A combinar",
  executionTime = "A combinar",
  warranty = "3 meses"
}) => {

  const handleDownloadPDF = () => {
    const filename = `Elétrica & Art-Orçamento-${clientName.replace(/ /g, '_')}`;
    generatePDF('invoice_html', filename);
  };

  // Componente para a quebra de página, usado pelo html2pdf
  const PageBreak = () => <div style={{ pageBreakAfter: 'always' }} id="break-page"></div>;

  return (
    <div>
      {/* O ID 'invoice_html' é usado pela função generatePDF para saber qual elemento imprimir */}
      <div id="invoice_html">
        <EACard section="dual" />

        <DocTitle subtitle={docSubtitle} emissao={emissaoDate} validade={validadeDate}>
          {docTitle}
        </DocTitle>

        <Cliente nome={clientName} endereço={clientAddress} />

        <Article label="1. Escopo dos Serviços">
          <Section label="Serviços de pintura e elétrica, contemplando">
            <p><strong>Observação</strong></p>
            <p>Este orçamento contempla exclusivamente a mão de obra. Todos os materiais de pintura e elétrica deverão ser fornecidos pelo cliente.</p>
          </Section>
          <PageBreak />
        </Article>

        <Article label="2. Materiais">
          <p>Fornecidos pelo cliente: tintas, massa corrida, lixas, pincéis, rolos, materiais de elétrica (ventiladores, plafons, luminária, cabos, conexões, suportes, etc.).</p>
          <p>Fornecidos pela equipe Elétrica&Art: ferramentas e equipamentos necessários para execução dos serviços.</p>
        </Article>

        <Article label="3. Investimento">
          <Section>
            <p>Valor total da mão de obra: <strong>{investmentValue}</strong></p>
            <p>
              <strong>Forma de Pagamento:</strong><br /><br />
              {paymentMethod}
            </p>
          </Section>
        </Article>

        <Article label="4. Prazo de Execução">
          <p>Prazo estimado para execução: <strong>{executionTime}</strong>, (Sujeito a ajustes conforme o andamento da obra e disponibilidade de materiais).</p>
        </Article>

        <Article label="5. Garantia">
          <p>Garantia de {warranty} sobre os serviços prestados, válida contra falhas de execução, desde que não haja mau uso, alterações posteriores ou interferências externas.</p>
        </Article>
        <PageBreak />

        <Article label="6. Observações Finais" className="avoid">
          <p>Esta proposta contempla exclusivamente os serviços descritos acima.</p>
          <p>Qualquer modificação no escopo deverá ser previamente acordada e poderá implicar em ajustes de valores e prazos.</p>
        </Article>

        <Article className="avoid">
          <p>Agradecemos a oportunidade de apresentar esta proposta e estamos à disposição para quaisquer esclarecimentos adicionais.</p>
        </Article>

        <Article label="7. Assinatura e Aprovação" />

        <Signatures />
      </div>

      <footer>
        <div>
          <button id="btn_createPDF" onClick={handleDownloadPDF}>
            Baixar em PDF
          </button>
        </div>
      </footer>
    </div>
  );
};

export default OrcamentoBase;

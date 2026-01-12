async function convert() {

  // 1. LÊ O ARQUIVO input.txt
  const response = await fetch('input.txt');
  const txt = await response.text();

  // 2. FAZ O PARSE
  const parsed = parseDocument(txt);

  // 3. LIMPA CONTEÚDO ANTIGO
  const view = document.querySelector('#invoice_html');
  view.querySelectorAll('article').forEach(a => a.remove());

  // 4. GERA HTML FINAL
  const html = generateHTML(parsed);

  // 5. INSERE NO TEMPLATE
  view.insertAdjacentHTML('beforeend', html);

  // 6. PREENCHE DADOS FIXOS
  fillHeader(parsed);
}

/* ================= PARSER ================= */

function parseDocument(txt) {
  const lines = txt.split('\n').map(l => l.trim()).filter(Boolean);

  const data = {
    cliente: {},
    docTitle: {},
    articles: []
  };

  let currentArticle = null;
  let currentSection = null;

  for (let line of lines) {

    if (line.startsWith('Cliente:')) {
      data.cliente.name = line.replace('Cliente:', '').trim();
      continue;
    }

    if (line.startsWith('Endereço:')) {
      data.cliente.address = line.replace('Endereço:', '').trim();
      continue;
    }

    if (line.startsWith('Data de Emissão:')) {
      data.docTitle.emissao = line.replace('Data de Emissão:', '').trim();
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      currentArticle = { label: line, sections: [] };
      data.articles.push(currentArticle);
      continue;
    }

    if (/^\d+\.\d+/.test(line)) {
      currentSection = { label: line, paragraphs: [], list: [] };
      currentArticle.sections.push(currentSection);
      continue;
    }

    if (line.endsWith(';')) {
      currentSection?.list.push(line);
      continue;
    }

    currentSection?.paragraphs.push(line);
  }

  return data;
}

/* ================= HTML BUILDER ================= */

function generateHTML(data) {
  return data.articles.map(article => `
    <article label="${article.label}">
      ${article.sections.map(sec => `
        <section label="${sec.label}">
          ${sec.paragraphs.map(p => `<p>${p}</p>`).join('')}
          ${sec.list.length ? `
            <ul>
              ${sec.list.map(i => `<li>${i}</li>`).join('')}
            </ul>` : ''}
        </section>
      `).join('')}
    </article>
  `).join('');
}

/* ================= HEADER ================= */

function fillHeader(data) {
  const cliente = document.querySelector('#cliente');
  cliente.setAttribute('nome', data.cliente.name || '');
  cliente.setAttribute('endereço', data.cliente.address || '');

  const title = document.querySelector('#docTitle');
  title.setAttribute('emissao', data.docTitle.emissao || '');
}


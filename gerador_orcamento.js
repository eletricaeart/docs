document.addEventListener('DOMContentLoaded', () => {
    // Set default issue date to today
    document.getElementById('issue-date').valueAsDate = new Date();

    const addProcessStepBtn = document.getElementById('add-process-step');
    const executionProcessContainer = document.getElementById('execution-process');
    const form = document.getElementById('budget-form');
    let stepCounter = 0;

    // Function to add a new execution process step
    addProcessStepBtn.addEventListener('click', () => {
        stepCounter++;
        const stepDiv = document.createElement('div');
        stepDiv.classList.add('step');
        stepDiv.setAttribute('data-step-id', stepCounter);

        stepDiv.innerHTML = `
            <div class="step-header">
                <span class="step-title">Etapa ${stepCounter}</span>
                <button type="button" class="remove-btn" title="Remover Etapa">&times;</button>
            </div>
            <label for="process-title-${stepCounter}">Título da Etapa:</label>
            <input type="text" id="process-title-${stepCounter}" required>
            <label for="process-items-${stepCounter}">Itens da Etapa (um por linha):</label>
            <textarea id="process-items-${stepCounter}" rows="4" placeholder="- Item 1
- Item 2"></textarea>
        `;

        executionProcessContainer.appendChild(stepDiv);

        // Add event listener for the new remove button
        stepDiv.querySelector('.remove-btn').addEventListener('click', () => {
            stepDiv.remove();
        });
    });

    // Main form submission logic
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        try {
            // 1. Fetch the HTML template
            const response = await fetch('orçamentos/@.html');
            if (!response.ok) {
                throw new Error('Não foi possível carregar o template do orçamento.');
            }
            const templateHtml = await response.text();

            // 2. Parse the template string into a DOM object
            const parser = new DOMParser();
            const doc = parser.parseFromString(templateHtml, 'text/html');

            // 3. Collect data from the form
            const clientName = document.getElementById('client-name').value;
            const issueDate = new Date(document.getElementById('issue-date').value).toLocaleDateString('pt-BR', {timeZone: 'UTC'});

            // 4. Populate the DOM object with data
            
            // Helper to convert textarea lines to <li> items
            const toListItems = (text) => {
                return text.split('\n').map(line => `<li>${line.replace(/^- /, '')}</li>`).join('');
            };
            
             // Helper to convert textarea lines to <p> items
            const toParagraphs = (text) => {
                return text.split('\n').map(line => `<p>${line}</p>`).join('');
            };

            // Update simple fields
            doc.querySelector('doc-title').textContent = document.getElementById('doc-title').value;
            doc.querySelector('doc-title').setAttribute('emissao', issueDate);
            doc.querySelector('doc-title').setAttribute('validade', document.getElementById('validity').value);

            const clienteEl = doc.querySelector('cliente');
            clienteEl.setAttribute('nome', clientName);
            clienteEl.setAttribute('endereço', document.getElementById('client-address').value);
            
            // --- 1. Escopo dos Serviços ---
            const scopeArticle = doc.querySelector('article[label="1. Escopo dos Serviços"]');
            scopeArticle.innerHTML = ''; // Clear existing content
            const scopeIntro = document.getElementById('scope-intro').value;
            const scopeItems = document.getElementById('scope-items').value;
            const scopeObjective = document.getElementById('scope-objective').value;

            scopeArticle.innerHTML = `
                <section>
                    <p>${scopeIntro}</p>
                    <t6>Estão incluídos no escopo:</t6>
                    <ul>${toListItems(scopeItems)}</ul>
                    <tagc>
                        <t6>Objetivo final:</t6>
                        ${scopeObjective}
                    </tagc>
                </section>
            `;

            // --- 2. Processo de Execução ---
            const processArticle = doc.querySelector('article[label*="2. PROCESSO DE EXECUÇÃO"]');
            processArticle.innerHTML = ''; // Clear
            const processSteps = executionProcessContainer.querySelectorAll('.step');
            processSteps.forEach(step => {
                const stepId = step.getAttribute('data-step-id');
                const title = step.querySelector(`#process-title-${stepId}`).value;
                const items = step.querySelector(`#process-items-${stepId}`).value;
                
                const section = doc.createElement('section');
                section.setAttribute('label', title);
                section.innerHTML = `<ul>${toListItems(items)}</ul>`;
                processArticle.appendChild(section);
            });


            // --- 3. Materiais ---
            const materialsArticle = doc.querySelector('article[label="3. Materiais"]');
            const [clientMaterialsSection, eaMaterialsSection] = materialsArticle.querySelectorAll('section');
            
            clientMaterialsSection.innerHTML = `<ul>${toListItems(document.getElementById('materials-client').value)}</ul>`;
            eaMaterialsSection.innerHTML = `<ul>${toListItems(document.getElementById('materials-ea').value)}</ul>`;
            
            // --- 4. Investimento ---
            const investmentArticle = doc.querySelector('article[label*="4. Investimento"]');
            const investmentValue = document.getElementById('investment-value').value;
            const investmentText = document.getElementById('investment-text').value;
            investmentArticle.querySelector('section').innerHTML = `<p>Valor total da mão de obra: <strong>R$ ${investmentValue} (${investmentText})</strong></p>`;

            // --- 5. Condições de Pagamento ---
            const paymentArticle = doc.querySelector('article[label*="5."]'); // Use partial label
            paymentArticle.querySelector('section').innerHTML = toParagraphs(document.getElementById('payment-conditions').value);


            // --- 6. Prazo de Execução ---
            const deadlineArticle = doc.querySelector('article[label*="6. Prazo de Execução"]');
            deadlineArticle.innerHTML = `<p>Prazo estimado para execução: <strong>${document.getElementById('deadline').value}</strong>, (${document.getElementById('deadline-observation').value}).</p>`;
            
            // --- 7. Garantia ---
            const warrantyArticle = doc.querySelector('article[label="7. Garantia"]');
            warrantyArticle.innerHTML = toParagraphs(document.getElementById('warranty').value);

            // --- 8. Observações Finais ---
            const finalNotesArticle = doc.querySelector('article[label*="8. Observações"]');
            finalNotesArticle.innerHTML = toParagraphs(document.getElementById('final-notes').value);

            // Update the final script tag data
            const scriptTag = doc.querySelector('script:not([src])');
            scriptTag.textContent = `
              const data = {
                title: "Elétrica & Art-Orçamento",
                cliente: {
                  name: "${clientName}",
                  address: "${document.getElementById('client-address').value}",
                },
                docTitle: {
                  subtitle: "PROPOSTA DE ORÇAMENTO",
                  emissao: "${issueDate}",
                  validade: "${document.getElementById('validity').value}",
                  text: "${document.getElementById('doc-title').value}",
                },
              };
            `;
            
            // 5. Serialize the DOM object back to a string
            const finalHtml = doc.documentElement.outerHTML;

            // 6. Create and trigger the download
            const blob = new Blob([finalHtml], { type: 'text/html' });
            const link = document.createElement('a');
            const formattedDate = new Date(document.getElementById('issue-date').value).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC' }).replace(/\//g, '-') ;
            link.download = `orçamento-${clientName.toLowerCase().replace(/ /g, '-')}-${formattedDate}.html`;
            link.href = URL.createObjectURL(blob);
            link.click();
            URL.revokeObjectURL(link.href);

            alert('Orçamento gerado com sucesso!');

        } catch (error) {
            console.error('Erro ao gerar o orçamento:', error);
            alert(`Erro ao gerar o orçamento: ${error.message}`);
        }
    });
});
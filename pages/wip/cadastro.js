document.addEventListener('DOMContentLoaded', () => {
    const clientNameInput = document.getElementById('clientName');
    const clientAddressInput = document.getElementById('clientAddress');
    const issueDateInput = document.getElementById('issueDate');
    const dueDateInput = document.getElementById('dueDate');
    const warrantyValidityInput = document.getElementById('warrantyValidity');
    const editableDocTitle = document.getElementById('editableDocTitle');

    const scopeEditorsContainer = document.getElementById('scopeEditorsContainer');
    const addNewSectionBtn = document.getElementById('addNewSectionBtn');

    const serviceNameInput = document.getElementById('serviceName');
    const serviceDescriptionInput = document.getElementById('serviceDescription');
    const serviceQuantityInput = document.getElementById('serviceQuantity');
    const serviceUnitPriceInput = document.getElementById('serviceUnitPrice');
    const serviceTotalValueInput = document.getElementById('serviceTotalValue');
    const serviceIndexInput = document.getElementById('serviceIndex');

    const addServiceBtn = document.getElementById('addServiceBtn');
    const updateServiceBtn = document.getElementById('updateServiceBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const servicesTableBody = document.querySelector('#servicesTable tbody');
    const saveAllDataBtn = document.getElementById('saveAllDataBtn');

    const editorTemplate = document.getElementById('editor-section-template');

    let currentServices = []; // Services for the current budget being created/edited
    let editorSectionCounter = 0; // Start at 0, will be incremented before first use
    const mainSectionNumber = 1; // 'X' in X.Y format for scope of services

    // Expose db globally for easy access in cadastro.js
    const db = window.simulatedDB;

    // Utility function to get URL parameters
    const getParamFromUrl = (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    };

    // Function to update all title prefixes based on their content
    const updateTitlePrefixes = () => {
        const sections = scopeEditorsContainer.querySelectorAll('.editor-section');
        let titledSectionCounter = 1;
        sections.forEach(section => {
            const title = section.getAttribute('label') || '';
            const prefixElement = section.querySelector('.section-display-title');
            if (prefixElement) {
                if (title) {
                    prefixElement.textContent = `${mainSectionNumber}.${titledSectionCounter}`;
                    titledSectionCounter++;
                } else {
                    prefixElement.textContent = '';
                }
            }
        });
    };

    // Listen for title changes to update numbering
    scopeEditorsContainer.addEventListener('titlechange', updateTitlePrefixes);

    // Helper function to format date to YYYY-MM-DD
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Function to initialize a single rich text editor section
    const initializeEditorSection = (sectionElement) => {
        initRichTextEditor(sectionElement);
    };

    // Function to add a new editor section from the template
    const addNewEditorSection = () => {
        const templateContent = editorTemplate.content.cloneNode(true);
        const newSection = templateContent.querySelector('.editor-section');
        scopeEditorsContainer.appendChild(templateContent);
        initializeEditorSection(newSection);
        updateTitlePrefixes(); // Update prefixes when a new section is added
        return newSection;
    };

    // Load data from localStorage on page load
    const loadData = () => {
        clearClientForm(); // This will also re-initialize the editor sections
        clearServiceForm();
        currentServices = [];
        renderServices();

        // Set issue date to current date
        const today = new Date();
        issueDateInput.value = formatDate(today);

        // Set due date to 30 days from today
        const dueDate = new Date();
        dueDate.setDate(today.getDate() + 30);
        dueDateInput.value = formatDate(dueDate);

        // Set warranty/validity to default value
        warrantyValidityInput.value = 6; // Default to 6 months

        editableDocTitle.textContent = "SERVIÇOS DE PINTURA E ELÉTRICA";

        // The call to clearClientForm() already adds the first section
    };

    // Add new section button logic
    addNewSectionBtn.addEventListener('click', addNewEditorSection);


    // Function to load an existing budget for editing
    const loadBudgetForEditing = (budgetId) => {
        const budget = db.getBudgetById(budgetId);

        if (!budget) {
            alert('Orçamento não encontrado!');
            loadData(); // Load default form for new budget
            return;
        }

        // Populate client details
        const user = db.getAllUsers().find(u => u.id === budget.userId);
        if (user) {
            clientNameInput.value = user.name;
            clientAddressInput.value = user.address;
        }

        // Populate budget details
        issueDateInput.value = budget.issueDate;
        dueDateInput.value = budget.dueDate;
        warrantyValidityInput.value = budget.warrantyValidity;
        editableDocTitle.textContent = budget.docTitle || "SERVIÇOS DE PINTURA E ELÉTRICA"; // Populate the editable title

        // Clear existing editor sections
        scopeEditorsContainer.innerHTML = '';
        editorSectionCounter = 0;

        // Populate scope of services
        if (budget.scopeOfServices && budget.scopeOfServices.length > 0) {
            budget.scopeOfServices.forEach(scope => {
                const newSection = addNewEditorSection(); // This function already calls initializeEditorSection and updates prefixes
                // The title from db might include the prefix "1.1 Title". We only want the Title part for the label.
                const cleanTitle = scope.title.replace(/^\d\.\d\s*/, '').trim();
                newSection.setAttribute('label', cleanTitle);
                newSection.querySelector('.section-title-input').value = cleanTitle; // Set input value if user wants to edit
                newSection.querySelector('.editor').innerHTML = scope.content;
            });
            updateTitlePrefixes(); // Ensure correct numbering after loading
        } else {
            // If no scope of services, add a default empty section
            addNewEditorSection();
        }

        // Populate services
        currentServices = db.getAllServices().filter(service => service.budgetId === budgetId);
        renderServices();
    };


    // Save data to simulated database
    const saveDataToDB = () => {
        const clientName = clientNameInput.value.trim();
        const clientAddress = clientAddressInput.value.trim();
        const issueDate = issueDateInput.value;
        const dueDate = dueDateInput.value;
        const warrantyValidity = warrantyValidityInput.value;
        const docTitle = editableDocTitle.textContent.trim();

        // Get content from all editor sections and format titles
        let titledSectionCounter = 1;
        const scopeOfServices = Array.from(scopeEditorsContainer.querySelectorAll('.editor-section')).map(section => {
            const title = section.getAttribute('label') || '';
            const content = section.querySelector('.editor').innerHTML;
            let fullTitle = '';
            if (title) {
                fullTitle = `${mainSectionNumber}.${titledSectionCounter} ${title}`;
                titledSectionCounter++;
            }
            return { title: fullTitle, content: content };
        });

        if (!clientName || !docTitle || currentServices.length === 0 || !issueDate || !dueDate || !warrantyValidity || scopeOfServices.every(s => s.content.trim() === '' && s.title.trim() === '')) {
            alert('Por favor, preencha todos os dados do cliente, as datas, o escopo dos serviços e adicione pelo menos um serviço.');
            return;
        }

        // 1. Save/Get User ID (Simulated DB)
        const userId = db.saveUser({
            name: clientName,
            address: clientAddress
        });

        let budgetIdToUse;
        if (editingBudgetId) { // Check if we are updating an existing budget
            budgetIdToUse = editingBudgetId;
            const budgetTotalValue = currentServices.reduce((sum, service) => sum + parseFloat(service.totalValue), 0);
            const updatedBudget = {
                id: budgetIdToUse,
                userId: userId,
                issueDate: issueDate,
                dueDate: dueDate,
                warrantyValidity: warrantyValidity,
                docTitle: docTitle,
                scopeOfServices: scopeOfServices,
                totalValue: budgetTotalValue.toFixed(2)
            };
            db.updateBudget(updatedBudget); // Update the budget in db.js
            db.deleteServicesByBudgetId(budgetIdToUse); // Remove old services

            alert('Orçamento atualizado com sucesso no banco de dados simulado e no armazenamento local!');
        } else { // Creating a new budget
            const budgetTotalValue = currentServices.reduce((sum, service) => sum + parseFloat(service.totalValue), 0);
            budgetIdToUse = db.saveBudget({
                userId: userId,
                issueDate: issueDate,
                dueDate: dueDate,
                warrantyValidity: warrantyValidity,
                docTitle: docTitle,
                scopeOfServices: scopeOfServices,
                totalValue: budgetTotalValue.toFixed(2)
            });
            alert('Orçamento salvo com sucesso no banco de dados simulado e no armazenamento local!');
        }

        // 3. Save Services linked to Budget (both for new and updated budgets)
        currentServices.forEach(service => {
            db.saveService({
                budgetId: budgetIdToUse,
                name: service.name,
                description: service.description,
                quantity: service.quantity,
                unitPrice: service.unitPrice,
                totalValue: service.totalValue
            });
        });

        loadData(); // Clear form for new entry

        // For debugging: log all data in the simulated DB
        console.log('Simulated DB State:', {
            users: db.getAllUsers(),
            budgets: db.getAllBudgets(),
            services: db.getAllServices()
        });

        // Redirect to gerenciador-orcamentos.html if editing
        if (editingBudgetId) {
             window.location.href = 'gerenciador-orcamentos.html';
        }
    };

    // Calculate total value for a service
    const calculateServiceTotal = () => {
        const quantity = parseFloat(serviceQuantityInput.value) || 0;
        const unitPrice = parseFloat(serviceUnitPriceInput.value) || 0;
        serviceTotalValueInput.value = (quantity * unitPrice).toFixed(2);
    };

    // Helper function to truncate text
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength - 1) + '...';
    };

    // Render services table
    const renderServices = () => {
        servicesTableBody.innerHTML = ''; // Clear existing rows
        currentServices.forEach((service, index) => {
            const row = servicesTableBody.insertRow();
            row.insertCell(0).textContent = truncateText(service.name, 15);
            row.insertCell(1).textContent = truncateText(service.description, 20);
            row.insertCell(2).textContent = service.quantity;
            row.insertCell(3).textContent = parseFloat(service.unitPrice).toFixed(2);
            row.insertCell(4).textContent = parseFloat(service.totalValue).toFixed(2);

            const actionsCell = row.insertCell(5);
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Editar';
            editBtn.classList.add('edit-btn');
            editBtn.onclick = () => editService(index);
            actionsCell.appendChild(editBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Deletar';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.onclick = () => deleteService(index);
            actionsCell.appendChild(deleteBtn);
        });
    };

    // Clear service form
    const clearServiceForm = () => {
        serviceNameInput.value = '';
        serviceDescriptionInput.value = '';
        serviceQuantityInput.value = '1';
        serviceUnitPriceInput.value = '0.00';
        serviceTotalValueInput.value = '0.00';
        serviceIndexInput.value = '';
        addServiceBtn.style.display = 'inline-block';
        updateServiceBtn.style.display = 'none';
        cancelEditBtn.style.display = 'none';
    };

    // Clear client form
    const clearClientForm = () => {
        clientNameInput.value = '';
        clientAddressInput.value = '';
        issueDateInput.value = '';
        dueDateInput.value = '';
        warrantyValidityInput.value = 6; // Reset to default 6
        // Clear all editor sections and add a fresh one
        scopeEditorsContainer.innerHTML = '';
        editorSectionCounter = 0; // Reset counter
        addNewEditorSection();
    };

    // Add service
    addServiceBtn.addEventListener('click', () => {
        const newService = {
            name: serviceNameInput.value,
            description: serviceDescriptionInput.value,
            quantity: serviceQuantityInput.value,
            unitPrice: serviceUnitPriceInput.value,
            totalValue: serviceTotalValueInput.value
        };
        currentServices.push(newService);
        clearServiceForm();
        renderServices();
    });

    // Edit service
    const editService = (index) => {
        const serviceToEdit = currentServices[index];
        serviceNameInput.value = serviceToEdit.name;
        serviceDescriptionInput.value = serviceToEdit.description;
        serviceQuantityInput.value = serviceToEdit.quantity;
        serviceUnitPriceInput.value = serviceToEdit.unitPrice;
        serviceTotalValueInput.value = serviceToEdit.totalValue;
        serviceIndexInput.value = index; // Store index for update

        addServiceBtn.style.display = 'none';
        updateServiceBtn.style.display = 'inline-block';
        cancelEditBtn.style.display = 'inline-block';
    };

    // Update service
    updateServiceBtn.addEventListener('click', () => {
        const index = parseInt(serviceIndexInput.value);
        if (!isNaN(index) && index >= 0 && index < currentServices.length) {
            currentServices[index] = {
                name: serviceNameInput.value,
                description: serviceDescriptionInput.value,
                quantity: serviceQuantityInput.value,
                unitPrice: serviceUnitPriceInput.value,
                totalValue: serviceTotalValueInput.value
            };
            clearServiceForm();
            renderServices();
        }
    });

    // Cancel edit
    cancelEditBtn.addEventListener('click', () => {
        clearServiceForm();
    });

    // Delete service
    const deleteService = (index) => {
        if (confirm('Tem certeza que deseja deletar este serviço?')) {
            currentServices.splice(index, 1);
            renderServices();
        }
    };

    // Event listeners for calculating total value
    serviceQuantityInput.addEventListener('input', calculateServiceTotal);
    serviceUnitPriceInput.addEventListener('input', calculateServiceTotal);

    // Save all data (client info and services) when the dedicated button is clicked
    saveAllDataBtn.addEventListener('click', saveDataToDB);

    // Initial load
    const editingBudgetId = getParamFromUrl('budgetId');
    if (editingBudgetId) {
        loadBudgetForEditing(editingBudgetId);
        saveAllDataBtn.textContent = 'Atualizar Orçamento'; // Change button text
    } else {
        loadData(); // Load default data for a new budget
    }
});
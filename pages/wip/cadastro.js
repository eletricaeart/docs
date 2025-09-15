document.addEventListener('DOMContentLoaded', () => {
    const clientNameInput = document.getElementById('clientName');
    const clientAddressInput = document.getElementById('clientAddress');
    const issueDateInput = document.getElementById('issueDate');
    const dueDateInput = document.getElementById('dueDate');
    const warrantyValidityInput = document.getElementById('warrantyValidity');

    const scopeEditorsContainer = document.getElementById('scopeEditorsContainer');
    const addNewSectionBtn = document.getElementById('addNewSectionBtn');

    const titleModal = document.getElementById('titleModal');
    const titleInput = document.getElementById('titleInput');
    const saveTitleBtn = document.getElementById('saveTitleBtn');
    const cancelTitleBtn = document.getElementById('cancelTitleBtn');

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

    // Ensure the simulatedDB is loaded
    const db = window.simulatedDB;

    // Helper function to format date to YYYY-MM-DD
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Function to initialize a single rich text editor section
    const initializeEditorSection = (sectionElement, sectionNumber) => {
        initRichTextEditor(sectionElement, titleModal, titleInput, saveTitleBtn, cancelTitleBtn, mainSectionNumber, sectionNumber);
    };

    // Function to add a new editor section from the template
    const addNewEditorSection = () => {
        editorSectionCounter++;
        const templateContent = editorTemplate.content.cloneNode(true);
        const newSection = templateContent.querySelector('.editor-section');
        
        // Set a unique data-attribute for the new section
        newSection.setAttribute('data-editor-id', `editor${editorSectionCounter}`);
        
        // Update the 'Add Title' button to have a unique ID if needed, though command is better
        const addTitleBtn = newSection.querySelector('button[data-command="addTitle"]');
        if (addTitleBtn) {
            // The command 'addTitle' is now used in the RTE script, so unique ID isn't strictly necessary
        }

        scopeEditorsContainer.appendChild(templateContent);
        initializeEditorSection(newSection, editorSectionCounter);
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

        // The call to clearClientForm() already adds the first section
    };

    // Add new section button logic
    addNewSectionBtn.addEventListener('click', addNewEditorSection);


    // Save data to simulated database
    const saveDataToDB = () => {
        const clientName = clientNameInput.value.trim();
        const clientAddress = clientAddressInput.value.trim();
        const issueDate = issueDateInput.value;
        const dueDate = dueDateInput.value;
        const warrantyValidity = warrantyValidityInput.value;

        // Get content from all editor sections
        const scopeOfServices = Array.from(scopeEditorsContainer.querySelectorAll('.editor-section')).map(section => {
            const title = section.getAttribute('label') || ''; // Get title from label attribute
            const content = section.querySelector('.editor').innerHTML; // Get content from editor div
            return { title: title, content: content };
        });

        if (!clientName || currentServices.length === 0 || !issueDate || !dueDate || !warrantyValidity || scopeOfServices.every(s => s.content.trim() === '' && s.title.trim() === '')) {
            alert('Por favor, preencha todos os dados do cliente, as datas, o escopo dos serviços e adicione pelo menos um serviço.');
            return;
        }

        // 1. Save/Get User ID (Simulated DB)
        const userId = db.saveUser({
            name: clientName,
            address: clientAddress
        });

        // 2. Save Budget
        const budgetTotalValue = currentServices.reduce((sum, service) => sum + parseFloat(service.totalValue), 0);
        const budgetId = db.saveBudget({
            userId: userId,
            issueDate: issueDate,
            dueDate: dueDate,
            warrantyValidity: warrantyValidity,
            scopeOfServices: scopeOfServices, // Save as an array of objects
            totalValue: budgetTotalValue.toFixed(2)
        });

        // 3. Save Services linked to Budget
        currentServices.forEach(service => {
            db.saveService({
                budgetId: budgetId,
                name: service.name,
                description: service.description,
                quantity: service.quantity,
                unitPrice: service.unitPrice,
                totalValue: service.totalValue
            });
        });

        alert('Orçamento salvo com sucesso no banco de dados simulado e no armazenamento local!');
        loadData(); // Clear form for new entry

        // For debugging: log all data in the simulated DB
        console.log('Simulated DB State:', {
            users: db.getAllUsers(),
            budgets: db.getAllBudgets(),
            services: db.getAllServices()
        });
    };

    // Calculate total value for a service
    const calculateServiceTotal = () => {
        const quantity = parseFloat(serviceQuantityInput.value) || 0;
        const unitPrice = parseFloat(serviceUnitPriceInput.value) || 0;
        serviceTotalValueInput.value = (quantity * unitPrice).toFixed(2);
    };

    // Render services table
    const renderServices = () => {
        servicesTableBody.innerHTML = ''; // Clear existing rows
        currentServices.forEach((service, index) => {
            const row = servicesTableBody.insertRow();
            row.insertCell(0).textContent = service.name;
            row.insertCell(1).textContent = service.description;
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
    loadData();
});
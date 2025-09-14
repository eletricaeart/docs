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

    let currentServices = []; // Services for the current budget being created/edited
    let editorSectionCounter = 1; // To generate unique IDs for editor sections
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
        // Pass the sectionElement directly, and initRichTextEditor will find its children
        initRichTextEditor(sectionElement, titleModal, titleInput, saveTitleBtn, cancelTitleBtn, mainSectionNumber, sectionNumber);
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

        // Set warranty/validity to default text
        warrantyValidityInput.value = 6; // Default to 6 months

        // Initialize the first editor section
        const initialEditorSection = scopeEditorsContainer.querySelector('.editor-section');
        if (initialEditorSection) {
            initializeEditorSection(initialEditorSection, 1); // Pass section number 1
            // Clear initial content
            initialEditorSection.querySelector('.editor').innerHTML = '';
            // Re-enable addTitleBtn if it was disabled from a previous session
            const addTitleBtn = initialEditorSection.querySelector('#addTitleBtn');
            if (addTitleBtn) addTitleBtn.disabled = false;
        }
    };

    // Add new section button logic
    addNewSectionBtn.addEventListener('click', () => {
        editorSectionCounter++; // Increment counter for unique ID
        const newSectionId = `editor${editorSectionCounter}`;

        const newSection = document.createElement('section');
        newSection.classList.add('editor-section');
        newSection.setAttribute('data-editor-id', newSectionId); // Set unique ID

        newSection.innerHTML = `
            <p class="section-display-title"></p> <!-- Added blank p tag -->
            <div class="toolbar">
                <button id="addTitleBtn_${newSectionId}">Add Title</button>
                <button data-command="bold"><b>B</b></button>
                <button data-command="italic"><i>I</i></button>
                <button data-command="underline"><u>U</u></button>
                <button data-command="insertOrderedList">OL</button>
                <button data-command="insertUnorderedList">UL</button>
                <button data-command="justifyLeft"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-text-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
</svg></button>
                <button data-command="justifyCenter"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-text-center" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
</svg></button>
                <button data-command="justifyRight"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-text-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
</svg></button>
                <button data-command="createLink">Link</button>
                <label for="foreColor">Color</label>
                <input type="color" data-command="foreColor" id="foreColor">
                <label for="backColor">BG Color</label>
                <input type="color" data-command="backColor" id="backColor">
                <button data-command="insertImageFromUrl">Image URL</button>
                <button data-command="uploadImage">Upload Image</button>
                <input type="file" id="imageUpload" accept="image/*" style="display: none;">
            </div>
            <div class="editor" contenteditable="true"></div>
        `;
        scopeEditorsContainer.appendChild(newSection);
        initializeEditorSection(newSection, editorSectionCounter);
    });


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
        // Clear all editor sections and re-initialize the first one
        scopeEditorsContainer.innerHTML = `
            <section class="editor-section" data-editor-id="editor1">
                <p class="section-display-title"></p> <!-- Added blank p tag -->
                <div class="toolbar">
                    <button id="addTitleBtn_editor1">Add Title</button>
                    <button data-command="bold"><b>B</b></button>
                    <button data-command="italic"><i>I</i></button>
                    <button data-command="underline"><u>U</u></button>
                    <button data-command="insertOrderedList">OL</button>
                    <button data-command="insertUnorderedList">UL</button>
                    <button data-command="justifyLeft"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-text-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
</svg></button>
                    <button data-command="justifyCenter"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-text-center" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
</svg></button>
                    <button data-command="justifyRight"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-text-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
</svg></button>
                    <button data-command="createLink">Link</button>
                    <label for="foreColor">Color</label>
                    <input type="color" data-command="foreColor" id="foreColor">
                    <label for="backColor">BG Color</label>
                    <input type="color" data-command="backColor" id="backColor">
                    <button data-command="insertImageFromUrl">Image URL</button>
                    <button data-command="uploadImage">Upload Image</button>
                    <input type="file" id="imageUpload" accept="image/*" style="display: none;">
                </div>
                <div class="editor" contenteditable="true"></div>
            </section>
        `;
        initializeEditorSection(scopeEditorsContainer.querySelector('.editor-section'), 1); // Pass section number 1
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
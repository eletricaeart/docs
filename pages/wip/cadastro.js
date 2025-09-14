document.addEventListener('DOMContentLoaded', () => {
    const clientNameInput = document.getElementById('clientName');
    const clientAddressInput = document.getElementById('clientAddress');
    const issueDateInput = document.getElementById('issueDate');
    const dueDateInput = document.getElementById('dueDate');
    const warrantyValidityInput = document.getElementById('warrantyValidity');

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

    // Ensure the simulatedDB is loaded
    // This assumes db.js is loaded before cadastro.js in the HTML
    const db = window.simulatedDB;

    // Helper function to format date to YYYY-MM-DD
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Load data from localStorage on page load
    const loadData = () => {
        // When the page loads, we want to start with a clean form for a new budget entry.
        // The actual loading of persisted data (users, budgets, services) is handled by db.js
        // when it initializes from localStorage.
        clearClientForm();
        clearServiceForm();
        currentServices = []; // Ensure currentServices is empty for a new entry
        renderServices();

        // Set issue date to current date
        const today = new Date();
        issueDateInput.value = formatDate(today);

        // Set due date to 30 days from today
        const dueDate = new Date();
        dueDate.setDate(today.getDate() + 30);
        dueDateInput.value = formatDate(dueDate);

        // Set warranty/validity to 15 days from issue date
        // This will be updated if issueDate changes
        const warrantyDate = new Date(issueDateInput.value);
        warrantyDate.setDate(warrantyDate.getDate() + 15);
        warrantyValidityInput.value = formatDate(warrantyDate);
    };

    // Update warranty/validity when issue date changes
    issueDateInput.addEventListener('change', () => {
        const issueDate = new Date(issueDateInput.value);
        const warrantyDate = new Date(issueDate);
        warrantyDate.setDate(warrantyDate.getDate() + 15);
        warrantyValidityInput.value = formatDate(warrantyDate);
    });

    // Save data to simulated database
    const saveDataToDB = () => {
        const clientName = clientNameInput.value.trim();
        const clientAddress = clientAddressInput.value.trim();
        const issueDate = issueDateInput.value;
        const dueDate = dueDateInput.value;
        const warrantyValidity = warrantyValidityInput.value;

        if (!clientName || currentServices.length === 0 || !issueDate || !dueDate || !warrantyValidity) {
            alert('Por favor, preencha todos os dados do cliente, as datas e adicione pelo menos um serviço.');
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
            dueDate: dueDate, // Add due date to budget
            warrantyValidity: warrantyValidity, // Add warranty validity to budget
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
        dueDateInput.value = ''; // Clear due date
        warrantyValidityInput.value = ''; // Clear warranty validity
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
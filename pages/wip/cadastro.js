document.addEventListener('DOMContentLoaded', () => {
    const clientNameInput = document.getElementById('clientName');
    const clientAddressInput = document.getElementById('clientAddress');

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

    // Load data from localStorage on page load
    const loadData = () => {
        const savedClientName = localStorage.getItem('cadastroClientName');
        const savedClientAddress = localStorage.getItem('cadastroClientAddress');
        const savedServices = localStorage.getItem('cadastroServices');

        if (savedClientName) clientNameInput.value = savedClientName;
        if (savedClientAddress) clientAddressInput.value = savedClientAddress;
        if (savedServices) {
            currentServices = JSON.parse(savedServices);
        } else {
            currentServices = []; // Ensure it's empty if nothing in localStorage
        }

        renderServices();
    };

    // Save data to simulated database AND localStorage
    const saveDataToDB = () => {
        const clientName = clientNameInput.value.trim();
        const clientAddress = clientAddressInput.value.trim();

        if (!clientName || currentServices.length === 0) {
            alert('Por favor, preencha o nome do cliente e adicione pelo menos um serviço.');
            return;
        }

        // 1. Save/Get User ID (Simulated DB)
        const userId = db.saveUser({
            name: clientName,
            address: clientAddress
        });

        // 2. Save Budget (Simulated DB)
        const budgetTotalValue = currentServices.reduce((sum, service) => sum + parseFloat(service.totalValue), 0);
        const budgetId = db.saveBudget({
            userId: userId,
            date: new Date().toISOString().split('T')[0], // Current date
            totalValue: budgetTotalValue.toFixed(2)
        });

        // 3. Save Services linked to Budget (Simulated DB)
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

        // 4. Save to localStorage
        localStorage.setItem('cadastroClientName', clientName);
        localStorage.setItem('cadastroClientAddress', clientAddress);
        localStorage.setItem('cadastroServices', JSON.stringify(currentServices));


        alert('Orçamento salvo com sucesso no banco de dados simulado e no armazenamento local!');
        loadData(); // Clear form for new entry and load any existing local storage data
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

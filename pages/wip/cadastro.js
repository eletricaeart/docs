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

    let services = [];

    // Load data from localStorage on page load
    const loadData = () => {
        const savedClientName = localStorage.getItem('cadastroClientName');
        const savedClientAddress = localStorage.getItem('cadastroClientAddress');
        const savedServices = localStorage.getItem('cadastroServices');

        if (savedClientName) clientNameInput.value = savedClientName;
        if (savedClientAddress) clientAddressInput.value = savedClientAddress;
        if (savedServices) services = JSON.parse(savedServices);

        renderServices();
    };

    // Save data to localStorage
    const saveData = () => {
        localStorage.setItem('cadastroClientName', clientNameInput.value);
        localStorage.setItem('cadastroClientAddress', clientAddressInput.value);
        localStorage.setItem('cadastroServices', JSON.stringify(services));
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
        services.forEach((service, index) => {
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

    // Add service
    addServiceBtn.addEventListener('click', () => {
        const newService = {
            name: serviceNameInput.value,
            description: serviceDescriptionInput.value,
            quantity: serviceQuantityInput.value,
            unitPrice: serviceUnitPriceInput.value,
            totalValue: serviceTotalValueInput.value
        };
        services.push(newService);
        clearServiceForm();
        renderServices();
        saveData();
    });

    // Edit service
    const editService = (index) => {
        const serviceToEdit = services[index];
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
        if (!isNaN(index) && index >= 0 && index < services.length) {
            services[index] = {
                name: serviceNameInput.value,
                description: serviceDescriptionInput.value,
                quantity: serviceQuantityInput.value,
                unitPrice: serviceUnitPriceInput.value,
                totalValue: serviceTotalValueInput.value
            };
            clearServiceForm();
            renderServices();
            saveData();
        }
    });

    // Cancel edit
    cancelEditBtn.addEventListener('click', () => {
        clearServiceForm();
    });

    // Delete service
    const deleteService = (index) => {
        if (confirm('Tem certeza que deseja deletar este serviço?')) {
            services.splice(index, 1);
            renderServices();
            saveData();
        }
    };

    // Event listeners for calculating total value
    serviceQuantityInput.addEventListener('input', calculateServiceTotal);
    serviceUnitPriceInput.addEventListener('input', calculateServiceTotal);

    // Save all data (client info and services) when the dedicated button is clicked
    saveAllDataBtn.addEventListener('click', saveData);

    // Initial load
    loadData();
});

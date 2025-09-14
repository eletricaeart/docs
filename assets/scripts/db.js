let users = [];
let budgets = [];
let services = [];

// let nextUserId = 1; // Removed
// let nextBudgetId = 1; // Removed
// let nextServiceId = 1; // Removed

// Function to save the entire DB state to localStorage
const _saveToLocalStorage = () => {
    localStorage.setItem('simulatedDB_users', JSON.stringify(users));
    localStorage.setItem('simulatedDB_budgets', JSON.stringify(budgets));
    localStorage.setItem('simulatedDB_services', JSON.stringify(services));
    // localStorage.setItem('simulatedDB_nextUserId', nextUserId); // Removed
    // localStorage.setItem('simulatedDB_nextBudgetId', nextBudgetId); // Removed
    // localStorage.setItem('simulatedDB_nextServiceId', nextServiceId); // Removed
    console.log('Simulated DB state saved to localStorage.');
};

// Function to load the entire DB state from localStorage
const _loadFromLocalStorage = () => {
    const savedUsers = localStorage.getItem('simulatedDB_users');
    const savedBudgets = localStorage.getItem('simulatedDB_budgets');
    const savedServices = localStorage.getItem('simulatedDB_services');
    // const savedNextUserId = localStorage.getItem('simulatedDB_nextUserId'); // Removed
    // const savedNextBudgetId = localStorage.getItem('simulatedDB_nextBudgetId'); // Removed
    // const savedNextServiceId = localStorage.getItem('simulatedDB_nextServiceId'); // Removed

    if (savedUsers) users = JSON.parse(savedUsers);
    if (savedBudgets) budgets = JSON.parse(savedBudgets);
    if (savedServices) services = JSON.parse(savedServices);
    // if (savedNextUserId) nextUserId = parseInt(savedNextUserId); // Removed
    // if (savedNextBudgetId) nextBudgetId = parseInt(savedNextBudgetId); // Removed
    // if (savedNextServiceId) nextServiceId = parseInt(savedNextServiceId); // Removed

    console.log('Simulated DB state loaded from localStorage.');
};


const db = {
    saveUser: (user) => {
        let existingUser = users.find(u => u.name === user.name);
        if (existingUser) {
            return existingUser.id;
        } else {
            // Generate ID in the new format
            const currentMonth = new Date().getMonth(); // 0-11
            const randomNum = Math.ceil(Math.random() * 100);
            const currentYear = new Date().getFullYear();
            user.id = `${currentMonth}:${randomNum}/${currentYear}`;

            users.push(user);
            console.log('User saved:', user);
            _saveToLocalStorage(); // Save after modification
            return user.id;
        }
    },

    saveBudget: (budget) => {
        // Generate ID in the new format
        const randomNum1 = Math.ceil(Math.random() * 1000);
        const randomNum2 = Math.ceil(Math.random() * 1000);
        const currentYear = new Date().getFullYear();
        budget.id = `E&A-o:${randomNum1}-${randomNum2}/${currentYear}`;

        budgets.push(budget);
        console.log('Budget saved:', budget);
        _saveToLocalStorage(); // Save after modification
        return budget.id;
    },

    saveService: (service) => {
        // Generate ID in the new format
        const randomNum1 = Math.ceil(Math.random() * 10000);
        const randomNum2 = Math.ceil(Math.random() * 10000);
        const randomNum3 = Math.ceil(Math.random() * 10000);
        service.id = `s:${randomNum1}-${randomNum2}-${randomNum3}`;

        services.push(service);
        console.log('Service saved:', service);
        _saveToLocalStorage(); // Save after modification
        return service.id;
    },

    getAllUsers: () => users,
    getAllBudgets: () => budgets,
    getAllServices: () => services,

    clearAllData: () => {
        users = [];
        budgets = [];
        services = [];
        // nextUserId = 1; // Removed
        // nextBudgetId = 1; // Removed
        // nextServiceId = 1; // Removed
        _saveToLocalStorage(); // Clear localStorage as well
        console.log('Database cleared.');
    }
};

// Load data when db.js is initialized
_loadFromLocalStorage();

// Expose db globally for easy access in cadastro.js
window.simulatedDB = db;

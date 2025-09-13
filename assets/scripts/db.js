let users = [];
let budgets = [];
let services = [];

let nextUserId = 1;
let nextBudgetId = 1;
let nextServiceId = 1;

const db = {
    saveUser: (user) => {
        // Simulate checking for existing user by name (simple approach)
        let existingUser = users.find(u => u.name === user.name);
        if (existingUser) {
            return existingUser.id;
        } else {
            user.id = nextUserId++;
            users.push(user);
            console.log('User saved:', user);
            return user.id;
        }
    },

    saveBudget: (budget) => {
        budget.id = nextBudgetId++;
        budgets.push(budget);
        console.log('Budget saved:', budget);
        return budget.id;
    },

    saveService: (service) => {
        service.id = nextServiceId++;
        services.push(service);
        console.log('Service saved:', service);
        return service.id;
    },

    // For demonstration/debugging purposes
    getAllUsers: () => users,
    getAllBudgets: () => budgets,
    getAllServices: () => services,

    // Clear all data (for testing)
    clearAllData: () => {
        users = [];
        budgets = [];
        services = [];
        nextUserId = 1;
        nextBudgetId = 1;
        nextServiceId = 1;
        console.log('Database cleared.');
    }
};

// Optional: Load initial data if needed (e.g., from a JSON file in a real app)
// For this simulation, data starts empty and accumulates.

// Expose db globally for easy access in cadastro.js
window.simulatedDB = db;

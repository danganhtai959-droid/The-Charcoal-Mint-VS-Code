/**
 * Charcoal Mint Theme Demo File
 * This file demonstrates the theme's syntax highlighting capabilities
 * @author Charcoal Mint Studio
 * @version 1.0.0
 */

// Import statements
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Constants and variables
const API_URL = 'https://api.example.com';
const MAX_RETRIES = 3;
let retryCount = 0;

/**
 * User class demonstration
 */
class User {
    constructor(name, email, age) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.isActive = true;
    }

    // Method with different parameter types
    updateProfile(data = {}) {
        const { name, email, age } = data;
        
        if (name) this.name = name;
        if (email && this.validateEmail(email)) {
            this.email = email;
        }
        if (age && typeof age === 'number') {
            this.age = age;
        }
        
        return this;
    }

    // Regular expression example
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Async method with error handling
    async fetchUserData(userId) {
        try {
            const response = await axios.get(`${API_URL}/users/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch user data:', error.message);
            throw new Error(`User fetch failed: ${error.message}`);
        }
    }
}

// Arrow function with destructuring
const createUserCard = ({ name, email, age, isActive }) => {
    const statusClass = isActive ? 'active' : 'inactive';
    
    return `
        <div class="user-card ${statusClass}">
            <h3>${name}</h3>
            <p>Email: ${email}</p>
            <p>Age: ${age}</p>
            <span class="status">${isActive ? 'Active' : 'Inactive'}</span>
        </div>
    `;
};

// React component example
function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                setLoading(true);
                const userData = await new User().fetchUserData(userId);
                setUser(userData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            loadUser();
        }
    }, [userId]);

    // Conditional rendering
    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!user) return <div className="no-user">No user found</div>;

    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            {createUserCard(user)}
        </div>
    );
}

// Array methods and functional programming
const users = [
    new User('Alice Johnson', 'alice@example.com', 28),
    new User('Bob Smith', 'bob@example.com', 34),
    new User('Carol Davis', 'carol@example.com', 25)
];

// Filter, map, and reduce examples
const activeUsers = users.filter(user => user.isActive);
const userNames = users.map(user => user.name);
const totalAge = users.reduce((sum, user) => sum + user.age, 0);
const averageAge = totalAge / users.length;

// Object with various data types
const appConfig = {
    name: 'Charcoal Mint Demo',
    version: '1.0.0',
    features: ['syntax-highlighting', 'theme-demo', 'color-showcase'],
    settings: {
        darkMode: true,
        animations: false,
        notifications: {
            email: true,
            push: false,
            sms: null
        }
    },
    apiEndpoints: new Map([
        ['users', '/api/users'],
        ['posts', '/api/posts'],
        ['comments', '/api/comments']
    ])
};

// Generator function
function* fibonacci(max) {
    let a = 0, b = 1;
    while (a <= max) {
        yield a;
        [a, b] = [b, a + b];
    }
}

// Template literals and tagged templates
const html = (strings, ...values) => {
    return strings.reduce((result, string, i) => {
        return result + string + (values[i] || '');
    }, '');
};

const welcomeMessage = html`
    <div class="welcome">
        <h1>Welcome to ${appConfig.name}!</h1>
        <p>Version: ${appConfig.version}</p>
        <p>Average user age: ${averageAge.toFixed(1)} years</p>
    </div>
`;

// Export statements
export { User, UserProfile, createUserCard };
export default appConfig;

// TODO: Add more theme demonstrations
// FIXME: Update deprecated API calls
// NOTE: This file showcases various JavaScript features

/*
 * Multi-line comment block
 * Demonstrates comment styling in the theme
 * 
 * Color highlights:
 * - Keywords: mint green
 * - Strings: sea foam
 * - Numbers: bright mint
 * - Comments: muted green
 * - Functions: sky blue
 * - Classes: yellow
 */

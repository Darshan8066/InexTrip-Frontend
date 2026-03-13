
// import { User, Trip, Payment, HistoryRecord, TripType } from '../types';
// import { RECOMMENDED_TRIPS } from "../utils/Constant";

import { RECOMMENDED_TRIPS } from "../utils/Constant";


const USERS_KEY = 'trip_planner_users';
const TRIPS_KEY = 'trip_planner_trips';
const PAYMENTS_KEY = 'trip_planner_payments';
const HISTORY_KEY = 'trip_planner_history';
const CURRENT_USER_KEY = 'trip_planner_current_user';

export const storageService = {
    init: () => {
        if (!localStorage.getItem(USERS_KEY)) {
            const admin = {
                id: 'admin-1',
                fullName: 'System Administrator',
                email: 'admin@trip.com',
                mobile: '9876543210',
                password: 'admin',
                profilePhoto: 'https://i.pravatar.cc/150?u=admin',
                favourites: [],
                role: 'ADMIN',
                createdAt: Date.now()
            };
            localStorage.setItem(USERS_KEY, JSON.stringify([admin]));
        }
        if (!localStorage.getItem(TRIPS_KEY)) {
            localStorage.setItem(TRIPS_KEY, JSON.stringify(RECOMMENDED_TRIPS));
        }
    },

    getUsers: () => JSON.parse(localStorage.getItem(USERS_KEY) || '[]'),

    saveUser: (user) => {
        const users = storageService.getUsers();
        const index = users.findIndex(u => u.id === user.id);
        if (index > -1) users[index] = user;
        else users.push(user);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));

        const current = storageService.getCurrentUser();
        if (current && current.id === user.id) {
            storageService.setCurrentUser(user);
        }
    },

    deleteUser: (id) => {
        const users = storageService.getUsers().filter(u => u.id !== id);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    },

    toggleFavourite: (userId, tripId) => {
        const users = storageService.getUsers();
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex === -1) return;

        const favs = users[userIndex].favourites || [];
        if (favs.includes(tripId)) {
            users[userIndex].favourites = favs.filter(id => id !== tripId);
        } else {
            users[userIndex].favourites = [...favs, tripId];
        }
        storageService.saveUser(users[userIndex]);
    },

    getTrips: () => JSON.parse(localStorage.getItem(TRIPS_KEY) || '[]'),

    saveTrip: (trip) => {
        const trips = storageService.getTrips();
        trips.push(trip);
        localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
    },

    deleteTrip: (id) => {
        const trips = storageService.getTrips().filter(t => t.id !== id);
        localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
    },

    getPayments: () => JSON.parse(localStorage.getItem(PAYMENTS_KEY) || '[]'),

    savePayment: (payment) => {
        const payments = storageService.getPayments();
        payments.push(payment);
        localStorage.setItem(PAYMENTS_KEY, JSON.stringify(payments));
    },

    getHistory: () => JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'),

    saveHistory: (record) => {
        const history = storageService.getHistory();
        history.push(record);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    },

    clearHistory: (userId) => {
        const history = storageService.getHistory();
        const newHistory = history.filter(h => h.userId !== userId);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    },

    getCurrentUser: ()  => {
        const user = localStorage.getItem(CURRENT_USER_KEY);
        return user ? JSON.parse(user) : null;
    },

    setCurrentUser: (user) => {
        if (user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        else localStorage.removeItem(CURRENT_USER_KEY);
    },

    clearCache: () => {
        localStorage.removeItem(TRIPS_KEY);
        localStorage.removeItem(HISTORY_KEY);
        localStorage.removeItem(PAYMENTS_KEY);
        storageService.init();
        window.location.reload();
    }
};

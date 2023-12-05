import {getItem, removeItem, setItem} from '/src/util/storage.mjs';

export function isLoggedIn() {
    return getItem('user') !== undefined;
}

export function logIn(email, password) {
    let users = getItem('users');
    if (users === undefined) {
        return false;
    }

    const matches = users.filter(user => {
        return user.email === email && user.password === password;
    });

    if (matches.length === 1) {
        setItem('user', matches[0]);
        return true;
    }

    return false;
}

export function signUp(name, email, password) {
    let users = getItem('users');
    if (users === undefined) {
        users = [];
    }

    const matches = users.filter(user => user.email === email);

    if (matches.length === 1) {
        return false;
    }

    const user = { name, email, password, tasks: [] };
    users.push(user);

    setItem('users', users);
    setItem('user', user);

    return true;
}

export function logOut() {
    removeItem('user');
}
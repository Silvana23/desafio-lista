export function setItem(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
}

export function getItem(name) {
    const item = localStorage.getItem(name);
    if (item === null || item === undefined) {
        return undefined;
    }

    return JSON.parse(item);
}

export function removeItem(name) {
    localStorage.removeItem(name)
}
class LocalStorage {
    has(key) {
        return !!localStorage.getItem(key);
    }

    get(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    set(key, obj) {
        localStorage.setItem(
            key,
            JSON.stringify(obj)
        );
    }

    remove(key) {
        localStorage.removeItem(key);
    }
}

export const ls = new LocalStorage();
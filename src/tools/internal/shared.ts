let currentSize = 2;

export const sharedPersistentState = {
    get sizes() {
        return [1, 2, 3, 5];
    },

    get currentSize() {
        return currentSize;
    },

    set currentSize(size: number) {
        if (sharedPersistentState.sizes.some(s => s === size)) {
            currentSize = size;
        } else {
            throw new Error("Custom sizes not allowed");
        }
    }
};

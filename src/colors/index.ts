let primary = 0x000000ff;
let secondary = 0xffffffff;

const subscriptions: Set<() => void> = new Set();

function notifyAll() {
    for (const notify of subscriptions) {
        notify();
    }
}

function parseColor(value: unknown): number {
    if (typeof value === 'number') {
        return value;
    }

    if (typeof value === 'string') {
        return Number.parseInt(value, 16);
    }

    throw new Error("Not implemented");
}

const obj = {
    get colors() {
        return [
            0x000000FF, 0xFFFFFFFF,
            0x808080FF, 0xC0C0C0FF,
            0x800000FF, 0xFF0000FF,
            0x808000FF, 0xFFFF00FF,
            0x008000FF, 0x00FF00FF,
            0x008080FF, 0x00FFFFFF,
            0x000080FF, 0x0000FFFF,
            0x800080FF, 0xFF00FFFF,
            0x808040FF, 0xFFFF80FF,
            0x004040FF, 0x00FF80FF,
            0x0080FFFF, 0x80FFFFFF,
            0x004080FF, 0x8080FFFF,
            0x8000FFFF, 0xFF0080FF,
            0x804000FF, 0xFF8040FF
        ];
    },

    get colorStrings() {
        return obj.colors.map(n => n.toString(16).padStart(8, "0"));
    },

    get primary(): number {
        return primary;
    },

    get secondary(): number {
        return secondary;
    },

    get primaryString() {
        return primary.toString(16).padStart(8, "0");
    },

    get secondaryString() {
        return secondary.toString(16).padStart(8, "0");
    },

    set primary(value: number | string) {
        primary = parseColor(value);
        notifyAll();
    },

    set secondary(value: number | string) {
        secondary = parseColor(value);
        notifyAll();
    },

    subscribe(sub: () => void) {
        subscriptions.add(sub);
        return subscriptions.delete.bind(subscriptions, sub);
    }
};

export default obj;
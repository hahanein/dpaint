export function rotate(x0: number, y0: number, x1: number, y1: number, angle: number): [number, number] {
    const s = Math.sin(angle);
    const c = Math.cos(angle);

    x1 -= x0;
    y1 -= y0;

    const x = x1 * c - y1 * s;
    const y = x1 * s + y1 * c;

    x1 = x + x0;
    y1 = y + y0;

    return [x1, y1];
}

export function at(x0: number, y0: number, x1: number, y1: number, d1: number): [number, number] {
    const d = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2);
    if (Number.isNaN(d) || d < d1) {
        return [NaN, NaN];
    }

    x0 = x1 - ((d1 * (x1 - x0)) / d);
    y0 = y1 - ((d1 * (y1 - y0)) / d);

    return [x0, y0];
}
import {at, rotate} from "./math";

type Plotter = (color: number, x: number, y: number) => void;
type Picker = (x: number, y: number) => number | undefined;

export function plotCircle(plot: Plotter, color: number, x0: number, y0: number, x1: number, y1: number) {
    const rx = Math.abs(x0 - x1);
    const dx = rx + (x0 < x1 ? x0 : x1);
    const ry = Math.abs(y0 - y1);
    const dy = ry + (y0 < y1 ? y0 : y1);

    for (let x = dx - rx; x <= dx + rx; x++) {
        for (let y = dy - ry; y <= dy + ry; y++) {
            if ((x - dx) ** 2 + (y - dy) ** 2 <= rx * ry) {
                plot(color, x, y);
            }
        }
    }
}

export function plotPointer(plot: Plotter, color: number, x0: number, y0: number, x1: number, y1: number, size: number = 12, theta: number = 500) {
    [x0, y0] = at(x0, y0, x1, y1, size);
    if (x0 && y0) {
        const [x2, y2] = rotate(x0, y0, x1, y1, theta);
        const [x3, y3] = rotate(x0, y0, x1, y1, -theta);

        plotLine(plot, color, Math.floor(x2), Math.floor(y2), x1, y1);
        plotLine(plot, color, Math.floor(x3), Math.floor(y3), x1, y1);
    }
}

export function createDashedPlotter(plot: Plotter, size: number = 4): Plotter {
    const cap = size * 2;
    let i = 0;
    return function plotDashed(color, x, y) {
        if (i < size) {
            plot(color, x, y);
        }

        i = (i + 1) % cap;
    };
}

export function plotFill(plot: Plotter, pick: Picker, next: number, x: number, y: number) {
    const prev = pick(x, y);
    if (prev && prev !== next) {
        const stack: [number, number][] = [[x, y]];

        for (let frame = stack.pop(); frame; frame = stack.pop()) {
            [x, y] = frame;

            if (pick(x, y) === prev) {
                plot(next, x, y);

                stack.push(
                    [x, y + 1],
                    [x, y - 1],
                    [x + 1, y],
                    [x - 1, y]
                );
            }
        }
    }
}

/**
 * Takes a {@link Plotter} and returns an increased size {@link Plotter}.
 * @param plot - The {@link Plotter}
 * @param size - The value to increase the plotter size by
 * @returns an increased size {@link Plotter}
 */
export function createSquarePlotter(plot: Plotter, size: number): Plotter {
    if (size === 1) {
        return plot;
    }

    if (size > 1) {
        return function plotSquare(color, x, y) {
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    plot(color, x + i, y + j);
                }
            }
        };
    }

    throw new Error("Size must be greater than or equal 1");
}

export function plotLine(plot: Plotter, color: number, x0: number, y0: number, x1: number, y1: number) {
    const dx = Math.abs(x1 - x0);
    const sx = x0 < x1 ? 1 : -1;
    const dy = -Math.abs(y1 - y0);
    const sy = y0 < y1 ? 1 : -1;

    let err = dx + dy;

    for (;;) {
        plot(color, x0, y0);
        if (x0 == x1 && y0 == y1) {
            break;
        }

        const e2 = 2 * err;
        if (e2 >= dy) {
            err += dy;
            x0 += sx;
        }

        if (e2 <= dx) {
            err += dx;
            y0 += sy;
        }
    }
}

export function plotSolidRectangle(plot: Plotter, color: number, x0: number, y0: number, x1: number, y1: number) {
    const dx = Math.abs(x0 - x1);
    const dy = Math.abs(y0 - y1);
    const x = x0 < x1 ? x0 : x1;
    const y = y0 < y1 ? y0 : y1;
    for (let i = 0; i < dx; i++) {
        for (let j = 0; j < dy; j++) {
            plot(color, x + i, y + j);
        }
    }
}

export function plotRectangle(plot: Plotter, color: number, x0: number, y0: number, x1: number, y1: number) {
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let x = x0;
    let y = y0;

    for (;;) {
        plot(color, x, y0);
        plot(color, x, y1);
        if (x === x1) {
            break;
        }

        x += sx;
    }

    for (;;) {
        plot(color, x0, y);
        plot(color, x1, y);
        if (y === y1) {
            break;
        }

        y += sy;
    }
}

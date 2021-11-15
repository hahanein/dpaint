// "In Java, the bitwise operators work with integers. JavaScript doesn't have integers. It only has double precision
// floating-point numbers. So, the bitwise operators convert their number operands into integers, do their business, and
// then convert them back. In most languages, these operators are very close to the hardware and very fast. In
// JavaScript, they are very far from the hardware and very slow. JavaScript is rarely used for doing bit manipulation."
// - Douglas Crockford

type Spec = {
    width: number;
    height: number;
};

/**
 * Takes an image buffer and sets every point to RGBA(255, 255, 255, 255).
 * @param buf - The image buffer
 */
function whiteOut(buf: Uint8ClampedArray) {
    for (let i = 0; i < buf.length; i++) {
        buf[i] = 255;
    }
}

export default function createBuffer({width, height}: Spec) {
    const subscriptions: Set<() => void> = new Set();

    const buf = new Uint8ClampedArray(width * height * 4);

    whiteOut(buf);

    const bak: Uint8ClampedArray = new Uint8ClampedArray(buf);

    const history: Uint8ClampedArray[] = [new Uint8ClampedArray(buf)];
    const undone: Uint8ClampedArray[] = [];

    return Object.freeze({
        subscribe(sub: () => void) {
            subscriptions.add(sub);
            return subscriptions.delete.bind(subscriptions, sub);
        },

        plot(color: number, x: number, y: number) {
            if (0 > x || x >= width || 0 > y || y >= height) {
                return;
            }

            let i = x * 4 + y * width * 4;

            buf[i] = (color >> 24) & 255; // Red
            buf[++i] = (color >> 16) & 255; // Green
            buf[++i] = (color >> 8) & 255; // Blue
            buf[++i] = color & 255; // Alpha
        },

        pick(x: number, y: number) {
            if (0 > x || x >= width || 0 > y || y >= height) {
                return;
            }

            let i = x * 4 + y * width * 4;

            return buf[i] * Math.pow(2, 24) // Red
                + buf[++i] * Math.pow(2, 16) // Green
                + buf[++i] * Math.pow(2, 8) // Blue
                + buf[++i]; // Alpha
        },

        commit() {
            for (const notify of subscriptions) {
                notify();
            }
        },

        stash() {
            bak.set(buf);
        },

        unstash() {
            buf.set(bak);
        },

        snapshot() {
            undone.length = 0;
            history.push(new Uint8ClampedArray(buf));
            history.splice(0, history.length - 50);
        },

        undo() {
            const prev = history.pop();
            if (prev) {
                undone.push(prev);
                buf.set(prev);
            }
        },

        redo() {
            const next = undone.pop();
            if (next) {
                history.push(next);
                buf.set(next);
            }
        },

        get imageData() {
            return new ImageData(buf, width, height);
        },

        /** @see {@link CanvasRenderingContext2D.getImageData} */
        getImageData(sx: number, sy: number, sw: number, sh: number) {
            const slice = new Uint8ClampedArray(sw * sh * 4);

            for (let y = 0; y < sh; y++) {
                const start = sx * 4 + (sy + y) * width * 4;
                const end = (sx + sw) * 4 + (sy + y) * width * 4;
                const offset = y * sw * 4;
                slice.set(buf.slice(start, end), offset);
            }

            return new ImageData(slice, sw, sh);
        },

        /** @see {@link CanvasRenderingContext2D.putImageData} */
        putImageData(imageData: ImageData, x: number, y: number) {
            const left = x * 4;
            const top = y * width * 4;
            const dx = imageData.width * 4;
            for (let i = 0; i < imageData.data.length; i++) {
                const ix = i % dx;
                const iy = Math.floor(i / dx) * width * 4;
                buf[left + top + ix + iy] = imageData.data[i];
            }
        }
    });
}

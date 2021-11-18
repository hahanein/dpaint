import type {Tool, Spec} from "./index";

export default function createMagnifier({buffer, target}: Spec): Tool {
    let factor = 2;

    const obj = {
        begin() {
            target.zoom(factor);
            buffer.commit();
        },

        close() {
            // Do nothing.
        },

        get modifiers() {
            return [1, 2, 6, 8].map(n => ({
                name: `${n}X`,
                isActive: factor === n,
                set() {
                    factor = n;
                }
            }));
        }
    };

    return Object.freeze(obj);
}

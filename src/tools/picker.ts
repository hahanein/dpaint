import type {Tool, Spec} from "./index";

export default function createPicker({buffer, colors, target}: Spec): Tool {
    const obj = {
        begin() {
            // Do nothing.
        },

        close() {
            const color = buffer.pick(target.x, target.y);
            if (color && target.main) {
                colors.primary = color;
            }
            if (color && target.secondary) {
                colors.secondary = color;
            }
        },
    };

    return Object.freeze(obj);
}

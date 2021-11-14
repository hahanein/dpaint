import type {Tool, Spec} from "./index";
import {plotFill} from "./internal/plotter";

export default function createBucket({buffer, colors, target}: Spec): Tool {
    const obj = {
        begin() {
            // Do nothing.
        },

        close() {
            plotFill(buffer.plot, buffer.pick, target.main ? colors.primary : colors.secondary, target.x, target.y);
            buffer.commit();
            buffer.snapshot();
        },
    };

    return Object.freeze(obj);
}

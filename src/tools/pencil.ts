import type {Tool, Spec} from "./index";
import {plotLine} from "./internal/plotter";

export default function createPencil({buffer, colors, target}: Spec): Tool {
    let x0: number;
    let y0: number;

    let handle: number;
    const tick: FrameRequestCallback =
        _ => {
            plotLine(buffer.plot, target.secondary ? colors.secondary : colors.primary, x0, y0, target.x, target.y);
            x0 = target.x;
            y0 = target.y;
            buffer.commit();

            handle = window.requestAnimationFrame(tick);
        };

    const obj = {
        begin() {
            window.cancelAnimationFrame(handle);

            buffer.plot(target.secondary ? colors.secondary : colors.primary, target.x, target.y);
            x0 = target.x;
            y0 = target.y;
            buffer.commit();

            handle = window.requestAnimationFrame(tick);
        },

        close() {
            window.cancelAnimationFrame(handle);
            buffer.snapshot();
        }
    };

    return Object.freeze(obj);
}

import type {Tool, Spec} from "./index";
import {plotLine} from "./internal/plotter";
import createLoop from "./internal/run";

export default function createPencil({buffer, colors, target}: Spec): Tool {
    let x0: number;
    let y0: number;

    const [loop, cancel] = createLoop();

    const draw: FrameRequestCallback =
        _ => {
            plotLine(buffer.plot, target.secondary ? colors.secondary : colors.primary, x0, y0, target.x, target.y);
            x0 = target.x;
            y0 = target.y;
            buffer.commit();
        };

    const obj = {
        begin() {
            cancel();

            buffer.plot(target.secondary ? colors.secondary : colors.primary, target.x, target.y);
            x0 = target.x;
            y0 = target.y;
            buffer.commit();

            loop(draw);
        },

        close() {
            cancel();

            buffer.snapshot();
        }
    };

    return Object.freeze(obj);
}

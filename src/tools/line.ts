import type {Tool, Spec} from "./index";
import {createSquarePlotter, plotLine, plotPointer} from "./internal/plotter";
import {sharedPersistentState} from "./internal/shared";
import createLoop from "./internal/run";

export default function createLine({buffer, colors, target}: Spec): Tool {
    let x0: number;
    let y0: number;

    const [loop, cancel] = createLoop();

    const paint: FrameRequestCallback =
        _ => {
            buffer.unstash();
            let plot = createSquarePlotter(buffer.plot, sharedPersistentState.currentSize);
            plotLine(plot, target.main ? colors.primary : colors.secondary, x0, y0, target.x, target.y);
            plotPointer(plot, target.main ? colors.primary : colors.secondary, x0, y0, target.x, target.y);
            buffer.commit();
        }

    const obj = {
        begin() {
            cancel();

            buffer.stash();
            let plot = createSquarePlotter(buffer.plot, sharedPersistentState.currentSize);
            plot(target.main ? colors.primary : colors.secondary, target.x, target.y);
            x0 = target.x;
            y0 = target.y;
            buffer.commit();

            loop(paint);
        },

        close() {
            cancel();
            buffer.snapshot();
        },

        get modifiers() {
            return sharedPersistentState.sizes.map(n => ({
                name: `${n}px`,
                isActive: n === sharedPersistentState.currentSize,
                set() {
                    sharedPersistentState.currentSize = n;
                }
            }));
        }
    };

    return Object.freeze(obj);
}

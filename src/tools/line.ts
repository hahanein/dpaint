import type {Tool, Spec} from "./index";
import {createSquarePlotter, plotLine, plotPointer} from "./internal/plotter";
import {sharedPersistentState} from "./internal/shared";

export default function createLine({buffer, colors, target}: Spec): Tool {
    let x0: number;
    let y0: number;

    let handle: number;
    const tick: FrameRequestCallback =
        _ => {
            buffer.unstash();
            let plot = createSquarePlotter(buffer.plot, sharedPersistentState.currentSize);
            plotLine(plot, target.main ? colors.primary : colors.secondary, x0, y0, target.x, target.y);
            plotPointer(plot, target.main ? colors.primary : colors.secondary, x0, y0, target.x, target.y);
            buffer.commit();
            handle = window.requestAnimationFrame(tick);
        }

    const obj = {
        begin() {
            window.cancelAnimationFrame(handle);
            buffer.stash();
            let plot = createSquarePlotter(buffer.plot, sharedPersistentState.currentSize);
            plot(target.main ? colors.primary : colors.secondary, target.x, target.y);
            x0 = target.x;
            y0 = target.y;
            buffer.commit();
            handle = window.requestAnimationFrame(tick);
        },

        close() {
            window.cancelAnimationFrame(handle);
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

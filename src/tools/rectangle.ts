import type {Tool, Spec} from "./index";
import {createSquarePlotter, plotRectangle, plotSolidRectangle} from "./internal/plotter";
import {sharedPersistentState} from "./internal/shared";

const flagOutline = 1 << 0;
const flagFill = 1 << 1;

const flags = [
    {name: "outline", flags: flagOutline},
    {name: "full", flags: flagOutline | flagFill},
    {name: "fill", flags: flagFill}
];

let currentFlags = flagOutline;

export default function createRectangle({buffer, colors, target}: Spec): Tool {
    let x0: number;
    let y0: number;

    let handle: number;
    const tick: FrameRequestCallback =
        _ => {
            buffer.unstash();

            if ((flagFill & currentFlags) > 0) {
                plotSolidRectangle(buffer.plot, target.main ? colors.secondary : colors.primary, x0, y0, target.x, target.y);
            }

            if ((flagOutline & currentFlags) > 0) {
                let plot = createSquarePlotter(buffer.plot, sharedPersistentState.currentSize);
                plotRectangle(plot, target.main ? colors.primary : colors.secondary, x0, y0, target.x, target.y);
            }

            buffer.commit();

            handle = window.requestAnimationFrame(tick);
        };

    const obj = {
        begin() {
            window.cancelAnimationFrame(handle);

            buffer.stash();

            if ((flagFill & currentFlags) > 0) {
                buffer.plot(target.main ? colors.secondary : colors.primary, target.x, target.y);
            }

            if ((flagOutline & currentFlags) > 0) {
                let plot = createSquarePlotter(buffer.plot, sharedPersistentState.currentSize);
                plot(target.main ? colors.primary : colors.secondary, target.x, target.y);
            }

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
            return flags.map(({name, flags}) => ({
                name,
                isActive: flags === currentFlags,
                set() {
                    currentFlags = flags;
                }
            }));
        }
    };

    return Object.freeze(obj);
}

import type {Tool, Spec} from "./index";
import {createSquarePlotter, plotRectangle, plotSolidRectangle} from "./internal/plotter";
import {sharedPersistentState} from "./internal/shared";
import createLoop from "./internal/run";

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

    const [loop, cancel] = createLoop();

    const paint: FrameRequestCallback =
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
        };

    const obj = {
        begin() {
            cancel();

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

            loop(paint);
        },

        close() {
            cancel();
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

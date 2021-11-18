import type {Tool, Spec} from "./index";
import {createSquarePlotter, plotLine} from "./internal/plotter";
import createLoop from "./internal/run";

const strokes = [2, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21];

let currentStroke = strokes[0];

document.addEventListener("wheel", ({deltaY}) => {
    const next = Math.floor(currentStroke + deltaY * 0.01);
    if (next >= 2) {
        currentStroke = next;
    }
});

export default function createBrush({buffer, colors, target}: Spec): Tool {
    let x0: number;
    let y0: number;

    const [loop, cancel] = createLoop();

    const paint: FrameRequestCallback =
        _ => {
            let plot = createSquarePlotter(buffer.plot, currentStroke);
            plotLine(plot, target.main ? colors.primary : colors.secondary, x0, y0, target.x, target.y);
            x0 = target.x;
            y0 = target.y;
            buffer.commit();
        };

    const obj = {
        begin() {
            cancel();

            let plot = createSquarePlotter(buffer.plot, currentStroke);
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
            return strokes.map(n => ({
                name: `${n}px`,
                isActive: n === currentStroke,
                set() {
                    currentStroke = n;
                }
            }));
        }
    };

    return Object.freeze(obj);
}

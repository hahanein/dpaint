import type {Tool, Spec} from "./index";
import {createDashedPlotter, plotRectangle} from "./internal/plotter";
import TextElement from "../components/TextElement";

export default function createText({buffer, colors, target}: Spec): Tool {
    let mode: "select" | "insert" | "done" = "select";
    let x0: number;
    let y0: number;

    const plot = createDashedPlotter(buffer.plot);

    let handle: number;
    const tick: FrameRequestCallback =
        _ => {
            buffer.unstash();
            plotRectangle(plot, colors.primary, x0, y0, target.x, target.y);
            buffer.commit();

            handle = window.requestAnimationFrame(tick);
        };

    const obj = {
        begin() {
            if (mode === "select") {
                window.cancelAnimationFrame(handle);

                buffer.stash();
                plot(colors.primary, target.x, target.y);
                buffer.commit();

                window.requestAnimationFrame(tick);
            }

            x0 = target.x;
            y0 = target.y;
        },

        close() {
            if (mode === "select") {
                window.cancelAnimationFrame(handle);

                mode = "insert";

                buffer.unstash();

                const {x: x1, y: y1, offsetLeft, offsetTop} = target;

                const x = x0 < x1 ? x0 : x1;
                const y = y0 < y1 ? y0 : y1;
                const dx = Math.abs(x0 - x1);
                const dy = Math.abs(y0 - y1);
                x0 = x1;
                y0 = y1;

                plotRectangle(plot, colors.primary, x - 1, y, x + dx, y + dy + 1);

                const elm = new TextElement();
                elm.style.left = `${x + offsetLeft}px`;
                elm.style.top = `${y + offsetTop}px`;
                elm.style.width = `${dx}px`;
                elm.style.height = `${dy}px`;

                document.body.appendChild(elm);

                buffer.commit();

                elm.addEventListener("focusout", _ => {
                    buffer.unstash();
                    elm.remove();
                    if (elm.value) {
                        buffer.putImageData(elm.value, x, y);
                    }
                    buffer.commit();
                    buffer.snapshot();
                    mode = "done";
                });
            } else if (mode === "done") {
                mode = "select";
            }
        }
    };

    return Object.freeze(obj);
}

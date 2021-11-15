import type {Spec, Tool} from "./index";
import {createDashedPlotter, createInversionFilter, plotRectangle, plotSolidRectangle} from "./internal/plotter";
import createLoop from "./internal/run";

type Area = {
    x: number;
    y: number;
    dx: number;
    dy: number;
};

export default function createSelect({buffer, colors, target}: Spec): Tool {
    let mode: "select" | "edit" | "drag" | "done" = "select";
    let prev: Area;
    let next: Area;

    let x0: number;
    let y0: number;

    let imageData: ImageData;

    const [loop, cancel] = createLoop();

    const plot = createInversionFilter(createDashedPlotter(buffer.plot), buffer.pick);

    const select: FrameRequestCallback =
        _ => {
            buffer.unstash();

            plotRectangle(plot, colors.primary, x0, y0, target.x, target.y);

            buffer.commit();
        };

    // Highlight and drag selected area.
    const place: FrameRequestCallback =
        _ => {
            buffer.unstash();

            plotSolidRectangle(buffer.plot, colors.secondary, prev.x, prev.y, prev.x + prev.dx - 1, prev.y + prev.dy - 1);
            plotRectangle(plot, colors.primary, next.x - 1, next.y - 1, next.x + next.dx, next.y + next.dy);
            buffer.putImageData(imageData, next.x, next.y);

            buffer.commit();
        };

    const move: FrameRequestCallback =
        time => {
            const dx = x0 - target.x;
            const dy = y0 - target.y;
            x0 = target.x;
            y0 = target.y;
            next = {x: next.x - dx, y: next.y - dy, dx: prev.dx, dy: prev.dy};
            place(time);
        };

    const inside: () => boolean =
        () => next.x < target.x
            && target.x < next.dx + next.x
            && next.y < target.y
            && target.y < next.dy + next.y;

    const obj = {
        begin() {
            // TODO(BW): There needs to be a better API to abort.
            if (target.x < 0 || target.y < 0) {
                return;
            }

            switch (mode) {
                case "select":
                    buffer.stash();
                    loop(select);
                    break;

                case "edit":
                    if (inside()) {
                        loop(move);
                    } else {
                        cancel();
                        mode = "done";

                        buffer.unstash();

                        plotSolidRectangle(buffer.plot, colors.secondary, prev.x, prev.y, prev.x + prev.dx - 1, prev.y + prev.dy - 1);
                        buffer.putImageData(imageData, next.x, next.y);

                        buffer.commit();
                    }
                    break;

                case "done":
                    // Do nothing.
            }

            x0 = target.x;
            y0 = target.y;
        },

        close() {
            // TODO(BW): There needs to be a better API to abort.
            if (target.x < 0 || target.y < 0) {
                return;
            }

            switch (mode) {
                case "select":

                    mode = "edit";

                    const {x: x1, y: y1} = target;

                    prev = {
                        x: x0 < x1 ? x0 : x1,
                        y: y0 < y1 ? y0 : y1,
                        dx: Math.abs(x0 - x1),
                        dy: Math.abs(y0 - y1)
                    };

                    next = {...prev};

                    buffer.unstash();
                    imageData = buffer.getImageData(prev.x, prev.y, prev.dx, prev.dy);

                    loop(place);
                    break;

                case "edit":
                    loop(place);
                    break;

                case "done":
                    mode = "select";
                    break;
            }
        }
    };

    return Object.freeze(obj);
}

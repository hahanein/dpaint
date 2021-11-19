import type {Tool} from "../tools";

type Spec = {
    canvas: HTMLCanvasElement;
    buffer: {
        subscribe(notify: () => void): () => void;
        imageData: ImageData;
    }
};

export default function createTarget({canvas, buffer}: Spec) {
    const container: HTMLElement = canvas.parentElement!;

    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;

    const width = canvas.width;
    const height = canvas.height;

    let factor = 1;

    void buffer.subscribe(() => ctx.putImageData(buffer.imageData, 0, 0));

    let tool: Tool;

    let main: boolean;
    let secondary: boolean;
    let x: number;
    let y: number;

    const updateButtons: (evt: MouseEvent) => void =
        evt => {
            main = evt.button === 0;
            secondary = evt.button === 2;
        };

    const updatePosition: (evt: MouseEvent) => void =
        ({clientX, clientY}) => {
            x = Math.floor((clientX - canvas.offsetLeft + container.scrollLeft) / factor);
            y = Math.floor((clientY - canvas.offsetTop + container.scrollTop) / factor);
        };

    document.addEventListener("wheel", updatePosition)
    document.addEventListener("mousemove", updatePosition);

    document.addEventListener("mousedown", evt => {
        updateButtons(evt);
        tool.begin();
    });

    document.addEventListener("mouseup", evt => {
        updateButtons(evt);
        tool.close();
    });

    document.addEventListener("contextmenu", evt => evt.preventDefault());

    return {
        get offsetLeft() {
            return canvas.offsetLeft;
        },

        get offsetTop() {
            return canvas.offsetTop;
        },

        get x() {
            return x;
        },

        get y() {
            return y;
        },

        get main() {
            return main;
        },

        get secondary() {
            return secondary;
        },

        set tool(t: Tool) {
            tool = t;
        },

        zoom(value: number) {
            factor = value;
            canvas.style.width = `${width * factor}px`;
            canvas.style.height = `${height * factor}px`;
        }
    };
}


import type {Tool} from "../tools";

type Spec = {
    canvas: HTMLCanvasElement;
    buffer: {
        subscribe(notify: () => void): () => void;
        imageData: ImageData;
    }
};

export default function createTarget({canvas, buffer}: Spec) {
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

    document.addEventListener("mousemove", ({clientX, clientY}) => {
        x = clientX - canvas.offsetLeft;
        y = clientY - canvas.offsetTop;
    });

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
            return Math.floor(x / factor);
        },

        get y() {
            return Math.floor(y / factor);
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
            canvas.width = width / factor;
            canvas.height = height / factor;
        }
    };
}


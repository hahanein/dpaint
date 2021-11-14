import type {Tool} from "../tools";

type Spec = {
    canvas: HTMLCanvasElement;
};

export default function createTarget({canvas}: Spec) {
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
        }
    };
}
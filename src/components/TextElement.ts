const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
    position: absolute;
}

textarea {
    box-sizing: border-box;
    border: none;
    resize: none;
    outline: none;
    width: 100%;
    height: 100%;
}
</style>
<textarea></textarea>
`;

function computeLineHeight(target: HTMLElement, font: string) {
    const span = document.createElement("span");
    span.style.font = font;
    span.textContent = "A";

    target.parentElement?.appendChild(span);
    const result = span.clientHeight;
    span.remove();

    return result;
}

function fillWrappedText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, lineHeight: number) {
    let y = lineHeight;

    const lines = text.split("\n").map(l => l.split(" "));

    for (let words of lines) {
        let current = "";

        for (let word of words) {
            const next = current + word + " ";

            if (ctx.measureText(next).width < maxWidth) {
                current = next;
                continue;
            }

            ctx.fillText(current, 0, y);
            current = word + " ";
            y += lineHeight;
        }

        ctx.fillText(current, 0, y);
        y += lineHeight;
    }
}

/**
 * This {@link HTMLTextAreaElement} creates
 */
export default class TextElement extends HTMLElement {
    #root: ShadowRoot;
    #textarea: HTMLTextAreaElement;
    #canvas: HTMLCanvasElement;
    value: ImageData | undefined;
    #font = `1.2rem Helvetica, Arial, Verdana sans-serif`;

    constructor() {
        super();

        this.#root = this.attachShadow({mode: "closed"});
        this.#root.appendChild(template.content.cloneNode(true));

        this.#textarea = this.#root.querySelector("textarea")!;
        this.#textarea.style.font = this.#font;

        this.#canvas = document.createElement("canvas");
    }

    static get observedAttributes() {
        return [];
    }

    connectedCallback() {
        this.#textarea.focus();

        const width = this.#textarea.offsetWidth;
        const height = this.#textarea.offsetHeight;

        this.#canvas.style.width = width + "px";
        this.#canvas.style.height = height + "px";

        this.#canvas.width = width;
        this.#canvas.height = height;

        this.#textarea.addEventListener("keyup", _ => {
            const lineHeight = computeLineHeight(this, this.#font);
            const ctx = this.#canvas.getContext("2d")!;
            ctx.font = this.#font;
            fillWrappedText(ctx, this.#textarea.value, width, lineHeight);
            this.value = ctx.getImageData(0, 0, width, height);
            ctx.clearRect(0, 0, width, height);
        });
    }
}

window.customElements.define("p-text", TextElement);

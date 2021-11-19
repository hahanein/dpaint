const template = document.createElement("template");
template.innerHTML = `
<div id="display"></div>
`;

export default class PositionElement extends HTMLElement {
    #display: HTMLButtonElement;

    constructor() {
        super();

        const root = this.attachShadow({mode: "closed"});
        root.appendChild(template.content.cloneNode(true));

        const x = this.getAttribute("x");
        const y = this.getAttribute("y");

        this.#display = root.querySelector("#display")!;
        this.#display.textContent = `${x}/${y}`;
    }

    static get observedAttributes() {
        return ["x", "y"];
    }

    attributeChangedCallback(name: string, _: string, value: string) {
        switch (name) {
            case "x":
                const y = this.getAttribute("y");
                this.#display.textContent = `${value}/${y}`;
                break;

            case "y":
                const x = this.getAttribute("x");
                this.#display.textContent = `${x}/${value}`;
                break;
        }
    }
}

window.customElements.define("p-position", PositionElement);

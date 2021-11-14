const template = document.createElement("template");
template.innerHTML = `
<style>
button {
    width: 1.5rem;
    height: 1.5rem;
}
</style>
<button></button>
`;

export default class ColorElement extends HTMLElement {
    #button: HTMLButtonElement;

    constructor() {
        super();

        const root = this.attachShadow({mode: "closed"});
        root.appendChild(template.content.cloneNode(true));

        this.#button = root.querySelector("button")!;
    }

    static get observedAttributes() {
        return ["value"];
    }

    attributeChangedCallback(name: string, _: string, newValue: string) {
        if (name == "value") {
            this.#button.style.background = "#" + newValue;
        }
    }
}

window.customElements.define("p-color", ColorElement);

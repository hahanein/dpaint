import ColorElement from "./ColorElement";

const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
    display: flex;
}

#current {
  position: relative;
  width: 4rem;
  height: 4rem;
}

#primary {
  position: absolute;
  top: .5rem;
  left: .5rem;
}

#secondary {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
}

#available {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}
</style>
<div id="current">
    <p-color id="secondary" value="FFFFFF"></p-color>
    <p-color id="primary" value="000000"></p-color>
</div>
<div id="available">
    <slot></slot>
</div>
`;

export default class ColorsElement extends HTMLElement {
    #primary: ColorElement;
    #secondary: ColorElement;

    constructor() {
        super();

        const root = this.attachShadow({mode: "closed"});
        root.appendChild(template.content.cloneNode(true));

        this.#primary = root.querySelector("#primary")!;
        this.#secondary = root.querySelector("#secondary")!;
    }

    static get observedAttributes() {
        return ["primary", "secondary"];
    }

    attributeChangedCallback(name: string, _: string, value: string) {
        switch (name) {
            case "primary":
                this.#primary.setAttribute("value", value);
                break;

            case "secondary":
                this.#secondary.setAttribute("value", value);
                break;
        }
    }
}

window.customElements.define("p-colors", ColorsElement);

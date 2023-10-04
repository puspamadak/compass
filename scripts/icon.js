import { loadStyle } from "./asset.js";

class Icon extends HTMLElement {
    static get observedAttributes() {
        return ['base', 'file', 'root', 'path'];
    }
    attributeChangedCallback(name) {
        var path;
        if (name == 'base' || name == 'file' || name == 'root') {
            const base = this.getAttribute("base") ?? "icons";
            const file = this.getAttribute("file");
            const root = this.getAttribute("root") ?? "root";
            path = `${base}/${file}.svg#${root}`;
        } else if (name == 'path') {
            path = this.getAttribute("path");
        }
        if (path) this.innerHTML = `<svg><use href="${path}" /></svg>`;
    }
    connectedCallback() {
        loadStyle('icon');
    }
}

customElements.define("i-con", Icon);
export default Icon;
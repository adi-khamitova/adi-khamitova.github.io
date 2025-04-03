import { createElement } from "../framework/render.js";

function createClearBtnComponentTemplate() {
    return (
        `<button type="button" class="btn btn-primary btn-lg btn-clear">&#x2715 Очистить</button>`
    );
}

export default class ClearBtnComponent {
    getTemplate() {
        return createClearBtnComponentTemplate();
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
        }

        return this.element;
    }

    removeElement() {
        this.element = null;
    }
}
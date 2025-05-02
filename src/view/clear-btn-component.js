import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createClearBtnComponentTemplate(isDisabled) {
    return (
        `<button type="button" class="btn btn-primary btn-lg btn-clear" ${isDisabled ? 'disabled' : ''}>&#x2715 Очистить</button>`
    );
}

export default class ClearBtnComponent extends AbstractComponent {
    #handleClick = null;
    #isDisabled = false;

    constructor(status, { onClick, isDisabled = false }) {
        super();
        this.status = status;
        this.#isDisabled = isDisabled;
        this.#handleClick = onClick;
        this.element.addEventListener("click", this.#clickHandler);
    }

    get template() {
        return createClearBtnComponentTemplate(this.#isDisabled);
    }

    toggleDisabled(isDisabled) {
        const button = this.element.querySelector('.btn-clear');
        if (button) {
          button.disabled = isDisabled;
        }
        console.log(isDisabled);
    }

    #clickHandler = (evt) => {
        if (this.#isDisabled) return;
        evt.preventDefault();
        this.#handleClick();
    }
}
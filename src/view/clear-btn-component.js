import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createClearBtnComponentTemplate() {
    return (
        `<button type="button" class="btn btn-primary btn-lg btn-clear">&#x2715 Очистить</button>`
    );
}

export default class ClearBtnComponent extends AbstractComponent {
    #handleClick = null;

    constructor(status, {onClick}) {
        super();
        this.status = status;
        this.#handleClick = onClick;
        this.element.addEventListener("click", this.#clickHandler);
    }

    get template() {
        return createClearBtnComponentTemplate();
    }

    toggleDisabled(isDisabled) {
        const button = this.element.querySelector('.btn-clear');
        if (button) {
          button.disabled = isDisabled;
        }
        console.log(isDisabled);
    }

    #clickHandler = (evt) => {
        evt.preventDefault();
        this.#handleClick();
    }
}
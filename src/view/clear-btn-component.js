import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createClearBtnComponentTemplate() {
    return (
        `<button type="button" class="btn btn-primary btn-lg btn-clear">&#x2715 Очистить</button>`
    );
}

export default class ClearBtnComponent extends AbstractComponent {

    constructor(status) {
        super();
        this.status = status;
    }

    get template() {
        return createClearBtnComponentTemplate();
    }

    // getElement() {
    //     if (!this.element) {
    //         this.element = createElement(this.getTemplate());
    //     }

    //     return this.element;
    // }

    // removeElement() {
    //     this.element = null;
    // }
}
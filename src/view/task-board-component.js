import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskSectionComponentTemplate() {
    return (
        `<div class="task-section row g-3"></div>`
    );
}

export default class TaskSectionComponent extends AbstractComponent {
    get template() {
        return createTaskSectionComponentTemplate();
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
import { createElement } from "../framework/render.js";
import {Status, StatusLabel} from "../const.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTasksListComponentTemplate(status) {
    const statusLabel = StatusLabel[status];

    return (
        `<section class="task-list-section task-list-section-${status}">
        <ul class="tasks-list ${status}">
            <span class="title title--${status}">${statusLabel}</span>
        </ul>
        </section>`
    );
}

export default class TasksListComponent extends AbstractComponent {

    constructor({ status }) {
        super();
        this.status = status;
        // console.log(status);
      }

    get template() {
        return createTasksListComponentTemplate(this.status);
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
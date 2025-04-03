import { createElement } from "../framework/render.js";
import {Status, StatusLabel} from "../const.js";

function createTasksListComponentTemplate(status) {
    const statusLabel = StatusLabel[status];

    return (
        `<section class="task-list-section">
        <ul class="tasks-list ${status}">
            <span class="title title--${status}">${statusLabel}</span>
        </ul>
        ${status === Status.TRASH ? '<button type="button" class="btn btn-primary btn-lg btn-clear">&#x2715 Очистить</button>' : ''}
        </section>`
    );
}

export default class TasksListComponent {

    constructor({ status }) {
        // this.element = null;
        this.status = status;
        // console.log(status);
      }

    getTemplate() {
        return createTasksListComponentTemplate(this.status);
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
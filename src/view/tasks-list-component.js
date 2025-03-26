import { createElement } from "../framework/render.js";

function createTasksListComponentTemplate() {
    return (
        `<ul class="tasks-list">
            <span class="title title-backlog">Название блока</span>
        </ul>`
    );
}

export default class TasksListComponent {
    getTemplate() {
        return createTasksListComponentTemplate();
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
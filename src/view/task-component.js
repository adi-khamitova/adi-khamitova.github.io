import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskComponentTemplate(task) {
    const {title, status} = task;
    return `<li class="task-card task--${status}">${title}</li>`;
}

export default class TaskComponent extends AbstractComponent {

    constructor({task}) {
        super();
        this.task = task;
        this.#afterCreateElement();
    }

    get template() {
        return createTaskComponentTemplate(this.task);
    }

    #afterCreateElement() {
        this.#makeTaskDraggable();
    }

    #makeTaskDraggable() {
        this.element.setAttribute('draggable', 'true');
        this.element.dataset.taskId = this.task.id; // Добавляем ID в dataset
        
        this.element.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', this.task.id);
            this.element.classList.add('dragging');
        });

        this.element.addEventListener('dragend', () => {
            this.element.classList.remove('dragging');
        });
    }
}
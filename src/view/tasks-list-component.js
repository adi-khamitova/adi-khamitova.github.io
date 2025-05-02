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

    constructor({ status, onTaskDrop }) {
        super();
        this.status = status;
        this.#setDropHandler(onTaskDrop);
      }

    get template() {
        return createTasksListComponentTemplate(this.status);
    }

    #setDropHandler (onTaskDrop) {
        const container = this.element;

        container.addEventListener ('dragover', (event) => {
            event.preventDefault();
            const closestTask = this.#getClosestTask(event.clientY);
            if (closestTask) {
                closestTask.classList.add('drop-before');
            }
        });

        container.addEventListener('dragleave', () => {
            this.#removeDropIndicators();
        });

        container.addEventListener('drop', (event) => {
            event.preventDefault();
            this.#removeDropIndicators();

            const taskId = event.dataTransfer.getData('text/plain');
            const closestTask = this.#getClosestTask(event.clientY);
      
            let targetTaskId = null;
            let insertPosition = 'after';
      
            if (closestTask) {
                targetTaskId = closestTask.dataset.taskId;
                const rect = closestTask.getBoundingClientRect();
                insertPosition = event.clientY < rect.top + rect.height / 2 ? 'before' : 'after';
            }

            onTaskDrop(taskId, this.status, targetTaskId, insertPosition);
        });
    }

    #getClosestTask(yPosition) {
        const tasks = Array.from(this.element.querySelectorAll('.task-card'));
        return tasks.reduce((closest, task) => {
            const rect = task.getBoundingClientRect();
            const offset = yPosition - rect.top - rect.height / 2;
            if (offset < 0 && offset > closest.offset) {
              return { element: task, offset: offset };
            }
            return closest;
        }, { element: null, offset: Number.NEGATIVE_INFINITY }).element;
    }
    
    #removeDropIndicators() {
        this.element.querySelectorAll('.task-card').forEach(task => {
            task.classList.remove('drop-before');
        });
    }
}
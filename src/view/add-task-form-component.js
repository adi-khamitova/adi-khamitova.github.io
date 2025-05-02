import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createAddTaskComponentTemplate() {
    return (`
        <form class="add-task-form">
            <h3 for="new-task" class="input-label">Новая задача</h3> 
            <div class="input-group">
                <input type="text" class="new-task" placeholder="Название задачи...">
                <button type="button" class="btn btn-primary btn-lg btn-add">
                    <svg class="plus-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 4V16M4 10H16" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    Добавить
                </button>
            </div>
        </form>`
    );
}

export default class AddTaskComponent extends AbstractComponent {
    #handleClick = null;

    constructor({onClick}) {
        super();
        this.#handleClick = onClick;
        this.element.querySelector('.btn-add').addEventListener('click', this.#clickHandler);;
    }

    get template() {
        return createAddTaskComponentTemplate();
    }

    #clickHandler = (evt) => {
        evt.preventDefault();
        this.#handleClick();
    }

    // getElement() {
    //     if (!this.element) {
    //       this.element = createElement(this.getTemplate());
    //     }
    
    //     return this.element;
    // }

    // removeElement() {
    //     this.element = null;
    // }
}
import { tasks } from '../mock/task.js'
import { generateID } from "../utils.js";

export default class TaskModel {
    #boardtasks = tasks;
    #observers = [];
    #trashEmpty = false;

    get tasks() {
        return this.#boardtasks;
    }

    getTasksByStatus(status) {
        return this.#boardtasks.filter(task => task.status === status);
    }

    addTask(title) {
        const newTask = {
            title,
            status: "backlog",
            id: generateID()
        };
        this.#boardtasks.push(newTask);
        this._notifyObservers();
        return newTask;
    }

    clearTrash() {
        this.#boardtasks = this.#boardtasks.filter(task => task.status !== "trash");
        console.log("ffc");
        this.#trashEmpty = true;
        this._notifyObservers();
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    removeObserver(observer) {
        this.#observers = this.#observers.filter((obs) => obs !== observer);
    }

    _notifyObservers() {
        this.#observers.forEach((observer) => observer());
    }

    isTrashEmpty() {
        console.log("mfo");
        return !this.#boardtasks.some(task => task.status === "trash");
        // return this.#trashEmpty;
    }

    updateTaskStatus(taskId, newStatus, targetTaskId, insertPosition) {
        const taskIndex = this.#boardtasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) return;

        const task = this.#boardtasks[taskIndex];
        this.#boardtasks.splice(taskIndex, 1);
    
        if (targetTaskId) {
            const targetIndex = this.#boardtasks.findIndex(t => t.id === targetTaskId);
            if (targetIndex !== -1) {
                const insertIndex = insertPosition === 'before' ? targetIndex : targetIndex + 1;
                this.#boardtasks.splice(insertIndex, 0, { ...task, status: newStatus });
            }
        } else {
            this.#boardtasks.push({ ...task, status: newStatus });
        }
    
        this._notifyObservers();
    }
}

import { Task } from './Task.js';

export class TaskManager {
    constructor() {
        this.tasks = [];
        this.listeners = [];
    }

    addTask(text) {
        const task = new Task(Date.now(), text);
        this.tasks.push(task);
        this.notify();
    }

    removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.notify();
    }

    toggleTask(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.toggle();
            this.notify();
        }
    }

    filterTasks(filter) {
        if (filter === 'completed') {
            return this.tasks.filter(task => task.completed);
        } else if (filter === 'active') {
            return this.tasks.filter(task => !task.completed);
        }
        return this.tasks;
    }

    addListener(callback) {
        this.listeners.push(callback);
    }

    notify() {
        this.listeners.forEach(callback => callback(this.tasks));
    }
}

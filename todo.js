"use strict";
const input = document.getElementById('input');
const addBtn = document.getElementById('addBtn');
const ul = document.getElementById('ul');
addBtn.addEventListener('click', createTask);
input.addEventListener('keypress', keyPress);
function createTask() {
    let task = new Task(input.value);
    task.createLi();
}
function keyPress(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        addBtn.click();
    }
}
class Task {
    constructor(task) {
        this.task = task;
    }
    createLi() {
        if (this.task.length < 1 || this.task.charAt(0) === ' ') {
            input.value = '';
            return;
        }
        const li = document.createElement('li');
        li.innerHTML = this.task;
        li.addEventListener('click', () => { li.classList.toggle('done'); });
        ul.append(li);
        input.value = '';
        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = 'Remove';
        removeBtn.addEventListener('click', () => { li.remove(); });
        li.append(removeBtn);
    }
}

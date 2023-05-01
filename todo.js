"use strict";
const input = document.getElementById('input');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');
const ul = document.getElementById('ul');
addBtn.addEventListener('click', createTask);
clearBtn.addEventListener('click', clearStorage);
input.addEventListener('keypress', keyPress);
const tasks = loadTasks();
tasks.forEach(createLi);
function createTask() {
    if (input.value.charAt(0) === ' ' || input.value.length < 1) {
        input.value = '';
        return;
    }
    const newTask = {
        title: input.value,
        checked: false
    };
    createLi(newTask);
    tasks.push(newTask);
}
function keyPress(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        addBtn.click();
    }
}
function createLi(task) {
    const li = document.createElement('li');
    li.innerHTML = task.title;
    li.addEventListener('click', () => {
        if (task.checked) {
            task.checked = false;
            li.classList.remove('checked');
        }
        else {
            task.checked = true;
            li.classList.add('checked');
        }
        saveTasks();
    });
    ul.append(li);
    input.value = '';
    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = 'Remove';
    removeBtn.addEventListener('click', () => {
        li.remove();
        let index = tasks.indexOf(task);
        tasks.splice(index, 1);
        saveTasks();
    });
    li.append(removeBtn);
    if (task.checked) {
        li.classList.add('checked');
    }
    saveTasks();
}
function saveTasks() {
    localStorage.setItem('TASKLIST', JSON.stringify(tasks));
}
function loadTasks() {
    const tasksJSON = localStorage.getItem('TASKLIST');
    return tasksJSON === null ? [] : JSON.parse(tasksJSON);
}
function clearStorage() {
    localStorage.clear();
    location.reload();
}

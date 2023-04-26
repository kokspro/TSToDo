const input = document.getElementById('input') as HTMLInputElement;
const addBtn = document.getElementById('addBtn') as HTMLButtonElement;
const ul = document.getElementById('ul') as HTMLUListElement;

addBtn.addEventListener('click', createTask);
input.addEventListener('keypress', keyPress);

function createTask(): void {
    let task = new Task(input.value);
    task.createLi();
}

function keyPress(e: KeyboardEvent) {
    if ( e.key === "Enter") {
        e.preventDefault();
        addBtn.click();
    }
}

class Task {
    constructor(public task: string) {}
    createLi(): void {
        const li = document.createElement('li');
        li.innerHTML = this.task;
        li.addEventListener('click', () => {li.classList.toggle('done')});
        ul.append(li);
        input.value = '';

        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = 'Remove';
        removeBtn.addEventListener('click', () => {li.remove()});
        li.append(removeBtn);    
    }
}

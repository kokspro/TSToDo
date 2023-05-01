const input = document.getElementById('input') as HTMLInputElement;
const addBtn = document.getElementById('addBtn') as HTMLButtonElement;
const clearBtn = document.getElementById('clearBtn') as HTMLButtonElement;
const ul = document.getElementById('ul') as HTMLUListElement;

addBtn.addEventListener('click', createTask);
clearBtn.addEventListener('click', clearStorage);
input.addEventListener('keypress', keyPress);

type Task = {
    title: string
    id: Date
    checked: boolean
}

const tasks: Task[] = loadTasks();
tasks.forEach(createLi);

function createTask() {
    if (input.value.charAt(0) === ' ' || input.value.length < 1) {
        input.value = '';
        return;
    }

    const newTask: Task = {
        title: input.value,
        id: new Date(),
        checked: false
    }

    createLi(newTask);
    tasks.push(newTask);
}


function keyPress(e: KeyboardEvent) {
    if ( e.key === "Enter" ) {
        e.preventDefault();
        addBtn.click();
    }
}

function createLi(task: Task): void {
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
        let index = tasks.indexOf(task)
        tasks.splice(index, 1);
        saveTasks();
    });
    li.append(removeBtn); 

    if (task.checked) {
        li.classList.add('checked');
    }

    saveTasks();
}

function saveTasks(): void {
    localStorage.setItem('TASKLIST', JSON.stringify(tasks));
}

function loadTasks(): Task[] {
    const tasksJSON = localStorage.getItem('TASKLIST');
    return tasksJSON === null ? [] : JSON.parse(tasksJSON);
}

function clearStorage(): void {
    localStorage.clear();
    location.reload();
}

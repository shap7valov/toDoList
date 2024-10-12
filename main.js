
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const filter = document.getElementById('filter');

let tasks = [];

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const taskTitle = document.getElementById('task-title').value;
    const taskNumber = document.getElementById('task-number').value;
    const taskPriority = document.getElementById('task-priority').value;

    const task = { title: taskTitle, number: taskNumber, priority: taskPriority };
    tasks.push(task);

    renderTasks(tasks);
    taskForm.reset();
});

filter.addEventListener('change', () => {
    const filterValue = filter.value;
    let filteredTasks;

    if (filterValue === 'all') {
        filteredTasks = tasks;
    } else {
        filteredTasks = tasks.filter(task => task.priority === filterValue);
    }

    renderTasks(filteredTasks);
});

const renderTasks = (tasks) => {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.title} (№${task.number}) - ${task.priority}</span>
            <button onclick="editTask(${index})">Редактировать</button>
            <button onclick="deleteTask(${index})">Удалить</button>
        `;
        taskList.appendChild(li);
    });
};

window.deleteTask = (index) => {
    tasks.splice(index, 1);
    renderTasks(tasks);
};

window.editTask = (index) => {
    const newTitle = prompt("Редактировать название задачи:", tasks[index].title);
    const newNumber = prompt("Редактировать номер задачи:", tasks[index].number);
    if (newTitle && newNumber) {
        tasks[index].title = newTitle;
        tasks[index].number = newNumber;
        renderTasks(tasks);
    }
};


let tasks = [];


const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const tasksContainer = document.getElementById('tasks-container');
const totalTasks = document.getElementById('total-tasks');
const completedTasks = document.getElementById('completed-tasks');


taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
    }
});


function addTask(text) {
    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };
    tasks.push(task);
    saveTasks();
    renderTasks();
}


function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) {
        return;
    }else{
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}
}


function toggleTaskCompletion(id) {
    tasks = tasks.map(task => 
        task.id === id ? {...task, completed: !task.completed} : task
    );
    saveTasks();
    renderTasks();
}


const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


const loadTasks = () => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
    renderTasks();
}


function renderTasks() {
    tasksContainer.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button onclick="toggleTaskCompletion(${task.id})">✅</button>
            <button onclick="deleteTask(${task.id})">❌</button>
        `;
        tasksContainer.appendChild(li);
    });

    updateCounters();
}


const updateCounters = () => {
    totalTasks.textContent = tasks.length;
    completedTasks.textContent = tasks.filter(task => task.completed).length;
}


loadTasks();

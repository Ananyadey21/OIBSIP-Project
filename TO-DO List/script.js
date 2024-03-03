window.onload = function() {
    loadTasks();
};

// Add a new task to the list
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    let tasks = getTasks();
    tasks.push({ text: taskText, completed: false });
    saveTasks(tasks);

    taskInput.value = '';
    loadTasks();
}
function loadTasks() {
    const taskList = document.getElementById('taskList');
    const completedTasksList = document.getElementById('completedTasks');
    const tasks = getTasks();

    taskList.innerHTML = '';
    completedTasksList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="${task.completed ? 'task-complete' : ''}">${task.text}</span>
            <button class="complete-btn" onclick="toggleTask(${index})"><i class="far fa-check-circle"></i></button>
            <button class="delete-btn" onclick="deleteTask(${index})"><i class="far fa-trash-alt"></i></button>
        `;
        if (task.completed) {
            completedTasksList.appendChild(li);
        } else {
            taskList.appendChild(li);
        }
    });
}

// task completion
function toggleTask(index) {
    let tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    loadTasks();
}

// Delete a task from the list
function deleteTask(index) {
    let tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    loadTasks();
}

// Get tasks
function getTasks() {
    const tasksString = localStorage.getItem('tasks') || '';
    return tasksString.split(',').map(taskString => {
        const [text, completed] = taskString.split(':');
        return { text, completed: completed === 'true' };
    });
}

// Save tasks
function saveTasks(tasks) {
    const tasksString = tasks.map(task => `${task.text}:${task.completed}`).join(',');
    localStorage.setItem('tasks', tasksString);
}
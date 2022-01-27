const form = document.querySelector('.form');
const taskInput = document.querySelector('.task-input');
const todoList = document.querySelector('.todo-list');

let state = {
    tasks: [],
};

// Dynamic HTML template for new tasks
const template = task => `<div
  class="todo-list-task ${task.complete && 'todo-list-task__done'}"
    id="${task.id}" onclick="markComplete(${task.id})">
    <p>${task.task}</p>
    ${removeButton(task)}
  </div>`;


// Render the template to the DOM
const render = (htmlString, el) => {
    el.innerHTML += htmlString;
};

// Create + add remove button
const removeButton = task => {
    if (task.complete) {
        return `
      <div>
        <button
          type="button"
          class="remove-button" 
          onclick="removeTask(${task.id})">
          X
        </button>
    </div>`;
    }
    return '';
};


// Submit form
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const task = {
        id: Date.now(),
        task: taskInput.value,
        complete: false,
    };
    state.tasks = []
    await axios.post('https://nodejscrud1234.herokuapp.com/todos', task).then(async (response) => {
        await getItems().then(result => {
            console.log(state.tasks)
        })
        taskInput.value = '';
    })
});

const getItems = async () => {
    await axios.get('https://nodejscrud1234.herokuapp.com/todos').then((res) => {
        res.data.forEach(element => {
            state.tasks = [...state.tasks, element];
        });
        state.tasks.map(el => render(template(el), todoList));
        return 1
    })
}

// Mark task as complete
const markComplete = async (id) => {
    id = id.toString()
    const i = state.tasks.findIndex((item) => item.id === id);
    if (i !== -1) {
        await axios.patch(`https://nodejscrud1234.herokuapp.com/todos/${state.tasks[i]._id}`, { complete: true })
        todoList.innerHTML = '';
        await getItems()
    }
};

// Remove task
const removeTask = async (id) => {
    id = id.toString()
    const index = state.tasks.findIndex((item) => item.id === id);
    if (index !== -1) {
        await axios.delete(`https://nodejscrud1234.herokuapp.com/todos/${state.tasks[index]._id}`, { complete: true })
        todoList.innerHTML = '';
        await getItems()
    }
};

window.onload = getItems();
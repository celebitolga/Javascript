const taskInput = document.querySelector('#task');
const list = document.querySelector('#list');
let arrayList = [];

function newElement() {
  if (taskInput.value.trim() === '') {
    $('.toast.error').toast('show')

    taskInput.value = '';
  } else {
    addNewTask(taskInput.value.trim());
    $('.toast.success').toast('show')
    taskInput.value = '';
  }
}

function createLiElement({ id, task, done }) {
  const newTaskElement = document.createElement('li');
  newTaskElement.innerHTML = `${task} <span class="delete js-delete">delete</span>`;
  newTaskElement.setAttribute('data-id', id);
  newTaskElement.setAttribute('data-done', done);
  list.appendChild(newTaskElement);

  newTaskEvent(newTaskElement);
}

function addNewTask(task) {
  let taskObj = {
    id: uuidv4(),
    task,
    done: false
  }

  createLiElement(taskObj);

  arrayList.push(taskObj);
  localStorage.setItem('tasks', JSON.stringify(arrayList))
}

function newTaskEvent(taskElement) {
  const deleteButton = taskElement.querySelector('.js-delete');

  taskElement.addEventListener('click', taskCheckedEvent)

  deleteButton.addEventListener('click', () => taskDeleteEvent(taskElement))
}

function taskCheckedEvent(e) {
  const taskId = e.target.dataset.id;
  const taskIndexInArrayList = arrayList.findIndex(item => item.id === taskId);

  if (taskIndexInArrayList !== -1) {
    arrayList[taskIndexInArrayList].done = !arrayList[taskIndexInArrayList].done
    localStorage.setItem('tasks', JSON.stringify(arrayList));
  }

  if (e.target.getAttribute('data-done') == 'true') {
    e.target.setAttribute('data-done', false);
  } else {
    e.target.setAttribute('data-done', true);
  }
}

function taskDeleteEvent(taskElement) {
  list.removeChild(taskElement);
  $('.toast.delete').toast('show')
  // taskElement.parentNode.removeChild(taskElement);
}

function getTasksFromLS() {
  arrayList = JSON.parse(localStorage.getItem('tasks')) || [];
}

function setTasks() {
  arrayList.forEach(item => {
    createLiElement(item);
  })
}

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

window.addEventListener('DOMContentLoaded', () => {
  getTasksFromLS(); // LS'den verileri getir arrayliste ata
  setTasks(); //arrayliste atanmış verileri eklene yazdır
});

import '../css/index.css';
import { columns, tasks } from './list'
const modal = document.querySelector(".modal");
const editModal = document.querySelector("#edit-modal")
const editForm = document.querySelector("#edit-modal form")
const newBoardModal = document.querySelector("#new-board")
const newBoardForm = document.querySelector("#new-board form")

document.addEventListener("DOMContentLoaded", () => {

  renderKanban();
  dragOnDrop();
  setupAddTaskButtons();

  const addTaskButtons = document.querySelectorAll(".kanban__icon--add");
  const closeModalButton = document.querySelector(".close-modal");
  const cancelButton = document.querySelector(".cancel-button");
  const form = document.querySelector(".modal form");

  let currentColumnId = null;

  addTaskButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentColumnId = button.getAttribute("data-column-id");
      modal.style.display = "flex";
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title-task").value;
    const description = document.getElementById("description-task").value;
    const dueDate = form.elements["date"].value;
  
    const newTask = {
      id: tasks.length + 1,
      title: title,
      description: description,
      dueDate: dueDate,
      columnId: currentColumnId,
    };
  
    tasks.push(newTask);

    const column = columns.find(c => c.id === newTask.columnId);
    if (column) {
      column.tasks.push(newTask.id);
    }
  
    renderKanban();
    dragOnDrop();
    setupAddTaskButtons();

    form.reset();
    modal.style.display = "none";
  });


  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  cancelButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  function setupAddTaskButtons() {
    const addTaskButtons = document.querySelectorAll(".kanban__icon--add");
    addTaskButtons.forEach((button) => {
      button.addEventListener("click", () => {
        currentColumnId = button.getAttribute("data-column-id");
        modal.style.display = "flex";
      });
    });
  }

  editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let taskId = editForm.getAttribute("data-task-id"); // Используйте атрибут для хранения ID текущей задачи
    let title = editForm.querySelector("#title-task").value;
    let description = editForm.querySelector("#description-task").value;
    let dueDate = editForm.elements["date"].value;

    editTask(taskId, title, description, dueDate);
    renderKanban();

    editModal.style.display = "none";
  });

  document.addEventListener("click", (e) => {
    if (e.target.className === "task-item__edit-button") {
      let taskId = Number(e.target.closest(".task-item").id);
      editModal.style.display = "flex";

      // Заполняем форму текущими значениями задачи
      let taskToEdit = tasks.find(task => task.id === taskId);
      if (taskToEdit) {
        editForm.querySelector("#title-task").value = taskToEdit.title;
        editForm.querySelector("#description-task").value = taskToEdit.description;
        editForm.elements["date"].value = taskToEdit.dueDate;
        editForm.setAttribute("data-task-id", taskId.toString()); // Устанавливаем ID задачи как атрибут формы
      }
    }

    if(e.target.className === "button--new-board"){
      newBoardModal.style.display = "flex"

      newBoardForm.addEventListener("submit",(e)=>{
        e.preventDefault()
        let boardId =document.querySelector("#board-id").value
        let boardName =document.querySelector("#board-name").value
        addNewBoard(boardId,boardName)
        newBoardForm.reset()
        newBoardModal.style.display = "none"
        renderKanban()
        setupAddTaskButtons()
      })
    }
  });
});


function renderKanban() {
  const kanbanContainer = document.querySelector(".kanban");
  kanbanContainer.innerHTML = ''; 

  columns.forEach((column) => {
    const columnSection = document.createElement("section");
    
    columnSection.className = `kanban__column kanban__column--${column.id}`;
    columnSection.innerHTML = `
      <div class="kanban__header">
        <div class="kanban__header-content">
          <img src="${column.icon}" alt="Колонка ${column.title}" class="kanban__icon kanban__icon--column">
          <h2 class="kanban__title">${column.title}</h2>
        </div>
        ${
          (column.id !== 'done') 
            ? `<img src="${require('../../assets/img/kanban/plus.svg')}" alt="Добавить задачу" class="kanban__icon kanban__icon--add" data-column-id="${column.id}">` 
            : ''
        }
      </div>
      <div class="kanban__list"></div>
    `;

    const listContainer = columnSection.querySelector(".kanban__list");
    column.tasks.forEach((taskId) => {
      const task = tasks.find((task) => task.id === taskId);
      if (task) {
        listContainer.appendChild(renderTaskElement(task));
      }
    });

    kanbanContainer.appendChild(columnSection);
  });
}

function dragOnDrop() {
  const draggables = document.querySelectorAll('.task-item');
  const columns = document.querySelectorAll('.kanban__column');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');
    });
  });

  columns.forEach(column => {
    column.addEventListener('dragover', e => {
      e.preventDefault();
      const draggable = document.querySelector('.dragging');
      column.querySelector('.kanban__list').appendChild(draggable);
    });
  });
}

function getComplexityClass(taskDate) {
  const currentDate = new Date();
  const dueDate = new Date(taskDate);
  const timeDiff = dueDate.getTime() - currentDate.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (daysDiff <= 7) {
    return {
      tag: 'complexity__dot--high',
      length: 3,
    };
  } 
   if (daysDiff <= 14) {
    return {
      tag: 'complexity__dot--medium',
      length: 2,
    };
  } 
    return {
      tag: 'complexity__dot--low',
      length: 1,

  }
}

function renderTaskElement(task) {
  const taskElement = document.createElement('div');
  const complexityClass = getComplexityClass(task.dueDate);
  taskElement.className = 'task-item';
  taskElement.setAttribute('draggable', 'true');
  taskElement.id = task.id

  let complexityDots = '';
  for (let a = 0; a < complexityClass.length; a++) {
    complexityDots += `<span class="complexity__dot ${complexityClass.tag}"></span>`;
  }

  taskElement.innerHTML = `
    <h3 class="task-item__title">${task.title}</h3>
    <p class="task-item__description">${task.description}</p>
    <div class="task-item__info">
      <div class="task-item__complexity complexity">
        ${complexityDots}
      </div>
      <div class="task-item__client">${task.dueDate}</div>
    </div>
    <button class="task-item__edit-button">изменить</button>>
  `;

  return taskElement;
}

function editTask(taskId,title,description,dueDate){

  let taskToEdit = tasks.find(task=> task.id == taskId)
  taskToEdit.title = title
  taskToEdit.description = description
  taskToEdit.dueDate = dueDate
  editForm.reset()
  console.log(taskToEdit)
}

function addNewBoard(id,name){
 let newBoard =  {
    id: id,
    title: name,
    icon: require('../../assets/img/kanban/kanban__column--done.svg'),
    tasks: [],
  }

  columns.push(newBoard) ;
}

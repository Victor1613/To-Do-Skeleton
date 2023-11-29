document.addEventListener("DOMContentLoaded", () => {
  renderKanban();

  const addTaskButtons = document.querySelectorAll(".kanban__icon--add");
  const modal = document.querySelector(".modal");
  const closeModalButton = document.querySelector(".close-modal");
  const cancelButton = document.querySelector(".cancel-button");
  const form = document.querySelector(".modal form");
  const kanbanColumns = document.querySelectorAll(".kanban__column");

  //===========================================================================
  //Дропдаун
  function dragHandler(){
    const draggables = document.querySelectorAll(".task-item");
    draggables.forEach((draggable) => {
      draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging");
      });
      draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging");
      });
    });

  }
  
  dragHandler()

  kanbanColumns.forEach((column) => {
    column.addEventListener("dragover", (event) => {
      event.preventDefault();
      const draggable = document.querySelector(".dragging");
      draggable.addEventListener("dragend", () => {
        column.appendChild(draggable);
      });
    });
  });
  // =========================================================================
  function addTask(e) {
    // сохраняем название столбца куда мы хотим добавить задачу в переменную columnName
    let target = e.target.closest(".kanban__column");
    const columnId = target.id;
    modal.style.display = "flex";

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document.getElementById("title-task").value;
      const description = document.getElementById("description-task").value;
      const dueDate = form.elements["date"].value;

      // Создаем обьект с информацией о задаче
      let newTask = {
        id: tasks.length + 1,
        title: title,
        description: description,
        complexity: "medium",
        dueDate: dueDate,
        columnId: columnId,
      };

      // добавляем задачу в массив tasks
      tasks.push(newTask);
      modal.style.display = "none";
      // вызываем функцию renderTasks для обновления списка задач
      if (target) {
        target.appendChild(renderTasks(newTask));
      }
      target = "";
      dragHandler()
    });
  }

  // =========================================================================

  addTaskButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      addTask(e);
    });
  });

  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  cancelButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
});

// =========================================================================
function renderTasks(task) {
  // создаем html разметку каждой задачи для каждого обьекта из массива tasks
  const taskWrapper = document.createElement("article");
  const title = document.createElement("h2");
  const description = document.createElement("p");
  const priority = document.createElement("div");
  const date = document.createElement("span");

  taskWrapper.className = "task-item";
  title.className = "task-item__title";
  description.className = "task-item__description";
  priority.className = "task-item__complexity";
  date.className = "task-item__client";

  taskWrapper.draggable = true;
  title.innerHTML = task.title;
  description.innerText = task.description;
  date.textContent = task.dueDate;

  for (let i = 0; i < 3; i++) {
    const priorityIcon = document.createElement("div");
    priorityIcon.className =
      "complexity__dot complexity__dot--" + task.complexity;
    priority.append(priorityIcon);
  }

  taskWrapper.append(title, description, priority, date);

  return taskWrapper;
}
// =========================================================================

function renderKanban() {
  const kanbanContainer = document.querySelector(".kanban");

  columns.forEach((column) => {
    const columnSection = document.createElement("section");
    columnSection.className = `kanban__column`;
    columnSection.id = column.id;
    columnSection.innerHTML = `
          <div class="kanban__header">
            <div class="kanban__header-content">
              <img src="${column.icon}" alt="Колонка ${column.title}" class="kanban__icon kanban__icon--column">
              <h2 class="kanban__title">${column.title}</h2>
            </div>
            <img src="./src/assets/img/kanban/plus.svg" alt="Добавить задачу" class="kanban__icon kanban__icon--add">
          </div>
          <div class="kanban__list"></div>
        `;

    const listContainer = columnSection.querySelector(".kanban__list");

    kanbanContainer.appendChild(columnSection);

    column.tasks.forEach((taskId) => {
      const task = tasks.find((task) => task.id === taskId);
      if (task) {
        listContainer.appendChild(renderTasks(task));
      }
    });
  });
}

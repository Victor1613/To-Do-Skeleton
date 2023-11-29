const columns = [
    {
      id: "to-do",
      title: "Задачи",
      icon: "./src/assets/img/kanban/kanban__column--to-do.svg",
      tasks: [1]
    },
    {
      id: "in-progress",
      title: "В процессе",
      icon: "./src/assets/img/kanban/kanban__column--in-progress.svg",
      tasks: []
    },
    {
      id: "done",
      title: "Выполнено",
      icon: "./src/assets/img/kanban/kanban__column--done.svg",
      tasks: [2]
    }
  ];
  

  const tasks = [
    {
      id: 1,
      title: "Задача 1",
      description: "Описание задачи 1",
      complexity: "high",
      dueDate: "16.11.2023",
      columnId: "to-do"
    },
    {
      id: 2,
      title: "Задача 2",
      description: "Описание задачи 2",
      complexity: "medium",
      dueDate: "16.11.2023",
      columnId: "done"
    }
  ];
  
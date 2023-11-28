document.addEventListener('DOMContentLoaded', (event) => {

    const draggables = document.querySelectorAll('.task');
    const columns = document.querySelectorAll('.tasks-list');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });
    
 
    columns.forEach(column => {
        column.addEventListener('dragover', event => {
            event.preventDefault();
            console.log(column);
            const draggable = document.querySelector('.dragging');
            draggable.addEventListener('dragend', () => {
                column.appendChild(draggable);
            });
        
        });
    });
    // addButton.forEach(button =>{
    //     button.addEventListener('click', (event) => (
    //         const column = event.target.closest('kanban__column');
    //         const taskList = column.querySelector('.kanban__list');
    //         createNewTask(taskList);
    //     ))
    // })

});


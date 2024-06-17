'use strict';

const list = {
  movements: ['Organize Books', 'Prepare Presentation', 'Buy Groceries'],
  completeImage: 'icons8-edit.svg',
  deleteImage: 'icons8-delete.svg',
};

const btnAdd = document.querySelector('.add-button');
const inputTodoList = document.querySelector('.input-list');
const containerMainDiv = document.querySelector('.main-div');

const displayList = function () {
  containerMainDiv.innerHTML = '';

  list.movements.forEach(function (mov, i) {
    const html = `
      <div class="todo-list">
        <div class="item-list">
          <p>${mov}</p>
          <div class="img">
            <img src="${list.completeImage}" class="edit-button" />
            <img src="${list.deleteImage}" class="delete-button" />
          </div>
        </div>
      </div>
    `;
    containerMainDiv.insertAdjacentHTML('afterbegin', html);
  });

  // Set up event listeners for delete buttons
  document.querySelectorAll('.delete-button').forEach((img) => {
    img.addEventListener('click', function (e) {
      const itemText = e.target
        .closest('.item-list')
        .querySelector('p').textContent;
      // const index = list.movements.indexOf(itemText);
      const index = list.movements.findIndex((mov) => mov === itemText);
      if (index !== -1) list.movements.splice(index, 1);
      displayList();
    });
  });

  // Set up event listeners for edit buttons
  document.querySelectorAll('.edit-button').forEach((img) => {
    img.addEventListener('click', function (e) {
      const itemText = e.target
        .closest('.item-list')
        .querySelector('p').textContent;
      const index = list.movements.findIndex((mov) => mov === itemText);
      if (index !== -1) {
        const newValue = prompt('Edit the item:', itemText);
        if (newValue !== null && newValue.trim() !== '') {
          list.movements[index] = newValue.trim();
          displayList();
        }
      }
    });
  });
};

btnAdd.addEventListener('click', function (e) {
  e.preventDefault();

  const todoText = inputTodoList.value.trim();

  if (todoText !== '') {
    list.movements.push(todoText);
    displayList();
    inputTodoList.value = '';
  }
});

displayList();

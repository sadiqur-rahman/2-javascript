    // To-do List 3: Using Array to Store
    const myTodoList = JSON.parse(localStorage.getItem('myLocalTodoList')) || [];
    
    function addListItems() {
      showListItems();
      const todoInput = document.querySelector('.js-todo-input');
      const name = todoInput.value;

      const todoDate = document.querySelector('.js-todo-date');
      const date = todoDate.value;

      if (name === '') {
        alert('Enter a todo name.');
      } else {
          myTodoList.push({
          name,
          date
          });

          todoInput.value = '';
          todoDate.value = '';
        }

        localStorage.setItem('myLocalTodoList', JSON.stringify(myTodoList));
        console.log(myTodoList);

        showListItems();
    }

    // Showing saved todo on loading.
    showListItems();

    // Showing the To-do list Items 
    function showListItems() {
      let todoListHTML = ''; // Accumulator array
      const listPreview = document.querySelector('.js-todo-list');
      
      for(let i = 0; i < myTodoList.length; i++) {
        const todoObject = myTodoList[i]; // Accumulator Pattern
        const {name, date} = todoObject; //Destructuring

        // Making a Delete button
        todoListHTML += `
            <div>${name}</div>
            <div>${date}</div>
            <button class="todo-delete" onclick="
              myTodoList.splice(${i},1);
              showListItems();
              console.log(myTodoList);
              localStorage.setItem('myLocalTodoList', JSON.stringify(myTodoList));
              ">
              Delete
            </button>
          `;
      }
      listPreview.innerHTML = todoListHTML;
    }
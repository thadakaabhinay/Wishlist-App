let add_button = document.getElementById("add-button");
let todoInput = document.querySelector(".input-box");
let showContainer = document.querySelector("#show-container");
let todo;

let localData=JSON.parse(localStorage.getItem("todo"));


let todoList = localData||[];
// creating a function to generate Unique Ids
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

add_button.addEventListener("click", function (event) {
  event.preventDefault();
  todo = todoInput.value;
  if (todo.length > 0) {
    todoList.push({ id: uuid(), todo, isCompleted: false });
  }
  renderTodoList(todoList);
  localStorage.setItem("todo",JSON.stringify(todoList) );
  todoInput.value = "";
});
showContainer.addEventListener("click", function (e) {
  key = e.target.dataset.key;
  deltodo = e.target.dataset.todokey;
  todoList = todoList.map((todo) =>
    todo.id === key ? { ...todo, isCompleted: !todo.isCompleted } : todo
  );
  todoList = todoList.filter((todo) => todo.id !== deltodo);
  localStorage.setItem("todo",JSON.stringify(todoList) );
  renderTodoList(todoList);
 
});

function renderTodoList(todoList) {
  showContainer.innerHTML = todoList
    .map(
      ({ id, todo, isCompleted }) =>
        `<div class="relative">
        <div class='div1'>
        <input class="t-checkbox t-pointer"  id="item-${id}" type="checkbox" data-key="${id}"  ${
          isCompleted ? "checked" : ""
        }> 
        </div>
        <div class="div2">
        <label for="item-${id}" class="container-list  todo-text t-pointer ${
          isCompleted ? "checked-todo" : ""
        }" data-key="${id}">${todo}</label> 
        </div>
        <div class='div3'>
        <button class="absolute right-0  button cursor container-list" > <span data-todokey=${id}  class="del-btn material-icons-outlined">delete</span></button></div>
        </div>`
    )
    .join("");
}
renderTodoList(todoList);

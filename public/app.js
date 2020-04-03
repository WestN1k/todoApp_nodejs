/* global $ */
$(document).ready(function() {
  $.getJSON("/api/todos").then(addTodos);

  $("#todoInput").keypress(function(event) {
    if (event.which === 13) {
      createToDo();
    }
  });

  $(".list").on("click", "li", function() {
    updateTodo($(this));
  });

  $(".list").on("click", "span", function(e) {
    e.stopPropagation();
    removeTodo($(this).parent());
  });
});

function addTodos(todos) {
  todos.forEach(function(todo) {
    addTodo(todo);
  });
}

function createToDo() {
  var usrInput = $("#todoInput").val();
  $.post("/api/todos", { name: usrInput })
    .then(function(newTodo) {
      $("#todoInput").val("");
      addTodo(newTodo);
    })
    .catch(err => console.log(err));
}

function addTodo(todo) {
  var newToDo = $("<li>" + todo.name + "<span>X</span></li>");
  newToDo.data("id", todo._id);
  newToDo.data("completed", todo.completed);
  newToDo.addClass("task");
  if (todo.completed) {
    newToDo.addClass("done");
  }
  $(".list").append(newToDo);
}

function removeTodo(todo) {
  var clickedId = todo.data("id");
  var delUrl = "/api/todos/" + clickedId;
  $.ajax({
    method: "DELETE",
    url: delUrl
  }).then(() => todo.remove());
}

function updateTodo(todo) {
  var updateUrl = "/api/todos/" + todo.data("id");
  var isDone = !todo.data("completed");
  var updateData = { completed: isDone };
  $.ajax({
    method: "PUT",
    url: updateUrl,
    data: updateData
  }).then(function(updatedTodo) {
    todo.toggleClass("done");
    todo.data("completed", isDone);
  });
}

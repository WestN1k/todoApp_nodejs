var express = require("express");
var router = express.Router();
var helpers = require("../helpers/todosHelper");

router
  .route("/")
  .get(helpers.getToDos)
  .post(helpers.createToDo);

router
  .route("/:todoId")
  .get(helpers.getToDo)
  .put(helpers.updateToDo)
  .delete(helpers.deleteToDo);

module.exports = router;

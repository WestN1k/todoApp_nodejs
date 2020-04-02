var mongoose = require("mongoose");

const online =
  "mongodb+srv://user:qwerty123@todos-oa3np.mongodb.net/todos_db?retryWrites=true&w=majority";

mongoose
  .connect(online, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB connect"))
  .catch(error => console.log(error));
mongoose.set("debug", true);

module.exports.ToDo = require("./todo");

const fs = require("fs")

let randomId = () => {
  return Math.floor(Math.random() * 1000)
}

let callData = () => {
  let data = fs.readFileSync("/media/maulana/Data II/hacktiv8/lab/Phase 2/personal-project/javascript/javascript-dynamic-elements-and-events/models/todo.json", "utf-8");
  return data;
}

let createTodo = (req, res) => {
  let newTodo = {
    id_todo: randomId(),
    nama_todo: req.body.todo,
    complete_todo: false,
    create_date: new Date()
  }
  let data = callData();
  let parseData = JSON.parse(data);
  parseData.data_todo.push(newTodo);
  fs.writeFile("/media/maulana/Data II/hacktiv8/lab/Phase 2/personal-project/javascript/javascript-dynamic-elements-and-events/models/todo.json", JSON.stringify(parseData), function(err) {
      if(err) {
        res.send(err);
      }else {
        res.send(callData());
      }
  });
}

let dataTodo = (req, res) => {
  res.send(callData());
}

let updateTodo = (req, res) => {
  let data = JSON.parse(callData());
  data.data_todo.forEach((todo) => {
    if (todo.id_todo == req.params.id) {
      todo.complete_todo = true;
      todo.update_date = new Date();
    }
  })
  fs.writeFile("/media/maulana/Data II/hacktiv8/lab/Phase 2/personal-project/javascript/javascript-dynamic-elements-and-events/models/todo.json", JSON.stringify(data), function(err) {
      if(err) {
        res.send(err);
      }else {
        res.send(callData());
      }
  });
}

let removeTodo = (req, res) => {
  let data = JSON.parse(callData());
  data.data_todo.forEach((todo, index) => {
    if (todo.id_todo == req.params.id) {
      data.data_todo.splice(index, 1);
    }
  })
  fs.writeFile("/media/maulana/Data II/hacktiv8/lab/Phase 2/personal-project/javascript/javascript-dynamic-elements-and-events/models/todo.json", JSON.stringify(data), function(err) {
      if(err) {
        res.send(err);
      }else {
        res.send(callData());
      }
  });
}


module.exports = {
  createTodo, dataTodo, updateTodo, removeTodo
}

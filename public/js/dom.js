$(document).ready(function(){
  $.ajax({
    url: "/todo",
    method: "get",
    success: function(data){
      let parseData = JSON.parse(data);
      let template = "{{#data_todo}} <li id='{{id_todo}}'>{{id_todo}} {{nama_todo}} {{complete_todo}} {{create_date}}</li><button type='button' onclick='completeTodo({{id_todo}}, {{complete_todo}})'>Complete</button><button type='button' onclick='deleteTodo({{id_todo}})'>Delete</button>{{/data_todo}}";
      let html = Mustache.to_html(template, parseData);
      $('.data-todo').html(html);
    }
  })
})
$("button").on("click", function(){
  let todoName = $("#todo-form").serialize().split("=");
  if (todoName[1] == "") {
    alert("Nama todo tidak boleh kosong!")
  }else{
    $.ajax({
      url: "/todo",
      method: "post",
      data: {todo: todoName[1]},
      success: function(data){
        let parseData = JSON.parse(data);
        let template = "{{#data_todo}} <li id='{{id_todo}}'>{{id_todo}} {{nama_todo}} {{complete_todo}} {{create_date}}</li><button type='button' onclick='completeTodo({{id_todo}}, {{complete_todo}})'>Complete</button><button type='button' onclick='deleteTodo({{id_todo}})'>Delete</button>{{/data_todo}}";
        let html = Mustache.to_html(template, parseData);
        $('.data-todo').html(html);
        $('#todo-form').find('input:text').val('');
      }
    })
  }
})

function completeTodo(id_todo, status_todo) {
  if (status_todo == true) {
    alert("Tugas dengan id "+id_todo+" sebelumnya sudah selesai")
  }else {
    if (confirm('Yakin tugas anda sudah selesai?')) {
      $.ajax({
        url: "/todo/"+id_todo,
        method: "post",
        success: function(data){
          let parseData = JSON.parse(data);
          let template = "{{#data_todo}} <li id='{{id_todo}}'>{{id_todo}} {{nama_todo}} {{complete_todo}} {{create_date}}</li><button type='button' onclick='completeTodo({{id_todo}}, {{complete_todo}})'>Complete</button><button type='button' onclick='deleteTodo({{id_todo}})'>Delete</button>{{/data_todo}}";
          let html = Mustache.to_html(template, parseData);
          $('.data-todo').html(html);
        }
      })
    }
  }
}
function deleteTodo(id_todo){
  if (confirm('Yakin ingin menghapus Task anda?')) {
    $.ajax({
      url: "/todo/remove/"+id_todo,
      method: "post",
      success: function(data){
        let parseData = JSON.parse(data);
        let template = "{{#data_todo}} <li id='{{id_todo}}'>{{id_todo}} {{nama_todo}} {{complete_todo}} {{create_date}}</li><button type='button' onclick='completeTodo({{id_todo}}, {{complete_todo}})'>Complete</button><button type='button' onclick='deleteTodo({{id_todo}})'>Delete</button>{{/data_todo}}";
        let html = Mustache.to_html(template, parseData);
        $('.data-todo').html(html);
      }
    })
  }
}

function TodoListController($scope, $http, $timeout) {
  $scope.todos = [];
  $scope.newTodo = {
    done : false,
    due : new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    description : ''
  };

  $scope.doneFilter = { done : true };
  $scope.notDoneFilter = { done : false };

  $scope.setTodos = function() {
    $scope.doListUpdate();
  };

  $scope.update = function(todo) {
    $http.put('/todo/' + todo._id + '.json', todo).success(function(data) {
      if (!data.todo) {
        alert(JSON.stringify(data));
      }
    });
  };
  
  $scope.delete = function(todo) {
    $http.delete('/todo/' + todo._id + '.json').success(function(error) {
      if (!error.removed) {
        alert(JSON.stringify(error));
      }
      
      for (var i = 0; i < $scope.todos.length; i++) {
        if ($scope.todos[i] == todo) {
          $scope.todos.splice(i, 1);
        }
      }
    });
  };

  $scope.updateList = function() {
    $scope.doListUpdate();
    
    $timeout(function() {
      $scope.updateList();
    }, 30 * 60 * 1000); // update every 30 minutes;
  };
  
  $scope.doListUpdate = function() {
    $http.get('/todos.json').success(function(data) {
      $scope.todos = data.todos;
    });
  };
  
  $scope.updateList();

  $scope.addNewTodo = function() {
    $http.post('/todo.json', $scope.newTodo).success(function(data) {
      if (data.todo) {
        $scope.todos.push(data.todo);
        $scope.newTodo.description = '';
      } else {
        alert(JSON.stringify(data));
      }
    });
  };
}
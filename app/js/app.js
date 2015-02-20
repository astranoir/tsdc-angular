var app = angular.module('tsdc', ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            controller: 'AppCtrl',
            templateUrl: 'todo.html'
        })
        .otherwise({
            redirectTo: '/'
        })
});

app.controller('AppCtrl', function($scope) {
    $scope.todos = [{
        text:'Finish Todo App',
        done: false
    }];

    $scope.clearDoneTodos = function () {
        $scope.todos = $scope.todos.filter(function (todo) {
            return !todo.done;
        })
    };

    $scope.addTodo = function(newTodo) {
        if(!newTodo) {
            return;
        }

        $scope.todos.push({
            text: newTodo,
            done: false
        });

        $scope.newTodo = '';
    }
});

app.directive('todoItem', function() {
    return {
        restict: 'E',
        scope: {
            data: '='
        },
        template: '<div>\n    <label class="todo-{{ (!data.done) ? \'active\' : \'done\'}}">\n        <input type="checkbox" ng-model="data.done"/>\n        {{data.text}}\n    </label>\n</div>'
    }
});
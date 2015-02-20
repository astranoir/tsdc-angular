var app = angular.module('tsdc', ['ngRoute']);

app.config(function($routeProvider){
    var routeConfig = {
        controller: 'AppCtrl',
        templateUrl: 'todo.html',
        reloadOnSearch: false
    };
    $routeProvider
        .when('/', routeConfig)
        .when('/:status', routeConfig)
        .otherwise({
            redirectTo: '/'
        })
});

app.controller('AppCtrl', function($scope, $routeParams) {
    $scope.todos = [{
        text:'Finish Todo App',
        done: false
    }];

    $scope.$on('$routeChangeSuccess', function() {
        var status = $routeParams.status;
        if(angular.isUndefined(status)) {
            $scope.statusFilter = {};
        } else {
            $scope.statusFilter = {done: (status === 'done')};
        }
    });

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
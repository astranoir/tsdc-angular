var app = angular.module('tsdc', []);

app.controller('AppCtrl', function($scope) {
    $scope.todos = [{
        text:'Finish Todo App',
        done: false
    }];

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
        template: '<div>\n    <label>\n        <input type="checkbox" ng-model="data.done"/>\n        {{data.text}}\n    </label>\n</div>'
    }
});
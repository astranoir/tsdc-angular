var app = angular.module('tsdc', ['ngRoute']);
    //angular.module is a global place for registering and retrieving Angular modules
    //All modules that should be available to an app must be registered this way

app.config(function($routeProvider)
{
    var routeConfig =
    {
        controller: 'AppCtrl',
        templateUrl: 'todo.html',
        reloadOnSearch: false
    };
    $routeProvider
        .when('/', routeConfig)
        .when('/:status', routeConfig)
        .otherwise(
        {
            redirectTo: '/'
        })
});

app.factory('todoStore', function()
{
    return {
        todos: []
    }
});

app.controller('AppCtrl', function($scope, $routeParams, todoStore)
    //In Angular, a Controller is a JavaScript constructor function
    //used to augment the Angular scope
    //A new child scope will be available as an injectable parameter
    //to the  constructor function of the Controller as $scope
{
    $scope.todos = todoStore.todos;

    $scope.$on('$routeChangeSuccess', function()
    {
        var status = $routeParams.status;
        if(angular.isUndefined(status))
        {
            $scope.statusFilter = {};
        }
        else
        {
            $scope.statusFilter = {done: (status === 'done')};
        }
    });

    $scope.clearDoneToDos = function()
    {
        $scope.todos = $scope.todos.filter(function (todo)
        {
            return !todo.done;
        })
    };

    $scope.addToDo = function(newToDo)
    {
        if(!newToDo)
        {
            return;
        }

        $scope.todos.push
        ({
            text: newToDo,
            done: false
        });

        $scope.newToDo = '';
    }
});

app.directive('ngEnter', function()
    //app.directive lets you add custom directives in Angular
    //this custom directive allows passing a function on an Enter keypress

{
    return function (scope, element, attrs) //note to self: attrs is attribute set
    {
        element.bind("keydown keypress", function (event)
        {
            if(event.which === 13)  //13 is the Enter key
            {
                scope.$apply(function()
                {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});

app.directive('todoItem', function()
{
    return{
        restrict: 'E',  //E is for element; A is for Attribute
        scope:
        {
            data: '='
        },
        template: '<div>\n    <label class="todo-{{ (!data.done) ? \'active\' : \'done\'}}">\n        <input type="checkbox" ng-model="data.done"/>\n        {{data.text}}\n    </label>\n</div>'
        //Template-expanding directive simplifies your template
        //Best practice: Break your template out into its own HTML file and load it with the templateUrl option
        //unless your template is very small
    }
});
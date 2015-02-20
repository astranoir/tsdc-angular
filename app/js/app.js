var app = angular.module('tsdc', []);

app.controller('AppCtrl', function($scope) {
    $scope.name = 'From the controller!';
});
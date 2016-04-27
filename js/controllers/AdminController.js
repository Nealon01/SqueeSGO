'use strict';

app.controller('AdminController', function ($scope, $routeParams) {
    $scope.params = $routeParams;

    angular.element(document).ready(function () {
        $scope.pending = $scope.getStatusRequests("Pending");
        $scope.approved = $scope.getStatusRequests("Approved");
        $scope.$apply();
    });
});
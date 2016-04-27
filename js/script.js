var app = angular.module('app', ['ngRoute']);

app.config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'https://www.youtube.com/**'
    ]);
});

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
     .when('/home', {
         templateUrl: 'partials/home.html',
         controller: 'HomeController'
     })
    .when('/videos', {
        templateUrl: 'partials/videos.html',
        controller: 'VideosController'
    })
    .when('/cs', {
        templateUrl: 'partials/cs.html',
        controller: 'CSController'
    })
    .when('/squee', {
        templateUrl: 'partials/squee.html',
        controller: 'SqueeController'
    })
    .when('/admin', {
        templateUrl: 'partials/admin.html',
        controller: 'AdminController'
    })
    .otherwise({
        redirectTo: '/home'
    });

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(true);
});
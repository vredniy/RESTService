angular.module('articlesApp', ['ngRoute'])

  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/articles', {
        templateUrl: '/js/templates/articles/index.html',
        controller: 'ArticlesCtrl'
      })
      .when('/articles/new', {
        templateUrl: '/js/templates/articles/new.html',
        controller: 'ArticlesCtrl'
      })
      .when('/articles/:id', {
        templateUrl: '/js/templates/articles/show.html',
        controller: 'ArticlesCtrl'
      })
      .when('/articles/:id/edit', {
        templateUrl: '/js/templates/articles/edit.html',
        controller: 'ArticlesCtrl'
        // resolve: {
        //   app: ['$http', function ($http) {
        //     console.log('its happened');
        //   }]
        // }
      })
      .otherwise({ redirectTo: '/articles' })
  }])

  .controller('ArticlesCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.saveArticle = function (article) {
      $scope.currentArticle = angular.copy(article);

      if ($scope.currentArticle._id) {
        // update
        $http.put('/api/v1/articles/' + $scope.currentArticle._id, _.omit($scope.currentArticle, '_id'))
          .success(function (data) {
            console.log(data);
          })
          .error(function (data) {
            console.log(data);
          });
      } else {
        // create
        $http.post('/api/v1/articles', $scope.currentArticle)
          .success(function (data) {
            console.log(data);
            // redirectTo index
            $location.path('/articles');
          })
          .error(function (data) {
            console.log(data);
          });
      }
      console.log($scope.currentArticle);
    };

    $scope.newArticle = function () {
    };

    $http.get('/api/v1/articles')
      .success(function (data) {
        console.log('loading articles');
        console.log(data);
        $scope.articles = data
      })
      .error(function (data) {
        alert(data);
      })
  }]);

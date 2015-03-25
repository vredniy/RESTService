angular.module('articlesApp', ['ngRoute'])

  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/articles', {
        templateUrl: '/js/templates/articles/index.html',
        controller: 'ArticlesIndexCtrl',
        resolve: {
          // TODO: move this logic to Service
          articles: ['$http', function ($http) { return $http.get('/api/v1/articles') }]
        }
      })
      .when('/articles/new', {
        templateUrl: '/js/templates/articles/new.html',
        controller: 'ArticlesCtrl'
      })
      .when('/articles/:id', {
        templateUrl: '/js/templates/articles/show.html',
        controller: 'ArticlesShowCtrl',
        resolve: {
          // TODO: move this logic to Service
          article: ['$http', '$route', function ($http, $route) {
            return $http.get('/api/v1/articles/' + $route.current.params.id);
          }]
        }
      })
      .when('/articles/:id/edit', {
        templateUrl: '/js/templates/articles/edit.html',
        controller: 'ArticlesEditCtrl',
        resolve: {
          // TODO: move this logic to Service
          article: ['$http', '$route', function ($http, $route) {
            return $http.get('/api/v1/articles/' + $route.current.params.id);
          }]
        }
      })
      .otherwise({ redirectTo: '/articles' })
  }])

  .controller('ArticlesEditCtrl', ['$scope', 'article', function ($scope, article) {
    $scope.article = article.data;
  }])

  .controller('ArticlesShowCtrl', ['$scope', 'article', function ($scope, article) {
    $scope.article = article.data;
  }])

  .controller('ArticlesIndexCtrl', ['$scope', '$http', '$route', 'articles', function ($scope, $http, $route, articles) {
    $scope.articles = articles.data;

    // TODO: move this logic to Service
    $scope.destroyArticle = function(article) {
      $http.delete('/api/v1/articles/' + article._id)
        .success(function (data) {
          $route.reload();
        })
        .error(function (data) {
          console.log(data);
        });
    };
  }])

  .controller('ArticlesCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    // TODO: move this logic to Service
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
    };
  }]);

describe('ArticlesEditCtrl', function () {
  beforeEach(module('articlesApp'));

  var ArticlesEditCtrl, scope, article, rootScope, location;
  var article = {
    _id: '123',
    title: 'Title',
    url: 'Url',
    text: 'Text'
  };

  beforeEach(inject(function ($controller, $rootScope, $location) {
    scope = $rootScope.$new();
    rootScope = $rootScope;
    location = $location;

    ArticlesEditCtrl = $controller('ArticlesEditCtrl', {
      $scope: scope,
      // resolve
      article: { data: article }
    })
  }));

  describe('load resource', function () {
    it('should load article', function () {
      location.path('/articles/123');
      rootScope.$digest();

      expect(scope.article).toBe(article);
    });
  });
});

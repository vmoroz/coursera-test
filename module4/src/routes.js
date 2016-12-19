(function() {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html'
  })

  // Categories page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/templates/categories.template.html',
    controller: 'CategoriesController as vm',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  // Items page
  .state('items', {
    url: '/items/{categoryName}/{categoryShortName}',
    templateUrl: 'src/templates/items.template.html',
    controller: 'ItemsController as vm',
    resolve: {
      items: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
            }],
      categoryName: ['$stateParams', function ($stateParams) {
              return $stateParams.categoryName;
            }]
    }
  });
}

})();

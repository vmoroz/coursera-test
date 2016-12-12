(function() {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var search = this;

  search.searchTerm = "";
  search.found = [];

  search.find = function() {
    MenuSearchService.getMatchedMenuItems(search.searchTerm)
    .then(function(foundItems) {
      search.found = foundItems;
      console.debug(search.found);
    });
  }

  search.removeItem = function(index) {
    search.found.splice(index, 1);
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {
      var foundItems = [];
      if (searchTerm) {
        var lowerSearchTerm = searchTerm.toLowerCase();
        result.data.menu_items.forEach(function(entry) {
          if (entry.description.toLowerCase().indexOf(lowerSearchTerm) >= 0) {
            foundItems.push(entry);
          }
        });
      }

      return foundItems;
    });
  }
}

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
       items: '<',
       onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;
  var isFirst = true;

  list.isEmpty = function() {
    return list.items.length === 0;
  };
}

})();

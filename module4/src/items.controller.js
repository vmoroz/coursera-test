(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['items', 'categoryName'];
function ItemsController(items, categoryName) {
  var vm = this;
  vm.items = items;
  vm.categoryName = categoryName;
}

})();

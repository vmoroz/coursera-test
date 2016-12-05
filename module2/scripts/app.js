(function() {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var list = this;

  list.items = function() {
    return ShoppingListCheckOffService.toBuyItems();
  }

  list.isEmpty = function() {
    return !list.items().length;
  }
  
  list.bought = function(index) {
    ShoppingListCheckOffService.bought(index);
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var list = this;

  list.items = function() {
    return ShoppingListCheckOffService.boughtItems();
  }

  list.isEmpty = function() {
    return !list.items().length;
  }
}

function ShoppingListCheckOffService() {
  var service = this;

  var toBuyItemData = [
    { name: "packs of milk", quantity: 2 },
    { name: "chickens", quantity: 3 },
    { name: "bananas", quantity: 4 },
    { name: "apples", quantity: 2 },
    { name: "oranges", quantity: 3 },
    { name: "packs of raspberries", quantity: 2 },
  ];

  var boughtItemData = [];

  service.toBuyItems = function() {
    return toBuyItemData;
  }

  service.boughtItems = function() {
    return boughtItemData;
  }

  service.bought = function(index) {
    boughtItemData.push(toBuyItemData[index]);
    toBuyItemData.splice(index, 1);
  }
}

})();

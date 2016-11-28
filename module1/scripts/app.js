(function(){
  'use strict';

  var module = angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {

    $scope.message = '';

    function getItemCount(itemsSeparatedByComma) {
      itemsSeparatedByComma = (itemsSeparatedByComma || "").trim();
      if (!itemsSeparatedByComma) {
        return 0;
      }

      var items = itemsSeparatedByComma.split(',');

      // remove all empty entries
      items = items.filter(function (item){
        return item.trim();
      });

      return items.length;
    }

    $scope.check = function() {
      var count = getItemCount($scope.menu);
      if (count === 0) {
        $scope.message = 'Please enter data first';
        $scope.color = 'red';
      }
      else if (count <= 3) {
        $scope.message = 'Enjoy!';
        $scope.color = 'green';
      }
      else {
        $scope.message = 'Too much!';
        $scope.color = 'green';
      }
    }
  }
})();

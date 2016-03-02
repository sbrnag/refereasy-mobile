app.controller('TabsCtrl', function($scope, $state) {

  $scope.shouldHide = function () {
        switch ($state.current.name) {
            case 'tab.job-detail':
                return true;
            case 'tab.chat-detail':
                return true;
            default:
                return false;
      }
  }

})
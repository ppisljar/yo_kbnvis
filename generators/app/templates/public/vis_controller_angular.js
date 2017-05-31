import { uiModules } from 'ui/modules';
const module = uiModules.get('kibana/<%= name %>', ['kibana']);

module.controller('<%= controller_name %>', function ($scope, $element, Private) {
  $scope.$watch('esResponse', function (resp) {
    if (resp) {
      // call when done rendering
      $scope.renderComplete();
    }
  });
});

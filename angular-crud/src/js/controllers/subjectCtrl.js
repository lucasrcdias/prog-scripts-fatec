angular.module("subjectApp").controller("subjectsCtrl", ['$scope', '$timeout', 'subjectAPI', function($scope, $timeout, subjectAPI) {
  var action = "post";

  $scope.notification     = {
    message:  "",
    cssClass: ""
  };
  $scope.showNotification = false;
  $scope.isLoading        = true;
  $scope.subjects         = [];

  $scope.saveSubject = function(subject) {
    subjectAPI.saveSubject(subject, action).then(function(response) {
      delete $scope.subject;

      $scope.subjects.push(response.data.subject)
      $scope.subjectForm.$setPristine();

      showNotification("Salvo com sucesso!", "success");
      action = "post";
    });
  };

  $scope.removeSubject = function(subject) {
    subjectAPI.removeSubject(subject).then(function(response) {
      var index = $scope.subjects.indexOf(subject);
      $scope.subjects.splice(index, 1);

      $scope.subjectForm.$setPristine();
      showNotification("Removido com sucesso!", "success");
    });
  }

  $scope.editSubject = function(subject) {
    action = "put";
    $scope.subject = angular.copy(subject);
  }

  var loadSubjects = function() {
    $scope.isLoading = true;

    subjectAPI.getSubjects().then(function(response) {
      $scope.subjects = response.data.subjects;
      $scope.isLoading = false;
    });
  }

  var showNotification = function(message, type) {
    $scope.notification.message  = message;
    $scope.notification.cssClass = "in " + type;

    $timeout(function() {
      $scope.notification.cssClass = "";
    }, 3000);
  }

  loadSubjects();
}]);

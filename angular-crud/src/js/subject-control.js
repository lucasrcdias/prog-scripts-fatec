var app = angular.module("subjectApp", []);

app.controller("subjectsCtrl", ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
  var formAction = "post";
  var urls       = {
    "post": "http://localhost:8000/subjects.json",
    "put":  "http://localhost:8000/subjects/:id.json"
  }

  $scope.notification     = {
    message:  "",
    cssClass: ""
  };
  $scope.formAction       = "post";
  $scope.showNotification = false;
  $scope.isLoading        = true;
  $scope.subjects         = [];

  $scope.saveSubject = function(subject) {
    var url = urls[formAction].replace(":id", subject.id);

    $http({
      method: formAction,
      url: url,
      data: subject
    }).then(function() {
      delete $scope.subject;
      $scope.subjectForm.$setPristine();
      loadSubjects();
      showNotification("Salvo com sucesso!", "success");
    });
  };

  $scope.removeSubject = function(subject) {
    $http.delete("http://localhost:8000/subjects/" + subject.id + ".json").then(function() {
      loadSubjects();
      $scope.subjectForm.$setPristine();
      showNotification("Removido com sucesso!", "success");
    });
  }

  $scope.editSubject = function(subject) {
    formAction = "put";
    $scope.subject = angular.copy(subject);
  }

  var loadSubjects = function() {
    $scope.isLoading = true;

    $http.get("http://localhost:8000/subjects.json").then(function(response) {
      $scope.subjects = response.data;
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

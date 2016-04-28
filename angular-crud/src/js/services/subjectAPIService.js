angular.module("subjectApp").factory('subjectAPI', ['$http', 'config', function($http, config) {
  var _urls       = {
    "post": config.baseUrl + "/subjects.json",
    "put":  config.baseUrl + "/subjects/:id.json"
  }

  var _getSubjects = function() {
    return $http.get(config.baseUrl + "/subjects.json");
  }

  var _saveSubject = function(subject, action) {
    var url = _urls[action].replace(":id", subject.id);

    return $http({
      method: action,
      url: url,
      data: subject
    });
  }

  var _removeSubject = function(subject) {
    return $http.delete(config.baseUrl + "/subjects/" + subject.id + ".json");
  }

  return {
    getSubjects: _getSubjects,
    saveSubject: _saveSubject,
    removeSubject: _removeSubject
  }
}]);

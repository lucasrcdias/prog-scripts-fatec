$(document).ready(function() {
  var $subjectField  = $('.js-subject');
  var $notification  = $('.notification');
  var $addSubjectBtn = $('.btn-subject');
  var $closeModalBtn = $('.modal-close');
  var $modal         = $('.modal');
  var $form          = $('form');

  var requiredFields = [$subjectField];
  var subjects       = [];

  var urls = {
    index:   "/subjects.json",
    create:  "/subjects.json",
    destroy: "/subjects/:id.json"
  };

  var hasErrors = function() {
    var foundError = false;

    for (var field in requiredFields) {
      var $field = $(requiredFields[field]);
      var emptyField = $field.val() === "";

      foundError = emptyField;

      $field.parent().toggleClass('has-error', emptyField);
    }

    return foundError;
  }

  var removeSubject = function(id) {
    var index = undefined;

    for(subject in subjects) {
      if (subjects[subject].id.toString() === id) {
        index = subject;
      }
    }

    if (index) {
      subjects.splice(index, 1);
    }
  }

  var removeHandler = function(element, id) {
    $.ajax({
      type: "DELETE",
      url: urls['destroy'].replace(':id', id),
      success: function() {
        element.slideUp(function() {
          this.remove();
          removeSubject(id);
          showNotification('success', 'Removido com sucesso!');
        });
      }
    });
  }

  var showNotification = function(cssClass, message) {
    $notification.css('bottom', '20px').attr('class', 'notification ' + cssClass);
    $notification.find('p').text(message);

    setTimeout(function() {
      $notification.css('bottom', '-100px');
    }, 3000);
  }

  var getSubjects = function() {
    $.get(urls['index'], function(data){
      for(subject in data) {
        var subject = { 'id': data[subject].id, 'name': data[subject].name }

        appendSubject(subject);
      }
    });
  }

  var appendSubject = function (subject) {
    var subjectDiv = $("<div class='subject'></div>");
    var subjectName = $("<strong class='subject-name'>" + subject.name + "</strong>");
    var removeButton = $("<button class='btn btn-remove'>&times;</button>");

    subjects.push(subject);
    $('.subjects').append(subjectDiv);
    subjectDiv.append(subjectName).append(removeButton);

    removeButton.click(function(){
      removeHandler(subjectDiv, subject.id);
    });

    $modal.fadeOut();
    subjectDiv.fadeIn();
  }

  var createSubject = function() {
    var subject = {
      'name': $subjectField.val()
    };

    $.ajax({
      type: "POST",
      url: urls['create'],
      data: { 'subject': subject },
      success: function(data) {
        subject.id = data.id;
        appendSubject(subject);
        showNotification('success', 'Inserido com sucesso');
      }
    });
  }

  $form.submit(function(event) {
    event.preventDefault();

    if (!hasErrors()) {
      createSubject();
      this.reset();
    }
  });

  $addSubjectBtn.click(function() {
    $modal.fadeToggle();
    $subjectField.focus();
  });

  $closeModalBtn.click(function() {
    $modal.fadeOut();
  });

  getSubjects();
});

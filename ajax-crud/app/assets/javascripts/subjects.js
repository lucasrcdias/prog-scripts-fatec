$(document).ready(function() {
  var $subjectField = $('.js-subject');
  var $notification = $('.notification');
  var $addSubjectBtn = $('.btn-subject');
  var $closeModalBtn = $('.modal-close');
  var $modal = $('.modal');
  var $form = $('form');
  var requiredFields = [$subjectField];
  var subjects = [];

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

  var removeHandler = function() {
    var $subject = $("#" + $(this).data('remove'));
    var id = $subject.attr('id').split('-')[1];

    subjects.splice(id - 1, 1);
    $subject.slideUp(function() {
      this.remove();
    });
  }

  var showNotification = function(cssClass, message) {
    $notification.css('bottom', '20px').attr('class', 'notification ' + cssClass);
    $notification.find('p').text(message);

    setTimeout(function() {
      $notification.css('bottom', '-100px');
    }, 3000);
  }

  var createSubject = function() {
    var subject = {
      'id': subjects.length + 1,
      'name': $subjectField.val()
    };

    var subjectDiv = $("<div id='subject-" + subject.id + "' class='subject'></div>");
    var subjectName = $("<strong class='subject-name'>" + subject.name + "</strong>");
    var removeButton = $("<button class='btn btn-remove' data-remove='subject-" + subject.id + "'>&times;</button>");

    removeButton.click(removeHandler);

    subjects.push(subject);
    $('.subjects').append(subjectDiv);
    $modal.fadeOut();
    subjectDiv.append(subjectName).append(removeButton).fadeIn();
    showNotification('success', 'Inserido com sucesso');
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
  });

  $closeModalBtn.click(function() {
    $modal.fadeOut();
  });
});

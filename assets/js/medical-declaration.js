$(document).ready(function() {
  var showChar = 120;
  var ellipsestext = "...";
  var moretext = "Read More + ";
  var lesstext = "Read Less - ";
  $('.more').each(function() {
    var content = $(this).html();
    if (content.length > showChar) {
      var c = content.substr(0, showChar);
      var h = content.substr(showChar - 1, content.length - showChar);
      var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
      $(this).html(html);
    }
  });

  $(".morelink").click(function() {
    if ($(this).hasClass("less")) {
      $(this).removeClass("less");
      $(this).html(moretext);
    } else {
      $(this).addClass("less");
      $(this).html(lesstext);
    }
    $(this).parent().prev().toggle();
    $(this).prev().toggle();
    return false;
  });

  $("#medical-declaration").validate({
    errorPlacement: function(error, element) {
      if (element.is(":radio")) {
        element.closest("div").append(error);
      } else {
        error.insertAfter(element);
      }
    },
    rules: {
      suffered_disease: {
        required: true
      },
      hospitalized: {
        required: true
      },
      sports_hobbies: {
        required: true
      },
      smoking: {
        required: true
      },
      parents_died: {
        required: true
      },
      taking_medication: {
        required: true
      },
      pregnancy_history: {
        required: true
      },
      insurance_cover: {
        required: true
      },
      conviction_history: {
        required: true
      },
      travel_history: {
        required: true
      },
      covid_test: {
        required: true
      },
      covid_symptoms: {
        required: true
      },

    },

    messages: {
      suffered_disease: {
        required: "Please Select an Option!"
      },
      hospitalized: {
        required: "Please Select an Option!"
      },
      sports_hobbies: {
        required: "Please Select an Option!"
      },
      smoking: {
        required: "Please Select an Option!"
      },
      parents_died: {
        required: "Please Select an Option!"
      },
      taking_medication: {
        required: "Please Select an Option!"
      },
      pregnancy_history: {
        required: "Please Select an Option!"
      },
      insurance_cover: {
        required: "Please Select an Option!"
      },
      conviction_history: {
        required: "Please Select an Option!"
      },
      travel_history: {
        required: "Please Select an Option!"
      },
      covid_test: {
        required: "Please Select an Option!"
      },
      covid_symptoms: {
        required: "Please Select an Option!"
      },

    }
  });
});
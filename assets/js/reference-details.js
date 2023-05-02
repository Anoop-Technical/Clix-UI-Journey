$(document).ready(function() {
  $("select").each(function() {
    $(this).on('change', function() {
      if ($(this).find('option:selected').val() !== "") {
        $(this).addClass("select-box-text");
      } else {
        $(this).removeClass("select-box-text");
      }
    });
  });

  /**
   *
   * Functionality on reference 1 change.
   *
   */
  $('#ref_1_relationship').change(function() {
    // Get relationship and member reference id values.
    var ref_1_relationship = $('#ref_1_relationship').val();
    var member_ref = $('#member_ref').val();
    // Do empty ref 1 name value.
    $('#ref_1_name').val('');
    if(ref_1_relationship == 'Mother' && member_ref !== undefined) {
      $.ajax({
        url: "includes/ajax_request/ajax_request.php",
        method: 'POST',
        data: {action:'get_customer_details', member_ref:member_ref},
        dataType: 'json',
        success: function(response) {
          // Assign mother name value in ref 1 name field.
          $('#ref_1_name').val(response.mother_name)
        }
      });
    }
  });

  /**
   *
   * Functionality on reference 2 change.
   *
   */
  $('#ref_2_relationship').change(function() {
    // Get relationship and member reference id values.
    var ref_2_relationship = $('#ref_2_relationship').val();
    var member_ref = $('#member_ref').val();
    // Do empty ref 1 name value.
    $('#ref_2_name').val('');
    if(ref_2_relationship == 'Mother' && member_ref !== undefined) {
      $.ajax({
        url: "includes/ajax_request/ajax_request.php",
        method: 'POST',
        data: {action:'get_customer_details', member_ref:member_ref},
        dataType: 'json',
        success: function(response) {
          // Assign mother name value in ref 1 name field.
          $('#ref_2_name').val(response.mother_name)
        }
      });
    }
  });

  $.validator.addMethod("ref_1_name", function(value, element) {
    return this.optional(element) || /^[a-zA-z ]{3,50}$/.test(value);
  }, 'Please Enter Valid Reference 1 Name!');
  $.validator.addMethod("ref_1_contact", function(value, element) {
    return this.optional(element) || /[^6666666666]/g.test(value) && /[^7777777777]/g.test(value) && /[^8888888888]/g.test(value) && /[^9999999999]/g.test(value) && /^[6789]\d{9}$/.test(value);
  }, 'Please Enter Valid Reference 1 Contact Number!');
  $.validator.addMethod("ref_1_contact_not_same_to_mobile", function(value, element) {
    return $('#ref_1_contact').val() != $('#mobile').val()
  }, 'Reference 1 Contact Number Should Not Match With Mobile Number!');
  $.validator.addMethod("ref_1_contact_not_same_to_alternate_mobile", function(value, element) {
    return $('#ref_1_contact').val() != $('#alternate_mobile').val()
  }, 'Reference 1 Contact Number Should Not Match With Alternate Mobile Number!');
  $.validator.addMethod("ref_1_contact_not_same_to_ref_2_contact", function(value, element) {
    return $('#ref_1_contact').val() != $('#ref_2_contact').val()
  }, 'Reference 1 Contact Number Should Not Match With Reference 2 Contact Number!');
  $.validator.addMethod("ref_2_name", function(value, element) {
    return this.optional(element) || /^[a-zA-z ]{3,50}$/.test(value);
  }, 'Please Enter Valid Reference 2 Name!');
  $.validator.addMethod("ref_2_contact", function(value, element) {
    return this.optional(element) || /[^6666666666]/g.test(value) && /[^7777777777]/g.test(value) && /[^8888888888]/g.test(value) && /[^9999999999]/g.test(value) && /^[6789]\d{9}$/.test(value);
  }, 'Please Enter Valid Reference 2 Contact Number!');
  $.validator.addMethod("ref_2_contact_not_same_to_mobile", function(value, element) {
    return $('#ref_2_contact').val() != $('#mobile').val()
  }, 'Reference 2 Contact Number Should Not Match With Mobile Number!');
  $.validator.addMethod("ref_2_contact_not_same_to_alternate_mobile", function(value, element) {
    return $('#ref_2_contact').val() != $('#alternate_mobile').val()
  }, 'Reference 2 Contact Number Should Not Match With Alternate Mobile Number!');
  $.validator.addMethod("ref_2_contact_not_same_to_ref_1_contact", function(value, element) {
    return $('#ref_2_contact').val() != $('#ref_1_contact').val()
  }, 'Reference 2 Contact Number Should Not Match With Reference 1 Contact Number!');

  $("#referenceDetails").validate({
    errorPlacement: function(error, element) {
      if (element.is(":checkbox")) {
        element.closest('div').append(error);
      } else {
        error.insertAfter(element);
      }
    },
    rules: {
      ref_1_relationship: {
        required: true
      },
      ref_1_name: {
        required: true,
        ref_1_name: true
      },
      ref_1_contact: {
        required: true,
        ref_1_contact: true,
        ref_1_contact_not_same_to_mobile: true,
        ref_1_contact_not_same_to_alternate_mobile: true,
        ref_1_contact_not_same_to_ref_2_contact: true
      },
      ref_2_relationship: {
        required: true
      },
      ref_2_name: {
        required: true,
        ref_2_name: true
      },
      ref_2_contact: {
        required: true,
        ref_2_contact: true,
        ref_2_contact_not_same_to_mobile: true,
        ref_2_contact_not_same_to_alternate_mobile: true,
        ref_2_contact_not_same_to_ref_1_contact: true
      },
      terms_reference_details_1st: {
        required: true
      },

    },

    messages: {
      ref_1_relationship: {
        required: "Please Select Reference 1 Relationship!"
      },
      ref_1_name: {
        required: "Please Enter Reference 1 Name!"
      },
      ref_1_contact: {
        required: "Please Enter Reference 1 Contact Number!"
      },
      ref_2_relationship: {
        required: "Please Select Reference 2 Relationship!"
      },
      ref_2_name: {
        required: "Please Enter Reference 2 Name!"
      },
      ref_2_contact: {
        required: "Please Enter Reference 2 Contact Number!"
      },
      terms_reference_details_1st: {
        required: "Please Agree Terms & Conditions!"
      },

    },
    submitHandler:function(form) {
      // Disable the submit button.
      // $("#disabled_accordian_5").prop("disabled", false);
      // $("#collapseOne").hide();
      // $("#collapseTwo").show();
    }
  });
});
$(document).ready(function () {
  // Functionality after official email id keyup.
  $("#official_email").keyup(function () {
    $("#official_email_error").text("");
    $("#official_email").removeClass("error-box");
    var email_id = $("#official_email").val().toLowerCase().trim();
    var email_id_part = email_id.split("@")[1];
    var filter =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email_id != "") {
      if (!filter.test(email_id)) {
        $("#official_email_error").text(
          "Please Enter Valid Official Email Id!"
        );
        $("#official_email").addClass("error-box");
      } else if (validate_email_id_domain(email_id_part) == "false") {
        $("#official_email_error").text(
          "The official email id must not be of personal, Please use your office email id!"
        );
        $("#official_email").addClass("error-box");
      }
    }
  });

  // Functionality after connection id keyup.
  $("#otp_email").keyup(function () {
    $("#otp_email_error").text("");
    $("#otp_email").removeClass("error-box");
    $("#otp_email_error").css("display", "none");
    $(".otp_verify").css("display", "none");
    // Get otp value.
    var otp_email = $("#otp_email").val().trim();
    if (otp_email != "") {
      if (otp_email.match("^[0-9]{4}$") === null) {
        $("#otp_email_error").text("Please Enter Valid OTP!");
        $("#otp_email").addClass("error-box");
      } else {
        $("#otp_email_error").text(
          "Please Click on Verify Button to Verify OTP!"
        );
        $("#otp_email").addClass("error-box");
      }
    }
  });

  /**
   *
   * Function to validate email id domain.
   *
   */
  function validate_email_id_domain(email_id_part) {
    return $.ajax({
      url: "includes/ajax_request/ajax_request.php",
      method: "post",
      data: {
        action: "validate_official_email_domain",
        email_id_domain: email_id_part,
      },
      dataType: "json",
      async: false,
      success: function (validation_check_result) {
        console.log(validation_check_result);
      },
    }).responseText;
  }

  // Functionality after clicking on send otp button.
  $("#send_otp").click(function () {
    $("#official_email_error").text("");
    $("#official_email").removeClass("error-box");
    // Get fields values.
    var email_id = $("#official_email").val().toLowerCase().trim();
    var email_id_part = email_id.split("@")[1];
    var filter =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email_id != "") {
      if (!filter.test(email_id)) {
        $("#official_email_error").text(
          "Please Enter Valid Official Email Id!"
        );
        $("#official_email").addClass("error-box");
      } else if (validate_email_id_domain(email_id_part) == "false") {
        $("#official_email_error").text(
          "The official email id must not be of personal, Please use your office email id!"
        );
        $("#official_email").addClass("error-box");
      } else {
        // Disable resend otp button for 1 minute.
        $("#send_otp").attr("disabled", "disabled");
        $("#display_timer").css("display", "block");
        timer(60);
        setTimeout(function () {
          $("#send_otp").removeAttr("disabled");
          $("#display_timer").css("display", "none");
        }, 60000);
        // call send otp on official email function.
        send_otp_on_official_email(email_id);
        get_email_verification_resp();
      }
    }
  });

  let timerOn = true;

  /**
   *
   * Function to display the timer.
   *
   */
  function timer(remaining) {
    var m = Math.floor(remaining / 60);
    var s = remaining % 60;

    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    document.getElementById("timer").innerHTML = m + ":" + s;
    remaining -= 1;

    if (remaining >= 0) {
      setTimeout(function () {
        timer(remaining);
      }, 1000);
      return;
    } else {
      timerOn = false;
    }

    if (!timerOn) {
      // Do validate stuff here
      $("#timer").text("");
      return;
    }
  }

  /**
   *
   * Function to send otp on official email.
   *
   */
  function send_otp_on_official_email(email_id) {
    // Change the button value of Send OTP to Resend OTP.
    $("#send_otp").text("Resend OTP");
    // Get application id value.
    var application_id = $("#application_id").val();
    $.ajax({
      url: "includes/ajax_request/ajax_request.php",
      method: "POST",
      data: {
        action: "send_otp_on_mail",
        application_id: application_id,
        official_email_id: email_id,
      },
      dataType: "json",
      beforeSend: function () {
        //$('#loader_div').css('display','block');
        //$("#otp_send").hide();
      },
      success: function (response) {
        if (response.responseData !== undefined) {
          $("#otp_email_request_id").val(response.responseData.requestId);
        }
      },
    });
  }

  /**
   *
   * Function to get the response of email verification karza api.
   *
   */
  function get_email_verification_resp() {
    var email_id = $("#official_email").val();
    // By default employer validated check.
    $("#employer_validated").val("N");
    // Get first name value.
    var name = $("#first_name").val();
    if ($("#middle_name").val() != "") {
      // Concetinete first name with middle name.
      name = name.concat(" " + $("#middle_name").val());
    }
    // Concetinete first name with last name.
    name = name.concat(" " + $("#last_name").val());
    // Get employer name value.
    var employer_name = $("#employer_name").val();
    if (email_id != "" && name != "" && employer_name != "") {
      // validate first name field.
      $.ajax({
        url: "includes/ajax_request/email_verification_api.php",
        method: "POST",
        data: { email_id: email_id, name: name, organization: employer_name },
        dataType: "html",
        cache: false,
        beforeSend: function () {
          //$('#loader_div').css('display','block');
        },
        success: function (response) {
          var obj = JSON.parse(response);
          if (
            obj.status !== undefined ||
            obj.status == 402 ||
            obj.status == 503
          ) {
            console.log("in response status 402");
            /*$('#official_email').addClass('is-invalid');
            $('.official_email_error').text("Could not validate email id, Please try after some time.");
            $('#official_email').focus(); */
          } else if (
            obj.result.data !== undefined &&
            obj.result.data !== null
          ) {
            console.log("in status OK");
            console.log(response);
            $("#email_verification_karza").val(response);
            if (obj.result.result === true) {
              $("#employer_validated").val("Y");
            }
          } else {
            /*if(obj.result.additional_info.individual_match[0].match != true ){
              $('#official_email').addClass('is-invalid');
              $('.official_email_error').text('Please enter valid email id. Your name is not matching.');
            }
            else if(obj.result.additional_info.whois_info.whois_org_name[0].match != true){
              $('#official_email').addClass('is-invalid');
              $('.official_email_error').text('Please enter valid email id. Your Employer Name is not matching');
            }
            else{
              $('#official_email').addClass('is-invalid');
              $('.official_email_error').text('Please enter valid email id.');
              //$('#official_email').focus();      
            }*/
          }
        },
      });
    }
  }

  // Functinality after clicking on verify button.
  $("#verify").click(function () {
    $(".otp_verify").text("");
    $("#official_email").attr("readonly", false);

    $("#official_email_error").text("");
    $("#official_email").removeClass("error-box");
    $("#otp_email_error").text("");
    $("#otp_email").removeClass("error-box");
    $("#otp_email-error").text("");

    // Get fields values.
    var application_id = $("#application_id").val();
    var otp_email_request_id = $("#otp_email_request_id").val();
    var otp_email = $("#otp_email").val().trim();
    var email_id = $("#official_email").val().toLowerCase().trim();
    var email_id_part = email_id.split("@")[1];
    var filter =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email_id != "" && otp_email != "") {
      if (!filter.test(email_id)) {
        $("#official_email_error").text(
          "Please Enter Valid Official Email Id!"
        );
        $("#official_email").addClass("error-box");
      } else if (validate_email_id_domain(email_id_part) == "false") {
        $("#official_email_error").text(
          "The official email id must not be of personal, Please use your office email id!"
        );
        $("#official_email").addClass("error-box");
      } else if (otp_email.match("^[0-9]{4}$") === null) {
        $("#otp_email_error").text("Please Enter Valid OTP!");
        $("#otp_email").addClass("error-box");
      } else {
        $.ajax({
          url: "includes/ajax_request/ajax_request.php",
          method: "POST",
          data: {
            action: "verify_official_email",
            application_id: application_id,
            otp_email_request_id: otp_email_request_id,
            otp_email: otp_email,
          },
          dataType: "json",
          beforeSend: function () {
            /*$('#loader_div').css('display','block');
            setTimeout(function() {
              $('#loader_div').css('display','none');
            }, 2000);*/
          },
          success: function (response) {
            if (response.success === false) {
              $(".otp_verify").css("display", "none");
              $("#otp_email_error").text(response.responseData.errors);
              $("#otp_email").addClass("error error-box");
              $("#otp_email_error").css("display", "block");
            } else if (response.success === true) {
              $("#otp_email").removeClass("error error-box");
              $("#otp_email_error").css("display", "none");
              $("#otp_email_error").text("");
              $(".otp_verify").css("display", "block");
              $(".otp_verify").text(response.responseData.message);
              $("#official_email").attr("readonly", true);
            }
          },
        });
      }
    }
  });

  // Functionality to get employer listing to display it in dropdown.
  $("#employer_name").keyup(function () {
    // Get employer name string.
    var string = $(this).val().trim();
    if (string) {
      $("#employer_name").autocomplete({
        minLength: 1,
        source: function (request, response) {
          $.ajax({
            url: "includes/ajax_request/ajax_request.php",
            method: "POST",
            data: { action: "get_employer_listing", string: string },
            dataType: "JSON",
            success: function (employer_listing) {
              response(employer_listing);
            },
          });
        },
        select: function (event, ui) {
          $("#employer_name").val(ui.item.label); //ui.item is your object from the array
          return false;
        },
      });
    } else {
      $("#employer_name").val("");
    }
  });

  $("select").each(function () {
    $(this).on("change", function () {
      if ($(this).find("option:selected").val() !== "") {
        $(this).addClass("select-box-text");
      } else {
        $(this).removeClass("select-box-text");
      }
    });
  });

  $.validator.addMethod(
    "employer_name",
    function (value, element) {
      return (
        this.optional(element) || /^[a-zA-z0-9 .,/&@()#-]{3,100}$/.test(value)
      );
    },
    "Please Enter Valid Employer Name!"
  );
  $.validator.addMethod(
    "official_email",
    function (value, element) {
      return this.optional(element) || $("#official_email_error").text() == "";
    },
    function (params, element) {
      return $("#official_email_error").text();
    }
  );
  $.validator.addMethod(
    "otp_email",
    function (value, element) {
      return this.optional(element) || $("#otp_email_error").text() == "";
    },
    function (params, element) {
      return $("#otp_email_error").text();
    }
  );
  $.validator.addMethod(
    "office_add_1",
    function (value, element) {
      return this.optional(element) || /^[a-zA-z0-9 .,/-]{3,50}$/.test(value);
    },
    "Please Enter Valid Address Line 1!"
  );
  $.validator.addMethod(
    "office_add_2",
    function (value, element) {
      return this.optional(element) || /^[a-zA-z0-9 .,/-]{3,50}$/.test(value);
    },
    "Please Enter Valid Address Line 2!"
  );
  $.validator.addMethod(
    "office_add_3",
    function (value, element) {
      return this.optional(element) || /^[a-zA-z0-9 .,/-]{3,50}$/.test(value);
    },
    "Please Enter Valid Address Line 3!"
  );
  $.validator.addMethod(
    "office_landmark",
    function (value, element) {
      return this.optional(element) || /^[a-zA-z0-9 .,/-]{3,50}$/.test(value);
    },
    "Please Enter Valid Landmark!"
  );
  $.validator.addMethod(
    "office_pincode",
    function (value, element) {
      return this.optional(element) || /^[1-9][0-9]{5}$/.test(value);
    },
    "Please Enter Valid Pin Code!"
  );

  $("#occupationDetails").validate({
    errorPlacement: function (error, element) {
      if (element.is(":radio") || element.is(":checkbox")) {
        element.closest("div").append(error);
      } else {
        error.insertAfter(element);
      }
    },
    rules: {
      employer_name: {
        required: true,
        employer_name: true,
      },
      company_type: {
        required: true,
      },
      industry_type: {
        required: true,
      },
      designation: {
        required: true,
      },
      official_email: {
        official_email: true,
      },
      otp_email: {
        otp_email: true,
      },
      current_work_exp_in_year: {
        required: true,
      },
      current_work_exp_in_month: {
        required: true,
      },
      total_work_exp_in_year: {
        required: true,
      },
      total_work_exp_in_month: {
        required: true,
      },
      office_add_1: {
        required: true,
        office_add_1: true,
      },
      office_add_2: {
        required: true,
        office_add_2: true,
      },
      office_add_3: {
        office_add_3: true,
      },
      office_landmark: {
        required: true,
        office_landmark: true,
      },
      office_pincode: {
        required: true,
        office_pincode: true,
      },
      office_state: {
        required: true,
      },
      office_city: {
        required: true,
      },
      office_locality: {
        required: true,
      },
      terms_occupational_details_1st: {
        required: true,
      },
      terms_occupational_details_2nd: {
        required: true,
      },
    },

    messages: {
      employer_name: {
        required: "Please Enter Employer Name!",
      },
      company_type: {
        required: "Please Select Company Type!",
      },
      industry_type: {
        required: "Please Select Industry Type!",
      },
      designation: {
        required: "Please Select Designation!",
      },
      official_email: {
        required: "Please Enter Official Email Id!",
      },
      otp_email: {
        required: "Please Enter OTP!",
      },
      current_work_exp_in_year: {
        required: "Please Select Year!",
      },
      current_work_exp_in_month: {
        required: "Please Select Month!",
      },
      total_work_exp_in_year: {
        required: "Please Select Year!",
      },
      total_work_exp_in_month: {
        required: "Please Select Month!",
      },
      office_add_1: {
        required: "Please Enter Address Line 1!",
      },
      office_add_2: {
        required: "Please Enter Address Line 2!",
      },
      office_landmark: {
        required: "Please Enter Landmark!",
      },
      office_pincode: {
        required: "Please Enter Pin!",
      },
      office_state: {
        required: "Please Select State!",
      },
      office_city: {
        required: "Please Select City!",
      },
      office_locality: {
        required: "Please Select Locality!",
      },
      terms_occupational_details_1st: {
        required: "Please Agree Terms & Conditions!",
      },
      terms_occupational_details_2nd: {
        required: "Please Agree Terms & Conditions!",
      },
    },
    submitHandler: function (form, event) {

    },
  });
});

$(document).ready(function () {
  $("input[name=permanentAddress]").click(function () {
    var permanentAddress = $(this).val();
    if (permanentAddress == 0) {
      $("#noSameAddress").show();
    } else {
      $("#noSameAddress").hide();
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
    "current_add_1",
    function (value, element) {
      return this.optional(element) || /^[a-zA-z0-9 .,/-]{3,50}$/.test(value);
    },
    "Please Enter Valid Address Line 1!"
  );
  $.validator.addMethod(
    "current_add_2",
    function (value, element) {
      return this.optional(element) || /^[a-zA-z0-9 .,/-]{3,50}$/.test(value);
    },
    "Please Enter Valid Address Line 2!"
  );
  $.validator.addMethod(
    "current_add_3",
    function (value, element) {
      return this.optional(element) || /^[a-zA-z0-9 .,/-]{3,50}$/.test(value);
    },
    "Please Enter Valid Address Line 3!"
  );
  $.validator.addMethod(
    "current_landmark",
    function (value, element) {
      return this.optional(element) || /^[a-zA-z0-9 .,/-]{3,50}$/.test(value);
    },
    "Please Enter Valid Landmark!"
  );
  $.validator.addMethod(
    "current_pincode",
    function (value, element) {
      return this.optional(element) || /^[1-9][0-9]{5}$/.test(value);
    },
    "Please Enter Valid Pin Code!"
  );
  $.validator.addMethod(
    "permanent_add_1",
    function (value, element) {
      return this.optional(element) || /^[a-zA-z0-9 .,/-]{3,50}$/.test(value);
    },
    "Please Enter Valid Address Line 1!"
  );
  $.validator.addMethod(
    "permanent_add_2",
    function (value, element) {
      return this.optional(element) || /^[a-zA-z0-9 .,/-]{3,50}$/.test(value);
    },
    "Please Enter Valid Address Line 2!"
  );
  $.validator.addMethod(
    "permanent_add_3",
    function (value, element) {
      return this.optional(element) || /^[a-zA-z0-9 .,/-]{3,50}$/.test(value);
    },
    "Please Enter Valid Address Line 3!"
  );
  $.validator.addMethod(
    "permanent_landmark",
    function (value, element) {
      return this.optional(element) || /^[a-zA-z0-9 .,/-]{3,50}$/.test(value);
    },
    "Please Enter Valid Landmark!"
  );
  $.validator.addMethod(
    "permanent_pincode",
    function (value, element) {
      return this.optional(element) || /^[1-9][0-9]{5}$/.test(value);
    },
    "Please Enter Valid Pin Code!"
  );

  $("#currentInformation").validate({
    errorPlacement: function (error, element) {
      if (element.is(":checkbox")) {
        element.closest("div").append(error);
      } else {
        error.insertAfter(element);
      }
    },
    rules: {
      current_add_1: {
        required: true,
        current_add_1: true,
      },
      current_add_2: {
        required: true,
        current_add_2: true,
      },
      current_add_3: {
        current_add_3: true,
      },
      current_landmark: {
        required: true,
        current_landmark: true,
      },
      current_pincode: {
        required: true,
        current_pincode: true,
      },
      current_state: {
        required: true,
      },
      current_city: {
        required: true,
      },
      current_locality: {
        required: true,
      },
      current_res_type: {
        required: true,
      },
      period_of_stay_year: {
        required: true,
      },
      period_of_stay_month: {
        required: true,
      },

      permanent_add_1: {
        required: true,
        permanent_add_1: true,
      },
      permanent_add_2: {
        required: true,
        permanent_add_2: true,
      },
      permanent_add_3: {
        permanent_add_3: true,
      },
      permanent_landmark: {
        required: true,
        permanent_landmark: true,
      },
      permanent_pincode: {
        required: true,
        permanent_pincode: true,
      },
      permanent_state: {
        required: true,
      },
      permanent_city: {
        required: true,
      },
      permanent_locality: {
        required: true,
      },
      permanent_res_type: {
        required: true,
      },
      terms_contact_details_1st: {
        required: true,
      },
    },

    messages: {
      current_add_1: {
        required: "Please Enter Address Line 1!",
      },
      current_add_2: {
        required: "Please Enter Address Line 2!",
      },
      current_landmark: {
        required: "Please Enter Landmark!",
      },
      current_pincode: {
        required: "Please Enter Pin Code!",
      },
      current_state: {
        required: "Please Select State!",
      },
      current_city: {
        required: "Please Select City!",
      },
      current_locality: {
        required: "Please Select Locality!",
      },
      current_res_type: {
        required: "Please Select Residence Type!",
      },
      period_of_stay_year: {
        required: "Please Select Period of Stay (Year)!",
      },
      period_of_stay_month: {
        required: "Please Select Period of Stay (Month)!",
      },
      permanent_add_1: {
        required: "Please Enter Address Line 1!",
      },
      permanent_add_2: {
        required: "Please Enter Address Line 2!",
      },
      permanent_landmark: {
        required: "Please Enter Landmark!",
      },
      permanent_pincode: {
        required: "Please Enter Pin Code!",
      },
      permanent_state: {
        required: "Please Select State!",
      },
      permanent_city: {
        required: "Please Select City!",
      },
      permanent_locality: {
        required: "Please Select Locality!",
      },
      permanent_res_type: {
        required: "Please Select Residence Type!",
      },
      terms_contact_details_1st: {
        required: "Please Agree Terms & Conditions!",
      },
    },
    submitHandler: function (form) {
      $("#disabled_accordian_3").prop("disabled", false);
      $("#collapseTwo").hide();
      $("#collapseThree").show();
      $(".contact_green_img_show,.acc_contact_gn_check_img,.occupation_blue_img_show").show();
      $(".contact_blue_img_show,.occupation_gray_img_show").hide();
    },
  });
});

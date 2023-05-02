$(document).ready(function () {
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
    "mother_name",
    function (value, element) {
      return this.optional(element) || /^[a-zA-Z ]{3,50}$/.test(value);
    },
    "Please Enter Valid Mother Name!"
  );
  $.validator.addMethod(
    "father_sp_name",
    function (value, element) {
      return this.optional(element) || /^[a-zA-Z ]{3,50}$/.test(value);
    },
    "Please Enter Valid Father Name!"
  );
  $.validator.addMethod(
    "alternate_mobile",
    function (value, element) {
      return (
        this.optional(element) ||
        (/[^6666666666]/g.test(value) &&
          /[^7777777777]/g.test(value) &&
          /[^8888888888]/g.test(value) &&
          /[^9999999999]/g.test(value) &&
          /^[6789]\d{9}$/.test(value))
      );
    },
    "Please Enter Valid Alternate Mobile!"
  );
  $.validator.addMethod(
    "customer_mobile_not_same",
    function (value, element) {
      return $("#alternate_mobile").val() != $("#mobile").val();
    },
    "Alternate Mobile Number Should Not Match With Mobile Number!"
  );
  $.validator.addMethod(
    "aadhar_no",
    function (value, element) {
      return this.optional(element) || /^[0-9]{12}$/.test(value);
    },
    "Please Enter Valid Aadhar Number!"
  );
  $.validator.addMethod(
    "ckyc_number",
    function (value, element) {
      return this.optional(element) || /^[a-zA-Z0-9]{1,14}$/.test(value);
    },
    "Please Enter Valid CKYC Number!"
  );

  $("#personalDetails, #contactDetails").validate({
    errorPlacement: function (error, element) {
      if (element.is(":radio") || element.is(":checkbox")) {
        element.closest("div").append(error);
      } else {
        error.insertAfter(element);
      }
    },
    rules: {
      gender: {
        required: true,
      },
      marital_status: {
        required: true,
      },
      mother_name: {
        required: true,
        mother_name: true,
      },
      father_sp_name: {
        required: true,
        father_sp_name: true,
      },
      qualification: {
        required: true,
      },
      alternate_mobile: {
        required: true,
        alternate_mobile: true,
        customer_mobile_not_same: true,
      },
      loan_purpose: {
        required: true,
      },
      aadhar_no: {
        aadhar_no: true,
      },
      ckyc_number: {
        ckyc_number: true,
      },
      terms_personal_details_1st: {
        required: true,
      },
      terms_personal_details_2nd: {
        required: true,
      },
      email: {
        email: true,
      },
    },

    messages: {
      gender: {
        required: "Please Select Gender!",
      },
      marital_status: {
        required: "Please Select Marital Status!",
      },
      father_sp_name: {
        required: "Please Enter Father's Name!",
      },
      mother_name: {
        required: "Please Enter Mother's Name!",
      },
      qualification: {
        required: "Please Select qualification!",
      },
      alternate_mobile: {
        required: "Please Enter Alternate Mobile Number!",
      },
      loan_purpose: {
        required: "Please Select Purpose of Loan!",
      },
      terms_personal_details_1st: {
        required: "Please Agree Terms & Conditions!",
      },
      terms_personal_details_2nd: {
        required: "Please Agree Terms & Conditions!",
      },
      email: {
        required: "Please Enter Email Id!",
      },
    },
    submitHandler: function (form) {
      $("#disabled_accordian_2").prop("disabled", false);
      $("#collapseOne").hide();
      $("#collapseTwo").show();
      $(".personal_green_img_show,.acc_gn_check_img,.contact_blue_img_show").show();
      $(".personal_blue_img_show,.contact_gray_img_show").hide();
      
    },
  });
});


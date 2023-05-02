$(document).ready(function () {
  $.validator.addMethod(
    "title",
    function (value, element) {
      return this.optional(element) || /^[a-zA-Z. ]*$/.test(value);
    },
    "Please Select Title!"
  );
  $.validator.addMethod(
    "full_name",
    function (value, element) {
      return this.optional(element) || /^[a-zA-Z ]*$/.test(value);
    },
    "Please Enter Valid Name!"
  );
  $.validator.addMethod(
    "pincode",
    function (value, element) {
      return this.optional(element) || /^[1-9][0-9]{5}$/.test(value);
    },
    "Please Enter Valid Pin Code!"
  );
  $.validator.addMethod(
    "mobile",
    function (value, element) {
      return this.optional(element) || /^[6789]\d{9}$/.test(value);
    },
    "Please Enter Valid Mobile!"
  );
  $.validator.addMethod(
    "net_monthly_income",
    function (value, element) {
      return this.optional(element) || /^[1-9][0-9]{3,9}$/.test(value);
    },
    "Please Enter Valid Net Monthly Income!"
  );

  $("#formHome").validate({
    errorPlacement: function (error, element) {
      if (element.is(":radio") || element.is(":checkbox")) {
        element.closest("div").append(error);
      } else {
        error.insertAfter(element);
      }
    },
    rules: {
      title: {
        required: true,
        title: true,
      },
      full_name: {
        required: true,
        full_name: true,
      },
      pincode: {
        required: true,
        pincode: true,
      },
      mobile: {
        required: true,
        mobile: true,
      },
      employment_type: {
        required: true,
      },
      net_monthly_income: {
        required: true,
        net_monthly_income: true,
      },
      terms_send_otp: {
        required: true,
      },
    },

    messages: {
      title: {
        required: "Please Select Title!",
      },
      full_name: {
        required: "Please Enter Name!",
      },
      pincode: {
        required: "Please Enter Pin Code!",
      },
      mobile: {
        required: "Please Enter Mobile Number!",
      },
      employment_type: {
        required: "Please Select Occupation!",
      },
      net_monthly_income: {
        required: "Please Enter Net Monthly Income!",
      },
      terms_send_otp: {
        required: "Please Agree Terms & Conditions!",
      },
    },
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





$(document).ready(function () {
  $("#incomeValidation").validate({
    rules: {
      bank_statement_method: {
        required: true,
      },
    },
    messages: {
      bank_statement_method: {
        required: "Please Select Bank Statement Provide Method!",
      },
    },
    submitHandler: function (form) {
      $("#disabled_accordian_7").prop("disabled", false);
      $("#incomeValidation").hide();
      $("#downloadAadhar").show();
    },
  });
});

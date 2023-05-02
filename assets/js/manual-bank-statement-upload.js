$(document).ready(function () {
  $("input:file").change(function (e) {
    $(".filenames").html("");
    var files = e.target.files;
    for (var i = 0; i < files.length; i++) {
      $(".filenames").show();
      var fileName = files[i].name;
      $(
        `<div class='cu_uploaded_files_box' data-id='` +
          fileName +
          `'>
            <div class='cu_file_name'>` +
          fileName +
          `</div>
            <div class='cu_cross_icon' data-id='` +
          fileName +
          `' > x </div>
            </div>`
      ).insertAfter("#filenames");
    }
  });
  // Remove file
  $("body").on("click", ".cu_cross_icon", function (event) {
    var file = $(this).data("id");
    var div = $(".cu_uploaded_files_box").filter(function () {
      return $(this).data("id") == file;
    });
    div.remove();
  });
  $("#display_bank_statement_password_field").click(function () {
    if ($("#display_bank_statement_password_field").is(":checked")) {
      $("#bank_statement_password_section").css("display", "block");
    } else {
      $("#bank_statement_password_section").css("display", "none");
    }
  });

  $("#display_manual_bank_statement_password").click(function () {
    // Get type attribute.
    var type_attr_val = $("#CodeVal").attr("type");
    if (type_attr_val == "password") {
      $("#CodeVal").attr("type", "text");
      $("#display_manual_bank_statement_password").attr(
        "src",
        "assets/images/noview-icon.png"
      );
    } else {
      $("#CodeVal").attr("type", "password");
      $("#display_manual_bank_statement_password").attr(
        "src",
        "assets/images/view-icon.png"
      );
    }
  });

  /*$("input[name=manual_bank_statement]").change(function() {
    var fileName = $(this).val();
    if ($("input[name=manual_bank_statement]").val() !== "") {
      $("#zip_fileErr").hide();
    } else {
      alert("large");
      $("#zip_fileErr").show();
    }
    $(".manual_bank_statement_val").html(fileName);
  });*/

  $.validator.addMethod(
    "manual_bank_statement_password",
    function (value, element) {
      return (
        this.optional(element) || /^[0-9a-zA-Z!@#$%&*()\-_]{2,15}$/.test(value)
      );
    },
    "Please Enter Valid Password!"
  );

  $("#downloadAadhar").validate({
    errorPlacement: function (error, element) {
      if (element.is(":file") || element.is(":input")) {
        element.closest("div").append(error);
      } else {
        error.insertAfter(element);
      }
    },
    rules: {
      manual_bank_statement: {
        required: true,
        extension: "pdf",
        maxsize: 20000000,
      },
      manual_bank_statement_password: {
        required: true,
        manual_bank_statement_password: true,
      },
    },

    messages: {
      manual_bank_statement: {
        required: "Please Upload Bank Statement!",
        extension: "Invalid Extension!",
        maxsize: "Please Upload Max 20MB Size!",
      },
      manual_bank_statement_password: {
        required: "Please Enter Password!",
      },
    },
    submitHandler: function (form) {
      $(".initial_offer_parent").show();
      $(".final_offer_cu_accordian").hide();
    },
  });
});

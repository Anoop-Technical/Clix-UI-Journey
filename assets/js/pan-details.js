$(document).ready(function() {
  /*$("input[name=pancard_proof]").change(function() {
    var fileName = $(this).val();
    if ($("input[name=pancard_proof]").val() !== "") {
      $("#zip_fileErr").hide();
    } else {
      alert("large");
      $("#zip_fileErr").show();
    }
    $(".pan_file_val").html(fileName);
  });
  */

  $('input:file').change(function() {
    $('.filenames').html('');
    for(var i = 0 ; i < this.files.length ; i++){
      $(".filenames").show();
      var fileName = this.files[i].name;
      $('.filenames').append('<div class="file-name">' + fileName + '</div>');
    }
  });

  $.validator.addMethod("pan_no", function(value, element) {
    return this.optional(element) || /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/.test(value);
  }, 'Please Enter Valid Pan Number!');


  $("#panDetails").validate({
    errorPlacement: function(error, element) {
      if (element.is(":file")) {
        element.closest('div').append(error);
      } else {
        error.insertAfter(element);
      }
    },
    rules: {
      pan_no: {
        required: true,
        pan_no: true
      },
      pancard_proof: {
        required: true,
        extension: "jpg|JPEG|pdf",
        maxsize: 1024*1024*2
      }
    },

    messages: {
      pan_no: {
        required: "Please Enter Pan Number!"
      },
      pancard_proof: {
        required: "Please Select Pan Details!",
        extension: "Invalid Extension!",
        maxsize: "Please Upload Max 2MB size!"
      },

    },
    submitHandler:function(form) {
      // Disable the submit button.
      $('#submit_upload_pancard').prop('disabled', true);
      form.submit();
    }
  });
});
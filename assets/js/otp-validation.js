// oto
// $("#otp").validate({
//   rules: {
//     name_a: "required",
//   },
//   messages: {
//     name_a: "Please Enter OTP!",
//   },
// });
$(document).ready(function () {
  // Starts resend mobile otp functionality.
  $("#regenerate_otp").click(function () {
    var member_ref = $("#member_ref").val();
    var full_name = $("#full_name").val();
    var mobile = $("#mobile").val();
    disable_resend();
    //timer(120);
    // $.ajax({
    //   url: "includes/ajax_request/ajax_request.php",
    //   type: "post",
    //   data: {
    //     action: "resend_mobile_otp",
    //     member_ref: member_ref,
    //     full_name: full_name,
    //     mobile: mobile,
    //   },
    //   dataType: "html",
    //   success: function (data) {
    //     // Update the mobile otp value.
    //     $("#mobile_otp").val(data);
    //     // Display the mobile otp sent message.
    //     $("#mobile_otp_msg").html(
    //       '<div class="col-md-8 col-md-offset-2"><div class="alert alert-success">Mobile OTP has been sent successfully.</div></div>'
    //     );
    //     // Hide the mobile otp sent message after 5 seconds.
    //     $("#mobile_otp_msg").delay(5000).fadeOut(500);
    //   },
    //   error: function () {
    //     alert("We are facing technical error!");
    //     return false;
    //   },
    // });
  });
  function disable_resend() {
    $("#regenerate_otp").addClass("disable_a_href");
    timer(120);
    setTimeout(function () {
      // enable click after 2 minutes.
      $("#regenerate_otp").removeClass("disable_a_href");
    }, 121000); // 2 minutes delay.
  }

  let timerOn = true;

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
  // Ends resend mobile otp functionality.

  $("input").on("keyup", function () {
    $("#continue").prop("disabled", true);
    var mobile_otp = $("#mobile_otp").val();
    mobile_otp = mobile_otp.toString();
    // Match mobile otp.
    if ($("input[name=name_a]").val().match(mobile_otp)) {
      $("#otpErr").hide();
      $("input[name=name_a]").removeClass("error-box");
      $("input[name=name_a]").removeClass("error-box");
      $("#continue").prop("disabled", false);
    } else {
      $("#otpErr").show();
      $("input[name=name_a]").addClass("error-box");
      return false;
    }
  });
});

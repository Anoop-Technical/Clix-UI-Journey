// readmore and readless js start here
$(document).ready(function () {
  var showChar = 120;
  var ellipsestext = "...";
  var moretext = "Read More + ";
  var lesstext = "Read Less - ";
  $(".more").each(function () {
    var content = $(this).html();
    if (content.length > showChar) {
      var c = content.substr(0, showChar);
      var h = content.substr(showChar - 1, content.length - showChar);
      var html =
        c +
        '<span class="moreellipses" style="display: none;">' +
        ellipsestext +
        '&nbsp;</span><span class="morecontent"><span style="display: none;">' +
        h +
        '</span>&nbsp;&nbsp;<a href="" class="morelink">' +
        moretext +
        "</a></span>";
      $(this).html(html);
    }
  });

  $(".morelink").click(function () {
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
});
// readmore and readless js end here

$(".collapse").collapse();

$(".btn-primary").click(function () {
  $(this)
    .parent()
    .slideToggle("fast")
    .parent()
    .siblings()
    .children(".container:visible")
    .slideUp("fast");
  $(this).parent().siblings().toggleClass("current");
  $(this).parent().siblings().siblings("h3").addClass("current");
  $(this)
    .parent()
    .siblings()
    .parent()
    .next()
    .children("h3")
    .next(".container")
    .slideToggle("fast")
    .parent()
    .siblings()
    .children(".container:visible")
    .slideUp("fast");
  $(this)
    .parent()
    .siblings()
    .parent()
    .next()
    .children("h3")
    .toggleClass("current");
  $(this)
    .parent()
    .siblings()
    .parent()
    .next()
    .children("h3")
    .siblings("h3")
    .removeClass("current");
  return false;
});

//accordian disabled code start here
// $("#disabled_accordian_2").prop("disabled", true);
// $("#disabled_accordian_3").prop("disabled", true);

// hide and show on click start here
$(".InsuranceNotSelected").hide();
$("#tnc_insurance").click(function () {
  if ($(this).is(":checked")) {
    $(".InsuranceNotSelected").hide();
    $(".emi_distribution").show();
  } else {
    $(".InsuranceNotSelected").show();
    $(".emi_distribution").hide();
  }s
});
$(".final_offer_parent").hide();
// Current Address is same as permanent address code start here
$(".cu_radio_click_yes").click(function () {
  $(".permanent_address_sec").hide();
});
$(".cu_radio_click_no").click(function () {
  $(".permanent_address_sec").show();
});
// Current Address is same as permanent address code end here
$( function() {
  $( "#datepicker" ).datepicker();
} );


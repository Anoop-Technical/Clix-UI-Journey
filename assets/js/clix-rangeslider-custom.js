$('input[type="range"]').rangeslider();
$('input[type="range"]').rangeslider('destroy');
var hj = jQuery.noConflict();
$(function() {
  var $document = hj(document),
    selector = '[data-rangeslider]',
    $element = hj(selector);

  function valueOutput(element) {
    var svalue = element.value,
      output = element.parentNode.getElementsByTagName('output')[0];
    document.getElementById('applied_loan_amount').value = svalue;
  }
  for (var i = $element.length - 1; i >= 0; i--) {
    valueOutput($element[i]);
  }

  $document.on('change', 'input[type="range"]', function(e) {
    valueOutput(e.target);
  });

  $document.on('change', '#js-example-change-value input[type="number"]', function(e) {
    var $inputRange = hj('input[type="range"]', e.target.parentNode),
      value = hj('input[type="number"]', e.target.parentNode)[0].value;
    $inputRange.val(value).change();
  });
  $element.rangeslider({
    polyfill: false,
    onInit: function() {},
    onSlideEnd: function(position, value) {
      //console.log(value);
      get_monthly_emi(value);
    }
  });
});


/**
 *
 * Function to get Monthly EMI through changed loan amount.
 *
 */
function get_monthly_emi(loan_amount) {
  // Get fields value.
  var member_ref = $('#member_ref').val();
  var application_id = $('#application_id').val();
  var loan_roi = $('#loan_roi').val();
  var loan_pf = $('#loan_pf').val();
  var loan_tenure = $('#loan_tenure').val();
  var dob = $('#dob').val();
  var gender = $('#gender').val();
  // Check of if customer drags the loan amount greater than 5 Lac to less than 5 Lac.
  var emp_loan_amount = $('#emp_loan_amount').val();
  if(emp_loan_amount >= 500000 && loan_amount < 500000) {
    loan_roi = $('#secondary_roi').val();
    loan_pf = $('#secondary_pf').val();
  } else {
    loan_roi = $('#emp_roi').val();
    loan_pf = $('#emp_pf').val();
  }
  // Get loan emi from loan amount, interest rate and tenure.
  var calculate_interest = loan_roi/1200;
  var loan_emi = Math.round(loan_amount * calculate_interest / (1 - (Math.pow(1/(1 + calculate_interest), loan_tenure))));
  // Display loan emi in monthly emi field.
  $('#display_loan_emi').text(loan_emi);
  $('#loan_emi').val(loan_emi);
  // Display loan roi.
  $('#display_loan_roi').text(loan_roi);
  $('#loan_roi').val(loan_roi);
  // Display loan pf.
  $('#display_loan_pf').text(loan_pf);
  $('#loan_pf').val(loan_pf);

  console.log(loan_amount);
  console.log(loan_roi);
  console.log(loan_pf);
  
  if(loan_amount) {
    $.ajax({
      url: "includes/ajax_request/ajax_request.php",
      method: "POST",
      data: {action:'get_insurance_details', member_ref:member_ref, application_id:application_id, loan_amount:loan_amount, loan_roi:loan_roi, loan_tenure:loan_tenure, dob:dob, gender:gender},
      dataType: "JSON",
      cache: false,
      beforeSend: function() {
        $('#loader_div').css('display','block');
        setTimeout(function() {
          $('#loader_div').css('display','none');
        }, 4000);
      },
      success: function(response) {
        console.log(response);
        if(response.httpStatus == 'OK') {
          var sum_assured = Math.round(response.responseData.sumAssured);
          var loan_emi_with_insurance = Math.round(response.responseData.emiWithInsurance);
          var insurance_premium = Math.round(response.responseData.totalPremiumInclTaxes);
          var insurance_coverage_term = Math.round(response.responseData.coverageTerm);
          var insurance_premium_excl_taxes = Math.round(response.responseData.totalPremiumExclTaxes);
          var insurance_gst = Math.round(response.responseData.gst);
          // Update insurance details.
          $('#display_sum_assured').text(sum_assured);
          $('#display_loan_emi_with_insurance').text(loan_emi_with_insurance);
          $('#display_insurance_premium').text(insurance_premium);
          $('#sum_assured').val(sum_assured);
          $('#loan_emi_with_insurance').val(loan_emi_with_insurance);
          $('#insurance_premium').val(insurance_premium);
          $('#insurance_coverage_term').val(insurance_coverage_term);
          $('#insurance_premium_excl_taxes').val(insurance_premium_excl_taxes);
          $('#insurance_gst').val(insurance_gst);
        } else {
          alert("Some error occurred while updating insurance details, Please try again!");
        }
      }
    });
  }
}
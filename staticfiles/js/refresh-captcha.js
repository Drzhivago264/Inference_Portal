$(document).ready(function () {
    // Add refresh button after field (this can be done in the template as well)
    $('img.captcha').after(
      $('<br><input type="button" href="#void" class="captcha-refresh" value="Refresh">')
    );

    // Click-handler for the refresh-link
    $('.captcha-refresh').click(function () {
      var $form = $(this).parents('form');
      var url = location.protocol + "//" + window.location.hostname + ":"
        + location.port + "/captcha/refresh/";

      // Make the AJAX-call
      $.getJSON(url, {}, function (json) {
        $form.find('input[name="captcha_0"]').val(json.key);
        $form.find('img.captcha').attr('src', json.image_url);
      });

      return false;
    });
  });

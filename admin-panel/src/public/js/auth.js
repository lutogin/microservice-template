function ready() {
  updateConfirmationStatus();
}

document.addEventListener('DOMContentLoaded', ready);

function updateConfirmationStatus() {
  const passwordGroup = $('#password-group');
  const password = $('#password');
  const passwordConfirm = $('#password-confirm');
  const confirmProfileBtn = $('#confirm-profile-btn');

  function updateStatus() {
    const passwordVal = password.val();
    const passwordConfirmVal = passwordConfirm.val();

    if (passwordVal !== passwordConfirmVal) {
      passwordGroup.addClass('has-error');
      confirmProfileBtn.addClass('disabled');
    } else {
      passwordGroup.removeClass('has-error');
      confirmProfileBtn.removeClass('disabled');
    }
  }

  password.keyup(updateStatus);
  passwordConfirm.keyup(updateStatus);
}

function encodePassword() {
  const password = $('#password').val();
  const passwordConfirm = $('#password-confirm').val();
  if (passwordConfirm !== undefined && passwordConfirm !== password) {
    return false;
  }
  if (password) {
    $('#hashed-password').val(SHA256(password));
  }
}

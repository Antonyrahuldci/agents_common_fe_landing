const messages = {
  insert: {
    success: "Data added successfully.",
    error: "Failed to add data. Please try again.",
  },
  update: {
    success: "Data updated successfully.",
    error: "Failed to update data. Please try again.",
  },
  delete: {
    success: "Data deleted successfully.",
    error: "Failed to delete data. Please try again.",
    confirm: "Are you sure you want to delete this data?",
  },
  auth: {
    loginSuccess: "Login successful.",
    loginError: "Login failed. Please check your credentials and try again.",
    logoutSuccess: "Logged out successfully.",
    sessionExpired: "Your session has expired. Please log in again.",
    confirm: "Are you sure you want to log out?",
  },
  banner: {
    success: "Banner updated successfully.",
    error: "Failed to update banner. Please try again.",
  },
  upload: {
    videoSizeLimit: "The video file size must be less than 10 MB.",
  },
  forgotPassword: {
    emailSent: "Password reset email sent successfully.",
    emailError: "Failed to send password reset email. Please try again.",
    resetSuccess: "Your password has been reset successfully.",
    resetError: "Failed to reset password. Please try again.",
    invalidToken: "Invalid or expired reset link. Please request a new one.",
    userNotFound: "No user found with this email address.",
  },
  changePassword: {
    success: "Your password has been changed successfully.",
    incorrectCurrent: "The current password you entered is incorrect.",
    mismatch: "New password and confirm password do not match.",
    weakPassword:
      "The new password is too weak. Please choose a stronger password.",
    error: "Failed to change password. Please try again later.",
  },
  resetPassword: {
    success: "Your password has been reset successfully.",
    mismatch: "New password and confirm password do not match.",
    weakPassword:
      "The new password is too weak. Please choose a stronger password.",
    expiredLink: "The reset link has expired. Please request a new one.",
    invalidToken:
      "Invalid reset token. Please request a new password reset email.",
    error: "Failed to reset your password. Please try again later.",
  },
  termsAndConditions: {
    success: "The Terms and Conditions were updated successfully.",
    error: "Failed to update the Terms and Conditions. Please try again later.",
  },

  privacyPolicy: {
    success: "The Privacy Policy was updated successfully.",
    error: "Failed to update the Privacy Policy. Please try again later.",
  },
  catchError: "An error occurred. Please try again later.",
};

export default messages;

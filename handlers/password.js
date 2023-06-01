import { http } from "../utilities/http.js";
import { togglePassword, displayNotification, clearErrors } from "../utilities/scripts.js";
import { validPassword } from "../utilities/validations.js";

$(() => {
  $(document).on("submit", "#passwordForm", async (event) => {
    event.preventDefault();
    await resetPassword();
  });
  $(document).on("focus keypress", "#password", () => {
    clearErrors();
  });
  $(document).on("click", "#toggleButton", () => {
    togglePassword();
  });
});

const resetPassword = async () => {
  const password = $("#password").val();
  if (validPassword(password)) {
    clearErrors();
    const url = "/resetPassword";
    const method = "PUT";
    const headers = { "Content-Type": "application/json" };
    const body = JSON.stringify({ password });
    const data = { url, method, headers, body };
    try {
      await http(data);
      $("#password").val("");
      displayNotification("Password", "Password has been successfully reset!", true);
    } catch (errors) {
      if (errors instanceof Array) {
        $("#passwordError").show();
      } else {
        alert(errors);
      }
    }
  } else {
    $("#passwordError").show();
  }
};

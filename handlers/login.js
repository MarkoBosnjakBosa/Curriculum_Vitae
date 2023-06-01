import { http } from "../utilities/http.js";
import { getRememberMe, remember, forget } from "../utilities/rememberMe.js";
import { togglePassword, clearErrors } from "../utilities/scripts.js";
import { validUsername, validPassword } from "../utilities/validations.js";

$(() => {
  getLoginCredentials();
  $(document).on("submit", "#loginForm", async (event) => {
    event.preventDefault();
    await loginUser();
  });
  $(document).on("keyup change", "#username", async () => {
    await checkUsername();
  });
  $(document).on("focus keypress", "#username, #password", ({ currentTarget }) => {
    $(`#${$(currentTarget).attr("id")}Error`).hide();
  });
  $(document).on("click", "#toggleButton", () => {
    togglePassword();
  });
});

const loginUser = async () => {
  const username = $("#username").val();
  const password = $("#password").val();
  let errors = [];
  if (!validUsername(username)) {
    errors = [...errors, "username"];
  }
  if (!validPassword(password)) {
    errors = [...errors, "password"];
  }
  if (!errors.length) {
    clearErrors();
    const url = "/loginUser";
    const method = "POST";
    const headers = { "Content-Type": "application/json" };
    const body = JSON.stringify({ username, password });
    const data = { url, method, headers, body };
    try {
      const response = await http(data);
      if ($("#rememberMe").is(":checked")) {
        remember(username);
      } else {
        forget();
      }
      window.open(response, "_self");
    } catch (errors) {
      $.each(errors, (index, element) => $(`#${element}Error`).show());
    }
  } else {
    $.each(errors, (index, element) => $(`#${element}Error`).show());
  }
};

const getLoginCredentials = () => {
  const rememberMe = getRememberMe();
  const { username } = rememberMe;
  if (validUsername(username)) {
    $("#rememberMe").prop("checked", true);
    $("#username").val(username);
  }
};

const checkUsername = async () => {
  const username = $("#username").val();
  if (validUsername(username)) {
    const url = "/checkUsername";
    const method = "POST";
    const headers = { "Content-Type": "application/json" };
    const body = JSON.stringify({ username });
    const data = { url, method, headers, body };
    try {
      await http(data);
      $("#usernameError").hide();
    } catch (errors) {
      $("#usernameError").show();
    }
  } else {
    $("#usernameError").hide();
  }
};

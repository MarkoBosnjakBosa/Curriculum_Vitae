import { http } from "../utilities/http.js";
import { clearForm, clearErrors } from "../utilities/scripts.js";
import { validName, validEmail, validText } from "../utilities/validations.js";
import constants from "../utilities/constants.js";

$(() => {
  AOS.init();
  $(document).on("submit", "#contactForm", (event) => {
    event.preventDefault();
    saveContact();
  });
  $(document).on("click", "#download", ({ currentTarget }) => {
    const isGerman = $(currentTarget).data("language") === constants.GERMAN_LANGUAGE;
    window.open(`${window.location.origin}/custom/Marko_Bošnjak_${isGerman ? "Lebenslauf" : "Curriculum_Vitae" }.pdf`, "_blank");
  });
  $(document).on("focus keypress", "#name, #email, #subject, #message", ({ currentTarget }) => {
    const currentTargetId = $(currentTarget).attr("id");
    $(`#${currentTargetId}`).prev().removeClass("empty");
    $(`#${currentTargetId}`).removeClass("empty");
    $("#contactSaved").hide();
  });
  $(document).on("click", "a.smooth-scroll", (event) => {
    const { currentTarget } = event;
    if (location.pathname.replace(/^\//, "") === currentTarget.pathname.replace(/^\//, "") && location.hostname === currentTarget.hostname) {
      let target = $(currentTarget.hash);
      target = target.length ? target : $(`[name=${currentTarget.hash.slice(1)}]`);
      if (target.length) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: target.offset().top }, 1000, () => {
          let sameTarget = $(target);
          sameTarget.trigger("focus");
          if (sameTarget.is(":focus")) {
            return false;
          } else {
            sameTarget.attr("tabindex", "-1");
            sameTarget.trigger("focus");
          }
        });
      }
    }
  });
});

const saveContact = () => {
  const name = $("#name").val();
  const email = $("#email").val();
  const subject = $("#subject").val();
  const message = $("#message").val();
  const language = $("#language").val();
  let errors = [];
  if (!validName(name)) {
    errors = [...errors, "name"];
  }
  if (!validEmail(email)) {
    errors = [...errors, "email"];
  }
  if (!validText(subject)) {
    errors = [...errors, "subject"];
  }
  if (!validText(message)) {
    errors = [...errors, "message"];
  }
  if (!errors.length) {
    clearErrors();
    const reCaptcha = $("#reCaptcha").val();
    if (reCaptcha) {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(reCaptcha, { action: "submit" }).then(async (reCaptchaToken) => {
          const url = "/saveContact";
          const method = "POST";
          const headers = { "Content-Type": "application/json" };
          const body = JSON.stringify({ name, email, subject, message, language, reCaptchaToken });
          const data = { url, method, headers, body };
          try {
            await http(data);
            clearForm("contactForm");
            $("#contactSaved").show();
          } catch (errors) {
            $.each(errors, (index, element) => {
              $(`#${element}`).prev().addClass("empty");
              $(`#${element}`).addClass("empty");
            });
            $("#contactSaved").hide();
          }
        });
      });
    }
  } else {
    $.each(errors, (index, element) => {
      $(`#${element}`).prev().addClass("empty");
      $(`#${element}`).addClass("empty");
    });
    $("#contactSaved").hide();
  }
};

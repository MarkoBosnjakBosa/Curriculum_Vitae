import { http } from "../utilities/http.js";
import { displayNotification, clearErrors } from "../utilities/scripts.js";
import { validName, validEmail, validTelephone, validBirthday, validText, validLink } from "../utilities/validations.js";

$(() => {
  $(document).on("submit", "#profileForm", async (event) => {
    event.preventDefault();
    await editProfile();
  });
  $(document).on("change", "#avatar", async (event) => {
    await editAvatar(event);
  });
  $(document).on("focus keypress", "#firstName, #lastName, #email, #telephone, #birthday, #birthday_de, #address, #address_de, #languages, #languages_de, #profession, #profession_de, #linkedIn, #xing, #gitHub", ({ currentTarget }) => {
    $(`#${$(currentTarget).attr("id")}Error`).hide();
  });
});

const editProfile = async () => {
  const firstName = $("#firstName").val();
  const lastName = $("#lastName").val();
  const email = $("#email").val();
  const telephone = $("#telephone").val();
  const birthday = $("#birthday").val();
  const birthday_de = $("#birthday_de").val();
  const address = $("#address").val();
  const address_de = $("#address_de").val();
  const languages = $("#languages").val();
  const languages_de = $("#languages_de").val();
  const profession = $("#profession").val();
  const profession_de = $("#profession_de").val();
  const linkedIn = $("#linkedIn").val();
  const xing = $("#xing").val();
  const gitHub = $("#gitHub").val();
  let errors = [];
  if (!validName(firstName)) {
    errors = [...errors, "firstName"];
  }
  if (!validName(lastName)) {
    errors = [...errors, "lastName"];
  }
  if (!validEmail(email)) {
    errors = [...errors, "email"];
  }
  if (!validTelephone(telephone)) {
    errors = [...errors, "telephone"];
  }
  if (!validBirthday(birthday, false)) {
    errors = [...errors, "birthday"];
  }
  if (!validBirthday(birthday_de, true)) {
    errors = [...errors, "birthday_de"];
  }
  if (!validText(address)) {
    errors = [...errors, "address"];
  }
  if (!validText(address_de)) {
    errors = [...errors, "address_de"];
  }
  if (!validText(languages)) {
    errors = [...errors, "languages"];
  }
  if (!validText(languages_de)) {
    errors = [...errors, "languages_de"];
  }
  if (!validText(profession)) {
    errors = [...errors, "profession"];
  }
  if (!validText(profession_de)) {
    errors = [...errors, "profession_de"];
  }
  if (!validLink(linkedIn)) {
    errors = [...errors, "linkedIn"];
  }
  if (!validLink(xing)) {
    errors = [...errors, "xing"];
  }
  if (!validLink(gitHub)) {
    errors = [...errors, "gitHub"];
  }
  if (!errors.length) {
    clearErrors();
    const url = "/editProfile";
    const method = "PUT";
    const headers = { "Content-Type": "application/json" };
    const body = JSON.stringify({ firstName, lastName, email, telephone, birthday, birthday_de, address, address_de, languages, languages_de, profession, profession_de, linkedIn, xing, gitHub });
    const data = { url, method, headers, body };
    try {
      await http(data);
      displayNotification("Profile", "Profile has been successfully updated!", true);
    } catch (errors) {
      if (errors instanceof Array) {
        $.each(errors, (index, element) => $(`#${element}Error`).show());
      } else {
        alert(errors);
      }
    }
  } else {
    $.each(errors, (index, element) => $(`#${element}Error`).show());
  }
};

const editAvatar = async (event) => {
  const files = event.target.files;
  if (files && files.length) {
    const file = files[0];
    if (file.type.match("image.*")) {
      let formData = new FormData();
      formData.append("avatar", file);
      const url = "/editAvatar";
      const method = "PUT";
      const data = { url, method, body: formData };
      try {
        const avatar = await http(data);
        const { src, alt } = avatar;
        $(".avatar img").attr("src", src);
        $(".avatar img").attr("alt", alt);
        displayNotification("Avatar", "Avatar has been successfully updated!", true);
      } catch (errors) {
        displayNotification("Avatar", "Please select a valid avatar!", false);
      }
    } else {
      displayNotification("Avatar", "Please select a valid avatar!", false);
    }
    $("#avatar").val("");
  } else {
    displayNotification("Avatar", "Please select a valid avatar!", false);
  }
};

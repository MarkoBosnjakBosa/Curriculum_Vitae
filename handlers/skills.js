import { http } from "../utilities/http.js";
import { deleteObject } from "../utilities/delete.js";
import { displayNotification, clearForm, clearErrors } from "../utilities/scripts.js";
import { validText, validObjectId } from "../utilities/validations.js";

$(() => {
  $(document).on("submit", "#skillForm, #skillEditForm", async (event) => {
    event.preventDefault();
    const { currentTarget } = event;
    const form = $(currentTarget).attr("id");
    await saveSkill(form);
  });
  $(document).on("click", ".displaySkill", ({ currentTarget }) => {
    const skillId = $(currentTarget).data("id");
    const index = $(currentTarget).closest("tr").find("th").text();
    displaySkill(skillId, index);
  });
  $(document).on("click", ".deleteSkill", async ({ currentTarget }) => {
    const skillId = $(currentTarget).data("id");
    const name = $(currentTarget).closest("tr").find("td:eq(0)").text();
    await deleteObject(skillId, "Skill", "skillsTable", name);
  });
  $(document).on("focus keypress", "#title, #titleEdit", ({ currentTarget }) => {
    $(`#${$(currentTarget).attr("id")}Error`).hide();
  });
  $(document).on("click", "#reset", () => {
    clearForm("skillForm");
  });
  $(document).on("hidden.bs.modal", () => {
    clearForm("skillEditForm");
  });
});

const saveSkill = async (form) => {
  let errors = [];
  let skillId, title;
  if (form === "skillForm") {
    title = $("#title").val();
  } else {
    skillId = $("#skillId").val();
    title = $("#titleEdit").val();
  }
  if (form === "skillForm") {
    if (!validText(title)) {
      errors = [...errors, "title"];
    }
  } else {
    if (!validObjectId(skillId) || !validText(title)) {
      errors = [...errors, "title"];
    }
  }
  if (!errors.length) {
    clearErrors();
    const url = (form === "skillForm") ? "/createSkill" : "/editSkill";
    const method = (form === "skillForm") ? "POST" : "PUT";
    const headers = { "Content-Type": "application/json" };
    const body = JSON.stringify((form === "skillForm") ? { title } : { skillId, title });
    const data = { url, method, headers, body };
    try {
      const skill = await http(data);
      const content = `<td>${skill.title}</td><td><i class="fas fa-pen displaySkill pointer icon" data-id="${skill._id}"></i><i class="fas fa-trash deleteSkill pointer icon" data-id="${skill._id}"></i></td>`;
      if (form === "skillForm") {
        $("#skillsTable tbody").append(`<tr id="${skill._id}"><th>${($("#skillsTable tbody tr").length + 1)}</th>${content}</tr>`);
      } else {
        const index = $("#index").val();
        $(`#${skill._id}`).replaceWith(`<tr id="${skill._id}"><th>${index}</th>${content}</tr>`);
        $("#skillEditForm .btn-close").trigger("click");
      }
      clearForm(form);
      displayNotification("Skill", `Skill has been successfully ${(form === "skillForm") ? "created" : "updated"}!`, true);
    } catch (errors) {
      if (errors instanceof Array) {
        $.each(errors, (index, element) => $(`#${(form === "skillForm") ? element : `${element}Edit`}Error`).show());
      } else {
        alert(errors);
      }
    }
  } else {
    $.each(errors, (index, element) => $(`#${(form === "skillForm") ? element : `${element}Edit`}Error`).show());
  }
};

const getSkill = async (skillId, callback) => {
  const url = `/getSkill/${skillId}`;
  const data = { url };
  try {
    const skill = await http(data);
    return callback(skill);
  } catch (errors) {
    alert(errors);
  }
};

const displaySkill = (skillId, index) => {
  const modal = new bootstrap.Modal(document.getElementById("skill"), { backdrop: "static", keyboard: false });
  getSkill(skillId, (skill) => {
    const { _id, title } = skill;
    $("#skillId").val(_id);
    $("#index").val(index);
    $("#titleEdit").val(title);
    modal.show();
  });
};

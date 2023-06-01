import { http } from "../utilities/http.js";
import { deleteObject } from "../utilities/delete.js";
import { displayNotification, navigate, removeRow, clearForm, clearErrors } from "../utilities/scripts.js";
import { validText, validType, validObjectId } from "../utilities/validations.js";
import constants from "../utilities/constants.js";

$(() => {
  $(document).on("submit", "#resumeItemForm", async (event) => {
    event.preventDefault();
    await saveResumeItem();
  });
  $(document).on("click", ".displayResumeItem", ({ currentTarget }) => {
    const resumeItemId = $(currentTarget).data("id");
    const index = $(currentTarget).closest("tr").find("th").text();
    displayResumeItem(resumeItemId, index);
  });
  $(document).on("click", ".deleteResumeItem", async ({ currentTarget }) => {
    const resumeItemId = $(currentTarget).data("id");
    const table = $(currentTarget).closest("table").attr("id");
    await deleteObject(resumeItemId, "ResumeItem", table);
  });
  $(document).on("focus keypress", "#title, #title_de, #workPlace, #workPlace_de, #duration, #duration_de, #description, #description_de", ({ currentTarget }) => {
    $(`#${$(currentTarget).attr("id")}Error`).hide();
  });
  $(document).on("click", ".next, .back", ({ currentTarget }) => {
    navigate(currentTarget, "Resume");
  });
  $(document).on("hidden.bs.modal", () => {
    clearForm("resumeItemForm");
  });
});

const saveResumeItem = async () => {
  const resumeItemId = $("#resumeItemId").val();
  const index = $("#index").val();
  const oldType = $("#oldType").val();
  const create = $("#create").val() === "true";
  const title = $("#title").val();
  const title_de = $("#title_de").val();
  const workPlace = $("#workPlace").val();
  const workPlace_de = $("#workPlace_de").val();
  const duration = $("#duration").val();
  const duration_de = $("#duration_de").val();
  const description = $("#description").val();
  const description_de = $("#description_de").val();
  const type = $("#type").val();
  let errors = [];
  if (create) {
    if (!validText(title)) {
      errors = [...errors, "title"];
    }
  } else {
    if (!validObjectId(resumeItemId) || !validText(title)) {
      errors = [...errors, "title"];
    }
  }
  if (!validText(title_de)) {
    errors = [...errors, "title_de"];
  }
  if (!validText(workPlace)) {
    errors = [...errors, "workPlace"];
  }
  if (!validText(workPlace_de)) {
    errors = [...errors, "workPlace_de"];
  }
  if (!validText(duration)) {
    errors = [...errors, "duration"];
  }
  if (!validText(duration_de)) {
    errors = [...errors, "duration_de"];
  }
  if (!validText(description)) {
    errors = [...errors, "description"];
  }
  if (!validText(description_de)) {
    errors = [...errors, "description_de"];
  }
  if (!validType(type, constants.RESUME_ITEM)) {
    errors = [...errors, "type"];
  }
  if (!errors.length) {
    clearErrors();
    const url = create ? "/createResumeItem" : "/editResumeItem";
    const method = create ? "POST" : "PUT";
    const headers = { "Content-Type": "application/json" };
    let body = { title, title_de, workPlace, workPlace_de, duration, duration_de, description, description_de, type };
    if (!create) body.resumeItemId = resumeItemId;
    body = JSON.stringify(body);
    const data = { url, method, headers, body };
    try {
      const response = await http(data);
      const { resumeItem, isCreated } = response;
      const content = `<td rowspan="2"><img src="../images/americanFlag.png" alt="American flag" class="img-fluid flag" /><br /><img src="../images/germanFlag.png" alt="German flag" class="img-fluid flag" /></td><td rowspan="2">${resumeItem.title}<br />${resumeItem.title_de}</td><td rowspan="2">${resumeItem.workPlace}<br />${resumeItem.workPlace_de}</td><td rowspan="2">${resumeItem.duration}<br />${resumeItem.duration_de}</td><td rowspan="2">${resumeItem.description}<br />${resumeItem.description_de}</td><td rowspan="2" class="type">${resumeItem.type}</td><td rowspan="2"><i class="fas fa-pen displayResumeItem pointer icon" data-id="${resumeItem._id}"></i><i class="fas fa-trash deleteResumeItem pointer icon" data-id="${resumeItem._id}"></i></td></tr><tr id="empty_${resumeItem._id}">`;
      if (isCreated) {
        $(`#${resumeItem.type}ResumeTable tbody`).append(`<tr id="${resumeItem._id}"><th rowspan="2">${($(`#${resumeItem.type}ResumeTable tbody tr:has(th)`).length + 1)}</th>${content}</tr>`);
      } else {
        if (resumeItem.type === oldType) {
          $(`#${resumeItem._id}`).replaceWith(`<tr id="${resumeItem._id}"><th rowspan="2">${index}</th>${content}</tr>`);
        } else {
          removeRow(resumeItem._id, `${oldType}ResumeTable`);
          $(`#${resumeItem.type}ResumeTable tbody`).append(`<tr id="${resumeItem._id}"><th rowspan="2">${($(`#${resumeItem.type}ResumeTable tbody tr:has(th)`).length + 1)}</th>${content}</tr>`);
        }
      }
      clearForm("resumeItemForm");
      $("#resumeItemForm .btn-close").trigger("click");
      $(`#${resumeItem.type}ResumeNavTab`).trigger("click");
      displayNotification("Resume item", "Resume item has been successfully saved!", true);
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

const getResumeItem = async (resumeItemId, callback) => {
  const url = `/getResumeItem/${resumeItemId}`;
  const data = { url };
  try {
    const resumeItem = await http(data);
    return callback(resumeItem);
  } catch (errors) {
    alert(errors);
  }
};

const displayResumeItem = (resumeItemId, index) => {
  const modal = new bootstrap.Modal(document.getElementById("resumeItem"), { backdrop: "static", keyboard: false });
  if (validObjectId(resumeItemId)) {
    getResumeItem(resumeItemId, (resumeItem) => {
      const { _id, title, title_de, workPlace, workPlace_de, duration, duration_de, description, description_de, type } = resumeItem;
      $("#resumeItemId").val(_id);
      $("#index").val(index);
      $("#oldType").val(type);
      $("#create").val(false);
      $("#title").val(title);
      $("#title_de").val(title_de);
      $("#workPlace").val(workPlace);
      $("#workPlace_de").val(workPlace_de);
      $("#duration").val(duration);
      $("#duration_de").val(duration_de);
      $("#description").val(description);
      $("#description_de").val(description_de);
      $("#type").val(type);
      modal.show();
    });
  } else {
    $("#create").val(true);
    modal.show();
  }
};

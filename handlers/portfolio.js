import { http } from "../utilities/http.js";
import { deleteObject } from "../utilities/delete.js";
import { displayNotification, navigate, removeRow, clearForm, clearErrors } from "../utilities/scripts.js";
import { validText, validLink, validType, validLogo, validObjectId } from "../utilities/validations.js";
import constants from "../utilities/constants.js";

$(() => {
  $(document).on("submit", "#portfolioItemForm, #portfolioItemEditForm", async (event) => {
    event.preventDefault();
    const { currentTarget } = event;
    const form = $(currentTarget).attr("id");
    await savePortfolioItem(form);
  });
  $(document).on("click", ".displayPortfolioItem", ({ currentTarget }) => {
    const portfolioItemId = $(currentTarget).data("id");
    const index = $(currentTarget).closest("tr").find("th").text();
    displayPortfolioItem(portfolioItemId, index);
  });
  $(document).on("click", ".deletePortfolioItem", async ({ currentTarget }) => {
    const portfolioItemId = $(currentTarget).data("id");
    const name = $(currentTarget).closest("tr").find("td:eq(0)").text();
    const table = $(currentTarget).closest("table").attr("id");
    await deleteObject(portfolioItemId, "PortfolioItem", table, name);
  });
  $(document).on("focus keypress", "#title, #link, #titleEdit, #linkEdit", ({ currentTarget }) => {
    $(`#${$(currentTarget).attr("id")}Error`).hide();
  });
  $(document).on("change", "#type", () => {
    $("#typeError").hide();
  });
  $(document).on("change", "#logo, #logoEdit", (event) => {
    uploadLogo(event);
  });
  $(document).on("click", ".next, .back", ({ currentTarget }) => {
    navigate(currentTarget, "Portfolio");
  });
  $(document).on("click", "#reset", () => {
    clearForm("portfolioItemForm");
  });
  $(document).on("hidden.bs.modal", () => {
    clearForm("portfolioItemEditForm");
  });
});

const savePortfolioItem = async (form) => {
  let errors = [];
  let portfolioItemId, index, oldType, title, link, type, logo;
  if (form === "portfolioItemForm") {
    title = $("#title").val();
    link = $("#link").val();
    type = $("#type").val();
    logo = $("#logo").prop("files")[0];
  } else {
    portfolioItemId = $("#portfolioItemId").val();
    index = $("#index").val();
    oldType = $("#oldType").val();
    title = $("#titleEdit").val();
    link = $("#linkEdit").val();
    type = $("#typeEdit").val();
    logo = $("#logoEdit").prop("files")[0];
  }
  if (form === "portfolioItemForm") {
    if (!validText(title)) {
      errors = [...errors, "title"];
    }
  } else {
    if (!validObjectId(portfolioItemId) || !validText(title)) {
      errors = [...errors, "title"];
    }
  }
  if (!validLink(link)) {
    errors = [...errors, "link"];
  }
  if (!validType(type, constants.PORTFOLIO_ITEM)) {
    errors = [...errors, "type"];
  }
  if ((form === "portfolioItemForm") && !validLogo(logo)) {
    errors = [...errors, "logo"];
  }
  if (!errors.length) {
    clearErrors();
    const url = (form === "portfolioItemForm") ? "/createPortfolioItem" : "/editPortfolioItem";
    const method = (form === "portfolioItemForm") ? "POST" : "PUT";
    let formData = new FormData();
    if (form === "portfolioItemEditForm") {
      formData.append("portfolioItemId", portfolioItemId);
    }
    formData.append("title", title);
    formData.append("link", link);
    formData.append("type", type);
    formData.append("logo", logo);
    const data = { url, method, body: formData };
    try {
      const response = await http(data);
      const { portfolioItem, newLogo, isCreated } = response;
      const content = `<td class="padded">${portfolioItem.title}</td><td class="padded"><a href="${portfolioItem.link}" target="_blank">${portfolioItem.link}</a></td><td class="padded type">${portfolioItem.type}</td><td><img src="${newLogo}" alt="${portfolioItem.logo.name}" class="rounded img-fluid logo" /></td><td class="padded"><i class="fas fa-pen displayPortfolioItem pointer icon" data-id="${portfolioItem._id}"></i><i class="fas fa-trash deletePortfolioItem pointer icon" data-id="${portfolioItem._id}"></i></td>`;
      if (isCreated) {
        $(`#${portfolioItem.type}PortfolioTable tbody`).append(`<tr id="${portfolioItem._id}"><th class="padded">${($(`#${portfolioItem.type}PortfolioTable tbody tr`).length + 1)}</th>${content}</tr>`);
      } else {
        if (portfolioItem.type === oldType) {
          $(`#${portfolioItem._id}`).replaceWith(`<tr id="${portfolioItem._id}"><th class="padded">${index}</th>${content}</tr>`);
        } else {
          removeRow(portfolioItem._id, `${oldType}PortfolioTable`);
          $(`#${portfolioItem.type}PortfolioTable tbody`).append(`<tr id="${portfolioItem._id}"><th class="padded">${($(`#${portfolioItem.type}PortfolioTable tbody tr`).length + 1)}</th>${content}</tr>`);
        }
        $("#portfolioItemEditForm .btn-close").trigger("click");
      }
      clearForm(form);
      $(`#${portfolioItem.type}PortfolioNavTab`).trigger("click");
      displayNotification("Portfolio item", `Portfolio item has been successfully ${(form === "portfolioItemForm") ? "created" : "updated"}!`, true);
    } catch (errors) {
      if (errors instanceof Array) {
        $.each(errors, (index, element) => $(`#${(form === "portfolioItemForm") ? element : `${element}Edit`}Error`).show());
      } else {
        alert(errors);
      }
    }
  } else {
    $.each(errors, (index, element) => $(`#${(form === "portfolioItemForm") ? element : `${element}Edit`}Error`).show());
  }
};

const getPortfolioItem = async (portfolioItemId, callback) => {
  const url = `/getPortfolioItem/${portfolioItemId}`;
  const data = { url };
  try {
    const portfolioItem = await http(data);
    return callback(portfolioItem);
  } catch (errors) {
    alert(errors);
  }
};

const displayPortfolioItem = (portfolioItemId, index) => {
  const modal = new bootstrap.Modal(document.getElementById("portfolioItem"), { backdrop: "static", keyboard: false });
  getPortfolioItem(portfolioItemId, (portfolioItem) => {
    const { _id, type, title, link, logo } = portfolioItem;
    $("#portfolioItemId").val(_id);
    $("#index").val(index);
    $("#oldType").val(type);
    $("#titleEdit").val(title);
    $("#linkEdit").val(link);
    $("#typeEdit").val(type);
    $("#logoEditName").text(logo.name);
    modal.show();
  });
};

const uploadLogo = (event) => {
  const files = event.target.files;
  if (files && files.length) {
    const logo = files[0];
    const element = event.target.id;
    if (logo.type.match("image.*")) {
      $(`#${element}Name`).text(logo.name);
      $(`#${element}Error`).hide();
    } else {
      $(`#${element}`).val("");
      $(`#${element}Name`).text("Upload");
      $(`#${element}Error`).show();
    }
  }
};

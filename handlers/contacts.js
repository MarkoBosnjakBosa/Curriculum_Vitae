import { http } from "../utilities/http.js";
import { deleteObject } from "../utilities/delete.js";
import { displayNotification } from "../utilities/scripts.js";
import constants from "../utilities/constants.js";

$(() => {
  $(document).on("submit", "#contactsForm", async (event) => {
    event.preventDefault();
    await getContacts(1);
  });
  $(document).on("click", ".page", async ({ currentTarget }) => {
    const page = Number($(currentTarget).data("page"));
    await getContacts(page);
  });
  $(document).on("click", ".isAnswered", async ({ currentTarget }) => {
    await answerContact(currentTarget);
  });
  $(document).on("click", ".deleteContact", async ({ currentTarget }) => {
    const contactId = $(currentTarget).data("id");
    const name = $(currentTarget).closest(".contact").find("h5").text();
    await deleteObject(contactId, "Contact", null, name);
    await getContacts(1);
  });
  $(document).on("keydown", "#limit", (event) => {
    if (constants.FORBIDDEN_NUMBER_SYMBOLS.includes(event.key)) {
      event.preventDefault();
    }
  });
});

const getContacts = async (page) => {
  const search = $("#search").val();
  let limit = Number($("#limit").val());
  if (!Number.isInteger(limit) || limit < 1) {
    limit = 1;
    $("#limit").val(1);
  }
  const orderBy = $("#orderBy").val();
  const url = "/getContacts";
  const method = "POST";
  const headers = { "Content-Type": "application/json" };
  const body = JSON.stringify({ search, limit, page, orderBy });
  const data = { url, method, headers, body };
  try {
    const response = await http(data);
    const { contacts, total, pagesNumber, user } = response;
    removeContacts();
    $.each(contacts, (index, contact) => {
      const card = `<div class="card contact"><div class="card-header">${contact.email}<img src="../images/${contact.isGerman ? "german" : "american"}Flag.png" alt="${contact.isGerman ? "German" : "American"} flag" class="img-fluid flag left" /></div><div class="card-body"><h5 class="card-title">${contact.name}</h5><p class="card-text">${contact.message}</p></div><div class="card-footer"><div class="date"><button type="button" class="btn btn-dark">${new Date(contact.date).toLocaleString("de-DE", constants.DATE_TIME_FORMAT)}</button></div><div class="action"><a href="mailto:${contact.email}?subject=${user.firstName} ${user.lastName} - ${new Date(contact.date).toLocaleString(contact.isGerman ? "de-DE" : "en-US", constants.DATE_TIME_FORMAT)}" class="btn btn-primary icon">Reply <i class="fas fa-envelope"></i></a><button type="button" class="btn btn-${contact.isAnswered ? "success" : "danger"} isAnswered icon" contact="${contact._id}" answered="${!contact.isAnswered}"><i class="fas fa-${contact.isAnswered ? "check" : "times"}"></i></button><button type="button" class="btn btn-secondary deleteContact" data-id="${contact._id}"><i class="fas fa-trash"></i></button></div></div></div>`;
      $(".cards").append(card);
		});
		let pages = "";
		if ((page - 1) > 0) {
			pages += `<button type="button" class="btn btn-dark page" data-page="${page - 1}"><i class="fas fa-angle-double-left"></i></button>`;
		}
		pages += `<button type="button" class="btn btn-dark page" data-page="${page}">${page}</button>`;
		if (page < pagesNumber) {
			pages += `<button type="button" class="btn btn-dark page" data-page="${page + 1}"><i class="fas fa-angle-double-right"></i></button>`;
		}
		$(".pages").append(pages);
		$("#total").text(total);
	} catch (errors) {
		alert(errors);
	}
};

const answerContact = async (button) => {
  const contactId = $(button).attr("contact");
  const isAnswered = $(button).attr("answered") === "true";
  const url = "/answerContact";
  const method = "PUT";
  const headers = { "Content-Type": "application/json" };
  const body = JSON.stringify({ contactId, isAnswered });
  const data = { url, method, headers, body };
  try {
    const isAnswered = await http(data);
    if (isAnswered) {
      $(button).attr("answered", "false");
      $(button).removeClass("btn-danger").addClass("btn-success");
      $(button).find("i").removeClass("fa-times").addClass("fa-check");
      displayNotification("Contact", "Contact has been answered!", true);
    } else {
      $(button).attr("answered", "true");
      $(button).removeClass("btn-success").addClass("btn-danger");
      $(button).find("i").removeClass("fa-check").addClass("fa-times");
      displayNotification("Contact", "Contact has not been answered!", false);
    }
  } catch (errors) {
    alert(errors);
  }
};

const removeContacts = () => {
  $(".cards, .pages").empty();
  $("#total").text("");
};

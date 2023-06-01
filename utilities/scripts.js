export const togglePassword = () => {
  const type = $("#password").attr("type");
  switch (type) {
    case "password":
      $("#password").attr("type", "text");
      $("#togglePassword").removeClass("fa-eye-slash").addClass("fa-eye");
      break;
    case "text":
      $("#password").attr("type", "password");
      $("#togglePassword").removeClass("fa-eye").addClass("fa-eye-slash");
      break;
    default:
      break;
  }
};

export const select = (search, orderBy) => {
	let sort = {};
	switch (orderBy) {
		case "asc":
			sort = { date: 1 };
			break;
		case "desc":
			sort = { date: -1 };
			break;
		default:
			sort = { date: -1 };
	}
	const query = search ? { $or: [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }, { subject: { $regex: search, $options: "i" } }, { message: { $regex: search, $options: "i" } }] } : {};
	return { query, sort };
};

export const createImageObject = (image, readImage) => {
  const encodedImage = readImage.toString("base64");
  return { name: image.originalFilename, mimeType: image.mimetype, buffer: Buffer.from(encodedImage, "base64") };
};

export const displayNotification = (title, message, isSuccess) => {
  $(".toast-title").text(title);
  $(".toast-body").text(message);
  if (isSuccess) {
    $(".toast-body").removeClass("error").addClass("success");
  } else {
    $(".toast-body").removeClass("success").addClass("error");
  }
  $(".toast").show();
};

export const navigate = (currentTarget, item) => {
  const tab = $(currentTarget).data("tab");
  $(`#${tab}${item}NavTab`).trigger("click");
}; 

export const removeRow = (id, table) => {
  $(`#${id}`).remove();
  if (table) {
    if (table.includes("Resume")) {
      $(`#empty_${id}`).remove();
      $(`#${table} tbody tr:has(th)`).each((index, element) => $(element).find("th").text(++index));
    } else {
      $(`#${table} tbody tr`).each((index, element) => $(element).find("th").text(++index));
    }
  }
};

export const clearForm = (form) => {
  if (form === "contactForm") {
    $(`#${form} :input`).not(":submit, :hidden").val("");
  } else {
    $(`#${form} :input`).not(":submit, :reset").val("");
    $("#logo, #logoEdit").val("");
    $("#logoName, #logoEditName").text("Upload");
  }
  clearErrors();
};

export const clearErrors = () => {
  $("[id$='Error']").hide();
};

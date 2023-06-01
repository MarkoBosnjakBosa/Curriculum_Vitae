import { http } from "./http.js";
import { displayNotification, removeRow } from "./scripts.js";
import { validName } from "./validations.js";

export const deleteObject = async (id, type, table, name = "") => {
  const information = (type === "ResumeItem") ? "Resume item" : (type === "PortfolioItem") ? "Portfolio item" : type;
  const confirmed = confirm(`Delete ${(type === "ResumeItem") ? "selected " : ""}${information.toLowerCase()}${validName(name) ? ` ${name}` : ""}?`);
  if (confirmed) {
    const url = `/delete${type}/${id}`;
    const method = "DELETE";
    const data = { url, method };
    try {
      await http(data);
      if (table) {
        removeRow(id, table);
      }
      displayNotification(information, `${information} has been successfully deleted!`, true);
    } catch (errors) {
      alert(errors);
    }
  }
};

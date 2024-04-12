import { validText, validArray } from "../../utilities/validations";

export const convertString = (string, capitalize) => {
  if (validText(string)) return `${capitalize ? string.charAt(0).toUpperCase() : string.charAt(0).toLowerCase()}${string.slice(1)}`;
  else return "";
};

export const loadScript = (url) => {
  const scripts = document.getElementsByTagName("script");
  let scriptFound = false;
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].src === url) {
      scriptFound = true;
      break;
    }
  }
  if (!scriptFound) {
    const script = document.createElement("script");
    script.setAttribute("src", url);
    document.head.appendChild(script);
  }
};

export const displayReCaptcha = (type) => {
  const reCaptchas = document.getElementsByClassName("grecaptcha-badge");
  if (validArray(reCaptchas)) {
    const reCaptcha = reCaptchas[0];
    if (type) reCaptcha.style.visibility = "visible";
    else reCaptcha.style.visibility = "hidden";
  }
};

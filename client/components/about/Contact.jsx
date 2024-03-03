import { useState, useEffect, forwardRef } from "react";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import { get } from "../../utilities/language";
import { getString } from "../../utilities/i18n";
import { loadScript, displayReCaptcha } from "../../utilities/scripts";
import { validText, validEmail } from "../../../utilities/validations";
import Link from "../actions/Link";
import TextLayout from "../layouts/TextLayout";
import NotificationLayout from "../layouts/NotificationLayout";
import defaultStyle from "../../App.module.css";
import style from "./About.module.css";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import { Person, Email, Subject, Check } from "@mui/icons-material";

const Contact = forwardRef((props, ref) => {
  const { user } = props;
  const { isGerman } = get();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    loadScript(`https://www.google.com/recaptcha/api.js?render=${process.env.RECAPTCHA_v3_SITE_KEY}`);
    displayReCaptcha(true);
    return () => displayReCaptcha(false);
  }, []);

  const { isLoading, error, sendRequest } = useHttp();
  const { value: name, isValid: nameIsValid, error: nameError, changeValue: changeName, blur: blurName, resetValue: resetName } = useInput(validText);
  const { value: email, isValid: emailIsValid, error: emailError, changeValue: changeEmail, blur: blurEmail, resetValue: resetEmail } = useInput(validEmail);
  const { value: subject, isValid: subjectIsValid, error: subjectError, changeValue: changeSubject, blur: blurSubject, resetValue: resetSubject } = useInput(validText);
  const { value: message, isValid: messageIsValid, error: messageError, changeValue: changeMessage, blur: blurMessage, resetValue: resetMessage } = useInput(validText);

  const formIsValid = nameIsValid && emailIsValid && subjectIsValid && messageIsValid;

  const completeSaving = () => {
    resetName();
    resetEmail();
    resetSubject();
    resetMessage();
    setIsSaved(true);
  };

  const saveContact = (event) => {
    event.preventDefault();
    if (!formIsValid) return;

    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(process.env.RECAPTCHA_v3_SITE_KEY, { action: "submit" }).then((reCaptchaToken) => {
        sendRequest(
          {
            url: `${window.location.origin}/saveContact`,
            method: "POST",
            body: JSON.stringify({ name, email, subject, message, isGerman, reCaptchaToken })
          },
          completeSaving
        );
      });
    });
  };

  return (
    <div ref={ref} className={`${defaultStyle.relative} ${style.contact}`}>
      <div className={style.wrapper}>
        <div className={`${defaultStyle.auto} ${style.data}`}>
          <div className={`${defaultStyle.center} ${defaultStyle.fontSize} ${defaultStyle.bold} ${style.title}`}>{getString("cv.sections.contact")}</div>
          <Grid container className={defaultStyle.text}>
            <Grid xs={12} sm={12} md={6} lg={6} className={`${style.paddingLeft} ${style.padding}`}>
              <div className={style.marginBottom}><strong>{getString("cv.titles.contact")}</strong></div>
              <form onSubmit={saveContact} autoComplete="off" noValidate>
                <TextLayout type="text" value={name} label={getString("cv.labels.name")} error={nameError} onChange={changeName} onBlur={blurName} required><Person /></TextLayout>
                <TextLayout type="text" value={email} label={getString("cv.labels.email")} error={emailError} onChange={changeEmail} onBlur={blurEmail} required><Email /></TextLayout>
                <TextLayout type="text" value={subject} label={getString("cv.labels.subject")} error={subjectError} onChange={changeSubject} onBlur={blurSubject} required><Subject /></TextLayout>
                <TextLayout type="text" value={message} label={getString("cv.labels.message")} error={messageError} onChange={changeMessage} onBlur={blurMessage} multiline required></TextLayout>
                <div className={defaultStyle.alignRight}>
                  <Button type="submit" variant="contained" color="success" endIcon={<Check />} disabled={!formIsValid || isLoading}>{isLoading ? getString("cv.texts.loading") : getString("cv.buttons.submit")}</Button>
                </div>
              </form>
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={6} className={style.paddingLeft}>
              <div className={style.newLine}><strong>{getString("cv.information.address")}</strong></div>
              <div className={style.information}><Link value={isGerman ? user.address_de : user.address} customization={style.green} /></div>
              <div className={style.newLine}><strong>{getString("cv.labels.email")}</strong></div>
              <div className={style.information}><Link value={user.email} customization={style.green} /></div>
              <div className={style.newLine}><strong>{getString("cv.information.telephone")}</strong></div>
              <div className={style.information}><Link value={user.telephone} customization={style.green} /></div>
            </Grid>
          </Grid>
          {error && (
            <NotificationLayout isError>{error}</NotificationLayout>
          )}
          {isSaved && (
            <NotificationLayout onClose={() => setIsSaved(false)}>
              <div>{getString("cv.paragraphs.fourth.part")}</div>
              <div>{getString("cv.paragraphs.fifth.part")}</div>
            </NotificationLayout>
          )}
        </div>
      </div>
    </div>
  );
});

export default Contact;

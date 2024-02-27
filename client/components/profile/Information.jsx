import { useEffect } from "react";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import { validName, validEmail, validTelephone, validDate, validText, validLink } from "../../../utilities/validations";
import TextLayout from "../layouts/TextLayout";
import NotificationLayout from "../layouts/NotificationLayout";
import style from "../../App.module.css";
import { Button } from "@mui/material";
import { Person, Edit, Email, PhoneIphone, Cake, NearMe, Language, Computer, LinkedIn, Share, GitHub, SaveAlt } from "@mui/icons-material";

const Information = (props) => {
  const { user, onEdit } = props;

  const { isLoading, error, sendRequest } = useHttp();
  const { value: firstName, isValid: firstNameIsValid, error: firstNameError, changeValue: changeFirstName, initializeValue: initializeFirstName, blur: blurFirstName } = useInput(validName);
  const { value: lastName, isValid: lastNameIsValid, error: lastNameError, changeValue: changeLastName, initializeValue: initializeLastName, blur: blurLastName } = useInput(validName);
  const { value: email, isValid: emailIsValid, error: emailError, changeValue: changeEmail, initializeValue: initializeEmail, blur: blurEmail } = useInput(validEmail);
  const { value: telephone, isValid: telephoneIsValid, error: telephoneError, changeValue: changeTelephone, initializeValue: initializeTelephone, blur: blurTelephone } = useInput(validTelephone);
  const { value: birthday, isValid: birthdayIsValid, error: birthdayError, changeValue: changeBirthday, initializeValue: initializeBirthday, blur: blurBirthday } = useInput((value) => validDate(value, false));
  const { value: birthday_de, isValid: birthday_deIsValid, error: birthday_deError, changeValue: changeBirthday_de, initializeValue: initializeBirthday_de, blur: blurBirthday_de } = useInput((value) => validDate(value, true));
  const { value: address, isValid: addressIsValid, error: addressError, changeValue: changeAddress, initializeValue: initializeAddress, blur: blurAddress } = useInput(validText);
  const { value: address_de, isValid: address_deIsValid, error: address_deError, changeValue: changeAddress_de, initializeValue: initializeAddress_de, blur: blurAddress_de } = useInput(validText);
  const { value: languages, isValid: languagesIsValid, error: languagesError, changeValue: changeLanguages, initializeValue: initializeLanguages, blur: blurLanguages } = useInput(validText);
  const { value: languages_de, isValid: languages_deIsValid, error: languages_deError, changeValue: changeLanguages_de, initializeValue: initializeLanguages_de, blur: blurLanguages_de } = useInput(validText);
  const { value: profession, isValid: professionIsValid, error: professionError, changeValue: changeProfession, initializeValue: initializeProfession, blur: blurProfession } = useInput(validText);
  const { value: profession_de, isValid: profession_deIsValid, error: profession_deError, changeValue: changeProfession_de, initializeValue: initializeProfession_de, blur: blurProfession_de } = useInput(validText);
  const { value: linkedIn, isValid: linkedInIsValid, error: linkedInError, changeValue: changeLinkedIn, initializeValue: initializeLinkedIn, blur: blurLinkedIn } = useInput(validLink);
  const { value: xing, isValid: xingIsValid, error: xingError, changeValue: changeXing, initializeValue: initializeXing, blur: blurXing } = useInput(validLink);
  const { value: gitHub, isValid: gitHubIsValid, error: gitHubError, changeValue: changeGitHub, initializeValue: initializeGitHub, blur: blurGitHub } = useInput(validLink);

  useEffect(() => {
    initializeFirstName(user.firstName);
    initializeLastName(user.lastName);
    initializeEmail(user.email);
    initializeTelephone(user.telephone);
    initializeBirthday(user.birthday);
    initializeBirthday_de(user.birthday_de);
    initializeAddress(user.address);
    initializeAddress_de(user.address_de);
    initializeLanguages(user.languages);
    initializeLanguages_de(user.languages_de);
    initializeProfession(user.profession);
    initializeProfession_de(user.profession_de);
    initializeLinkedIn(user.linkedIn);
    initializeXing(user.xing);
    initializeGitHub(user.gitHub);
  }, []);

  const formIsValid = firstNameIsValid && lastNameIsValid && emailIsValid && telephoneIsValid && birthdayIsValid && birthday_deIsValid && addressIsValid && address_deIsValid && languagesIsValid && languages_deIsValid && professionIsValid && profession_deIsValid && linkedInIsValid && xingIsValid && gitHubIsValid;

  const completeEdit = (data) => onEdit(data);

  const editProfile = (event) => {
    event.preventDefault();
    if (!formIsValid) return;

    sendRequest(
      {
        url: `${window.location.origin}/editProfile/${user._id}`,
        method: "PUT",
        body: JSON.stringify({ firstName, lastName, email, telephone, birthday, birthday_de, address, address_de, languages, languages_de, profession, profession_de, linkedIn, xing, gitHub }),
        authentication: true
      },
      completeEdit
    );
  };

  return (
    <form className={style.marginBottom} onSubmit={editProfile} autoComplete="off" noValidate>
      {error && (
        <NotificationLayout isError>{error}</NotificationLayout>
      )}
      <TextLayout type="text" value={user.username} label="Username" disabled><Person /></TextLayout>
      <TextLayout type="text" value={firstName} label="First name" error={firstNameError} onChange={changeFirstName} onBlur={blurFirstName} required><Edit /></TextLayout>
      <TextLayout type="text" value={lastName} label="Last name" error={lastNameError} onChange={changeLastName} onBlur={blurLastName} required><Edit /></TextLayout>
      <TextLayout type="text" value={email} label="Email" error={emailError} onChange={changeEmail} onBlur={blurEmail} required><Email /></TextLayout>
      <TextLayout type="text" value={telephone} label="Telephone" error={telephoneError} onChange={changeTelephone} onBlur={blurTelephone} required><PhoneIphone /></TextLayout>
      <TextLayout type="text" value={birthday} label="Birthday" error={birthdayError} onChange={changeBirthday} onBlur={blurBirthday} required><Cake /></TextLayout>
      <TextLayout type="text" value={birthday_de} label="Birthday DE" error={birthday_deError} onChange={changeBirthday_de} onBlur={blurBirthday_de} required><Cake /></TextLayout>
      <TextLayout type="text" value={address} label="Address" error={addressError} onChange={changeAddress} onBlur={blurAddress} required><NearMe /></TextLayout>
      <TextLayout type="text" value={address_de} label="Address DE" error={address_deError} onChange={changeAddress_de} onBlur={blurAddress_de} required><NearMe /></TextLayout>
      <TextLayout type="text" value={languages} label="Languages" error={languagesError} onChange={changeLanguages} onBlur={blurLanguages} required><Language /></TextLayout>
      <TextLayout type="text" value={languages_de} label="Languages DE" error={languages_deError} onChange={changeLanguages_de} onBlur={blurLanguages_de} required><Language /></TextLayout>
      <TextLayout type="text" value={profession} label="Profession" error={professionError} onChange={changeProfession} onBlur={blurProfession} required><Computer /></TextLayout>
      <TextLayout type="text" value={profession_de} label="Profession DE" error={profession_deError} onChange={changeProfession_de} onBlur={blurProfession_de} required><Computer /></TextLayout>
      <TextLayout type="text" value={linkedIn} label="LinkedIn" error={linkedInError} onChange={changeLinkedIn} onBlur={blurLinkedIn} required><LinkedIn /></TextLayout>
      <TextLayout type="text" value={xing} label="Xing" error={xingError} onChange={changeXing} onBlur={blurXing} required><Share /></TextLayout>
      <TextLayout type="text" value={gitHub} label="GitHub" error={gitHubError} onChange={changeGitHub} onBlur={blurGitHub} required><GitHub /></TextLayout>
      <div className={style.alignRight}>
        <Button type="submit" variant="contained" endIcon={<SaveAlt />} disabled={!formIsValid || isLoading}>{isLoading ? "Loading..." : "Save"}</Button>
      </div>
    </form>
  );
};

export default Information;

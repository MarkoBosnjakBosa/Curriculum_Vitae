import { useState } from "react";
import { validText } from "../../../utilities/validations";
import constants from "../../../utilities/constants";
import NewReference from "./NewReference";
import ReferencesTable from "./ReferencesTable";
import NotificationLayout from "../layouts/NotificationLayout";
import defaultStyle from "../../App.module.css";
import { Button } from "@mui/material";
import { East, West } from "@mui/icons-material";

const References = (props) => {
  const [certifications, setCertifications] = useState(props.certifications);
  const [customers, setCustomers] = useState(props.customers);
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState("");

  const completeCreation = (newReference, isDisplayed = null) => {
    if (newReference.type === constants.CERTIFICATION_REFERENCE) {
      setCertifications((previousCertifications) => [...previousCertifications, newReference]);
      setStep(0);
    } else {
      setCustomers((previousCustomers) => [...previousCustomers, newReference]);
      setStep(1);
    }
    if (isDisplayed) displayMessage(newReference.title, constants.CREATED_ACTION);
  };

  const completeEdit = (editedReference, oldType) => {
    if (editedReference.type === oldType) {
      if (editedReference.type === constants.CERTIFICATION_REFERENCE) setCertifications((previousCertifications) => previousCertifications.map((certification) => (certification._id === editedReference._id) ? editedReference : certification));
      else setCustomers((previousCustomers) => previousCustomers.map((customer) => (customer._id === editedReference._id) ? editedReference : customer));
    } else {
      completeDeletion(editedReference._id, oldType);
      completeCreation(editedReference);
    }
    displayMessage(editedReference.title, constants.EDITED_ACTION);
  };

  const completeDeletion = (referenceId, type, title = null) => {
    if (type === constants.CERTIFICATION_REFERENCE) setCertifications((previousCertifications) => previousCertifications.filter((certification) => certification._id !== referenceId));
    else setCustomers((previousCustomers) => previousCustomers.filter((customer) => customer._id !== referenceId));
    if (validText(title)) displayMessage(title, constants.DELETED_ACTION);
  };

  const displayMessage = (title, action) => setMessage(`Reference ${title} has been successfully ${action}!`);

  return (
    <>
      <h1 className={defaultStyle.center}>References</h1>
      <NewReference onCompleteCreation={completeCreation} />
      {(step === 0) ? (
        <>
          <ReferencesTable references={certifications} type={constants.CERTIFICATION_REFERENCE} onCompleteEdit={completeEdit} onCompleteDeletion={completeDeletion} />
          <div className={`${defaultStyle.auto} ${defaultStyle.alignRight} ${defaultStyle.marginTop} ${defaultStyle.marginBottom} ${defaultStyle.bigContent}`}>
            <Button type="button" variant="contained" onClick={() => setStep(1)}><East /></Button>
          </div>
        </>
      ) : (
        <>
          <ReferencesTable references={customers} type={constants.CUSTOMER_REFERENCE} onCompleteEdit={completeEdit} onCompleteDeletion={completeDeletion} />
          <div className={`${defaultStyle.auto} ${defaultStyle.marginTop} ${defaultStyle.marginBottom} ${defaultStyle.bigContent}`}>
            <Button type="button" variant="contained" onClick={() => setStep(0)}><West /></Button>
          </div>
        </>
      )}
      {validText(message) && (
        <NotificationLayout onClose={() => setMessage("")}>{message}</NotificationLayout>
      )}
    </>
  );
};

export default References;

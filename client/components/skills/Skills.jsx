import { useState } from "react";
import { validText, validArray } from "../../../utilities/validations";
import constants from "../../../utilities/constants";
import NewSkill from "./NewSkill";
import Skill from "./Skill";
import TableLayout from "../layouts/TableLayout";
import NoValuesLayout from "../layouts/NoValuesLayout";
import NotificationLayout from "../layouts/NotificationLayout";
import style from "../../App.module.css";

const Skills = (props) => {
  const [skills, setSkills] = useState(props.skills);
  const [message, setMessage] = useState("");

  const completeCreation = (newSkill) => {
    setSkills((previousSkills) => [...previousSkills, newSkill]);
    displayMessage(newSkill.title, constants.CREATED_ACTION);
  };

  const completeEdit = (editedSkill) => {
    setSkills((previousSkills) => previousSkills.map((skill) => (skill._id === editedSkill._id) ? editedSkill : skill));
    displayMessage(editedSkill.title, constants.EDITED_ACTION);
  };

  const completeDeletion = (skillId, title) => {
    setSkills((previousSkills) => previousSkills.filter((skill) => skill._id !== skillId));
    displayMessage(title, constants.DELETED_ACTION);
  };

  const displayMessage = (title, action) => setMessage(`Skill ${title} has been successfully ${action}!`);

  return (
    <>
      <h1 className={style.center}>Skills</h1>
      <NewSkill onCompleteCreation={completeCreation} />
      {validArray(skills) ? (
        <TableLayout labels={constants.SKILLS_LABELS} customization={`${style.auto} ${style.mediumContent} ${style.marginBottom}`}>
          {skills.map((skill, index) => (
            <Skill key={`${skill._id}_${new Date().getTime()}`} skill={skill} index={++index} onCompleteEdit={completeEdit} onCompleteDeletion={completeDeletion} />
          ))}
        </TableLayout>
      ) : (
        <NoValuesLayout message="No skills found!" />
      )}
      {validText(message) && (
        <NotificationLayout onClose={() => setMessage("")}>{message}</NotificationLayout>
      )}
    </>
  );
};

export default Skills;

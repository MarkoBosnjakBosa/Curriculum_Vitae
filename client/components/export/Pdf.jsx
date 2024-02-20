import { get } from "../../utilities/language";
import { getString } from "../../utilities/i18n";
import constants from "../../../utilities/constants";
import { Document, Page, View, Text, Image, Link, Font, StyleSheet } from "@react-pdf/renderer";

const Pdf = (props) => {
  const { user, skills, experienceResume, educationResume, certifications } = props;
  const { isGerman } = get();

  Font.register({ family: "Rokkitt", fonts: [{ src: constants.REGULAR_FONT }, { src: constants.BOLD_FONT, fontWeight: 700 }, { src: constants.ITALIC_FONT, fontStyle: "italic" }] });
  const style = StyleSheet.create({
    page: { fontFamily: "Rokkitt" },
    profile: { padding: "25px 35px 25px 35px", borderBottom: "2px solid #cf8a05", backgroundColor: "#ededed" },
    avatar: { height: "80px", width: "80px", borderRadius: "50%", marginRight: "20px" },
    name: { fontWeight: 700, fontSize: "22px" },
    contact: { fontSize: "12px" },
    borderTop: { borderTop: "1px solid #dedede" },
    section: { padding: "0px 15px 0px 15px" },
    firstColumn: { width: isGerman ? "30%" : "25%", color: "#cf8a05" },
    secondColumn: { width: isGerman ? "70%" : "75%" },
    childrenColumns: { flexWrap: "wrap" },
    childColumn: { width: "33%" },
    title: { fontSize: "20px" },
    duration: { fontSize: "13px", marginBottom: "5px" },
    paddingTop: { paddingTop: "20px" },
    paddingBottom: { paddingBottom: "20px" },
    text: { fontSize: "16px" },
    row: { flexDirection: "row" },
    flex: { flex: 1 },
    italic: { fontStyle: "italic" },
    right: { textAlign: "right" },
    marginTop: { marginTop: "3px" },
    noLink: { color: "#000", textDecoration: "none" }
  });

  return (
    <Document title={getString("cv.pdf.file.name")} author={`${user.firstName} ${user.lastName}`}>
      <Page size="A4" style={style.page}>
        <View style={[style.profile, style.row]}>
          <Image src={user.avatar.data} style={style.avatar} />
          <View>
            <Text style={style.name}>{user.firstName} {user.lastName}</Text>
            <Text style={style.text}>{isGerman ? user.profession_de : user.profession}</Text>
            <Text style={[style.text, style.marginTop]}>{isGerman ? user.birthday_de : user.birthday}</Text>
          </View>
          <View style={style.flex}>
            <Text style={[style.contact, style.right]}>+{user.telephone}</Text>
            <Link src={`mailto:${user.email}`} style={[style.contact, style.right, style.noLink, style.marginTop]}>{user.email}</Link>
            <Text style={[style.contact, style.right, style.marginTop]}>{isGerman ? user.address_de : user.address}</Text>
            <Link src={window.location.origin} style={[style.contact, style.right, style.noLink, style.marginTop]}>{window.location.origin}</Link>
          </View>
        </View>
        <View style={style.section}>
          <View wrap={false} style={[style.paddingTop, style.row]}>
            <Text style={[style.firstColumn, style.italic, style.title]}>{getString("cv.sections.experience")}</Text>
            <View style={style.secondColumn}>
              {experienceResume.map((resumeItem) => (
                <View key={resumeItem._id} style={style.paddingBottom}>
                  <Text style={style.title}>{`${isGerman ? resumeItem.title_de : resumeItem.title} ${getString("cv.texts.at")} ${isGerman ? resumeItem.workPlace_de : resumeItem.workPlace}`}</Text>
                  <Text style={[style.duration, style.italic]}>{isGerman ? resumeItem.duration_de : resumeItem.duration}</Text>
                  <Text style={style.text}>{isGerman ? resumeItem.description_de : resumeItem.description}</Text>
                </View>
              ))}
            </View>
          </View>
          <View wrap={false} style={[style.paddingTop, style.borderTop, style.row]}>
            <Text style={[style.firstColumn, style.italic, style.title]}>{getString("cv.sections.education")}</Text>
            <View style={style.secondColumn}>
              {educationResume.map((resumeItem) => (
                <View key={resumeItem._id} style={style.paddingBottom}>
                  <Text style={style.title}>{`${isGerman ? resumeItem.title_de : resumeItem.title} ${getString("cv.texts.at")} ${isGerman ? resumeItem.workPlace_de : resumeItem.workPlace}`}</Text>
                  <Text style={[style.duration, style.italic]}>{isGerman ? resumeItem.duration_de : resumeItem.duration}</Text>
                  <Text style={style.text}>{isGerman ? resumeItem.description_de : resumeItem.description}</Text>
                </View>
              ))}
            </View>
          </View>
          <View wrap={false} style={[style.paddingTop, style.paddingBottom, style.borderTop, style.row]}>
            <Text style={[style.firstColumn, style.italic, style.title]}>{getString("cv.sections.skills")}</Text>
            <View style={[style.secondColumn, style.row, style.childrenColumns]}>
              {skills.map((skill) => (
                <Text key={skill._id} style={[style.childColumn, style.text]}>{skill.title}</Text>
              ))}
            </View>
          </View>
          <View wrap={false} style={[style.paddingTop, style.paddingBottom, style.borderTop, style.row]}>
            <Text style={[style.firstColumn, style.italic, style.title]}>{getString("cv.sections.certifications")}</Text>
            <View style={style.secondColumn}>
              {certifications.map((certification) => (
                <Text key={certification._id} style={style.text}>{isGerman ? certification.title_de : certification.title}</Text>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Pdf;

import { get } from "./language.js";

export const getString = (key) => {
  const { isGerman } = get();
  if (isGerman) return internationalization[key]["de"];
  else return internationalization[key]["en"];
};

const internationalization = {
  "cv.titles.information": { en: "Information", de: "Informationen" },
  "cv.titles.contact": { en: "Feel free to contact me", de: "Kontaktieren Sie mich gerne" },
  "cv.information.birthday": { en: "Birthday", de: "Geburtstag" },
  "cv.information.telephone": { en: "Telephone", de: "Telefon" },
  "cv.information.address": { en: "Address", de: "Adresse" },
  "cv.information.languages": { en: "Languages", de: "Sprachen" },
  "cv.sections.about": { en: "About", de: "Über mich" },
  "cv.sections.skills": { en: "Skills", de: "Fähigkeiten" },
  "cv.sections.portfolio": { en: "Portfolio", de: "Portfolio" },
  "cv.sections.experience": { en: "Experience", de: "Berufserfahrung" },
  "cv.sections.education": { en: "Education", de: "Ausbildung" },
  "cv.sections.certifications": { en: "Certifications", de: "Zertifizierungen" },
  "cv.sections.customers": { en: "Customers", de: "Kunden" },
  "cv.sections.contact": { en: "Contact", de: "Kontakt" },
  "cv.projects.work": { en: "Work project", de: "Arbeitsprojekt" },
  "cv.projects.personal": { en: "Personal project", de: "Persönlices Projekt" },
  "cv.projects.academic": { en: "Academic project", de: "Akademisches Projekt" },
  "cv.labels.name": { en: "Name", de: "Name" },
  "cv.labels.email": { en: "Email", de: "Email" },
  "cv.labels.subject": { en: "Subject", de: "Betreff" },
  "cv.labels.message": { en: "Your message", de: "Ihre Nachricht" },
  "cv.buttons.pdf.download": { en: "Download CV", de: "Lebenslauf" },
  "cv.buttons.submit": { en: "Submit", de: "Senden" },
  "cv.pdf.file.name": { en: "Curriculum Vitae", de: "Lebenslauf" },
  "cv.paragraphs.first.part": { en: "Hello! I am ", de: "Hallo! Ich bin " },
  "cv.paragraphs.second.part": { en: "I enjoy turning complex problems into well-designed and user-friendly applications, while tending to keep my code clean and organized. I have a lot of experience in working with Atlassian products (Jira, Confluence, JSM, Bitbucket). I like building web systems in my free time, that you can see on my ", de: "Ich verwandle gerne komplexe Probleme in gut gestaltete und benutzerfreundliche Anwendungen und tendiere dazu, meinen Code sauber und organisiert zu halten. Ich habe viel Erfahrung in der Arbeit mit Atlassian Produkten (Jira, Confluence, JSM, Bitbucket). In meiner Freizeit baue ich gerne Websysteme, die Sie auf meinem " },
  "cv.paragraphs.third.part": { en: " account. I have a Master's degree in Computer Science.", de: "-Konto sehen können. Ich habe einen Masterabschluss in Computer Science." },
  "cv.paragraphs.fourth.part": { en: "Thank you for getting in touch.", de: "Vielen Dank für Ihre Kontaktaufnahme." },
  "cv.paragraphs.fifth.part": { en: "I will contact you as soon as possible.", de: "Ich werde mich so bald wie möglich bei Ihnen melden." },
  "cv.texts.at": { en: "at", de: "bei" },
  "cv.texts.loading": { en: "Loading...", de: "Laden..." },
  "cv.texts.page.not.found": { en: "Page not found!", de: "Seite nicht gefunden!" },
  "cv.texts.page.not.available": { en: "The page is not available at the moment!", de: "Die Seite ist zur Zeit nicht verfügbar!" },
  "cv.texts.validation": { en: "Check values: ", de: "Prüfen Sie die Werte: " }
};

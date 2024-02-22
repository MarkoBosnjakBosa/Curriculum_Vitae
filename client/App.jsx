import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import AboutPage, { loader as aboutLoader } from "./pages/AboutPage";
import LoginPage, { loader as loginLoader } from "./pages/LoginPage";
import AuthenticationPage, { loader as authenticationLoader } from "./pages/AuthenticationPage";
import OverviewPage, { loader as overviewLoader } from "./pages/OverviewPage";
import ProfilePage, { loader as profileLoader } from "./pages/ProfilePage";
import PasswordPage, { loader as passwordLoader } from "./pages/PasswordPage";
import SetupPage, { loader as setupLoader } from "./pages/SetupPage";
import SkillsPage, { loader as skillsLoader } from "./pages/SkillsPage";
import PortfolioPage, { loader as portfolioLoader } from "./pages/PortfolioPage";
import ResumePage, { loader as resumeLoader } from "./pages/ResumePage";
import ReferencesPage, { loader as referencesLoader } from "./pages/ReferencesPage";
import ContactsPage, { loader as contactsLoader } from "./pages/ContactsPage";
import PageNotFound from "./pages/PageNotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<AboutPage />} loader={aboutLoader} />
      <Route path="/login" element={<LoginPage />} loader={loginLoader} />
      <Route path="/authentication" element={<AuthenticationPage />} loader={authenticationLoader} />
      <Route path="/overview" element={<OverviewPage />} loader={overviewLoader} />
      <Route path="/profile" element={<ProfilePage />} loader={profileLoader} />
      <Route path="/password" element={<PasswordPage />} loader={passwordLoader} />
      <Route path="/setup" element={<SetupPage />} loader={setupLoader} />
      <Route path="/skills" element={<SkillsPage />} loader={skillsLoader} />
      <Route path="/portfolio" element={<PortfolioPage />} loader={portfolioLoader} />
      <Route path="/resume" element={<ResumePage />} loader={resumeLoader} />
      <Route path="/references" element={<ReferencesPage />} loader={referencesLoader} />
      <Route path="/contacts" element={<ContactsPage />} loader={contactsLoader} />
      <Route path="/*" element={<PageNotFound />} />
    </Route>
  )
);
  
const App = () => <RouterProvider router={router} />;

export default App;

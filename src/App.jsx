import { Routes, Route } from "react-router-dom";

// ===== AUTH & DASHBOARD =====
import Signup from "./Signup";
import Login from "./Login";
import AdminDashboard from "./AdminDashboard";
import GuardDashboard from "./GuardDashboard";

// ===== ADMIN MODULES =====
import AdminAnnouncements from "./AdminAnnouncements";
import AdminQuizBuilder from "./AdminQuizBuilder";
import AdminTasks from "./AdminTasks";
import AdminDutyScheduler from "./AdminDutyScheduler";
import AdminIncidentView from "./AdminIncidentView";
import AdminAttendance from "./AdminAttendance";
import AdminTrainingUpload from "./AdminTrainingUpload"; // ✅ Added

// ===== GUARD MODULES =====
import GuardAnnouncements from "./GuardAnnouncements";
import GuardQuiz from "./GuardQuiz";
import GuardTasks from "./GuardTasks";
import GuardSchedule from "./GuardSchedule";
import GuardIncident from "./GuardIncident";
import GuardAttendance from "./GuardAttendance";
import GuardTrainingVideos from "./GuardTrainingVideos"; // ✅ Added

// ===== OTHER PAGES =====
import News from "./news";
import Rules from "./rules";
import Contact from "./contact";
import SupervisorRules from "./supervisorrule";

export default function App() {
  return (
    <>
      <Routes>
        {/* ===== AUTH ROUTES ===== */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* ===== DASHBOARDS ===== */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/guard" element={<GuardDashboard />} />

        {/* ===== ADMIN ROUTES ===== */}
        <Route path="/admin/announcements" element={<AdminAnnouncements />} />
        <Route path="/admin/quiz-builder" element={<AdminQuizBuilder />} />
        <Route path="/tasks" element={<AdminTasks />} />
        <Route path="/schedule" element={<AdminDutyScheduler />} />
        <Route path="/admin/incidents" element={<AdminIncidentView />} />
        <Route path="/attendance" element={<AdminAttendance />} />
        <Route path="/admin/training-upload" element={<AdminTrainingUpload />} /> {/* ✅ Training upload for admin */}

        {/* ===== GUARD ROUTES ===== */}
        <Route path="/announcements" element={<GuardAnnouncements />} />
        <Route path="/quiz" element={<GuardQuiz />} />
        <Route path="/guard-tasks" element={<GuardTasks />} />
        <Route path="/guard-schedule" element={<GuardSchedule />} />
        <Route path="/guard-incident" element={<GuardIncident />} />
        <Route path="/guard-attendance" element={<GuardAttendance />} />
        <Route path="/guard/training-videos" element={<GuardTrainingVideos />} /> {/* ✅ Training watch page */}

        {/* ===== COMMON INFORMATION PAGES ===== */}
        <Route path="/news" element={<News />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/supervisorrule" element={<SupervisorRules />} />
      </Routes>
    </>
  );
}

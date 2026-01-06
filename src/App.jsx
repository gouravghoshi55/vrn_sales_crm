import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ChannelPartner from "./pages/ChannelPartner";
import CPOutgoing from "./pages/CPOutgoing";
import Process from "./pages/Process";
import PrivateRoute from "./routes/PrivateRoute";
import CallToBroker from "./pages/CallToBroker";
import Followup from "./pages/Followup";
import Meetings from "./pages/Meetings";
import NewProjectProcess from "./pages/NewProjectProcess";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/channel-partner"
        element={
          <PrivateRoute>
            <ChannelPartner />
          </PrivateRoute>
        }
      />

      <Route
        path="/channel-partner/cp-outgoing"
        element={
          <PrivateRoute>
            <CPOutgoing />
          </PrivateRoute>
        }
      />

      {/* Keep this route — it's currently used by many users / old bookmarks */}
      <Route
        path="/channel-partner/cp-outgoing/process"
        element={
          <PrivateRoute>
            <Process />
          </PrivateRoute>
        }
      />

      {/* These three paths are WORKING right now – do NOT change them */}
      <Route
        path="/process/call-to-broker"
        element={
          <PrivateRoute>
            <CallToBroker />
          </PrivateRoute>
        }
      />

      <Route
        path="/process/followup"
        element={
          <PrivateRoute>
            <Followup />
          </PrivateRoute>
        }
      />

      <Route
        path="/process/meetings"
        element={
          <PrivateRoute>
            <Meetings />
          </PrivateRoute>
        }
      />

      {/* New project development – already working */}
      <Route
        path="/new-project-development"
        element={
          <PrivateRoute>
            <NewProjectProcess />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
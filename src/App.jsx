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

      <Route
        path="/channel-partner/cp-outgoing/process"
        element={
          <PrivateRoute>
            <Process />
          </PrivateRoute>
        }
      />

      {/* New 3-step flow */}
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
  path="/new-project-development"
  element={
    <PrivateRoute>
      <NewProjectProcess />
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
    </Routes>
  );
}

export default App;
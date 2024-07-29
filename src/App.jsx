import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import {YeboPay } from "./pages/dashboard/yeboPay";

function App() {
  return (
    <Routes>
      <Route path="/yebo-pay/:accountNumber" element={<YeboPay/>} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/account/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
  );
}

export default App;

import "./App.css";
import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import PageNotFound from "./PageNotFound";
import Ticket from "./Ticket";

function App() {
  return (
    <div className="App">
      <Router>
        <Suspense
          fallback={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ticket/:ticketId" element={<Ticket />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;

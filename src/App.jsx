import { useEffect, useState } from "react";
import { loadJSON, saveJSON } from "./utils/storage";

import Header from "./components/Header";
import BottomNav from "./components/ui/BottomNav";

import Today from "./features/jobs/Today";
import JobsList from "./features/jobs/JobsList";
import JobDetail from "./features/jobs/JobDetail";

import AssistantHome from "./features/assistant/AssistantHome";
import AssistantPanel from "./features/assistant/AssistantPanel";

import Library from "./features/library/Library";
import NewJobModal from "./components/NewJobModal";

export default function App() {
  // UI state
  const [tab, setTab] = useState("today");            // today | jobs | assistant | library
  const [showNewJob, setShowNewJob] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);

  // Theme: "light" | "jobsite"
  const [theme, setTheme] = useState(() => loadJSON("ui:theme", "light"));
  useEffect(() => saveJSON("ui:theme", theme), [theme]);

  // Demo jobs list (replace with real data later)
  const [jobs, setJobs] = useState([
    { id: 1, title: "Jones Deck", status: "Draft", attention: true },
    { id: 2, title: "Nguyen Fence", status: "Quote ready", attention: false },
  ]);

  const rootBG =
    theme === "jobsite"
      ? "bg-neutral-900 text-neutral-100"
      : "bg-slate-50 text-slate-900";

  function handleCreateJob(jobDraft) {
    const job = { id: Date.now(), attention: true, status: "Draft", ...jobDraft };
    setJobs((prev) => [job, ...prev]);
    setTab("jobs");
    setCurrentJob(job);
    setShowNewJob(false);
  }

  return (
    <div className={`flex flex-col h-screen ${rootBG}`}>
      <Header
        onOpenAssistant={() => setShowAssistant(true)}
        theme={theme}
        setTheme={setTheme}
      />
      <div className="p-4 bg-green-600 text-white rounded-lg shadow-md">
  Tailwind Works!
</div>

      {/* The .app-main class adds top/bottom padding to avoid header/bottom-nav overlap */}
      <main className="app-main flex-1 overflow-y-auto px-4">
        {tab === "today" && (
          <Today onOpenJob={(j) => setCurrentJob(j)} jobs={jobs} theme={theme} />
        )}

        {tab === "jobs" &&
          (currentJob ? (
            <JobDetail
              job={currentJob}
              onBack={() => setCurrentJob(null)}
              theme={theme}
            />
          ) : (
            <JobsList
              jobs={jobs}
              onOpenJob={(j) => setCurrentJob(j)}
              theme={theme}
            />
          ))}

        {tab === "assistant" && (
          <AssistantHome onOpen={() => setShowAssistant(true)} theme={theme} />
        )}

        {tab === "library" && <Library theme={theme} />}
      </main>

      {/* Floating action: New Job */}
      <button
        className="fixed bottom-20 right-4 rounded-full bg-blue-600 text-white shadow-lg px-4 py-3 text-sm font-medium hover:bg-blue-700 active:scale-95"
        onClick={() => setShowNewJob(true)}
        aria-label="New Job"
      >
        <span className="mr-2 align-middle">➕</span> New Job
      </button>

      <BottomNav
        tab={tab}
        setTab={(t) => {
          setCurrentJob(null);
          setTab(t);
        }}
        theme={theme}
      />

      {showNewJob && (
        <NewJobModal
          onClose={() => setShowNewJob(false)}
          onCreate={handleCreateJob}
          theme={theme}
        />
      )}

      {showAssistant && (
        <AssistantPanel
          onClose={() => setShowAssistant(false)}
          context={currentJob}
          theme={theme}
        />
      )}
    </div>
  );
}

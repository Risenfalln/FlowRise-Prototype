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
  return (
    <div>
      <Header theme="light" setTheme={()=>{}} onOpenAssistant={()=>{}} />
      <div style={{ padding: 16 }}>Smoke: Header rendered ✅</div>
    </div>
  );
}

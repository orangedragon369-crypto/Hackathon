import "react-big-calendar/lib/css/react-big-calendar.css";

import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { "en-US": enUS },
});

export default function CalendarPage() {
  const [events, setEvents] = useState([]);

  // 🔹 load events
  useEffect(() => {
    fetch("/api/events")
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(e => ({
          ...e,
          start: new Date(e.start),
          end: new Date(e.end),
        }));
        setEvents(formatted);
      });
  }, []);

  // 🔹 create event (NOW INSIDE COMPONENT)
  const handleSelectSlot = async (slotInfo) => {
    const title = prompt("Enter event title");

    if (!title) return;

    const newEvent = {
      title,
      start: slotInfo.start,
      end: slotInfo.end,
    };

    // save to backend
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });

    // update UI instantly
    setEvents((prev) => [...prev, newEvent]);
  };

  return (
    <div style={{ height: "90vh", padding: "20px" }}>
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleSelectSlot}
      />
    </div>
  );
}
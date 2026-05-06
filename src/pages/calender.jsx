import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { Link } from "react-router-dom";

// =====================
// LOCALIZER (top level)
// =====================
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { "en-US": enUS },
});

export default function CalendarPage() {
  const [events, setEvents] = useState([]);

  // ✅ ADD THIS (controls month navigation)
  const [date, setDate] = useState(new Date());

  // =====================
  // LOAD EVENTS
  // =====================
  useEffect(() => {
    fetch("http://localhost:3001/api/events")
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(e => ({
          ...e,
          start: new Date(e.start),
          end: new Date(e.end),
        }));
        setEvents(formatted);
      })
      .catch(err => {
        console.log("API error:", err);
        setEvents([]);
      });
  }, []);

  // =====================
  // CREATE EVENT
  // =====================
  const handleSelectSlot = async (slotInfo) => {
    const title = prompt("Enter event title");
    if (!title) return;

    const newEvent = {
      title,
      start: slotInfo.start,
      end: slotInfo.end,
    };

    await fetch("http://localhost:3001/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });

    setEvents(prev => [...prev, newEvent]);
  };

  // =====================
  // UI
  // =====================
  return (
    <div style={{ height: "90vh", padding: "20px" }}>
      <Link to="/">
        MConnect Home
      </Link>
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleSelectSlot}


        views={["month", "week", "day"]}


        date={date}


        onNavigate={(newDate) => setDate(newDate)}
      />
    </div>
  );
}
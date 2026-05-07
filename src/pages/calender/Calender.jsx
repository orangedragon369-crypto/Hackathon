import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { format, getDay, parse, startOfWeek } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { auth, db } from "../../environment/environment";
import "./calender.css";

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

const eventsCollection = collection(db, "events");

 function parseEventTime(value) {
  const match = (value || "").trim().match(/^([01]?\d|2[0-3])\.(\d{2})$/);

  if (!match) return null;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  if (minutes > 59) return null;

  return { hours, minutes };
}

function createEventDateValue(date, timeValue) {
  const parsedTime = parseEventTime(timeValue);

  if (!parsedTime) {
    return null;
  }

  const eventDate = new Date(date);
  eventDate.setHours(parsedTime.hours, parsedTime.minutes, 0, 0);

  return eventDate.getTime();
}

function formatEventDateTime(value) {
  if (!value) return "Not set";

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

function toDate(value) {
  if (value instanceof Date) return value;
  if (value instanceof Timestamp) return value.toDate();
  if (value?.toDate) return value.toDate();
  return new Date(value);
}

function formatCampus(value) {
  return (value || "")
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function normalizeEvent(snapshotDoc) {
  const event = snapshotDoc.data();
  const start = toDate(event.start ?? event.date);
  const end = event.end ? toDate(event.end) : new Date(start.getTime() + 60 * 60 * 1000);

  return {
    id: snapshotDoc.id,
    ...event,
    start,
    end,
  };
}

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState(null);

  // =====================
  // LOAD EVENTS
  // =====================
  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setEvents([]);
      setHoveredEvent(null);
    });
  }, []);

  useEffect(() => {
    if (!user) return undefined;

    const unsubscribe = onSnapshot(
      eventsCollection,
      (snapshot) => {
        setEvents(snapshot.docs.map(normalizeEvent));
      },
      (err) => {
        console.log("Firestore error:", err);
        setEvents([]);
      }
    );

    return unsubscribe;
  }, [user]);

  function EventDetails({ event }) {
    return (
      <div
        id="eventDetails"
        style={{
          border: "1px solid var(--border)",
          boxSizing: "border-box",
          flex: "0 0 260px",
          padding: "20px",
          textAlign: "left",
        }}
      >
        {event && (
          <>
            <h2>{event.title}</h2>
            <p>
              <strong>Campus:</strong> {event.campus || "Not set"}
            </p>
            <p>
              <strong>Time:</strong> {formatEventDateTime(event.start)}
            </p>
            <p>
              <strong>Details:</strong> {event.description || "Not set"}
            </p>
            <button onClick={()=>{setHoveredEvent(null)}}>X</button>
  
          </>
        )}
      </div>
    );
  }

  // =====================
  // CREATE EVENT
  // =====================
  const handleSelectSlot = async (slotInfo) => {
    if (!user) {
      alert("Please sign in before adding events.");
      return;
    }

    const title = prompt("Enter event title");
    if (!title || title === "") return;
    let time = prompt("What time does this event occur? Use HH.MM format, ex: 08.30 or 14.45");
    if (!time || time === "") return;
    const campus = prompt("What campus is this event on?");
    if (!campus) return;
    const def = prompt("Event Description");
    

    const dateValue = createEventDateValue(slotInfo.start, time);

    if (dateValue === null) {
      alert("Please enter time in HH.MM format, like 08.30 or 14.45.");
      return;
    }

    const newEvent = {
      campus: formatCampus(campus),
      date: dateValue,
      description: def,
      title,
    };

    await addDoc(eventsCollection, newEvent);
  };

  const handleDeleteEvent = async (eventId) => {
    if (!user) {
      alert("Please sign in before removing events.");
      return;
    }

    try {
      await deleteDoc(doc(db, "events", eventId));
    } catch (err) {
      console.log("Delete event error:", err);
    }
  };

  const EventWithDelete = ({ event }) => (
    <div
      onMouseEnter={() => setHoveredEvent(event)}
      style={{
        alignItems: "center",
        display: "flex",
        gap: "6px",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
        {event.title}
      </span>
      <button
        aria-label={`Remove ${event.title}`}
        onClick={(clickEvent) => {
          clickEvent.preventDefault();
          clickEvent.stopPropagation();
          handleDeleteEvent(event.id);
        }}
        style={{
          background: "transparent",
          border: 0,
          color: "inherit",
          cursor: "pointer",
          font: "inherit",
          fontWeight: 700,
          lineHeight: 1,
          padding: "0 2px",
        }}
        type="button"
      >
        x
      </button>
    </div>
  );

  // =====================
  // UI
  // =====================
  return (
    <div style={{ display: "flex", height: "90vh", padding: "20px" }}>
      {hoveredEvent && <EventDetails event={hoveredEvent} /> }
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* <Link to="/">MConnect Home</Link> */}
        <Calendar
          selectable
          components={{ event: EventWithDelete }}
          date={date}
          endAccessor="end"
          events={events}
          localizer={localizer}
          onNavigate={(newDate) => setDate(newDate)}
          onSelectSlot={handleSelectSlot}
          startAccessor="start"
          views={["month"]}
          defaultView="month"
        />
      </div>
    </div>
  );
}
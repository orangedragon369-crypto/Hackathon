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

function EventDetails({ event }) {
  return (
    <div
      id="eventDetails"
      style={{
        border: "1px solid var(--border)",
        boxSizing: "border-box",
        flex: "0 0 260px",
        minHeight: "100%",
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
        </>
      )}
    </div>
  );
}

EventDetails.createEventDateValue = createEventDateValue;

export default EventDetails;

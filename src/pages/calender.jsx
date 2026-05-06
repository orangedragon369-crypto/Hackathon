import React from 'react'

export function normalizeDate(time) {
  const date = time instanceof Date ? new Date(time) : new Date(time)

  if (Number.isNaN(date.getTime())) {
    throw new Error('calender expected time to be a valid Date, timestamp, or date string')
  }

  date.setHours(0, 0, 0, 0)
  return date
}

function addDays(date, amount) {
  const nextDate = new Date(date)
  nextDate.setDate(nextDate.getDate() + amount)
  return nextDate
}

function startOfWeek(date) {
  return addDays(date, -date.getDay())
}

function getWeekKey(date) {
  return startOfWeek(date).toISOString()
}

export function getCalenderWeeks(timeToDisplay, daysToShow) {
  const totalDays = Math.max(0, Number(daysToShow) || 0)
  const firstDay = normalizeDate(timeToDisplay)
  const weeks = []

  for (let dayIndex = 0; dayIndex < totalDays; dayIndex += 1) {
    const currentDay = addDays(firstDay, dayIndex)
    const weekKey = getWeekKey(currentDay)
    let week = weeks[weeks.length - 1]

    if (!week || week.key !== weekKey) {
      week = {
        key: weekKey,
        start: startOfWeek(currentDay),
        days: [],
      }
      weeks.push(week)
    }

    week.days.push(currentDay)
  }

  return weeks
}

export function calender(sort, timeToDisplay, daysToShow, day) {
  if (typeof day !== 'function') {
    throw new Error('calender expected day to be a render function')
  }

  const weeks = getCalenderWeeks(timeToDisplay, daysToShow)
  const renderedWeeks = []

  for (let weekIndex = 0; weekIndex < weeks.length; weekIndex += 1) {
    const week = weeks[weekIndex]
    const renderedDays = []

    for (let dayIndex = 0; dayIndex < week.days.length; dayIndex += 1) {
      const singleDay = week.days[dayIndex]

      renderedDays.push(
        <React.Fragment key={singleDay.toISOString()}>
          {day(singleDay, sort)}
        </React.Fragment>,
      )
    }

    renderedWeeks.push(
      <section className="calender-week" key={week.key}>
        {renderedDays}
      </section>,
    )
  }

  return renderedWeeks
}

export default function Calender({ sort, time, daysToShow, day }) {
  return <div id="calender">{calender(sort, time, daysToShow, day)}</div>
}

import { useState } from "react";
import "./jobposting.css";

export default function JobPosting() {
  return (
    <div className="job-container">

      {/* LEFT FILTER PANEL */}
      <div className="job-sidebar">
        <h3>Filters</h3>

        <div className="filter-group">
          <label>Location</label>
          <input placeholder="e.g. Remote / Utah" />
        </div>

        <div className="filter-group">
          <label>Job Type</label>
          <select>
            <option>All</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Salary Range</label>
          <input placeholder="e.g. 50k - 100k" />
        </div>

        <button className="apply-btn">Apply Filters</button>
      </div>

      {/* MAIN JOB LIST */}
      <div className="job-main">

        {/* HEADER */}
        <div className="job-header">
          <h2>Job Listings</h2>
        </div>

        {/* JOB CARDS */}
        <div className="job-list">

          <div className="job-card">
            <h3>Frontend Developer</h3>
            <p>Company: TechSoft</p>
            <p>Location: Remote</p>
            <p>Salary: $70k - $90k</p>
            <button>View Details</button>
          </div>

          <div className="job-card">
            <h3>Backend Developer</h3>
            <p>Company: CodeWorks</p>
            <p>Location: Utah</p>
            <p>Salary: $80k - $110k</p>
            <button>View Details</button>
          </div>

          <div className="job-card">
            <h3>UI/UX Designer</h3>
            <p>Company: PixelLab</p>
            <p>Location: Remote</p>
            <p>Salary: $60k - $85k</p>
            <button>View Details</button>
          </div>

        </div>
      </div>
    </div>
  );
}
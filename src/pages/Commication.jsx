import { useState, useEffect } from "react";
import "./commication.css";

export default function CommunicationPage() {
  return (
    <div className="comm-container">
      
      {/* LEFT SIDEBAR */}
      <div className="comm-sidebar">
        <h3>Channels</h3>

        <div className="channel"># general</div>
        <div className="channel"># random</div>
        <div className="channel"># announcements</div>

        <h3>Direct Messages</h3>

        <div className="dm">test 1 </div>
        <div className="dm">test 2</div>
      </div>

      {/* MAIN CHAT AREA */}
      <div className="comm-main">

        {/* TOP BAR */}
        <div className="comm-header">
          <h3># general</h3>
        </div>

        {/* MESSAGES AREA */}
        <div className="comm-messages">
          <div className="msg">
            <b>System:</b> Welcome to communication panel
          </div>

          <div className="msg user">
            Hey team 👋
          </div>
        </div>

        {/* INPUT BAR */}
        <div className="comm-input">
          <input placeholder="Type a message..." />
          <button>Send</button>
        </div>

      </div>
    </div>
  );
}
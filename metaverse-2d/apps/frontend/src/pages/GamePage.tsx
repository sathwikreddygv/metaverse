import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { IRefPhaserGame, PhaserGame } from '../game/PhaserGame';

export function GamePage() {
  const { spaceId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const phaserRef = useRef<IRefPhaserGame | null>(null);

  return (
    <div>
      <div className="top-bar h-10">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? '←' : '→'}
        </button>
        <h1>Space {spaceId}</h1>
      </div>

      <div className="game-container">
        <div className={`sidebar ${isSidebarOpen ? '' : 'collapsed'}`}>
          <h2>Participants</h2>
          {/* Participant list will go here */}
        </div>

        <PhaserGame ref={phaserRef} />
      </div>

      <div className="bottom-bar">
        <button>🎤</button>
        <button>📹</button>
        <button>💬</button>
        <button>⚙️</button>
      </div>
    </div>
  );
} 
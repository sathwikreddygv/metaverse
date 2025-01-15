import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';

interface Space {
  id: string;
  name: string;
  dimensions: string;
  thumbnail?: string;
}

export function HomePage() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {
    try {
      const spaces = await api.spaces.getAll();
      setSpaces(spaces);
    } catch (error) {
      console.error('Failed to fetch spaces:', error);
    }
  };

  const handleCreateSpace = async () => {
    try {
      const response = await api.spaces.create({
        name: `New Space ${spaces.length + 1}`,
        dimensions: "800x600"
      });
      navigate(`/space/${response.spaceId}`);
    } catch (error) {
      console.error('Failed to create space:', error);
    }
  };

  return (
    <div>
      <div className="top-bar">
        <h1>My Spaces</h1>
        <button onClick={handleCreateSpace}>Create Space</button>
      </div>
      
      <div className="spaces-grid">
        {spaces.map((space) => (
          <div 
            key={space.id} 
            className="space-card"
            onClick={() => navigate(`/space/${space.id}`)}
          >
            <h2>{space.name}</h2>
            <p>Dimensions: {space.dimensions}</p>
            {space.thumbnail && <img src={space.thumbnail} alt={space.name} />}
          </div>
        ))}
      </div>
    </div>
  );
} 
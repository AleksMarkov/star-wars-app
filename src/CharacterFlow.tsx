// src/CharacterFlow.tsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactFlow, { Node, Edge, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import { fetchCharacterDetails } from './api';
import { Character } from './types';
import { DataContext } from './DataContext';
import BackIcon from './assets/BackupBack.png'; // Убедитесь, что файл находится в этой папке
import './CharacterFlow.css';

const CharacterFlow: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { films, starships } = useContext(DataContext);
  const proOptions = { hideAttribution: true };

  useEffect(() => {
    const buildFlow = async () => {
      try {
        if (!id) {
          console.error('No id provided in URL parameters.');
          setLoading(false);
          return;
        }

        const characterId = parseInt(id, 10);
        if (isNaN(characterId)) {
          console.error('Invalid id provided.');
          setLoading(false);
          return;
        }

        // Fetch character details
        const character: Character = await fetchCharacterDetails(characterId);

        const nodesArray: Node[] = [];
        const edgesArray: Edge[] = [];

        // Constants for positioning
        const nodeWidth = 150;
        const nodeHeight = 50;
        const horizontalSpacing = 200;
        const verticalSpacing = 150;

        // Character Node
        const characterNode: Node = {
          id: `character-${id}`,
          data: { label: character.name },
          position: { x: 0, y: 0 },
          style: { background: 'yellow', padding: 10 },
        };
        nodesArray.push(characterNode);

        // Film Nodes
        const filmNodesMap: Record<number, Node> = {};
        const filmsList = character.films.map((filmId: number) => films[filmId]).filter(Boolean);

        filmsList.forEach((filmData, index) => {
          const filmId = filmData.id;
          const filmTitle = filmData.title;
          const filmNode: Node = {
            id: `film-${filmId}`,
            data: { label: filmTitle },
            position: {
              x: index * horizontalSpacing,
              y: characterNode.position.y + verticalSpacing,
            },
            style: { color: 'white', background: '#efc747', padding: 10 },
          };
          nodesArray.push(filmNode);
          filmNodesMap[filmId] = filmNode;

          // Connect film to character
          edgesArray.push({
            id: `edge-character-film-${filmId}`,
            source: characterNode.id,
            target: filmNode.id,
          });
        });

        // Starship Nodes
        const characterStarships = character.starships.map((starshipId: number) => starships[starshipId]).filter(Boolean);
        const uniqueStarshipsMap: Record<number, Node> = {};

        characterStarships.forEach((starshipData, index) => {
          const starshipId = starshipData.id;
          if (!uniqueStarshipsMap[starshipId]) {
            const starshipNode: Node = {
              id: `starship-${starshipId}`,
              data: { label: starshipData.name },
              position: {
                x: index * horizontalSpacing,
                y: characterNode.position.y + 2 * verticalSpacing,
              },
              style: { color: 'white', background: 'black', padding: 10 },
            };
            nodesArray.push(starshipNode);
            uniqueStarshipsMap[starshipId] = starshipNode;
          }
        });

        // Connect films to starships
        for (const filmData of filmsList) {
          const filmId = filmData.id;
          const filmNode = filmNodesMap[filmId];
          const filmStarships = filmData.starships;

          characterStarships.forEach((starshipData) => {
            const starshipId = starshipData.id;
            if (filmStarships.includes(starshipId)) {
              const starshipNode = uniqueStarshipsMap[starshipId];
              edgesArray.push({
                id: `edge-film-${filmId}-starship-${starshipId}`,
                source: filmNode.id,
                target: starshipNode.id,
              });
            }
          });
        }

        setNodes(nodesArray);
        setEdges(edgesArray);
      } catch (error) {
        console.error('Error building flow:', error);
      } finally {
        setLoading(false);
      }
    };

    buildFlow();
  }, [id, films, starships]);

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <div className="back-button-container">
        <button 
          className="back-button"
          onClick={handleBack}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            zIndex: 1000,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <img 
            src={BackIcon}
            alt="Back to grid" 
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'contain'
            }}
          />
        </button>
      </div>
      <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        fitView 
        proOptions={proOptions}
        style={{ width: '100%', height: '100%' }}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default CharacterFlow;
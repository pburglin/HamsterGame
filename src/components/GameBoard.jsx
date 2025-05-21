import React, { useRef, useEffect, useState } from 'react';
import { maps } from '../maps';
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Save,
  Upload,
  RefreshCcw,
  Search,
  Axe,
  DoorOpen,
  Users,
  Flag,
  Backpack,
  Info,
  Home,
  Heart,
} from 'lucide-react';
import { BoardCanvas } from './BoardCanvas';
import { GameStats } from './GameStats';
import { GameControls } from './GameControls';
import { GameMission } from './GameMission';
import { EquipmentDisplay } from './EquipmentDisplay';

export const GameBoard = ({ selectedCharacter }) => {
  const canvasRef = useRef(null);
  const [turn, setTurn] = useState(1);
  const [actionPoints, setActionPoints] = useState(3);
  const [zombies, setZombies] = useState([]);
  const [mission, setMission] = useState(maps[0].mission);
  const tileSize = 30;
  const [currentMapIndex, setCurrentMapIndex] = useState(0);
  const currentMap = maps[currentMapIndex];
  const boardWidth = currentMap.width;
  const boardHeight = currentMap.height;
  const initialCharacterPosition = { x: 2, y: 2 };
  const [characterPosition, setCharacterPosition] = useState(
    initialCharacterPosition
  );
  const [board, setBoard] = useState(generateBoard());
  const [inventory, setInventory] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [playerHealth, setPlayerHealth] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [hitTiles, setHitTiles] = useState([]);

  const zombieSpawnPoints = currentMap.zombieSpawnPoints;
  const extractionPoint = currentMap.extractionPoint;

  const equipmentCards = [
    {
      id: 'axe',
      name: 'Axe',
      type: 'Weapon',
      damage: 1,
      icon: <Axe size={20} />,
      description: 'A sturdy axe for melee combat.',
    },
    {
      id: 'pistol',
      name: 'Pistol',
      type: 'Weapon',
      damage: 2,
      icon: <span className="text-sm"></span>,
      description: 'A reliable pistol for ranged attacks.',
    },
    {
      id: 'medkit',
      name: '[M]edkit',
      heal: 2,
      icon: <span className="text-sm"></span>,
      description: 'A medkit to heal wounds.',
    },
  ];

  function generateBoard() {
    const newBoard = [];
    for (let y = 0; y < boardHeight; y++) {
      const row = [];
      for (let x = 0; x < boardWidth; x++) {
        // Check if current position is a wall or a room
        const isWall = currentMap.walls.some(wall => wall.x === x && wall.y === y);
        const isRoom = currentMap.rooms && currentMap.rooms.some(room => room.x === x && room.y === y);
        let tileType = 'street';
        if (isWall) {
          tileType = 'wall';
        } else if (isRoom) {
          tileType = 'room';
        }
        row.push({ type: tileType });
      }
      newBoard.push(row);
    }
    return newBoard;
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (gameOver || gameWon) return;
      switch (event.key) {
        case 'ArrowUp':
          handleMove('up');
          break;
        case 'ArrowDown':
          handleMove('down');
          break;
        case 'ArrowLeft':
          handleMove('left');
          break;
        case 'ArrowRight':
          handleMove('right');
          break;
        case 's':
          handleSearch();
          break;
        case 'a':
          handleAttack();
          break;
        case ' ':
          handleEndTurn();
          break;
        case 'm':
          handleUseMedkit();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    gameOver,
    gameWon,
    actionPoints,
    characterPosition,
    zombies,
    playerHealth,
    equipment,
  ]);

  useEffect(() => {
    if (actionPoints === 0 && !gameWon && !gameOver) {
      handleEndTurn();
    }
  }, [actionPoints, gameWon, gameOver]);

  const handleMove = (direction) => {
    if (actionPoints <= 0 || gameWon || gameOver) return;
    let newX = characterPosition.x;
    let newY = characterPosition.y;

    switch (direction) {
      case 'up':
        newY = Math.max(0, characterPosition.y - 1);
        break;
      case 'down':
        newY = Math.min(boardHeight - 1, characterPosition.y + 1);
        break;
      case 'left':
        newX = Math.max(0, characterPosition.x - 1);
        break;
      case 'right':
        newX = Math.min(boardWidth - 1, characterPosition.x + 1);
        break;
      default:
        break;
    }

    if (board[newY][newX].type !== 'wall') {
      setCharacterPosition({ x: newX, y: newY });
      setActionPoints(actionPoints - 1);
    }
  };

  const handleSearch = () => {
    if (actionPoints <= 0 || gameWon || gameOver) return;

    const { x, y } = characterPosition;
    if (board[y][x].type !== 'room') {
      alert('You can only search in rooms!');
      setActionPoints(actionPoints - 1);
      return;
    }

    // 30% chance to find nothing
    if (Math.random() < 0.3) {
      alert('You searched but found nothing!');
      setActionPoints(actionPoints - 1);
      return;
    }

    // Get items not in inventory
    const availableItems = equipmentCards.filter(card => 
      !equipment.some(item => item.id === card.id)
    );

    if (availableItems.length > 0) {
      const randomCard =
        availableItems[Math.floor(Math.random() * availableItems.length)];
      setEquipment([...equipment, randomCard]);
      alert(`Found ${randomCard.name}!`);
    } else {
      alert('You found nothing new!');
    }
    setActionPoints(actionPoints - 1);
  };

  const handleAttack = () => {
    if (actionPoints <= 0 || gameWon || gameOver) return;
    const equippedWeapon =
      equipment.find((item) => item.type === 'Weapon') || {
        damage: 0,
      };

    const damage = equippedWeapon.damage;
    console.log('damage: ', damage);
    const tiles = [];

    setZombies((prevZombies) => {
      return prevZombies
        .map((zombie) => {
          const dx = characterPosition.x - zombie.x;
          const dy = characterPosition.y - zombie.y;
          if (Math.abs(dx) <= 1 && Math.abs(dy) <= 1) {
            tiles.push({ x: zombie.x, y: zombie.y });
            const newHealth = zombie.health - damage;
            return { ...zombie, health: newHealth };
          }
          return zombie;
        })
        .filter((zombie) => zombie.health > 0);
    });

    setHitTiles(tiles);
    setTimeout(() => setHitTiles([]), 200);
    setActionPoints(actionPoints - 1);
  };

  const handleOpenDoor = () => {
    if (actionPoints <= 0 || gameWon || gameOver) return;
    alert('Opening door...');
    setActionPoints(actionPoints - 1);
  };

  const handleTrade = () => {
    if (actionPoints <= 0 || gameWon || gameOver) return;
    alert('Trading equipment...');
    setActionPoints(actionPoints - 1);
  };

  const handleTakeObjective = () => {
    if (actionPoints <= 0 || gameWon || gameOver) return;
    alert('Taking objective token...');
    setActionPoints(actionPoints - 1);
  };

  const handleEndTurn = () => {
    if (gameWon || gameOver) return;
    setTurn(turn + 1);
    setActionPoints(3);
    moveZombies();
    spawnZombies();
    checkWinCondition();
  };

  const moveZombies = () => {
    setZombies((prevZombies) => {
      let newPlayerHealth = playerHealth;
      const updatedZombies = prevZombies.map((zombie) => {
        const dx = characterPosition.x - zombie.x;
        const dy = characterPosition.y - zombie.y;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        let newX = zombie.x;
        let newY = zombie.y;

        if (zombie.type === 'runner') {
          // First movement step
          let step1X = zombie.x;
          let step1Y = zombie.y;
          
          if (absDx > absDy) {
            step1X = zombie.x + (dx > 0 ? 1 : -1);
          } else if (absDy > 0) {
            step1Y = zombie.y + (dy > 0 ? 1 : -1);
          }
          
          // Check if first step is valid
          if (
            board[step1Y] &&
            board[step1Y][step1X] &&
            board[step1Y][step1X].type !== 'wall'
          ) {
            // Second movement step
            if (absDx > absDy) {
              newX = step1X + (dx > 0 ? 1 : -1);
            } else if (absDy > 0) {
              newY = step1Y + (dy > 0 ? 1 : -1);
            }
          }
        } else {
          if (absDx > absDy) {
            newX = zombie.x + (dx > 0 ? 1 : -1);
          } else if (absDy > 0) {
            newY = zombie.y + (dy > 0 ? 1 : -1);
          }
        }

        // Final position check
        if (
          board[newY] &&
          board[newY][newX] &&
          board[newY][newX].type !== 'wall'
        ) {
          if (Math.abs(dx) <= 1 && Math.abs(dy) <= 1) {
            newPlayerHealth -= 1;
          }
          return { ...zombie, x: newX, y: newY };
        }
        return zombie;
      });
      setPlayerHealth(newPlayerHealth);
      if (newPlayerHealth <= 0) {
        setGameOver(true);
        alert('Game Over! You were overwhelmed by zombies.');
      }
      return updatedZombies;
    });
  };

  const spawnZombies = () => {
    const newZombies = [];
    const zombieTypes = ['walker', 'runner', 'fatty'];
    
    // Process all spawn points
    zombieSpawnPoints.forEach(spawnPoint => {
      // 50% chance to spawn at each point
      if (Math.random() < 0.5) {
        const randomType = zombieTypes[Math.floor(Math.random() * zombieTypes.length)];
        newZombies.push({
          x: spawnPoint.x,
          y: spawnPoint.y,
          type: randomType,
          health: randomType === 'fatty' ? 3 : 1,
        });
      }
    });

    // Ensure at least one zombie spawns if there are spawn points
    if (zombieSpawnPoints.length > 0 && newZombies.length === 0) {
      const spawnPoint = zombieSpawnPoints[Math.floor(Math.random() * zombieSpawnPoints.length)];
      const randomType = zombieTypes[Math.floor(Math.random() * zombieTypes.length)];
      newZombies.push({
        x: spawnPoint.x,
        y: spawnPoint.y,
        type: randomType,
        health: randomType === 'fatty' ? 3 : 1,
      });
    }

    setZombies((prevZombies) => [...prevZombies, ...newZombies]);
  };

  const checkWinCondition = () => {
    if (
      characterPosition.x === extractionPoint.x &&
      characterPosition.y === extractionPoint.y
    ) {
      if (currentMapIndex < maps.length - 1) {
        setCurrentMapIndex(currentMapIndex + 1);
        setCharacterPosition({ x: 2, y: 2 });
        setZombies([]);
        setActionPoints(3);
        console.log('zombieSpawnPoints: ', zombieSpawnPoints);
        alert(`Map cleared! Moving to map ${currentMapIndex + 2}`);
      } else {
        setGameWon(true);
        alert('You completed all maps and found the cure! Humanity is saved from the zombies!');
      }
    }
  };

  useEffect(() => {
    setBoard(generateBoard());
    setMission(maps[currentMapIndex].mission);
  }, [currentMapIndex]);

  const handleUseMedkit = () => {
    if (gameOver || gameWon) return;
    const medkitIndex = equipment.findIndex((item) => item.id === 'medkit');
    if (medkitIndex !== -1) {
      setPlayerHealth(Math.min(playerHealth + 2, 3));
      const newEquipment = [...equipment];
      newEquipment.splice(medkitIndex, 1);
      setEquipment(newEquipment);
      alert('Used medkit to heal!');
    }
  };

  const handleSaveGame = () => {
    const gameState = {
      turn,
      actionPoints,
      characterPosition,
      zombies,
      mission,
      board,
      inventory,
      equipment,
      gameWon,
      playerHealth,
      gameOver,
    };
    localStorage.setItem('hamsterSave', JSON.stringify(gameState));
    alert('Game saved!');
  };

  const handleLoadGame = () => {
    const savedGame = localStorage.getItem('zombicideSave');
    if (savedGame) {
      const gameState = JSON.parse(savedGame);
      setTurn(gameState.turn);
      setActionPoints(gameState.actionPoints);
      setCharacterPosition(gameState.characterPosition);
      setZombies(gameState.zombies);
      setMission(gameState.mission);
      setBoard(gameState.board);
      setInventory(gameState.inventory);
      setEquipment(gameState.equipment);
      setGameWon(gameState.gameWon);
      setPlayerHealth(gameState.playerHealth);
      setGameOver(gameState.gameOver);
      alert('Game loaded!');
    } else {
      alert('No saved game found.');
    }
  };

  const handleResetGame = () => {
    setTurn(1);
    setActionPoints(3);
    setCharacterPosition(initialCharacterPosition);
    setZombies(generateZombies());
    setBoard(generateBoard());
    setInventory([]);
    setEquipment([]);
    setGameWon(false);
    setPlayerHealth(3);
    setGameOver(false);
    alert('Game reset!');
  };

  const generateZombies = () => {
    const zombieTypes = ['walker', 'runner', 'fatty'];
    const newZombies = [];
    for (let i = 0; i < 5; i++) {
      const randomX = Math.floor(Math.random() * boardWidth);
      const randomY = Math.floor(Math.random() * boardHeight);
      const randomType =
        zombieTypes[Math.floor(Math.random() * zombieTypes.length)];
      newZombies.push({
        x: randomX,
        y: randomY,
        type: randomType,
        health: randomType === 'fatty' ? 3 : 1,
      });
    }
    return newZombies;
  };

  useEffect(() => {
    setZombies(generateZombies());
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Game Messages */}
      <div className="text-center">
        {gameWon ? (
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold text-green-500 animate-bounce">
              You Win!
            </div>
            <div className="text-2xl text-green-300">
              You found the cure and saved humanity from the zombie apocalypse!
            </div>
            <div className="text-xl text-green-200">
              Congratulations on completing all challenging missions!
            </div>
          </div>
        ) : gameOver ? (
          <div className="text-4xl font-bold text-red-500 mb-4">
            Game Over!
          </div>
        ) : null}
      </div>

      {/* Top Section */}
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-4xl font-bold"></h2>
          <div className="text-center mb-6">
          <GameMission mission={mission} />
        </div>

          <div className="space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <Home size={20} className="inline-block mr-2" />
              Home
            </button>
            <button
              onClick={handleResetGame}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <RefreshCcw size={20} className="inline-block mr-2" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-[1fr_300px] gap-8">
          {/* Left Column - Board */}
          <div className="mx-auto">
            <BoardCanvas
              canvasRef={canvasRef}
              boardWidth={boardWidth}
              boardHeight={boardHeight}
              tileSize={tileSize}
              board={board}
              selectedCharacter={selectedCharacter}
              characterPosition={characterPosition}
              zombies={zombies}
              hitTiles={hitTiles}
              extractionPoint={extractionPoint}
              zombieSpawnPoints={zombieSpawnPoints}
            />
          </div>

          {/* Right Column - Player Stats */}
          <div className="bg-gray-800 p-4 rounded-lg overflow-y-auto]">
            <div className="space-y-6 p-2">
              {/* Stats Section */}
              <section className="bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-3 border-b border-gray-600 pb-2">
                  Player Stats
                </h3>
                <div className="space-y-2">
                  <GameStats
                    turn={turn}
                    actionPoints={actionPoints}
                    playerHealth={playerHealth}
                  />
                </div>
              </section>

              {/* Controls Section */}
              <section className="bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-3 border-b border-gray-600 pb-2">
                  Actions
                </h3>
                <div className="grid grid-cols-2 gap-2 p-1">
                  <GameControls
                    handleMove={handleMove}
                    handleSearch={handleSearch}
                    handleAttack={handleAttack}
                    handleEndTurn={handleEndTurn}
                  />
                </div>
              </section>

              {/* Equipment Section */}
              <section className="bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-3 border-b border-gray-600 pb-2">
                  Equipment
                </h3>
                <div className="p-1">
                  <EquipmentDisplay equipment={equipment} />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

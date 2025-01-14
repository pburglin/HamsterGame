import React, { useEffect } from 'react';
    import { Home } from 'lucide-react';

    export const BoardCanvas = ({
      canvasRef,
      boardWidth,
      boardHeight,
      tileSize,
      board,
      selectedCharacter,
      characterPosition,
      zombies,
      hitTiles,
      extractionPoint,
      zombieSpawnPoints,
    }) => {
      useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const drawBoard = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          if (!board) return;
          for (let y = 0; y < boardHeight; y++) {
            if (!board[y]) continue;
            for (let x = 0; x < boardWidth; x++) {
              const tile = board[y][x];
              if (!tile) continue;
              const tileType = tile.type || 'empty';
              ctx.fillStyle = getTileColor(tileType);
              ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
              ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
              ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
              if (hitTiles.some((tile) => tile.x === x && tile.y === y)) {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
              }
            }
          }
          drawCharacter(ctx, selectedCharacter, tileSize);
          drawZombies(ctx, tileSize);
          drawSpawnPoints(ctx, tileSize);
          drawExtractionPoint(ctx, tileSize);
        };

        const getTileColor = (tileType) => {
          return tileType === 'wall' ? '#444444' : '#9ca3af';
        };

        const drawCharacter = (ctx, character, tileSize) => {
          ctx.fillStyle = '#3b82f6';
          ctx.beginPath();
          ctx.arc(
            characterPosition.x * tileSize + tileSize / 2,
            characterPosition.y * tileSize + tileSize / 2,
            tileSize / 2,
            0,
            2 * Math.PI
          );
          ctx.fill();
          ctx.fillStyle = 'white';
          ctx.font = '12px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(
            character.name.charAt(0),
            characterPosition.x * tileSize + tileSize / 2,
            characterPosition.y * tileSize + tileSize / 2
          );
        };

        const drawZombies = (ctx, tileSize) => {
          zombies.forEach((zombie) => {
            ctx.fillStyle =
              zombie.type === 'runner'
                ? '#ea580c'
                : zombie.type === 'fatty'
                ? '#7c3aed'
                : '#dc2626';
            ctx.beginPath();
            ctx.arc(
              zombie.x * tileSize + tileSize / 2,
              zombie.y * tileSize + tileSize / 2,
              tileSize / 2,
              0,
              2 * Math.PI
            );
            ctx.fill();
            ctx.fillStyle = 'white';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(
              zombie.type === 'runner' ? 'R' : zombie.type === 'fatty' ? 'F' : 'Z',
              zombie.x * tileSize + tileSize / 2,
              zombie.y * tileSize + tileSize / 2
            );
            ctx.fillStyle = 'white';
            ctx.font = '8px sans-serif';
            ctx.fillText(
              zombie.health,
              zombie.x * tileSize + tileSize / 2,
              zombie.y * tileSize + tileSize / 2 + 10
            );
          });
        };

        const drawSpawnPoints = (ctx, tileSize) => {
          zombieSpawnPoints.forEach((point) => {
            ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
            ctx.fillRect(
              point.x * tileSize,
              point.y * tileSize,
              tileSize,
              tileSize
            );
          });
        };

        const drawExtractionPoint = (ctx, tileSize) => {
          ctx.fillStyle = 'green';
          ctx.beginPath();
          ctx.arc(
            extractionPoint.x * tileSize + tileSize / 2,
            extractionPoint.y * tileSize + tileSize / 2,
            tileSize / 2,
            0,
            2 * Math.PI
          );
          ctx.fill();
          ctx.fillStyle = 'white';
          ctx.font = '12px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(
            <Home size={16} />,
            extractionPoint.x * tileSize + tileSize / 2,
            extractionPoint.y * tileSize + tileSize / 2
          );
        };

        drawBoard();
      }, [
        selectedCharacter,
        characterPosition,
        zombies,
        board,
        hitTiles,
        extractionPoint,
        zombieSpawnPoints,
        boardHeight,
        boardWidth,
        tileSize,
      ]);

      return (
        <canvas
          ref={canvasRef}
          width="600"
          height="450"
          className="border border-gray-700 rounded-md shadow-lg"
        ></canvas>
      );
    };

export const maps = [
  {
    id: 1,
    width: 20,
    height: 15,
    walls: [
      // Outer walls
      ...Array.from({length: 20}, (_, x) => ({x, y: 0})),
      ...Array.from({length: 20}, (_, x) => ({x, y: 14})),
      ...Array.from({length: 15}, (_, y) => ({x: 0, y})),
      ...Array.from({length: 15}, (_, y) => ({x: 19, y})),
      // Inner walls
      ...Array.from({length: 10}, (_, y) => ({x: 5, y: y + 2})),
      ...Array.from({length: 10}, (_, y) => ({x: 15, y: y + 2}))
    ],
    zombieSpawnPoints: [
      {x: 1, y: 1},
      {x: 18, y: 1}, 
      {x: 1, y: 13},
      {x: 18, y: 13}
    ],
    extractionPoint: {x: 18, y: 7},
    mission: {
      description: 'Survive the zombie horde and reach the extraction point',
      objectives: ['Reach the extraction point']
    }
  },
  {
    id: 2,
    width: 25,
    height: 20,
    walls: [
      // Maze-like pattern
      ...Array.from({length: 25}, (_, x) => ({x, y: 0})),
      ...Array.from({length: 25}, (_, x) => ({x, y: 19})),
      ...Array.from({length: 20}, (_, y) => ({x: 0, y})),
      ...Array.from({length: 20}, (_, y) => ({x: 24, y})),
      {x: 5, y: 5}, {x: 5, y: 6}, {x: 5, y: 7}, {x: 5, y: 8},
      {x: 10, y: 15}, {x: 10, y: 16}, {x: 10, y: 17}, {x: 10, y: 18},
      {x: 15, y: 2}, {x: 15, y: 3}, {x: 15, y: 4}, {x: 15, y: 5},
      {x: 20, y: 10}, {x: 20, y: 11}, {x: 20, y: 12}, {x: 20, y: 13}
    ],
    zombieSpawnPoints: [
      {x: 2, y: 2},
      {x: 22, y: 2},
      {x: 2, y: 17},
      {x: 22, y: 17}
    ],
    extractionPoint: {x: 12, y: 10},
    mission: {
      description: 'Navigate the maze and reach the safe zone',
      objectives: ['Reach the safe zone']
    }
  },
  {
    id: 3,
    width: 30,
    height: 20,
    walls: [
      // Checkerboard pattern
      ...Array.from({length: 30}, (_, x) => ({x, y: 0})),
      ...Array.from({length: 30}, (_, x) => ({x, y: 19})),
      ...Array.from({length: 20}, (_, y) => ({x: 0, y})),
      ...Array.from({length: 20}, (_, y) => ({x: 29, y})),
      ...Array.from({length: 15}, (_, i) => ({x: 5 + i*2, y: 5})),
      ...Array.from({length: 15}, (_, i) => ({x: 5 + i*2, y: 10})),
      ...Array.from({length: 15}, (_, i) => ({x: 5 + i*2, y: 15})),
      ...Array.from({length: 10}, (_, i) => ({x: 5, y: 5 + i*2})),
      ...Array.from({length: 10}, (_, i) => ({x: 15, y: 5 + i*2})),
      ...Array.from({length: 10}, (_, i) => ({x: 25, y: 5 + i*2}))
    ],
    zombieSpawnPoints: [
      {x: 3, y: 3},
      {x: 26, y: 3},
      {x: 3, y: 16},
      {x: 26, y: 16}
    ],
    extractionPoint: {x: 15, y: 10},
    mission: {
      description: 'Cross the dangerous checkerboard to reach safety',
      objectives: ['Reach the center point']
    }
  },
  // Additional maps would follow similar structure...
  {
    id: 4,
    width: 40,
    height: 30,
    walls: [
      // Final challenge map
      ...Array.from({length: 40}, (_, x) => ({x, y: 0})),
      ...Array.from({length: 40}, (_, x) => ({x, y: 29})),
      ...Array.from({length: 30}, (_, y) => ({x: 0, y})),
      ...Array.from({length: 30}, (_, y) => ({x: 39, y})),
      // Complex maze pattern
      ...Array.from({length: 25}, (_, x) => ({x: x + 5, y: 5})),
      ...Array.from({length: 20}, (_, y) => ({x: 10, y: y + 5})),
      ...Array.from({length: 15}, (_, x) => ({x: x + 20, y: 15})),
      ...Array.from({length: 10}, (_, y) => ({x: 25, y: y + 15}))
    ],
    zombieSpawnPoints: [
      {x: 5, y: 5},
      {x: 35, y: 5},
      {x: 5, y: 25},
      {x: 35, y: 25},
      {x: 20, y: 15}
    ],
    extractionPoint: {x: 20, y: 15},
    mission: {
      description: 'Final challenge: Find the cure in the center of the maze',
      objectives: ['Reach the center', 'Collect the cure']
    }
  }
];

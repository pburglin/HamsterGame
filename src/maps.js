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
    rooms: [
      {x: 2, y: 2}, {x: 3, y: 2}, {x: 2, y: 3}, {x: 3, y: 3}, // Room in map 1
      {x: 17, y: 12}, {x: 18, y: 12}, {x: 17, y: 13}, {x: 18, y: 13} // Another room in map 1
    ],
    zombieSpawnPoints: [
      {x: 1, y: 1},
      {x: 18, y: 1}, 
      {x: 1, y: 13},
      {x: 18, y: 13}
    ],
    extractionPoint: {x: 18, y: 8},
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
      {x: 9, y: 5}, {x: 9, y: 6}, {x: 9, y: 7}, {x: 9, y: 8},
      {x: 6, y: 5}, {x: 7, y: 5}, {x: 8, y: 5},

      {x: 10, y: 15}, {x: 10, y: 16}, {x: 10, y: 17}, {x: 10, y: 18},
      {x: 9, y: 14}, {x: 8, y: 13}, {x: 7, y: 12}, {x: 6, y: 11}, 

      {x: 14, y: 15}, {x: 14, y: 16}, {x: 14, y: 17}, {x: 14, y: 18},
      {x: 15, y: 14}, {x: 16, y: 13}, {x: 17, y: 12}, {x: 18, y: 11}, 

      {x: 15, y: 2}, {x: 15, y: 3}, {x: 15, y: 4},
      {x: 14, y: 5}, {x: 13, y: 6}, {x: 12, y: 7}, {x: 11, y: 8},

      {x: 19, y: 6}, {x: 18, y: 5},
      {x: 21, y: 10}, {x: 21, y: 11}, {x: 20, y: 12}, {x: 20, y: 13},
      {x: 20, y: 9}, {x: 20, y: 8}, {x: 20, y: 7},
      {x: 19, y: 14}, {x: 18, y: 15},

    ],
    rooms: [
      {x: 2, y: 10}, {x: 3, y: 10}, {x: 2, y: 11}, {x: 3, y: 11}, // Room in map 2
      {x: 20, y: 3}, {x: 21, y: 3}, {x: 20, y: 4}, {x: 21, y: 4} // Another room in map 2
    ],
    zombieSpawnPoints: [
      {x: 2, y: 2},
      {x: 12, y: 2},
      {x: 22, y: 2},
      {x: 2, y: 17},
      {x: 12, y: 17},
      {x: 22, y: 17}
    ],
    extractionPoint: {x: 22, y: 12},
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
      ...Array.from({length: 15}, (_, i) => ({x: 3 + i*2, y: 2})),
      ...Array.from({length: 15}, (_, i) => ({x: 3 + i*2, y: 10})),
      ...Array.from({length: 15}, (_, i) => ({x: 3 + i*2, y: 15})),
      ...Array.from({length: 10}, (_, i) => ({x: 3, y: 3 + i*2})),
      ...Array.from({length: 15}, (_, i) => ({x: 15, y: 4 + i})),
      ...Array.from({length: 10}, (_, i) => ({x: 25, y: 3 + i*2})),
      ...Array.from({length: 7}, (_, i) => ({x: 25, y: 2 + i*2})),
      {x: 25, y: 1}, {x: 25, y: 4},
    ],
    rooms: [
      {x: 5, y: 5}, {x: 6, y: 5}, {x: 5, y: 6}, {x: 6, y: 6}, // Room in map 3
      {x: 22, y: 12}, {x: 23, y: 12}, {x: 22, y: 13}, {x: 23, y: 13} // Another room in map 3
    ],
    zombieSpawnPoints: [
      {x: 7, y: 3},
      {x: 16, y: 3},
      {x: 26, y: 3},
      {x: 7, y: 16},
      {x: 16, y: 16},
      {x: 26, y: 16}
    ],
    extractionPoint: {x: 28, y: 10},
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
      // Outer walls
      ...Array.from({length: 40}, (_, x) => ({x, y: 0})),
      ...Array.from({length: 40}, (_, x) => ({x, y: 29})),
      ...Array.from({length: 30}, (_, y) => ({x: 0, y})),
      ...Array.from({length: 30}, (_, y) => ({x: 39, y})),
      // More complex maze pattern
      ...Array.from({length: 30}, (_, x) => ({x: x + 5, y: 5})),
      ...Array.from({length: 17}, (_, y) => ({x: 5, y: y + 5})),
      ...Array.from({length: 20}, (_, y) => ({x: 10, y: y + 10})),
      ...Array.from({length: 17}, (_, y) => ({x: 15, y: y + 5})),
      ...Array.from({length: 20}, (_, y) => ({x: 20, y: y + 10})),
      ...Array.from({length: 17}, (_, y) => ({x: 25, y: y + 5})),
      ...Array.from({length: 20}, (_, y) => ({x: 30, y: y + 10})),
      ...Array.from({length: 19}, (_, y) => ({x: 35, y: y + 5})),
      ...Array.from({length: 5}, (_, x) => ({x: x + 5, y: 25})),
      ...Array.from({length: 5}, (_, x) => ({x: x + 15, y: 25})),
      ...Array.from({length: 5}, (_, x) => ({x: x + 25, y: 25})),
      ...Array.from({length: 5}, (_, x) => ({x: x + 30, y: 25})),
    ],
    rooms: [
      {x: 10, y: 15}, {x: 11, y: 15}, {x: 10, y: 16}, {x: 11, y: 16}, // Room in map 4
      {x: 30, y: 20}, {x: 31, y: 20}, {x: 30, y: 21}, {x: 31, y: 21} // Another room in map 4
    ],
    zombieSpawnPoints: [
      {x: 4, y: 19},
      {x: 11, y: 19},
      {x: 21, y: 19},
      {x: 10, y: 25},
      {x: 29, y: 19},
      {x: 31, y: 19},
      {x: 4, y: 9},
      {x: 36, y: 9},
      {x: 36, y: 19},
      {x: 21, y: 4},
      {x: 19, y: 19}
    ],
    extractionPoint: {x: 23, y: 17},
    mission: {
      description: 'Final challenge: Find the cure in the center of the maze',
      objectives: ['Reach the center', 'Collect the cure']
    }
  }
];

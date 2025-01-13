import React from 'react';
    import {
      ArrowUp,
      ArrowDown,
      ArrowLeft,
      ArrowRight,
      Search,
      Axe,
    } from 'lucide-react';

    export const GameControls = ({
      handleMove,
      handleSearch,
      handleAttack,
      handleEndTurn,
    }) => {
      return (
        <div>
        <div className="flex space-x-4 mb-4">
          <div className="flex space-x mt-4">
            <button
              onClick={() => handleMove('up')}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              title="Move Up"
            >
              <ArrowUp size={20} />
            </button>
            <button
              onClick={() => handleMove('left')}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              title="Move Left"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={() => handleMove('right')}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              title="Move Right"
            >
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => handleMove('down')}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              title="Move Down"
            >
              <ArrowDown size={20} />
            </button>
          </div>
          </div>

          <div className="flex space-x-4 mb-4">
          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleSearch}
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              title="Search for items"
            >
              <Search size={20} className="inline-block mr-2" />
              Search
            </button>
            <button
              onClick={handleAttack}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              title="Attack zombies"
            >
              <Axe size={20} className="inline-block mr-2" />
              Attack
            </button>
          </div>
          </div>
        </div>
      );
    };

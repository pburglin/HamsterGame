import React, { useState } from 'react';
    import { CharacterSelection } from './components/CharacterSelection';
    import { GameBoard } from './components/GameBoard';

    function App() {
      const [selectedCharacter, setSelectedCharacter] = useState(null);

      const handleCharacterSelect = (character) => {
        setSelectedCharacter(character);
      };

      return (
        <div className="font-sans bg-gray-900 text-white min-h-screen h-full flex flex-col overflow-x-hidden">
          <main className="flex-grow">
            {selectedCharacter ? (
              <GameBoard selectedCharacter={selectedCharacter} />
            ) : (
              <CharacterSelection onSelect={handleCharacterSelect} />
            )}
          </main>
          <footer className="bg-gray-800 py-4 text-center text-sm text-gray-400">
            <a
              href="https://github.com/pburglin/HamsterGame"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              View on GitHub
            </a>
          </footer>
        </div>
      );
    }

    export default App;

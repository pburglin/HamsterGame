import React from 'react';
import { User, Shield, Heart, Zap } from 'lucide-react';

const characters = [
  {
    id: 'dave',
    name: 'Dave',
    role: 'Scavenger',
    ability: 'Extra search action',
    icon: <User size={48} />,
    image:
      'dave.png',
  },
  {
    id: 'dan',
    name: 'Dan',
    role: 'Medic',
    ability: 'Medkit starter',
    icon: <Heart size={48} />,
    image:
      'dan.png',
  },
  {
    id: 'stela',
    name: 'Stela',
    role: 'Escape Artist',
    ability: 'Increased movement speed',
    icon: <Zap size={48} />,
    image:
      'stela.png',
  },
  {
    id: 'olivia',
    name: 'Olivia',
    role: 'Scooter Rider',
    ability: 'Faster movement on streets',
    icon: <Shield size={48} />,
    image:
      'olivia.png',
  },
];

export const CharacterSelection = ({ onSelect }) => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1508423134147-add552166694?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-5xl font-bold mb-10 text-center text-white drop-shadow-lg">
          Hamstercide
        </h1>
        <h2 className="text-5xl font-bold mb-10 text-center text-white drop-shadow-lg">
          Select Your Character
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full p-6">
          {characters.map((character) => (
            <div
              key={character.id}
              onClick={() => onSelect(character)}
              className="bg-gray-800 bg-opacity-70 shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="mr-3">{character.icon}</span>
                  <h3 className="text-2xl font-semibold text-white">
                    {character.name}
                  </h3>
                </div>
                <p className="text-gray-300 mb-2">
                  <span className="font-medium">Role:</span> {character.role}
                </p>
                <p className="text-gray-300 mb-4">
                  <span className="font-medium">Ability:</span>{' '}
                  {character.ability}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Zombie Types Section */}
        <div className="mt-20 max-w-6xl w-full p-6">
          <h2 className="text-5xl font-bold mb-10 text-center text-white drop-shadow-lg">
            Zombie Types
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                type: 'Walker',
                description: 'Slow but relentless',
                ability: 'Basic zombie - moves 1 space per turn',
                image: '/zombie-walker.png'
              },
              {
                type: 'Runner',
                description: 'Fast and aggressive',
                ability: 'Moves 2 spaces per turn, can attack immediately',
                image: '/zombie-runner.png'
              },
              {
                type: 'Fatty',
                description: 'Massive and terrifying',
                ability: 'High health',
                image: '/zombie-abomination.png'
              }
            ].map((zombie, index) => (
              <div
                key={index}
                className="bg-gray-800 bg-opacity-70 shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={zombie.image}
                  alt={zombie.type}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {zombie.type}
                  </h3>
                  <p className="text-gray-300 mb-2">
                    <span className="font-medium">Description:</span> {zombie.description}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium">Ability:</span> {zombie.ability}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

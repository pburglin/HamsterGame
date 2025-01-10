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
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0CSMf2ORqmNVKxRJLsoHFePU_SSaOjFQwdA&s',
  },
  {
    id: 'dan',
    name: 'Dan',
    role: 'Medic',
    ability: 'Medkit starter',
    icon: <Heart size={48} />,
    image:
      'https://img.freepik.com/free-vector/cute-hamster-eating-sunflower-seed-cartoon-character-animal-food-isolated_138676-3145.jpg',
  },
  {
    id: 'stela',
    name: 'Stela',
    role: 'Escape Artist',
    ability: 'Increased movement speed',
    icon: <Zap size={48} />,
    image:
      'https://cdn.imgbin.com/8/23/22/imgbin-hamster-anime-kavaii-hamster-hamtaro-illustration-40Lk83SGNSpWkHDmEtE31KZde.jpg',
  },
  {
    id: 'olivia',
    name: 'Olivia',
    role: 'Scooter Rider',
    ability: 'Faster movement on streets',
    icon: <Shield size={48} />,
    image:
      'https://img.freepik.com/premium-psd/png-captivating-kawaii-anime-hamster-girl-with-hamster-cheek-creative-chibi-sticker-collection_1020495-344760.jpg',
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
          Hamster Game
        </h1>
        <h2 className="text-5xl font-bold mb-10 text-center text-white drop-shadow-lg">
          Select Your Character
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full p-6">
          {characters.map((character) => (
            <div
              key={character.id}
              className="bg-gray-800 bg-opacity-70 shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl"
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
                <button
                  onClick={() => onSelect(character)}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline w-full transform transition-transform hover:scale-105"
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

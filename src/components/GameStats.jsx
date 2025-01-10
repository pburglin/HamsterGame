import React from 'react';
    import { Heart } from 'lucide-react';

    export const GameStats = ({ turn, actionPoints, playerHealth }) => {
      return (
        <div className="mb-4 w-full text-left">
          <p className="font-bold text-xl">Stats:</p>
          <p>
            Turn: <span className="font-bold">{turn}</span>
          </p>
          <p>
            Actions: <span className="font-bold">{actionPoints}</span>
          </p>
          <p>
            Health:{' '}
            <span className="font-bold">
              {playerHealth} <Heart size={16} className="inline-block" />
            </span>
          </p>
        </div>
      );
    };

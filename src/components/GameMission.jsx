import React from 'react';

    export const GameMission = ({ mission }) => {
      return (
        <div className="mb-4 max-w-2xl w-full text-center">
          <p className="font-bold text-xl">{mission.description}</p>
          <ul className="list-disc list-inside">
            {mission.objectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </div>
      );
    };

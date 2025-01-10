import React from 'react';
    import { Info } from 'lucide-react';

    export const EquipmentDisplay = ({ equipment }) => {
      return (
        <div className="mb-4 max-w-2xl w-full">
          <p className="font-bold text-xl">Equipment:</p>
          <ul className="list-disc list-inside">
            {equipment.map((card, index) => (
              <li key={index} className="flex items-center">
                {card.icon} {card.name}
                <span
                  className="ml-2 text-gray-500 cursor-pointer"
                  title={card.description}
                >
                  <Info size={16} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    };

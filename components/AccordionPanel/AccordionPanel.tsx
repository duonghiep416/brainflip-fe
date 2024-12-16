'use client';

import React, { useState } from 'react';
import { FaAnglesDown } from 'react-icons/fa6';

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionPanelProps {
  sections: Section[];
}

const AccordionPanel: React.FC<AccordionPanelProps> = ({ sections }) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setOpenSection(prev => (prev === id ? null : id));
  };

  return (
    <div className="w-full">
      {sections.map(section => (
        <div key={section.id}>
          {/* Header của AccordionItem */}
          <button
            onClick={() => toggleSection(section.id)}
            className="flex justify-between items-center w-full p-4 text-left focus:outline-none"
          >
            <span className="font-bold">{section.title}</span>
            <span
              className={`transform transition-transform duration-300 ${
                openSection === section.id ? 'rotate-180' : 'rotate-0'
              }`}
            >
              <FaAnglesDown />
            </span>
          </button>

          {/* Nội dung có animation mở/đóng */}
          <div
            className={`transition-all duration-300 overflow-hidden ${
              openSection === section.id ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="p-4">{section.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccordionPanel;

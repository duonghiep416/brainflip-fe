'use client';

import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
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
  const [openSections, setOpenSections] = useState<string[]>([]);

  useEffect(() => {
    const allSectionIds = sections.map(section => section.id);
    setOpenSections(allSectionIds);
  }, [sections]);

  const toggleSection = (id: string) => {
    setOpenSections(prev =>
      prev.includes(id)
        ? prev.filter(sectionId => sectionId !== id)
        : [...prev, id],
    );
  };

  return (
    <div className="w-full relative z-10">
      {' '}
      {/* z-10 thấp hơn z-50 của Navbar */}
      {sections.map(section => {
        const isOpen = openSections.includes(section.id);
        return (
          <div key={section.id} className="relative z-10">
            {/* Header của AccordionItem */}
            <button
              onClick={() => toggleSection(section.id)}
              className="flex justify-between items-center w-full p-4 text-left focus:outline-none relative z-20"
            >
              <span className="font-bold">{section.title}</span>
              <span
                className={clsx(
                  'transform transition-transform duration-300',
                  isOpen ? 'rotate-0' : 'rotate-180',
                )}
              >
                <FaAnglesDown />
              </span>
            </button>

            {/* Nội dung có animation mở/đóng */}
            <div
              className={`transition-all duration-300 overflow-hidden ${
                isOpen ? 'max-h-96' : 'max-h-0'
              } relative z-10`}
            >
              <div className="p-4">{section.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccordionPanel;

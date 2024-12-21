'use client';

import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { FaAnglesDown } from 'react-icons/fa6';
import styles from './AccordionPanel.module.scss';

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
    <div className={styles.accordionContainer}>
      {sections.map(section => {
        const isOpen = openSections.includes(section.id);
        return (
          <div key={section.id} className={styles.accordionItem}>
            <button
              onClick={() => toggleSection(section.id)}
              className={styles.accordionButton}
            >
              <span className={styles.accordionTitle}>{section.title}</span>
              <span
                className={clsx(
                  styles.icon,
                  isOpen ? styles.iconOpen : styles.iconClosed,
                )}
              >
                <FaAnglesDown />
              </span>
            </button>

            <div
              className={clsx(
                styles.accordionContent,
                isOpen ? styles.contentOpen : styles.contentClosed,
              )}
            >
              <div className={styles.contentInner}>{section.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccordionPanel;

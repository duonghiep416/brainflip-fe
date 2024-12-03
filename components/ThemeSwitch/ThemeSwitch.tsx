'use client';

import { MoonIcon } from '@/components/ThemeSwitch/MoonIcon';
import { SunIcon } from '@/components/ThemeSwitch/SunIcon';
import { useSwitch, VisuallyHidden, SwitchProps } from '@nextui-org/react';
import { useState, useEffect } from 'react';

const ThemeSwitch = (props: SwitchProps) => {
  const { Component, slots, getBaseProps, getInputProps, getWrapperProps } =
    useSwitch(props);

  // Default theme is light
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Fetch saved theme from localStorage on client-side
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []); // Runs only on mount

  useEffect(() => {
    // Set the theme on the HTML element and save it to localStorage
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('class', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="flex flex-col gap-2">
      <Component {...getBaseProps()} onClick={toggleTheme}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: [
              'w-8 h-8',
              'flex items-center justify-center',
              'rounded-lg bg-default-100 hover:bg-default-200',
            ],
          })}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </div>
      </Component>
    </div>
  );
};

export default ThemeSwitch;

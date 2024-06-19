'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import styles from './popover.module.scss';

function PopOver({
  children,
  radius,
  className,
  wrapper,
}: {
  children: React.ReactNode;
  radius: number;
  className: string;
  wrapper: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Close pop-over when user clicks outside of it
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(`.${styles.popup}`)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className={`${styles.popup}`}>
      <button
        className={`flex center ${className}`}
        onClick={() => setOpen(!open)}
        aria-label="Open pop-over"
        aria-expanded={open}
        aria-controls="pop-over"
        aria-haspopup="true"
        aria-pressed={open}
      >
        {wrapper}
      </button>

      {open && (
        <motion.div
          style={{ borderRadius: radius }}
          className={`flex flex-col ${styles.popover}`}
          id="pop-over"
          role="dialog"
          aria-modal="true"
          aria-hidden={!open}
          hidden={!open}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, type: 'tween' }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

export default PopOver;

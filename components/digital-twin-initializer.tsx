'use client';

import { useEffect, useState } from 'react';
import { initializeDigitalTwin } from '../app/actions/digital-twin-actions';

export function DigitalTwinInitializer() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (!initialized) {
        try {
          await initializeDigitalTwin();
          setInitialized(true);
        } catch (error) {
          console.error('Failed to initialize digital twin:', error);
        }
      }
    };

    init();
  }, [initialized]);

  return null; // This component doesn't render anything
}

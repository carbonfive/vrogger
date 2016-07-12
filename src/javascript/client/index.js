import aframe from 'aframe';
import extras from 'aframe-extras';

extras.registerAll(aframe);

import './components/fix-physics';
import './components/moving';
import './components/spawner';
import './components/jumper';
import './components/touch-controls';

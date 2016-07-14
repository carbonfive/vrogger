import aframe from 'aframe';
import extras from 'aframe-extras';

extras.registerAll(aframe);

import './components/fixed-rotation';
import './components/fix-physics';
import './components/jumper';
import './components/player';
import './components/spawner';
import './components/touch-controls';
import './components/vehicle';

import './primitives/player';
import './primitives/vehicle';

import './systems/player';

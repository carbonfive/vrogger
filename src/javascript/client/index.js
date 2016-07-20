import aframe from 'aframe';
import extras from 'aframe-extras';

extras.registerAll(aframe);

import './components/fixed-rotation';
import './components/fix-material';
import './components/fix-physics';
import './components/goal';
import './components/jumper';
import './components/spawner';
import './components/touch-controls';
import './components/transform-model';
import './components/vehicle';
import './components/deadly';

import './primitives/hud';
import './primitives/player';
import './primitives/vehicle';

import './systems/game';

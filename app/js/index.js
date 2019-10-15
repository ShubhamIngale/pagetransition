import Highway from '@dogstudio/highway';
import Fade from './Fade.js'

const H = new Highway.Core({
    transitions: {
      default: Fade
    }
  });
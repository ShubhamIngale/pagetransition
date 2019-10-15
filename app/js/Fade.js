// File: fade.js
// Import Highway
import Highway from '@dogstudio/highway';

// GSAP Library
import Tween from 'gsap';


// Fade
class Fade extends Highway.Transition {
    in({ from, to, done }) {
        // Reset Scroll
        window.scrollTo(0, 0);

        // Remove Old View
        from.remove();

        // Animation
        Tween.fromTo(to, 0.5,
            {
                height: '0vh',
                top: '50vh',
                opacity: 0
            },
            {
                height: '90vh',
                top: '10vh',
                opacity: 1,
                onComplete: done
            }
        )
    }

    out({ from, done }) {
        // Animation
        Tween.fromTo(from, 0.5,
            {
                height: '90vh',
                top: '10vh',
                opacity: 1
            },
            {
                height: '0vh',
                top: '50vh',
                opacity: 0,
                onComplete: done
            }
        )
    }
}

exports.default = Fade;
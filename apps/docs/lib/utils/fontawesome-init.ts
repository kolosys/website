import { config, library } from '@fortawesome/fontawesome-svg-core';
// Import all icons in Free Solid, Free Regular, and Brands styles
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

// Tell Font Awesome to skip adding the CSS automatically since it's already handled by Next.js
config.autoAddCss = false;

// Add all icons to the library
// library.add() is idempotent - safe to call multiple times
library.add(fas, far, fab);


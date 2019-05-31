import { configure } from '@storybook/vue'

import '../src/index.css'

// automatically import all files ending in *.stories.js inside the src folder
const req = require.context('../src', true, /\.stories\.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)

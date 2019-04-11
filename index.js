require('@google-cloud/trace-agent').start({
    plugins: { 'modofun': 'modofun-trace-agent-plugin' }
  });
require('@google-cloud/debug-agent').start();

const modofun = require('modofun');
const morgan = require('morgan');
const cors = require('cors');
const myModule = require('./myModule');

exports.persicopeExample = modofun(myModule, [morgan('tiny'), cors({origin: true})]);

/*****************************************************************************
 *
 * Global config
 * 
 * @author dkilcy
 * 
 ****************************************************************************/

var fs, configurationFile;
 
configurationFile = 'config/server.json';
fs = require('fs');

var configuration = JSON.parse( fs.readFileSync(configurationFile )) ;

module.exports.configuration = configuration;
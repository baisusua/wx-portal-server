'use strict';

// had enabled by egg
// exports.static = true;
exports.sequelize = {
    enable: true,
    package: 'egg-sequelize'
}
exports.oauth2Server = {
    enable: true,
    package: 'egg-oauth2-server',
};
exports.cors = {
    enable: true,
    package: 'egg-cors',
};
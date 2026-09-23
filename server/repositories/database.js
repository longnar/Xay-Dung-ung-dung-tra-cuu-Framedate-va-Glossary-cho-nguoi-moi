// Central database gateway for repository modules.
// Keeping the pool behind this module makes the persistence boundary explicit
// without changing the existing connection configuration.
module.exports = require('../../config/database');

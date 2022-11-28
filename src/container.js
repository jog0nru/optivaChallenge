const awilix = require('awilix');
const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
// Start registering your dependencies here
});

module.exports = container;

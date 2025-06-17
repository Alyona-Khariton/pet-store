const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    "@app": path.resolve(__dirname, 'src/app'),
    "@entities": path.resolve(__dirname, 'src/entities'),
    "@features": path.resolve(__dirname, 'src/features'),
    "@shared": path.resolve(__dirname, 'src/shared'),
    "@pages": path.resolve(__dirname, 'src/pages'),
  })
);

module.exports = {
  'env': {
    'commonjs': true,
    'es2021': true,
    'node': true,
  },
  'extends': 'google',
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
  },
  'rules': {
    // Additional, per-project rules...
    'max-len': [2, {
      'code': 120,
    }],
    'require-jsdoc': 0,
  },
};

module.exports = {
  presets: [
      ['@babel/preset-env', {
         targets: { node: 'current' },
//         modules: true
       }],
    ['@babel/preset-typescript', {
      onlyRemoveTypeImports: true,
      rewriteImportExtensions: false,
  }]
  ],
  plugins: [
    ['babel-plugin-add-import-extension', { extension: 'js' }]
  ]
};


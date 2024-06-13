module.exports = {
  presets: [
      ['@babel/preset-env', {
         targets: { node: 'current' },
         modules: false 
       }],
    ['@babel/preset-typescript', {
      onlyRemoveTypeImports: true,
      rewriteImportExtensions: true,
  }]
  ],
  plugins: [
    ['babel-plugin-add-import-extension', { extension: 'js' }]
  ]
};


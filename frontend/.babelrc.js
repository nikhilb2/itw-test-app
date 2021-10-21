module.exports = (api) => {
  api.cache(true);

  const presets = ['next/babel'];
  const plugins = [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@': './src',
        },
      },
    ],
  ];

  return { presets, plugins };
};

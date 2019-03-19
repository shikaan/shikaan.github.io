module.exports = {
  transform: {
    "^.+\\.jsx?$": `<rootDir>/jest-preprocess.js`,
  },
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
    '~pages(.*)$': '<rootDir>/src/pages/$1',
    '~templates(.*)$': '<rootDir>/src/templates/$1',
    '~components(.*)$': '<rootDir>/src/components/$1',
    '~theme(.*)$': '<rootDir>/src/theme/$1',
    '~utils(.*)$': '<rootDir>/src/utils/$1',
    '~(.*)$': '<rootDir>/src/$1',
    '^\/static(.*)$': '<rootDir>/static/$1'
  },
  testPathIgnorePatterns: [`node_modules`, `.cache`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testURL: `http://localhost`,
  setupFiles: [`<rootDir>/jest-setup.js`],
  snapshotSerializers: ["enzyme-to-json/serializer"]
}

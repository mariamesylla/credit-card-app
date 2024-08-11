module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.jsx?$": "babel-jest",  // Ensures Babel processes JSX and JavaScript
  },
  moduleFileExtensions: ["js", "jsx"], // Support for both JS and JSX files
};

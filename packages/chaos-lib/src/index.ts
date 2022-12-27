import API from "./api";

console.log("Chaos monkey starting point");

module.exports.initialize = (electronApp: Electron.App) => {
  return {
    api: new API(electronApp),
  };
};


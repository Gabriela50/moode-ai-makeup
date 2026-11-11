const { withDangerousMod } = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

module.exports = function withMoodeWeb(config) {
  return withDangerousMod(config, ["android", async (config) => {
    const source = path.join(config.modRequest.projectRoot, "assets/moode-web");
    const destination = path.join(
      config.modRequest.platformProjectRoot,
      "app/src/main/assets/moode-web"
    );

    if (!fs.existsSync(path.join(source, "index-react.html"))) {
      throw new Error("No se encontró la web de MOODÉ para empaquetar.");
    }

    fs.rmSync(destination, { recursive: true, force: true });
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.cpSync(source, destination, { recursive: true });

    return config;
  }]);
};

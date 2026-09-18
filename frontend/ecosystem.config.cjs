const fs = require("fs");
const path = require("path");

const envFile = path.join(__dirname, ".env");
const env = {};

if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf8").split("\n")) {
    const [key, ...rest] = line.split("=");
    if (key && !key.startsWith("#")) {
      env[key.trim()] = rest.join("=").trim();
    }
  }
}

module.exports = {
  apps: [
    {
      name: "skillmatch-frontend",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: __dirname,
      env: {
        ...env,
        HOSTNAME: "127.0.0.1",
        NODE_ENV: "production",
        PORT: 3003,
      },
    },
  ],
};

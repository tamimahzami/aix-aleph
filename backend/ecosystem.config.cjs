module.exports = {
  apps: [{
    name: "aix-backend",
    script: "src/server.js",
    env: {
      NODE_ENV: "production",
      PORT: "5001"
    }
  }]
}

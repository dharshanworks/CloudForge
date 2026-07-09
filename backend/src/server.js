import app from "./app.js";
import appConfig from "./config/app.config.js";
import { connectDatabase } from "./config/database.config.js";

async function startServer() {
  try {
    await connectDatabase();

    app.listen(appConfig.port, () => {
      console.log(`
========================================
🚀 CloudForge Backend Started
🌍 Environment : ${appConfig.nodeEnv}
📡 Server      : http://localhost:${appConfig.port}
========================================
`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

startServer();
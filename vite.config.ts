import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: env.VITE_BASE_PATH,
    plugins: [react()],
    resolve: {
      alias: [
        { find: "@", replacement: path.resolve(__dirname, "src") },
        { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
        {
          find: "@components",
          replacement: path.resolve(__dirname, "src/components"),
        },
        { find: "@routes", replacement: path.resolve(__dirname, "src/routes") },
        { find: "@utils", replacement: path.resolve(__dirname, "src/utils") },
        { find: "@assets", replacement: path.resolve(__dirname, "src/assets") },
        { find: "@hooks", replacement: path.resolve(__dirname, "src/hooks") },
        { find: "@store", replacement: path.resolve(__dirname, "src/store") },
        {
          find: "@service",
          replacement: path.resolve(__dirname, "src/service"),
        },
        { find: "@types", replacement: path.resolve(__dirname, "src/types") },
        {
          find: "@section",
          replacement: path.resolve(__dirname, "src/section"),
        },
        {
          find: "@images",
          replacement: path.resolve(__dirname, "src/assets/images"),
        },
        {
          find: "@svgs",
          replacement: path.resolve(__dirname, "src/assets/svgs"),
        },
      ],
    },
  };
});

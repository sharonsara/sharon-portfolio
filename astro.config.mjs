import { defineConfig } from "astro/config";

// Static output (default). Zero-JS by default; Vercel zero-config compatible.
export default defineConfig({
  devToolbar: { enabled: false },
});

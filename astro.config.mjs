// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import preact from '@astrojs/preact';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [preact(), icon()],

  env: {
    schema: {
      FACEBOOK_URL: envField.string({
        access: "public",
        context: "client",
        default: "https://www.facebook.com/people/Asociaci%C3%B3n-de-Desarrollo-de-San-Vicente/61575102152606",
      }),
      INSTAGRAM_URL: envField.string({
        access: "public",
        context: "client",
        default: "https://www.instagram.com/adisv6/",
      }),
      WHATSAPP_URL: envField.string({
        access: "public",
        context: "client",
        default: "https://wa.me/+50661570794",
      }),
    }
  }
});
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'colegio.andes.chile.app',
  appName: 'andesChile',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    Clipboard: {
      enabled: true,
    }
  },
};

export default config;
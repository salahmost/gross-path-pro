import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lovable.pathologyguide',
  appName: 'PathologyGuide',
  webDir: 'dist',
  server: {
    url: 'https://6999e15a-9fac-471e-9662-694f87e3df3f.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    StatusBar: {
      backgroundColor: '#ffffff',
      style: 'dark'
    }
  }
};

export default config;
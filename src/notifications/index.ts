import OneSignal from 'react-onesignal';

export const appId = import.meta.env.VITE_SIGNAL_APP_ID;

export default async function runOneSignal() {
  await OneSignal.init({
    appId,
    allowLocalhostAsSecureOrigin: true,
  });

  OneSignal.Slidedown.promptPush();
}

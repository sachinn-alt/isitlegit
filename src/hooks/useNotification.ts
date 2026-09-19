import { useState, useEffect, useCallback } from 'react';

export function useNotification() {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) return false;
    const result = await Notification.requestPermission();
    setPermission(result);
    return result === 'granted';
  }, []);

  const sendNotification = useCallback(
    (title: string, options?: NotificationOptions) => {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, {
          icon: '/favicon.svg',
          badge: '/favicon.svg',
          ...options,
        });
      }
    },
    []
  );

  return {
    permission,
    requestPermission,
    sendNotification,
    isSupported: 'Notification' in window,
  };
}

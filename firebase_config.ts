import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyC0_Q4d6Z3YlSlvbCTt-MVp6_XL1SN-3yg',
  authDomain: 'code-zone-app.firebaseapp.com',
  projectId: 'code-zone-app',
  storageBucket: 'code-zone-app.appspot.com',
  messagingSenderId: '570919307002',
  appId: '1:570919307002:web:b39d6d5cae635337baeb43',
  measurementId: 'G-JN7MWFY5Y1',
};

export const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);

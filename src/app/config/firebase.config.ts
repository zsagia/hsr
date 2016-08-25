import { AuthProviders, AuthMethods } from 'angularfire2';
export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyADJKKoXeEe7_E4i2HLWB_eAZ7R9Vd-KbI',
  authDomain: 'hsr-site.firebaseapp.com',
  databaseURL: 'https://hsr-site.firebaseio.com',
  storageBucket: 'hsr-site.appspot.com',
};

export const FIREBASE_AUTH_CONFIG = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

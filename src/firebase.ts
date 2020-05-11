// Copyright 2020 Cognite AS
import firebase from 'firebase';
import { WIDGET_CONF_DB } from 'constants/widgetSettings';
import { APP_CONFIG_DB, ALARM_CONFIG_DB } from 'constants/firebase';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

const firbaseInit: any = firebase.initializeApp(firebaseConfig);
export default firbaseInit;
const firestoreDB = firebase.firestore();
firestoreDB.settings({ timestampsInSnapshots: true });
export { firestoreDB };
export const widgetConfFSDoc = (docName: string) =>
  firestoreDB.collection(WIDGET_CONF_DB).doc(docName);

export const appConfDoc = (docName: string) =>
  firestoreDB.collection(APP_CONFIG_DB).doc(docName);

export const alarmConfDoc = (docName: string) =>
  firestoreDB.collection(ALARM_CONFIG_DB).doc(docName);

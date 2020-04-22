// Copyright 2020 Cognite AS
import firebase from 'firebase';
import { WIDGET_CONF_DB } from 'constants/widgetSettings';

const firebaseConfig = {
  apiKey: 'AIzaSyBsORpInv-aKArFuUohvk4NeItVfdWp4RE',
  authDomain: 'cognite-glimpse.firebaseapp.com',
  databaseURL: 'https://cognite-glimpse.firebaseio.com',
  projectId: 'cognite-glimpse',
  storageBucket: 'cognite-glimpse.appspot.com',
  messagingSenderId: '625563013605',
  appId: '1:625563013605:web:9fdb3dd7c13635a70f9f0c',
  measurementId: 'G-M56WV6PFFF',
};

const firbaseInit: any = firebase.initializeApp(firebaseConfig);
export default firbaseInit;
const firestoreDB = firebase.firestore();
firestoreDB.settings({ timestampsInSnapshots: true });
export { firestoreDB };
export const widgetConfFSDoc = (docName: string) =>
  firestoreDB.collection(WIDGET_CONF_DB).doc(docName);

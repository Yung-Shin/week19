import { openDB } from 'idb';
const DB_NAME = 'jate';
const DB_VERSION = 1;

const initdb = async () =>
  openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (db.objectStoreNames.contains(DB_NAME)) {
        console.log(`${DB_NAME} already exists`);
        return;
      }
      db.createObjectStore(DB_NAME, { keyPath: 'id', autoIncrement: true });
      console.log(`${DB_NAME} created`);
    },
  });

// function to add data to database
export const putDb = async (content) => {
  const isExisting = (await window.indexedDB.databases()).map(db => db.name).includes(DB_NAME);
  if (!isExisting) {
    await initdb();
  }
  const jateDb = await openDB(DB_NAME, DB_VERSION);
  const tx = jateDb.transaction(DB_NAME, 'readwrite');
  const store = tx.objectStore(DB_NAME);
  const request = store.put({ value: content, id: 1 });
  const result = await request;
  console.log('Data Saved', result);
}

// function to get data from database
export const getDb = async () => {
  const isExisting = (await window.indexedDB.databases()).map(db => db.name).includes(DB_NAME);
  if (!isExisting) {
    await initdb();
  }
  const jateDb = await openDB(DB_NAME, DB_VERSION);
  const tx = jateDb.transaction(DB_NAME, 'readonly');
  const store = tx.objectStore(DB_NAME);
  const request = store.get(1);
  const result = await request;
  console.log('result.value', result);
  return (result) ? result.value : false;
}


initdb()
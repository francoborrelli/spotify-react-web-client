// Tiny IndexedDB key/value store used to cache Spotify GET responses across reloads and
// across pages. Kept dependency-free and fully fault-tolerant: every operation swallows its
// own errors (e.g. private-mode with IndexedDB disabled) so a cache failure never breaks a
// request — callers just fall through to the network.

const DB_NAME = 'spotify-api-cache';
const STORE = 'responses';

let dbPromise: Promise<IDBDatabase> | null = null;

const openDb = (): Promise<IDBDatabase> => {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return dbPromise;
};

export interface CacheEntry<T = unknown> {
  data: T;
  expiry: number;
}

export const cacheGet = async <T>(key: string): Promise<CacheEntry<T> | undefined> => {
  try {
    const db = await openDb();
    return await new Promise<CacheEntry<T> | undefined>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).get(key);
      req.onsuccess = () => resolve(req.result as CacheEntry<T> | undefined);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return undefined;
  }
};

export const cacheSet = async (key: string, entry: CacheEntry): Promise<void> => {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(entry, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    /* ignore — caching is best-effort */
  }
};

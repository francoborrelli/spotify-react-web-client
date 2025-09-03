import { getDatabase, ref, get, set } from 'firebase/database';
import type { Track } from '../interfaces/track';

interface FirebaseTrack {
  id: string;
  uri: string;
  ageMin: number;
}

/**
 * Check if a track exists in Firebase Realtime Database
 */
const checkTrackExists = async (trackId: string): Promise<boolean> => {
  try {
    const db = getDatabase();
    const trackRef = ref(db, `tracks/${trackId}`);
    const snapshot = await get(trackRef);
    return snapshot.exists();
  } catch (error) {
    console.error('Error checking track existence:', error);
    return false;
  }
};

/**
 * Save a track to Firebase Realtime Database
 */
const saveTrack = async (track: Track): Promise<void> => {
  try {
    const db = getDatabase();
    const trackRef = ref(db, `tracks/${track.id}`);
    
    const firebaseTrack: FirebaseTrack = {
      id: track.id,
      uri: track.uri,
      ageMin: 18,
    };
    
    await set(trackRef, firebaseTrack);
  } catch (error) {
    console.error('Error saving track:', error);
    throw error;
  }
};

export const databaseService = {
  checkTrackExists,
  saveTrack,
};
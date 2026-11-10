import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
  signOut as fbSignOut,
  onAuthStateChanged,
  User,
  Auth,
} from "firebase/auth";
import {
  getFirestore,
  Firestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  deleteDoc,
  getDocFromServer,
} from "firebase/firestore";
import { UserAuthProfile, HistoryItem, StudyNote, BookmarkItem } from "../types";
import firebaseConfig from "../../firebase-applet-config.json";

export const isFirebaseConfigured = Boolean(
  firebaseConfig && firebaseConfig.apiKey && firebaseConfig.projectId
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    // Passing firestoreDatabaseId is critical for custom database instances
    db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

    // Initial connection test as mandated by Firestore integration guidelines
    getDocFromServer(doc(db, "test", "connection")).catch((err) => {
      // Connection checked; offline or initial read is non-fatal
    });
  } catch (err) {
    console.warn("Firebase initialization skipped or failed:", err);
  }
}

// Guest user profile generator
export const createGuestProfile = (name?: string): UserAuthProfile => {
  const guestId =
    "guest_" +
    (localStorage.getItem("wbbse_guest_id") ||
      Math.random().toString(36).substring(2, 9));
  localStorage.setItem("wbbse_guest_id", guestId);
  return {
    uid: guestId,
    displayName:
      name || localStorage.getItem("wbbse_student_name") || "মাধ্যমিক পরীক্ষার্থী",
    isGuest: true,
    avatarEmoji: "🎓",
    targetYear: 2026,
    classGrade: "Class 10 (Madhyamik)",
  };
};

// Sign in with Google (Popup flow)
export const signInWithGoogle = async (): Promise<UserAuthProfile | null> => {
  if (!auth) {
    throw new Error("Firebase Auth is not initialized. Please verify configuration.");
  }
  const provider = new GoogleAuthProvider();
  // Prompt user to select account
  provider.setCustomParameters({ prompt: "select_account" });

  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  const profile: UserAuthProfile = {
    uid: user.uid,
    displayName: user.displayName || "ছাত্র/ছাত্রী",
    email: user.email || undefined,
    photoURL: user.photoURL || undefined,
    isGuest: false,
    avatarEmoji: "🌟",
    targetYear: 2026,
    classGrade: "Class 10 (Madhyamik)",
  };

  // Sync profile to Firestore
  if (db) {
    try {
      await setDoc(doc(db, "users", user.uid), profile, { merge: true });
    } catch (e) {
      console.warn("Firestore profile sync skipped:", e);
    }
  }

  return profile;
};

// Sign in as Guest (Anonymous)
export const signInAsGuest = async (): Promise<UserAuthProfile> => {
  if (auth) {
    try {
      const result = await signInAnonymously(auth);
      return {
        uid: result.user.uid,
        displayName:
          localStorage.getItem("wbbse_student_name") || "অতিথি পরীক্ষার্থী",
        isGuest: true,
        avatarEmoji: "🎓",
        targetYear: 2026,
        classGrade: "Class 10 (Madhyamik)",
      };
    } catch (err) {
      console.warn("Anonymous Firebase signin fallback to local guest:", err);
    }
  }
  return createGuestProfile();
};

// Sign Out
export const logoutUser = async (): Promise<void> => {
  if (auth && auth.currentUser) {
    await fbSignOut(auth);
  }
};

// Listen to Auth State changes
export const subscribeToAuthChanges = (
  callback: (userProfile: UserAuthProfile | null) => void
) => {
  if (!auth) return () => {};
  return onAuthStateChanged(auth, async (user) => {
    if (user && !user.isAnonymous) {
      const profile: UserAuthProfile = {
        uid: user.uid,
        displayName: user.displayName || "ছাত্র/ছাত্রী",
        email: user.email || undefined,
        photoURL: user.photoURL || undefined,
        isGuest: false,
        avatarEmoji: "🌟",
        targetYear: 2026,
        classGrade: "Class 10 (Madhyamik)",
      };
      callback(profile);
    } else {
      callback(null);
    }
  });
};

// Sync item to Firestore
export const syncHistoryToCloud = async (uid: string, item: HistoryItem) => {
  if (!db || !uid || uid.startsWith("guest_")) return;
  try {
    await setDoc(doc(db, "users", uid, "history", item.id), item);
  } catch (err) {
    console.warn("Cloud history sync error:", err);
  }
};

export const syncNoteToCloud = async (uid: string, note: StudyNote) => {
  if (!db || !uid || uid.startsWith("guest_")) return;
  try {
    await setDoc(doc(db, "users", uid, "notes", note.id), note);
  } catch (err) {
    console.warn("Cloud note sync error:", err);
  }
};

export const deleteNoteFromCloud = async (uid: string, noteId: string) => {
  if (!db || !uid || uid.startsWith("guest_")) return;
  try {
    await deleteDoc(doc(db, "users", uid, "notes", noteId));
  } catch (err) {
    console.warn("Cloud note delete error:", err);
  }
};

export const syncBookmarkToCloud = async (uid: string, bookmark: BookmarkItem) => {
  if (!db || !uid || uid.startsWith("guest_")) return;
  try {
    await setDoc(doc(db, "users", uid, "bookmarks", bookmark.id), bookmark);
  } catch (err) {
    console.warn("Cloud bookmark sync error:", err);
  }
};

export const deleteBookmarkFromCloud = async (uid: string, bookmarkId: string) => {
  if (!db || !uid || uid.startsWith("guest_")) return;
  try {
    await deleteDoc(doc(db, "users", uid, "bookmarks", bookmarkId));
  } catch (err) {
    console.warn("Cloud bookmark delete error:", err);
  }
};

export { auth, db };

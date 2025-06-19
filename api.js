import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  startAfter,
  where,
} from "firebase/firestore/lite";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db };
//fetch function

const recipeCollectionRef = collection(db, "recipes");

export async function getRecipesPaginated(
  lastDoc = null,
  pageSize = 8,
  mealType = null
) {
  const paginatedCollectionRef = collection(db, "recipes");

  let q;
  if (mealType) {
    q = query(
      paginatedCollectionRef,
      where("mealType", "==", mealType),
      orderBy("createdAt", "desc"),
      ...(lastDoc ? [startAfter(lastDoc)] : []),
      limit(pageSize)
    );
  } else {
    q = query(
      paginatedCollectionRef,
      orderBy("createdAt", "desc"),
      ...(lastDoc ? [startAfter(lastDoc)] : []),
      limit(pageSize)
    );
  }

  // if (lastDoc) {
  //   q = query(
  //     paginatedCollectionRef,
  //     orderBy("createdAt", "desc"),
  //     startAfter(lastDoc),
  //     limit(pageSize)
  //   );
  // }

  const snapshot = await getDocs(q);

  const recipes = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  const lastVisible = snapshot.docs[snapshot.docs.length - 1] || null;

  return { recipes, lastVisible };
}

export async function getRecipes() {
  const snapshot = await getDocs(recipeCollectionRef);
  const recipes = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return recipes;
}

export async function addUserRecipe(recipeData, userId) {
  const userRecipeCollectionRef = collection(
    db,
    "userRecipes",
    userId,
    "recipes"
  );
  const docRef = await addDoc(userRecipeCollectionRef, recipeData);
  return docRef.id;
}

export async function getUserRecipes(userId) {
  const userRecipeCollectionRef = collection(
    db,
    "userRecipes",
    userId,
    "recipes"
  );
  const snapshot = await getDocs(userRecipeCollectionRef);
  const userRecipes = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return userRecipes;
}

export async function getUserRecipeById(recipeId, userId) {
  const docRef = doc(db, "userRecipes", userId, "recipes", recipeId);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    throw new Error("Recipe not found");
  }
  return {
    ...snapshot.data(),
    id: snapshot.id,
  };
}

export async function deleteUserRecipe(recipeId, userId) {
  const recipeRef = doc(db, "userRecipes", userId, "recipes", recipeId);
  await deleteDoc(recipeRef);
}

export async function getRecipe(id) {
  const docRef = doc(db, "recipes", id);
  const snapshot = await getDoc(docRef);
  return {
    ...snapshot.data(),
    id: snapshot.id,
  };
}

export async function uploadRecipeImage(imageFile) {
  const storage = getStorage();
  const imageRef = ref(
    storage,
    `userRecipeImages/${Date.now()}-${imageFile.name}`
  );

  const snapshot = await uploadBytes(imageRef, imageFile);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
}

export async function loginUser({ email, password }) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (err) {
    throw {
      message: err.message,
      code: err.code,
    };
  }
}

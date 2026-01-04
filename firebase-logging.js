// firebase-logging.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV4OESYVvV4uLYD2wxGY2fnxLYJoOzkC0",
  authDomain: "prof-prof.firebaseapp.com",
  projectId: "prof-prof",
  storageBucket: "prof-prof.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to log transaction
export async function logTransaction(user_email, service, amount, payment_method, status) {
  try {
    const docRef = await addDoc(collection(db, "transactions"), {
      user_email: user_email,
      service: service,
      amount: amount,
      payment_method: payment_method,
      status: status,
      date: serverTimestamp()
    });
    console.log(`Transaction logged: ${service} - ${amount} - ${payment_method}`);
  } catch (error) {
    console.error("Error logging transaction:", error);
  }
}

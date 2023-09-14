import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card/Card";

const firebaseConfig = {
  apiKey: "AIzaSyBsreXpfdj-iCwJDpPJa60FwETVJ_mlDwI",
  authDomain: "a11y-cards.firebaseapp.com",
  databaseURL: "https://a11y-cards-default-rtdb.firebaseio.com",
  projectId: "a11y-cards",
  storageBucket: "a11y-cards.appspot.com",
  messagingSenderId: "577476194474",
  appId: "1:577476194474:web:f0e9b425bec491945720d3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const colRef = collection(db, "flashcards");

function App() {
  const [currentCard, setCurrentCard] = useState(null);
  const [toggled, setToggled] = useState(false)

  useEffect(() => {
    fetchRandomCard();
  }, []);

  async function fetchRandomCard() {
    // Ideally, fetch the count from a cached location instead of querying all documents.
    const allDocsSnap = await getDocs(colRef);
    const totalCount = allDocsSnap.size;

    const randomDocIndex = Math.floor(Math.random() * totalCount);

    const randomCardQuery = query(
      colRef,
      orderBy("id"),
      limit(randomDocIndex + 1)
    );
    const randomCardSnap = await getDocs(randomCardQuery);
    const randomCardDoc = randomCardSnap.docs[randomDocIndex];

    setCurrentCard((prevCard) => randomCardDoc.data());
  }

function toggleCard() {
  setToggled((prevToggled) => !prevToggled)
}
  return (
    <div className="App">
      {currentCard && (
        <Card front={currentCard.front} back={currentCard.back} toggleCard={toggleCard} toggled={toggled}/>
      )}
    </div>
  );
}

export default App;

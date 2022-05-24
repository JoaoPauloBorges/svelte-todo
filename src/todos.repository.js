import { app } from "./firebase";
import { doc, getFirestore, updateDoc, query, where, orderBy, collection, addDoc, getDocFromServer, deleteDoc } from 'firebase/firestore';
import { collectionData } from "rxfire/firestore";
import { startWith } from "rxjs/operators";

const firestore = getFirestore(app);
const todosReference = collection(firestore, "todos");

export function addDocument({
    uid,
    text,
}) {
    addDoc(todosReference, {
        uid,
        text,
        complete: false,
        created: Date.now(),
    }).then(docRef => { console.log("Document written with ID: ", docRef.id); return docRef; })
}

export function updateDocument({ id, newStatus }) {
    updateDoc(doc(todosReference, id), { complete: newStatus });
}

export function removeDocument(id) {
    deleteDoc(doc(todosReference, id))

}

export function getAllDocuments(uid) {
    console.log(`loading todos of userId ${uid}`);
    const q = query(todosReference, where("uid", "==", uid), orderBy("created", "desc"))
    return collectionData(q, { idField: 'id' }).pipe(startWith([]));
    //idField = the name I want for the document identification
}

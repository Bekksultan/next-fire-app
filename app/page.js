"use client"
import React, { useState, useEffect } from "react";
import { collection, addDoc, getDoc, querySnapshot, query, onSnapshot, deleteDoc, doc, } from "firebase/firestore"; 
import {db} from "./firebase";

export default function Home() {
  const [items, setItems] = useState([
    {name: "tea", price: 4.95},
    {name: "books", price: 10},
    {name: "cake", price: 7.95},
  ]);
  const [newItem, setNewItem] = useState( {name: '', price: ''});
  const [total, setTotal] = useState(0);

  // Add item to database
  const addItem = async (e) => {
    e.preventDefault();
    if(newItem.name !== '' && newItem.price !== ''){
      //setItems([...items, newItem]);
      await addDoc(collection(db,"items"), {
        name: newItem.name.trim(),
        price: newItem.price, 
      });
      setNewItem({name:'', price: ''});
    }
    
  };
  // Read item from database
  useEffect(() =>{
     const q = query(collection(db, 'items'));
     const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = []
      querySnapshot.forEach((doc) => {
        itemsArr.push({...doc.data(), id: doc.id})
      });
        setItems(itemsArr);

        // Read total from itemsArr
        const calculateTotal = () => {
          const totalPrice = itemsArr.reduce((sum, item) => sum + parseFloat(item.price), 0)
        setTotal(totalPrice)
      }
      calculateTotal()
      return () => unsubscribe();

     });
  }, [])

  // Delete item from database
  const deleteItem = async (id) => {
      await deleteDoc(doc(db, 'items', id));
  }
   

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm ">
        <h1 className="text-5xl p-4 text-center text-amber-500">ToDo Tracker App</h1>
        <div className="bg-red-700 p-8 rounded-xl">
          <form className="grid grid-cols-6 items-center text-black">
            <input value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} className="col-span-3 p-3 border rounded-lg" type="text" placeholder="Enter Item" />
            <input value={newItem.price} onChange={(e) => setNewItem({...newItem, price: e.target.value})} className="col-span-2 p-3 border rounded-lg mx-3" type="number" placeholder="Enter $" />
            <button onClick={addItem} className="text-white bg-indigo-950 hover:bg-amber-500 p-3 text-xl rounded-lg" type="submit">Add</button>
          </form>
          <ul>
            {items.map((item, id) => (
   
              <li key={id} className="my-4 w-full flex justify-between bg-fuchsia-950 rounded-lg">
                <div className="p-4 w-full text-lg flex justify-between">
                  <span className="capitalize">{item.name}</span>
                  <span>$ {item.price}</span>
                </div>
                <button onClick={() => deleteItem(item.id)} className="ml-8 p-4 border-2  border-amber-500 hover:bg-amber-500 w-20 ">X</button>
              </li>
             ))}
          </ul>
          {items.length < 1 ? ("") : (
            <div className="flex justify-center p-4 rounded-lg bg-green-700">
         
              <span className=" text-xl rounded-lg">$ {total}</span>
            </div>
          )}
        </div>
        

      </div>
    </main>
  );
}

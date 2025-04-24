'use client'

import React from 'react';
import styles from './test.module.css';
import { useState } from 'react';

export default function test (): JSX.Element {
// Your Test Starts Here
const [toDoList, setToDoList] = useState<string[]>([]);
const [item, setItem] = useState("Enter new item here");
const [warning, setWarning] = useState(false);
const [editItemIdex, setEditItemIndex] = useState<number | null>(null);
const [editItem, setEditItem] = useState<string>('');
// handles when use clicked add button
    function handleAddItem(){
        //check if use input is empty
        if (item.trim() === '') {
            setWarning(true);
        } 
        else {
        // add new item to toDolist    
            setToDoList([...toDoList, item]);
            
        
        }


    }
    // handle clear button, set toDolist to empty
    function handleClearItem(){
        setToDoList([]);

    }
    // handle delete button for each item, remove them from toDolist
    function handleDelete(index: number){
        setToDoList(toDoList.filter((_, i) => i !== index));

    }

    return (
        <div className={styles.container}>
            <input
                value ={item}
                onChange={e => {setItem(e.target.value);
                setWarning(false);
                }}
            
            />
            {/* shwoing warning message if user entered empty input*/}
            {warning && <p style={{ color: 'red' }}>Input can not be empty</p>}
            <br/>
            <div className={styles.buttonGroup}>
                {/* add button for add new item */}
            <button onClick={handleAddItem}>Add</button>
            {/* clear button empty the to do list*/}
            <button onClick={handleClearItem}>clear</button>
            </div>
            
            <ul className={styles.list}>
                {toDoList.map((todo, idx) => (
                    <li key={idx} className={styles.listItem}>
                        {/* check if current index equal to edit index, using ? incase its null*/}

                        {editItemIdex === idx ? (
                            <>
                            {/* create input box for user to edit the item */}
                                <input
                                    value={editItem}
                                    onChange={e => setEditItem(e.target.value)}
                                />
                                {/* save button for user to save the item*/}
                                <button onClick={() => {
                                    const newList = [...toDoList];
                                    newList[idx] = editItem;
                                    setToDoList(newList);
                                    setEditItemIndex(null);
                                }}>Save</button>
                                {/* cancel button set edit index back to null*/}
                                <button onClick={() => setEditItemIndex(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                            {/* if user dont want to edit any thing, show the to do list item and give them option to delete items*/}
                                {todo}
                                <button
                                    onClick={() => handleDelete(idx)}
                                    style={{ marginLeft: "10px", color: "red" }}
                                >
                                    Delete
                                </button>
                                {/* edit button, save the index and content for current item*/}
                                <button
                                    onClick={() => {
                                        setEditItemIndex(idx);
                                        setEditItem(todo);
                                    }}
                                    style={{ marginLeft: "10px" }}
                                >
                                    Edit
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>

            
        </div>
    );
};
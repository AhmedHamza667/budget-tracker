import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import Modal from '../ui/Modal';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineEdit } from "react-icons/ai";



export default function Root() {
    const [startingBalance, setStartingBalance] = useState(0);
    const [endingBalance, setEndingBalance] = useState(startingBalance);
    const [modalVisible, setIsModalVisible] = useState(false);
    const [transactions, setTransactions] = useState([]);
  
    useEffect(() => {
      fetchTransactions();
    }, []);
  
    async function fetchTransactions() {
      const response = await fetch('http://localhost:3000/transactions');
      const initTrans = await response.json();
      setTransactions(initTrans);
    }
  

    async function pushTransaction(transaction) {
      const response = await fetch('http://localhost:3000/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });
  
      if (response.ok) {
        const updatedTransaction = await response.json();
        setTransactions([...transactions, updatedTransaction]);
        setEndingBalance(endingBalance + updatedTransaction.amount);
      } else {
        // Handle error
        console.log('Error pushing transaction');
      }
    }
  
  
    function onSubmitClick(updatedBalance) {
      setStartingBalance(parseFloat(updatedBalance));
      setEndingBalance(parseFloat(updatedBalance));
      setIsModalVisible(false);
    }
  
  
    function onAddClick(amount, date, from) {
      const newTransaction = {
        name: from,
        amount: amount,
        date: date,
      };
  
      setTransactions([...transactions, newTransaction]);
      pushTransaction(newTransaction);
      setEndingBalance(endingBalance + amount);
      setIsModalVisible(false);
    }
  
    function onResetClick(e) {
      e.preventDefault();
      setTransactions([]);
      setEndingBalance(parseFloat(startingBalance));
    }
  
    function deleteTransaction(index) {
      const updatedTransactions = [...transactions];
      const deletedTransaction = updatedTransactions.splice(index, 1)[0];
      setTransactions(updatedTransactions);
      setEndingBalance(endingBalance - deletedTransaction.amount);
    }
  
    return (
      <>
        <Modal
        isVisible={modalVisible}
        hideModal={() => setIsModalVisible(false)}
        onSubmitClick={onSubmitClick}
        onAddClick={onAddClick}
         />
        <div className='parent-container'>
        <Link to={'/home'} className="title">
          <AiOutlineHome />
          Budget tracker
        </Link>
        <div className="transactions-div">
          <h2>Transactions</h2>
          <div>
          <button  className="btn add-btn" onClick={() => setIsModalVisible(true)}>
            + Add
          </button>
        </div>
  
          <h3>Starting balance: ${startingBalance}</h3>
          <table id="transactions-table">
            <thead className='th'>
              <tr>
                <th>Transaction</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {transactions
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.name}</td>
                    <td className={transaction.amount >= 0 ? 'green' : 'red'}>
                      ${transaction.amount}
                    </td>
                    <td className="date-format">{transaction.date}</td>
                    <td>
                      <button id="x" onClick={() => deleteTransaction(index)}></button>
                    </td>
                    <td>
                      <Link to={`http://localhost:3000/transactions/${index}`}>
                        <AiOutlineEdit className='edit-btn'/>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <h3>Ending balance: ${endingBalance}</h3>
          <button className="btn" id="reset-btn" onClick={onResetClick}>
            Reset
          </button>
        </div>
  
        </div>
      </>
    );
  }
  

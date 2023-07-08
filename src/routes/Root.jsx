import React, { useState, useEffect } from 'react';
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
    }, [transactions]);
  
    useEffect(() => {
      calculateEndingBalance();
    }, [transactions]);

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
      setIsModalVisible(false);
    }
  


  
    function deleteTransaction(id) {
      fetch(`http://localhost:3000/transactions/${id}`, {
      method: 'DELETE',
     })
     .then(response => {
      if (response.ok) {
        // Transaction deleted successfully
        const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
        const deletedTransaction = transactions.find(transaction => transaction.id === id);
        setTransactions(updatedTransactions);
        setEndingBalance(endingBalance - deletedTransaction.amount);
      } else {
        // transaction deletion failed
      }
    })
    .catch(error => {
      console.log('Error deleting transaction:', error);
    });
    }
  
    function calculateEndingBalance() {
      let balance = startingBalance;
      transactions.forEach(transaction => {
        balance += transaction.amount;
      });
      setEndingBalance(balance);
    }
  
    return (
      <>
        <Modal
        isVisible={modalVisible}
        hideModal={() => setIsModalVisible(false)}
        onSubmitClick={onSubmitClick}
        onAddClick={onAddClick}
         />
         <Link to={'/home'} className="title">
          <AiOutlineHome />
          Budget tracker
        </Link>
        <div className='parent-container'>
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
                  <tr key={transaction.id}>
                    <td>{transaction.name}</td>
                    <td className={transaction.amount >= 0 ? 'green' : 'red'}>
                      ${transaction.amount}
                    </td>
                    <td className="date-format">{transaction.date}</td>
                    <td>
                      <button id="x" onClick={() => deleteTransaction(transaction.id)}></button>
                    </td>
                    <td>
                      <Link to={`/edit/${transaction.id}`}>
                        <AiOutlineEdit className='edit-btn'/>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <h3>Ending balance: ${endingBalance}</h3>
        </div>
  
        </div>
      </>
    );
  }
  

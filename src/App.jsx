import React, { useState, useEffect } from 'react';
import './index.css';
import Modal from './ui/Modal';

function App() {
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



  function onSubmitClick(updatedBalance) {
    setStartingBalance(parseFloat(updatedBalance));
    setEndingBalance(parseFloat(updatedBalance));
    setIsModalVisible(false);
  }

  function onSpendClick(spentAmount, spentDate, spentOn) {
    const newTransaction = {
      name: spentOn,
      amount: -spentAmount,
      date: spentDate,
    };

    setTransactions([...transactions, newTransaction]);
    setEndingBalance(endingBalance - spentAmount);
    setIsModalVisible(false);
  }

  function onGainClick(gainAmount, gainDate, gainFrom) {
    const newTransaction = {
      name: gainFrom,
      amount: gainAmount,
      date: gainDate,
    };

    setTransactions([...transactions, newTransaction]);
    setEndingBalance(endingBalance + gainAmount);
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
        onSpendClick={onSpendClick}
        onGainClick={onGainClick}
      />
      <div className='parent-container'>
      <h1 className="title">Budget tracker</h1>
      <div className="transactions-div">
        <h2>Transactions</h2>
        <div>
        <button className="btn add-btn" onClick={() => setIsModalVisible(true)}>
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
              <th></th>
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

export default App;

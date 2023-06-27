import { useState } from 'react'
import './index.css'


function App() {

  const [startingBalance, setStartingBalance] = useState(0);
  const [endingBalance, setEndingBalance] = useState(startingBalance);
  const [transactions, setTransactions] = useState([ {name: 'Spotify', amount: 100, date: '06/22/2023' },
  { name: 'Amazon', amount: 200, date: '06/12/2023'} ]);

  function onSubmitClick(e) {
    e.preventDefault();
    const budgetInput = document.getElementById('budget');
    const updatedBalance = budgetInput.value;
    if (budgetInput.value === '') {
      alert('Please enter a balance');
      return;
    }
    setStartingBalance(updatedBalance);
    setEndingBalance(Number(updatedBalance));
    budgetInput.value = ''; // Clearing the input field
    }
  function onSpendClick(e) {
    e.preventDefault();
    const spentAmount = document.getElementById('spending-amount');
    const spentDate = document.getElementById('spending-date');
    const spentOn = document.getElementById('spending-on');
    if (spentAmount.value === '')
    {
      alert('Please enter a spent amount');
      return;
    }

    const newTransaction = {name: spentOn.value, amount: -parseFloat(spentAmount.value), date: spentDate.value};
    setTransactions([...transactions, newTransaction]);
    setEndingBalance(endingBalance + newTransaction.amount);
    spentAmount.value = '';
    spentDate.value = '';
    spentOn.value = '';
    }

   function onGainClick(e) {
    e.preventDefault();
    const gainAmount = document.getElementById('gain-amount');
    const gainDate = document.getElementById('gain-date');
    const gainOn = document.getElementById('gain-from');
    if (gainAmount.value === '')
    {
      alert('Please enter a gain amount');
      return;
    }

    const newTransaction = {name: gainOn.value, amount: parseFloat(gainAmount.value), date: gainDate.value};
    setTransactions([...transactions, newTransaction]);
    setEndingBalance(endingBalance + newTransaction.amount);
    gainAmount.value = '';
    gainDate.value = '';
    gainOn.value = '';
    }
    
    function onResetClick(e) {
      e.preventDefault();
      setTransactions([]);
      setEndingBalance(Number(startingBalance));
    }

    function deleteTransaction(index) {
      const updatedTransactions = [...transactions];
      const deletedTransaction = updatedTransactions.splice(index, 1)[0];
      setTransactions(updatedTransactions);
      setEndingBalance(endingBalance - deletedTransaction.amount);
    }  return (
    <>
        <h1 className='title'>Budget tracker</h1>

    <div className='input-group'>
      <div className='budget-div'>
        <input id='budget' type="text" placeholder='Starting budget' />
        <button className='btn' id='budget-submit' onClick={onSubmitClick} >Submit</button>
        <br />
      </div>

      <div className='spent-div'>
        <input id='spending-amount' type="text" placeholder='spending amount' />
        <input id='spending-date' type="text" placeholder='Date mm/dd/yyyy' />
        <input id='spending-on' type="text" placeholder='Spent on' />
        <button className='btn' id='spending-submit' onClick={onSpendClick} >Spent</button>
        <br />
      </div>

      <div className='gain-div'>
        <input id='gain-amount' type="text" placeholder='gain amount' />
        <input id='gain-date' type="text" placeholder='Date mm/dd/yyyy' />
        <input id='gain-from' type="text" placeholder='Gained from' />
        <button className='btn' id='gain-submit' onClick={onGainClick} >Gained</button>
        <br />
      </div>

    </div>

      <div className='transcations-div'>
        <h2>Transactions</h2>
        <h3>Starting balance: ${startingBalance}</h3>
        <table id='transcations-table'>
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
                      {transactions
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.name}</td>
                  <td className={transaction.amount >= 0 ? 'green' : 'red'}>${transaction.amount}</td>
                  <td className="date-format">{transaction.date}</td>
                  <td>
                    <button id='x' onClick={() => deleteTransaction(index)}></button>
                  </td>
                </tr>
              ))}

          </tbody>
        </table>
        <h3>Ending balance: ${endingBalance}</h3>
        <button className='btn' id='reset-btn' onClick={onResetClick}>Reset</button>
      </div>

    </>
  )
}

export default App
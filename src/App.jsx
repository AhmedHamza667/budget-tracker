import { useState } from 'react'
import './index.css'


function App() {

  const [startingBalance, setStartingBalance] = useState(0);
  const [endingBalance, setEndingBalance] = useState(startingBalance);
  const [transctions, setTransctions] = useState([ {name: 'Spotify', amount: 100, date: '06/22/2023'}, {name: 'Amazon', amount: 200, date: '06/12/2023'} ]);

  function onSubmitClick(e) {
    e.preventDefault();
    const budgetInput = document.getElementById('budget');
    const updatedBalance = budgetInput.value;
    setStartingBalance(updatedBalance);
    setEndingBalance(updatedBalance);
    budgetInput.value = ''; // Clearing the input field
    }
  function onSpendClick(e) {
    e.preventDefault();
    const spentAmount = document.getElementById('spending-amount');
    const spentDate = document.getElementById('spending-date');
    const spentOn = document.getElementById('spending-on');
    const newTransaction = {name: spentOn.value, amount: -parseFloat(spentAmount.value), date: spentDate.value};
    setTransctions([...transctions, newTransaction]);
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
    const newTransaction = {name: gainOn.value, amount: parseFloat(gainAmount.value), date: gainDate.value};
    setTransctions([...transctions, newTransaction]);
    setEndingBalance(endingBalance + newTransaction.amount);
    gainAmount.value = '';
    gainDate.value = '';
    gainOn.value = '';
    }
    
  return (
    <>
      <h1 className='title'>Budget tracker</h1>
      <div className='budget-div'>
        <input id='budget' type="text" placeholder='Please enter your starting budget' />
        <button id='budget-submit' onClick={onSubmitClick} >Submit</button>
        <br />
      </div>

      <div className='spent-div'>
        <input id='spending-amount' type="text" placeholder='spending amount' />
        <input id='spending-date' type="text" placeholder='Date mm/dd/yyyy' />
        <input id='spending-on' type="text" placeholder='Spent on' />
        <button id='spending-submit' onClick={onSpendClick} >Spent</button>
        <br />
      </div>

      <div className='gain-div'>
        <input id='gain-amount' type="text" placeholder='gain amount' />
        <input id='gain-date' type="text" placeholder='Date mm/dd/yyyy' />
        <input id='gain-from' type="text" placeholder='Gained from' />
        <button id='gain-submit' onClick={onGainClick} >Gained</button>
        <br />
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
            {transctions
            .sort((a, b) => new Date(b.date) - new Date(a.date)) //sorting by date
            .map(transaction => (
              <tr>
                <td>{transaction.name}</td> 
                <td className={transaction.amount >= 0 ? 'green' : 'red'}> ${transaction.amount}</td> 
                <td className='date-format'>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Ending balance: ${endingBalance}</h3>
      </div>



    </>
  )
}

export default App

import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';



export default function Edit() {
  
  const { id } = useParams(); // Access the transaction ID from URL parameters

  const [transaction, setTransaction] = useState(null);
  let ModalRef = useRef();


  useEffect(() => {
    fetchTransactionDetails(id);
  }, [id]);


  function handleAddClick(e) {
    e.preventDefault();
    const AmountInput = document.getElementById('amount');
    const DateInput = document.getElementById('date');
    const FromInput = document.getElementById('from');
    if (AmountInput.value === '') {
      alert('Please enter an amount');
      return;
    }
    const amount = parseFloat(AmountInput.value);
    const date = DateInput.value;
    const from = FromInput.value;
    const newTransaction = {
      name: from,
      amount: amount,
      date: date,
    };
    updateTransaction(newTransaction);
    AmountInput.value = '';
    DateInput.value = '';
    FromInput.value = '';
  }

  async function fetchTransactionDetails(transactionId) {
    const response = await fetch(`http://localhost:3000/transactions/${transactionId}`);
    const transactionDetails = await response.json();
    setTransaction(transactionDetails);
  }

  async function updateTransaction(updatedTransaction) {

    const response = await fetch(`http://localhost:3000/transactions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTransaction),
    });

    if (response.ok) {
      // go back to home page
      window.location.href = '/home';

    } else {
      console.log('Transaction update failed');
    }
  }

  return (
    <div className='modal' ref={ModalRef}>
      <h1>Edit Transaction</h1>
      {transaction && (
        <div className="gain-div">
          <input id="amount" type="text" placeholder={transaction.amount}/>
          <input id="date" type="text"  placeholder={transaction.date}/>
          <input id="from" type="text" placeholder={transaction.name}/>

          <button className="btn" id="gain-submit" onClick={handleAddClick}>
            Update
          </button>
          <br />
        </div>
      )}
      <Link to="/home" className='btn back-btn'>Back</Link>
    </div>
  );
}



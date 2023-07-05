import React, {useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';



function Modal({ isVisible, hideModal, onSubmitClick, onAddClick }) {
  let ModalRef = useRef();
  useEffect(() => {
    function handleClickOutsideModal(event) {
      if (!ModalRef.current.contains(event.target)){
        hideModal();
      }
    }

    function handleEscapeKeyPress(event) {
      if (event.key === 'Escape') {
        hideModal();
      }
    }
    document.addEventListener('mousedown', handleClickOutsideModal);
    document.addEventListener('keydown', handleEscapeKeyPress);

    return () => {
      document.removeEventListener('keydown', handleEscapeKeyPress);
      document.removeEventListener('mousedown', handleClickOutsideModal);
    };
  }, [hideModal]);

  
  if (!isVisible) return null;

  function handleSubmitClick(e) {
    e.preventDefault();
    const budgetInput = document.getElementById('budget');
    const updatedBalance = budgetInput.value;
    if (updatedBalance === '') {
      alert('Please enter a balance');
      return;
    }
    onSubmitClick(updatedBalance);
    budgetInput.value = ''; // Clearing the input field
  }

  function handleAddClick(e) {
    e.preventDefault();
    const AmountInput = document.getElementById('amount');
    const DateInput = document.getElementById('date');
    const FromInput = document.getElementById('from');
    if (AmountInput.value === '') {
      alert('Please enter an amount');
      return;
    }
    const Amount = parseFloat(AmountInput.value);
    const Date = DateInput.value;
    const From = FromInput.value;
    onAddClick(Amount, Date, From);
    AmountInput.value = '';
    DateInput.value = '';
    FromInput.value = '';
  }

  return (
    <div className="modal" >
      <form ref={ModalRef}>
        <div className="budget-div">
          <input id="budget" type="text" placeholder="Starting budget" />
          <button className="btn" id="budget-submit" onClick={handleSubmitClick}>
            Submit
          </button>
          <br />
        </div>

        

        <div className="gain-div">
          <input id="amount" type="text" placeholder="Amount" />
          <input id="date" type="text" placeholder="Date mm/dd/yyyy" />
          <input id="from" type="text" placeholder="Name" />
          <button className="btn" id="gain-submit" onClick={handleAddClick}>
            Add
          </button>
          <Link to= {'../'}>
          <h1>go back</h1>
          </Link>
          <br />
        </div>
      </form>  
    </div>
  );
}

export default Modal;

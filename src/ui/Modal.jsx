import React, {useEffect} from 'react';

function Modal({ isVisible, hideModal, onSubmitClick, onSpendClick, onGainClick }) {
  useEffect(() => {
    function handleEscapeKeyPress(event) {
      if (event.key === 'Escape') {
        hideModal();
      }
    }

    document.addEventListener('keydown', handleEscapeKeyPress);

    return () => {
      document.removeEventListener('keydown', handleEscapeKeyPress);
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

  function handleSpendClick(e) {
    e.preventDefault();
    const spentAmountInput = document.getElementById('spending-amount');
    const spentDateInput = document.getElementById('spending-date');
    const spentOnInput = document.getElementById('spending-on');
    if (spentAmountInput.value === '') {
      alert('Please enter a spent amount');
      return;
    }
    const spentAmount = parseFloat(spentAmountInput.value);
    const spentDate = spentDateInput.value;
    const spentOn = spentOnInput.value;
    onSpendClick(spentAmount, spentDate, spentOn);
    spentAmountInput.value = '';
    spentDateInput.value = '';
    spentOnInput.value = '';
  }

  function handleGainClick(e) {
    e.preventDefault();
    const gainAmountInput = document.getElementById('gain-amount');
    const gainDateInput = document.getElementById('gain-date');
    const gainFromInput = document.getElementById('gain-from');
    if (gainAmountInput.value === '') {
      alert('Please enter a gain amount');
      return;
    }
    const gainAmount = parseFloat(gainAmountInput.value);
    const gainDate = gainDateInput.value;
    const gainFrom = gainFromInput.value;
    onGainClick(gainAmount, gainDate, gainFrom);
    gainAmountInput.value = '';
    gainDateInput.value = '';
    gainFromInput.value = '';
  }

  return (
    <div className="modal">
      <form>
        <div className="budget-div">
          <input id="budget" type="text" placeholder="Starting budget" />
          <button className="btn" id="budget-submit" onClick={handleSubmitClick}>
            Submit
          </button>
          <br />
        </div>

        <div className="spent-div">
          <input id="spending-amount" type="text" placeholder="Spending amount" />
          <input id="spending-date" type="text" placeholder="Date mm/dd/yyyy" />
          <input id="spending-on" type="text" placeholder="Spent on" />
          <button className="btn" id="spending-submit" onClick={handleSpendClick}>
            Spent
          </button>
          <br />
        </div>

        <div className="gain-div">
          <input id="gain-amount" type="text" placeholder="Gain amount" />
          <input id="gain-date" type="text" placeholder="Date mm/dd/yyyy" />
          <input id="gain-from" type="text" placeholder="Gained from" />
          <button className="btn" id="gain-submit" onClick={handleGainClick}>
            Gained
          </button>
          <br />
        </div>
      </form>
      
      

      <button className="btn close-btn" onClick={hideModal}>
        Close
      </button>
    </div>
  );
}

export default Modal;

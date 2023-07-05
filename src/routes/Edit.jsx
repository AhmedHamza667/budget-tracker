import Modal from "../ui/Modal";
import { Link } from "react-router-dom";
export default function Edit({isVisible, hideModal, onSubmitClick, onSpendClick, onGainClick}) {

  return (
    <div>
    
      
      <Modal
        isVisible={true}
        hideModal={() => setIsModalVisible(false)}
        onSubmitClick={onSubmitClick}
        onSpendClick={onSpendClick}
        onGainClick={onGainClick}
         />
    </div>
  );
}

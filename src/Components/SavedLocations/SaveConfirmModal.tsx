import { Text } from '../Text/Text';

export type SaveConfirmCityProps = {

  cityName: string;
  onConfirm: () => void;
  onCancel: () => void;
  
}

export const SaveConfirmModal: React.FC<SaveConfirmCityProps> = ({ cityName, onConfirm, onCancel }) => {
  return (

    <div className='popUpScreen'>
      <div className='savedLocationCard'>
        <Text variant={'h3'} style={{marginBottom: 8,padding: 20}}>Do you want to add {cityName} to Saved Locations?</Text>
        <div className='ConfirmationButtons'>
          <button onClick={onCancel} style={{padding: '8px 12px', borderRadius: 8, border: '1px solid #555', background: 'transparent', color: '#fff', cursor: 'pointer'}}>Cancel</button>
          <button onClick={onConfirm} style={{padding: '8px 12px', borderRadius: 8, border: 'none', background: '#06b6d4', color: '#000', fontWeight: 700, cursor: 'pointer'}}>Yes</button>
        </div>
      </div>
    </div>
  )
}

export default SaveConfirmModal;

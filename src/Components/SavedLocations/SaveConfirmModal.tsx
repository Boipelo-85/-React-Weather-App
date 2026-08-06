import { Text } from '../Text/Text';

export type SaveConfirmCityProps = {
  cityName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const SaveConfirmModal: React.FC<SaveConfirmCityProps> = ({ cityName, onConfirm, onCancel }) => {
  return (
    <div style={{position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)', zIndex: 900}}>
      <div style={{background: '#0f1720', padding: 20, borderRadius: 12, minWidth: 300, color: '#fff', boxShadow: '0 6px 18px rgba(0,0,0,0.6)'}}>
        <Text variant={'h3'} style={{marginBottom: 8}}>Add {cityName} to Saved Locations?</Text>
        <div style={{display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 12}}>
          <button onClick={onCancel} style={{padding: '8px 12px', borderRadius: 8, border: '1px solid #555', background: 'transparent', color: '#fff', cursor: 'pointer'}}>Cancel</button>
          <button onClick={onConfirm} style={{padding: '8px 12px', borderRadius: 8, border: 'none', background: '#06b6d4', color: '#000', fontWeight: 700, cursor: 'pointer'}}>Yes</button>
        </div>
      </div>
    </div>
  )
}

export default SaveConfirmModal;

import { Button } from '@nextui-org/react';
import { IoCloudUploadOutline } from 'react-icons/io5';

const SaveBtn = ({ handleSaveData }: { handleSaveData: () => void }) => {
  return (
    <Button color="primary" onPress={handleSaveData}>
      <IoCloudUploadOutline size={18} />
      Save
    </Button>
  );
};

export default SaveBtn;

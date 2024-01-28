import {
  useTextContext,
  useCustomImageContext,
  useCardContext
} from '../context';

const useEditorStateCheck = (): boolean => {
  const { state: { text } } = useTextContext();
  const { state: { card } } = useCardContext();
  const { state: { userImage } } = useCustomImageContext();
  const isPhotoCard = card.attributes.some((attr) => attr === 'photo' || attr === 'overlay');
  return isPhotoCard ? text.trim() !== '' || userImage !== '' : text.trim() !== '';
};

export default useEditorStateCheck;

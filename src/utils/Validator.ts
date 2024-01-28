class Validator {
  static isEditorValuesValid = (
    text: string, isHeightValid: boolean, userImage: string, isCustomCard: boolean
  ): boolean => {
    if (isCustomCard) {
      return (text.trim() === '' || !isHeightValid || !userImage);
    }
    return (text.trim() === '' || !isHeightValid);
  };

  static validateImageAndSetErrors = (
    files: File[],
    setErrors: (errors: string[]) => void,
    setImage: (image: string) => void
  ): boolean => {
    const imageFile = files[0];
    const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|gif)$/;
    const isValidFileExtension = imageFile && IMAGE_EXTENSIONS.exec(imageFile.name.toLowerCase());
    const newErrors : Array<string> = [];
    const reader = new FileReader();

    if (!imageFile) {
      newErrors.push('editorMessage.imageNotChoosed');
      setImage('');
    }
    if (isValidFileExtension) {
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const originalImage = new Image();
        originalImage.onerror = () => {
          newErrors.push('editorMessage.invalidImageFileContent');
          setImage('');
        };
        if (e.target && typeof e.target.result === 'string') {
          originalImage.src = e.target.result;
        }
      };
      reader.readAsDataURL(imageFile);
    } else {
      newErrors.push('editorMessage.invalidImageExtension');
      setImage('');
    }
    setErrors(newErrors);
    return newErrors.length === 0;
  };
}

export default Validator;

interface FileManager {
  readImageFile: (readble: Readable) => void;
  getInstance: () => FileManager;
}

type ImageCompressConfig = {
  maxHeight: number;
  maxWidth: number;
  quality: number;
};

type Readable = {
  files: File[];
  minCropBoxWidth: number;
  setImage: (image: string) => void;
};

type Compressable = {
  originalImageBase64: string;
  minCropBoxWidth: number;
  setImage: (image: string) => void;
};

class FileManager {
  private static instance: FileManager;

  private imageCompressConfig: ImageCompressConfig;

  private constructor() {
    this.imageCompressConfig = {
      maxHeight: 3000,
      maxWidth: 3000,
      quality: 0.8 // default is 0.92 / value from 0 to 1
    };
  }

  private compressImage = (compressable: Compressable): void => {
    const canvas = document.createElement('canvas');
    const img = document.createElement('img');

    if (img) {
      img.src = compressable.originalImageBase64;
      img.onload = () => {
        const { maxHeight, maxWidth, quality } = this.imageCompressConfig;
        let { width, height } = img;
        let canvasQuality = 1;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * (maxWidth / width)));
            width = maxWidth;
            canvasQuality = quality;
          }
          if (width <= compressable.minCropBoxWidth) {
            width *= 2;
            height *= 2;
          }
        } else if (height > maxHeight) {
          width = Math.round((width * (maxHeight / height)));
          height = maxHeight;
          canvasQuality = quality;
        } else if (width <= compressable.minCropBoxWidth) {
          width *= 2;
          height *= 2;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
        }
        const compressedImage = canvas.toDataURL('image/jpeg', canvasQuality);
        compressable.setImage(compressedImage);
      };
    }
  };

  public readImageFile = (readable: Readable): void => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const originalImage = new Image();
      if (e.target && typeof e.target.result === 'string') {
        originalImage.src = e.target && e.target.result;
      }
      this.compressImage({
        originalImageBase64: originalImage.src,
        minCropBoxWidth: readable.minCropBoxWidth,
        setImage: readable.setImage
      });
    };
    reader.readAsDataURL(readable.files[0]);
  };

  public static getInstance(): FileManager {
    if (!FileManager.instance) {
      FileManager.instance = new FileManager();
    }
    return FileManager.instance;
  }
}

export default FileManager;

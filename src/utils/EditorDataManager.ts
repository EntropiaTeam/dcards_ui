import 'canvas-toBlob';
import { OrderActionsType } from '../context/order/types/OrderTypes';
import { SingleCard } from '../context/card/types/CardTypes';
import { AppConfig } from './AppConfig';
import CardUtils from './Card';

type OrderDataType = {
  text: string;
  cardID: string;
  file?: Blob | string;
};
interface EditorDataManager {
  sendEditorData: (sendable: Sendable) => void;
  getInstance: () => EditorDataManager;
}

type Orderable = {
  data: OrderDataType;
  actions: OrderActionsType;
  cropper: Cropper | null;
  isCustomCard: boolean;
  croppedImage: Blob | null;
};

type Sendable = {
  actions: OrderActionsType;
  cropper: Cropper | null;
  card: SingleCard;
  text: string;
  agreement: boolean | null;
  croppedImage: Blob | null;
  locale: string;
};

class EditorDataManager implements EditorDataManager {
  private croppedImageConfig: Cropper.GetCroppedCanvasOptions;

  private static instance: EditorDataManager;

  private constructor() {
    this.croppedImageConfig = new AppConfig().croppedImageConfig;
  }

  private setOrder = (orderable: Orderable): void => {
    const {
      actions: {
        setNewOrder,
        setOrderRequestProgress
      }
    } = orderable;

    const orderData = new FormData();
    const keys = Object.keys(orderable.data);
    keys.forEach((key) => {
      if (key) {
        orderData.append(key, orderable.data[key as keyof OrderDataType]!);
      }
    });

    setNewOrder(orderData, setOrderRequestProgress);
  };

  private sendCatalogCardData = (
    orderable: Orderable
  ): void => {
    this.setOrder({ ...orderable });
  };

  private sendCustomCardData = (orderable: Orderable): void => {
    const { cropper, croppedImage } = orderable;
    cropper!.getCroppedCanvas(this.croppedImageConfig).toBlob((blob) => {
      const file = croppedImage || blob as Blob;
      this.setOrder({ ...orderable, data: { ...orderable.data, file } });
    }, 'image/jpeg');
  };

  public sendEditorData = (sendable: Sendable): void => {
    const {
      card, text, agreement, locale
    } = sendable;
    const cardID = card.id;
    const isCustomCard = CardUtils.isCustomCard(card);
    const data = {
      cardID, text, tosAgreed: !!agreement, locale
    };
    if (isCustomCard) {
      this.sendCustomCardData({ ...sendable, data, isCustomCard });
    } else {
      this.sendCatalogCardData({ ...sendable, data, isCustomCard });
    }
  };

  public static getInstance(): EditorDataManager {
    if (!EditorDataManager.instance) {
      EditorDataManager.instance = new EditorDataManager();
    }
    return EditorDataManager.instance;
  }
}

export { EditorDataManager };

import {
  ImageConfig, EditorValidationConfig, CardConfig, CropperConfig
} from '../types';
import { SingleCard } from '../context/card/types/CardTypes';
import { getImageUrl } from '../helpers';
import { Brand } from '../enums/Brand';

export interface AppConfiguration {
  customCardId: string;
  customCategoryId: string;
  maxTextareaLength: number;
  editorValidationConfig: EditorValidationConfig;
  cardConfig: CardConfig;
  cropperConfig: CropperConfig;
}

export class AppConfig {
  static [Brand.Edible] = {
    termsOfUseLink: 'https://www.ediblearrangements.com/legal/terms-of-use.aspx',
    privatePolicyLink: 'https://www.ediblearrangements.com/legal/privacy-policy.aspx'
  };

  static [Brand.FruitFlowers] = {
    termsOfUseLink: 'https://www.fruitflowers.com/termsandconditions',
    privatePolicyLink: 'https://www.fruitflowers.com/privacy'
  };

  customCardId: string;

  customCategoryId: string;

  maxTextareaLength: number;

  editorValidationConfig: EditorValidationConfig;

  card: CardConfig;

  cropper: CropperConfig;

  croppedImageConfig: Cropper.GetCroppedCanvasOptions;

  categoriesImgConfig: ImageConfig;

  cardsListImgConfig: ImageConfig;

  constructor() {
    this.customCardId = 'blank_photo_portrait';
    this.customCategoryId = 'custom_photo';
    this.maxTextareaLength = 1500;

    this.croppedImageConfig = {
      width: 1600,
      height: 2550,
      imageSmoothingQuality: 'high',
      fillColor: '#fff'
    };

    this.editorValidationConfig = {
      fullScreenMaxHeight: 170,
      smScreenMaxHeight: 97,
      lgScreenMaxHeight: 150
    };

    this.card = {
      id: '',
      name: '',
      frontImageUrl: '',
      innerImageUrl: '',
      sizes: {
        width: 302,
        height: 481,
        xsWidth: 246,
        xsHeight: 392
      },
      font: {
        family: 'Roboto Slab',
        size: 14,
        color: '#000',
        weight: 500
      },
      textarea: {
        top: 0,
        height: 0
      },
      lineHeight: {
        sizeRatio: 1.36
      }
    };

    this.cropper = {
      viewMode: 0,
      dragMode: 'move',
      autoCropArea: 1,
      restore: false,
      modal: false,
      guides: false,
      center: false,
      highlight: false,
      cropBoxMovable: false,
      cropBoxResizable: false,
      toggleDragModeOnDblclick: false,
      background: false,
      initialAspectRatio: 1600 / 2550,
      responsive: true,
      checkOrientation: false
    };

    this.categoriesImgConfig = {
      width: 105,
      height: 160,
      xsWidth: 92,
      xsHeight: 140,
      rotation: 0,
      transform: false,
      leftMargin: 0
    };

    this.cardsListImgConfig = {
      width: 250,
      height: 388,
      xsWidth: 157,
      xsHeight: 253
    };
  }

  public static percentsToPixelsHeight = (
    pageHeight: number, percent: number
  ): number => (percent / 100) * pageHeight;

  public initializeCardConfig(card: SingleCard, locale: string): void {
    this.customCardId = locale === 'fr-CA' ? 'FR_blank_photo_portrait' : 'blank_photo_portrait';
    this.card.id = card.id;
    this.card.frontImageUrl = getImageUrl(`${card.id}_front.png`, 'editor');
    this.card.innerImageUrl = getImageUrl(`${card.id}_inside.png`, 'editor');
    this.card.name = card.name;
    this.card.font = card.font;
    this.setTextareaParams(card);
  }

  public setTextareaParams(card: SingleCard): void {
    const defaultPadding = 2.8; // %
    const fullPageHeight = 2550; // (8.5" * 300dpi)
    const top = (card.textarea_offset && card.textarea_offset.top)
      ? card.textarea_offset.top : 0;
    const bottom = (card.textarea_offset && card.textarea_offset.bottom)
      ? card.textarea_offset.bottom : 0;

    const textareaTopPercent = ((top / fullPageHeight) * 100) + defaultPadding;
    const textareaBottomPercent = ((bottom / fullPageHeight) * 100) + defaultPadding;
    const height = 100 - textareaTopPercent - textareaBottomPercent;

    this.card.textarea.top = textareaTopPercent;
    this.card.textarea.height = height;
  }
}

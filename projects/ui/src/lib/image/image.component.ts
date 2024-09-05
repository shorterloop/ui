import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CONFIG, DEFAULT_SRC, DEFAULT_EDIT_ICON } from './image.config';

interface IRestrictions {
  ImageMinWidth: number,
  ImageMinHeight: number,
  MaxImageSize: number,
  AcceptedType: any,
}
@Component({
  selector: 'shorterloop-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input() imageSrc: any = '';
  @Input() editIcon = '';
  @Input() restrictions: IRestrictions = CONFIG;
  @Output() imageChanged = new EventEmitter();
  @Output() error = new EventEmitter();
  isImageUploaded = false;
  uploadButtonText = 'Upload Image';
  removeButtonText = 'Remove Image';
  errorField: any = {};
  constructor() { }

  ngOnInit(): void {
    if (!this.editIcon) {
      this.editIcon = DEFAULT_EDIT_ICON;
    }
    if (!this.imageSrc) {
      this.imageSrc = DEFAULT_SRC;
    } else {
      this.isImageUploaded = true;
    }
    this.restrictions = { ...this.restrictions, ...CONFIG };
  }

  ngOnChanges(change: SimpleChanges) {
    const currentValue: any = change;

    if (
      currentValue &&
      currentValue.restrictions &&
      !currentValue.restrictions.firstChange &&
      currentValue.restrictions.currentValue
    ) {
      this.restrictions = { ...this.restrictions, ...CONFIG };
    }
  }

  /**
 * Handle the image upload query
 */
  imageUpload($event: any, imageContainer: any) {
    $event.preventDefault();
    $event.stopImmediatePropagation();
    const imgSrc: any = imageContainer.querySelector('shorterloop-image #imgSrc');
    const file = $event.target.files[0];
    this.getImageDetails(file).then(details => {
      if (this.isImageValid(details) === true) {
        imgSrc.src = window.URL.createObjectURL(file);
        this.errorField = {
          imageErrorShow: false,
          imageErrorMessage: '',
        };
        this.isImageUploaded = true;
        this.imageChanged.emit($event.target.files[0]);
      } else {
        this.error.emit(this.isImageValid(details) as string);
      }
    });
  }

  removeImage(imageContainer: any) {
    const imgSrc: any = imageContainer.querySelector('#imgSrc');
    imgSrc.src = DEFAULT_SRC;
    this.imageChanged.emit('');
    this.isImageUploaded = false;
  }

  getImageDetails(file: File): Promise<any> {
    return new Promise(function (resolve, reject) {
      if (!file) {
        return reject();
      }
      const size = file.size;
      const type = file.type;
      const fr = new FileReader();
      fr.onload = () => {
        // when file has loaded
        const img = new Image();

        img.onload = () => {
          resolve({ width: img.width, height: img.height, size, type });
        };

        img.src = fr.result as string; // This is the data URL
      };

      fr.readAsDataURL(file);
    });
  }

  isImageValid(details: any) {
    if (!this.restrictions.AcceptedType.includes(details.type)) {
      return 'image-format';
    }

    if (this.restrictions.MaxImageSize < details.size) {
      return 'image-max-size';
    }

    if (
      details.width < this.restrictions.ImageMinWidth ||
      details.height < this.restrictions.ImageMinHeight
    ) {
      return 'too-small-image';
    }

    return true;
  }

  handleImageError(imageContainer: any) {
    const imgSrc: any = imageContainer.querySelector('#imgSrc');
    imgSrc.src = DEFAULT_SRC;
  }

}

import { GalleryConfig } from 'ng-gallery';

export const GALLERY_CONFIG: GalleryConfig = {
  'style': {
    'background': '#000000',
    'width': '1000px',
    'height': '600px'
  },
  'animation': 'none',
  'loader': {
    'width': '50px',
    'height': '50px',
    'position': 'center',
    'icon': 'oval'
  },
  'description': {
    'position': 'bottom',
    'overlay': true,
    'text': true,
    'counter': true
  },
  'bullets': false,
  'player': false,
  'thumbnails': false,
  'navigation': true,
  'gestures': true
};

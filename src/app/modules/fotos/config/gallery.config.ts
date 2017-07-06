import { GalleryConfig } from 'ng-gallery';

export const GALLERY_CONFIG: GalleryConfig = {
  style: {
    background: '#121519',
    width: '900px',
    height: '500px'
  },
  animation: 'fade',
  loader: {
    width: '50px',
    height: '50px',
    position: 'center',
    icon: 'oval'
  },
  description: {
    position: 'bottom',
    overlay: false,
    text: true,
    counter: true
  },
  bullets: {
    position: 'bottom'
  },
  navigation: {
    position: 'top'
  },
  player: {
    autoplay: false,
    speed: 3000
  },
  thumbnails: {
    width: 120,
    height: 90,
    position: 'top',
    space: 20
  }
};

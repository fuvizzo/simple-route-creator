import constants from '../../constants';

export function createMarkerIcon(count, props = null) {
  props = props
    ? { ...DEFAULT_MARKER_ICON_PROPS, ...props }
    : DEFAULT_MARKER_ICON_PROPS;
  const {
    primaryColor: color1,
    secondaryColor: color2,
    textColor,
    size,
  } = props;
  return encodeURIComponent(`<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background: new 0 0 512 512" xml:space="preserve">
  <path d="M 256 0 C 150.1 0 64 86.1 64 192 c 0 141.6 177.1 310 184.7 317.1 C 250.8 511 253.4 512 256 512 s 5.3 -1 7.3 -2.9 C 270.9 502 448 333.6 448 192 C 448 86.1 361.9 0 256 0 z M 256 298.7 c -58.8 0 -106.7 -47.9 -106.7 -106.7 S 197.2 85.3 256 85.3 S 362.7 133.2 362.7 192 S 314.8 298.7 256 298.7 z" fill="${color1}">
  </path>
  <circle cx="256" cy="192" r="80" fill="${color2}" stroke-width="4"/>
  <text x="50%" y="200" fill="${textColor}" font-family="Arial, Helvetica, sans-serif" dominant-baseline="middle" text-anchor="middle" font-weight="bold" font-size="80" >${count}</text>
</svg>`);
}

export const DEFAULT_MARKER_ICON_PROPS = {
  primaryColor: constants.Theme.Color.PRIMARY,
  secondaryColor: constants.Theme.Color.SECONDARY,
  textColor: 'white',
  size: '50',
};

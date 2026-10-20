// Central image and video library for the site.
// Every page pulls from here, so swapping a photo is a one-line change.
// All assets live in Cloudinary (cloud: dfvjhslxp).

const CLD = 'https://res.cloudinary.com/dfvjhslxp';

// Preview builds (VITE_LOCAL_MEDIA=1) serve images from a local media/ folder
// instead of Cloudinary, for the static mock-up only. Not used in production.
export const LOCAL_MEDIA = Boolean(import.meta.env.VITE_LOCAL_MEDIA);


/** Optimised image URL: auto format, auto quality, resized to `w`. */
export function img(publicId: string, w = 1600): string {
  if (LOCAL_MEDIA) {
    const base = publicId.split('/').pop()!;
    return `media/${base}.jpg`;
  }
  return `${CLD}/image/upload/f_auto,q_auto,w_${w}/${publicId}`;
}

/** Optimised, muted-friendly web video URL. */
export function vid(publicId: string, w = 1920): string {
  if (LOCAL_MEDIA) return `media/${publicId.split('/').pop()}.mp4`;
  return `${CLD}/video/upload/q_auto,w_${w}/${publicId}.mp4`;
}

/** First frame of a video as a poster image. */
export function poster(publicId: string, w = 1920): string {
  return `${CLD}/video/upload/so_0,f_auto,q_auto,w_${w}/${publicId}.jpg`;
}

const RC = 'rhr/photography/raw-captis-2026-07';
const PR = 'rhr/photography/property';
const EC = 'rhr/stock/east-coast';
const VD = 'rhr/video';

// The property (Raw Captis, July 2026)
export const P = {
  deckReading: `${RC}/dsc08436`,          // reading on the deck, bay beyond
  exteriorGums: `${RC}/dsc08528`,         // house in the gums, blue sky
  bathOnDeck: `${RC}/dsc07678`,           // concrete bath on the deck
  rainbowLiving: `${RC}/dsc08409`,        // living room, rainbow over the bay
  schoutenWindow: `${RC}/dsc08597`,       // framed view to Schouten Island
  robeWindow: `${RC}/dsc07938`,           // morning at the window
  books: `${RC}/dsc07666`,
  kettle: `${RC}/dsc08158`,
  diningView: `${RC}/dining-table-view-commercial-01`,
  livingPanorama: `${RC}/living-dining-panorama-commercial-01`,
  facade: `${RC}/exterior-bushland-facade-commercial-01`,
  bathExterior: `${RC}/outdoor-bath-view-lifestyle-01`,
  bedToBath: `${RC}/bed-to-outdoor-bath-view-commercial-01`,
  binoculars: `${RC}/binoculars-ocean-view-lifestyle-01`,
  bayDusk: `${RC}/great-oyster-bay-view-dusk-lifestyle-01`,
  yogaDeck: `${RC}/yoga-deck-view-lifestyle-01`,
  dinnerNight: `${RC}/still-01`,
  bedroomNight: `${RC}/bedroom-night-commercial-01`,
  fishersFreycinet: `${RC}/product-fishers-freycinet-01`,
  duskRoofline: `${RC}/dsc08075`,
  duskTree: `${RC}/dsc08077`,
  sunsetGums: `${RC}/dsc08106`,
  bedroomFire: `${RC}/dsc08305`,
  bedroomWide: `${RC}/dsc08310`,
  // Portrait crops
  bathPortrait: `${PR}/rhr-b-outdoor-bath`,
  deckChairPortrait: `${PR}/rhr-c-deck-chair`,
  houseGumsPortrait: `${PR}/rhr-g-house-gums`,
  firstLightPortrait: `${PR}/rhr-i-first-light`,
  starsPortrait: `${PR}/rhr-l-stars`,
  schoutenPortrait: `${PR}/rhr-a-schouten-window`,
};

// The East Coast (licensed stock: Adobe Stock and Unsplash)
export const C = {
  whiteSandBay: `${EC}/white-sand-bay-beach-adobe-1990138623`,
  beachWaves: `${EC}/beach-waves-shoreline-adobe-1188026123`,
  paintedCliffs: `${EC}/maria-island-painted-cliffs-adobe-2109248592`,
  offshoreIslands: `${EC}/offshore-islands-boat-adobe-2037685467`,
  wallabiesGold: `${EC}/wallabies-golden-hour-adobe-1958746864`,
  pademelon: `${EC}/pademelon-forest-adobe-464173348`,
  goldenPaddock: `${EC}/golden-paddock-sunset-adobe-1692606398`,
  sunsetClouds: `${EC}/gum-silhouette-sunset-clouds-adobe-1478948788`,
  wineglassBeach: `${EC}/wineglass-bay-beach__unsplash-tim-lippis`,
  wineglassAerial: `${EC}/wineglass-bay-aerial__unsplash-josh-fotheringham`,
  wineglassLookout: `${EC}/wineglass-bay-lookout__unsplash-josh-fotheringham`,
  wineglassView: `${EC}/wineglass-bay-view__unsplash-mitchell-lawler`,
  wineglassHilltop: `${EC}/wineglass-bay-hilltop__unsplash-may-siew`,
  hazardsAcrossBay: `${EC}/freycinet-hazards-across-bay__unsplash-nadia-levenets`,
  freycinetBay: `${EC}/freycinet-bay-mountains__unsplash-michael`,
  freycinetAerialBeach: `${EC}/freycinet-aerial-beach__unsplash-nadia-levenets`,
  bayOfFiresBoat: `${EC}/bay-of-fires-boat-rocks__unsplash-laya-clode`,
  bayOfFiresLichen: `${EC}/bay-of-fires-lichen-coast__unsplash-eddie-mark-blair`,
  bichenoBoats: `${EC}/bicheno-boats__unsplash-steven-van-deursen`,
  mariaBoat: `${EC}/maria-island-boat__unsplash-dalal`,
  mariaCoast: `${EC}/maria-island-coast__unsplash-fidel-fernando`,
  mariaWombats: `${EC}/maria-island-wombats__unsplash-dalal`,
  freycinetWallaby: `${EC}/freycinet-wallaby__unsplash-alistair-king`,
  swanseaNightSky: `${EC}/swansea-night-sky__unsplash-ken-cheung`,
  bayOfFiresAerial: `${EC}/bay-of-fires-aerial__unsplash-colin-and-meg`,
  bayOfFiresLichenRocks: `${EC}/bay-of-fires-lichen-rocks__unsplash-colin-and-meg`,
  bichenoCoastAerial: `${EC}/bicheno-coast-aerial__unsplash-richard-lin`,
  lighthouseSunset: `${EC}/east-coast-lighthouse-sunset__unsplash-josh-chiodo`,
  freycinetSunsetRocks: `${EC}/freycinet-sunset-rocks__unsplash-alistair-king`,
  freycinetStargazing: `${EC}/freycinet-stargazing__unsplash-gino-hernandez-sanchez`,
  wineglassAerialClassic: `${EC}/wineglass-bay__unsplash-lochie-riordan`,
  wineglassFromAmos: `${EC}/wineglass-bay__unsplash-tim-hart`,
  wallabyForest: `${EC}/tasmania-wallaby-forest__unsplash-re-walsh`,
  pademelonGrass: `${EC}/tasmania-pademelon__unsplash-re-walsh`,
  wombatDrinking: `${EC}/maria-island-wombat-drinking__unsplash-dalal`,
  devils: `${EC}/tasmanian-devils__unsplash-david-clode`,
  auroraWineglass: `${EC}/aurora-wineglass-bay-adobe-1997741351`,
  auroraBeach: `${EC}/aurora-beach-town-adobe-819024732`,
};

// Web video loops (muted, no audio track)
export const V = {
  whiteSandBay: `${VD}/white-sand-bay-beach-adobe-1990138623`,
  beachWaves: `${VD}/beach-waves-shoreline-adobe-1188026123`,
  paintedCliffs: `${VD}/maria-island-painted-cliffs-adobe-2109248592`,
  offshoreIslands: `${VD}/offshore-islands-boat-adobe-2037685467`,
  wallabiesGold: `${VD}/wallabies-golden-hour-adobe-1958746864`,
  auroraWineglass: `${VD}/aurora-wineglass-bay-adobe-1997741351`,
  auroraBeach: `${VD}/aurora-beach-town-adobe-819024732`,
};

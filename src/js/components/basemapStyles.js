var getImportObject = function (sceneArray) {
  return {
    import: sceneArray
  };
};

// Mapzen House style for Tangram
var style = {
  BubbleWrap: 'https://mapzen.com/carto/bubble-wrap-style/8/bubble-wrap-style.zip',
  BubbleWrapMoreLabels: getImportObject(['https://mapzen.com/carto/bubble-wrap-style/8/bubble-wrap-style.zip', 'https://mapzen.com/carto/bubble-wrap-style/8/themes/label-10.zip']),
  BubbleWrapNoLabels: getImportObject(['https://mapzen.com/carto/bubble-wrap-style/8/bubble-wrap-style.zip', 'https://mapzen.com/carto/bubble-wrap-style/8/themes/label-0.zip']),
  Cinnabar: 'https://mapzen.com/carto/cinnabar-style/8/cinnabar-style.zip',
  CinnabarMoreLabels: getImportObject(['https://mapzen.com/carto/cinnabar-style/8/cinnabar-style.zip', 'https://mapzen.com/carto/cinnabar-style/8/themes/label-10.zip']),
  CinnabarNoLabels: getImportObject(['https://mapzen.com/carto/cinnabar-style/8/cinnabar-style.zip', 'https://mapzen.com/carto/cinnabar-style/8/themes/label-0.zip']),
  Refill: 'https://mapzen.com/carto/refill-style/9/refill-style.zip',
  RefillMoreLabels: getImportObject(['https://mapzen.com/carto/refill-style/9/refill-style.zip', 'https://mapzen.com/carto/refill-style/9/themes/label-10.zip']),
  RefillNoLabels: getImportObject(['https://mapzen.com/carto/refill-style/9/refill-style.zip', 'https://mapzen.com/carto/refill-style/9/themes/label-0.zip']),
  Zinc: getImportObject(['https://mapzen.com/carto/refill-style/9/refill-style.zip', 'https://mapzen.com/carto/refill-style/9/themes/color-zinc.zip']),
  ZincMoreLabels: getImportObject(['https://mapzen.com/carto/refill-style/9/refill-style.zip', 'https://mapzen.com/carto/refill-style/9/themes/color-zinc.zip', 'https://mapzen.com/carto/refill-style/9/themes/label-10.zip']),
  ZincNoLabels: getImportObject(['https://mapzen.com/carto/refill-style/9/refill-style.zip', 'https://mapzen.com/carto/refill-style/9/themes/color-zinc.zip', 'https://mapzen.com/carto/refill-style/9/themes/label-0.zip']),
  Walkabout: 'https://mapzen.com/carto/walkabout-style/6/walkabout-style.zip',
  WalkaboutMoreLabels: getImportObject(['https://mapzen.com/carto/walkabout-style/6/walkabout-style.zip', 'https://mapzen.com/carto/walkabout-style/6/themes/label-10.zip']),
  WalkaboutNoLabels: getImportObject(['https://mapzen.com/carto/walkabout-style/6/walkabout-style.zip', 'https://mapzen.com/carto/walkabout-style/6/themes/label-0.zip']),
  Tron: 'https://mapzen.com/carto/tron-style/5/tron-style.zip',
  TronMoreLabels: getImportObject(['https://mapzen.com/carto/tron-style/5/tron-style.zip', 'https://mapzen.com/carto/tron-style/5/themes/label-10.zip']),
  TronNoLabels: getImportObject(['https://mapzen.com/carto/tron-style/5/tron-style.zip', 'https://mapzen.com/carto/tron-style/5/themes/label-0.zip'])
};

module.exports = style;

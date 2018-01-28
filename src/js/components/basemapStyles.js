/**
 * Javascript native functions to extend object (Object.assign) does not work with getter
 * extend() returns newly crated object based on source, with target properties
 */
function extend (targetProps, source) {
  var extendedObj = Object.create(source);
  Object.defineProperties(extendedObj, targetProps);
  return extendedObj;
}

function getImportObject (sceneArray) {
  return {
    import: sceneArray
  };
}

function getCartoBaseStyleURL (cartoStyle) {
  return cartoStyle.baseURL + '/' + cartoStyle.stylePath + '/' + cartoStyle.version + '/' + cartoStyle.stylePath + '.' + cartoStyle.suffix;
}

function getCustomLabelStyleURL (cartoStyle, labelPath, customValue) {
  return cartoStyle.baseURL + '/' + cartoStyle.stylePath + '/' + 'themes' + '/' + labelPath + '-' + customValue + '.' + cartoStyle.suffix;
}

function getCartoThemeStyleURL (cartoStyle, customTheme) {
  return cartoStyle.baseURL + '/' + cartoStyle.stylePath + '/' + 'themes' + '/' + customTheme + '.' + cartoStyle.suffix;
}

/**
 * CartoStyle contains the common elements for all basemap styles
 * update this only when there is a change that needs to happen across all styles
 */
var CartoStyle = {
  baseURL: 'https://www.nextzen.com/carto',
  suffix: 'zip',
  moreLabelNumber: 10,
  noLabelNumber: 0,
  get basemapURL () {
    return getCartoBaseStyleURL(this);
  },
  get moreLabelURL () {
    return getCustomLabelStyleURL(this, 'label', this.moreLabelNumber);
  },
  get noLabelURL () {
    return getCustomLabelStyleURL(this, 'label', this.noLabelNumber);
  },
  get moreLabelConfig () {
    return getImportObject([this.basemapURL, this.moreLabelURL]);
  },
  get noLabelConfig () {
    return getImportObject([this.basemapURL, this.noLabelURL]);
  }
};
/**
 * Change the value for veresion below for each style's new release
 */
var bubblewrap = extend({
  'stylePath': {value: 'bubble-wrap-style'},
  'version': {value: 9}
}, CartoStyle);

var cinnabar = extend({
  'stylePath': {value: 'cinnabar-style'},
  'version': {value: 9}
}, CartoStyle);

var refill = extend({
  'stylePath': {value: 'refill-style'},
  'version': {value: 11}
}, CartoStyle);

var walkabout = extend({
  'stylePath': {value: 'walkabout-style'},
  'version': {value: 7}
}, CartoStyle);

var tron = extend({
  'stylePath': {value: 'tron-style'},
  'verseion': {value: 6}
}, CartoStyle);

var zinc = extend({
  'zincURL': {
    get: function () {
      return getCartoThemeStyleURL(this, 'color-zinc');
    }
  },
  'zincNoLabelConfig': {
    get: function () {
      return getImportObject([this.basemapURL, this.zincURL, this.noLabelURL]);
    }
  },
  'zincMoreLabelConfig': {
    get: function () {
      return getImportObject([this.basemapURL, this.zincURL, this.moreLabelURL]);
    }
  },
  'basemapConfig': {
    get: function () {
      return getImportObject([this.basemapURL, this.zincURL]);
    }
  }
}, refill);

var style = {
  BubbleWrap: bubblewrap.basemapURL,
  BubbleWrapMoreLabels: bubblewrap.moreLabelConfig,
  BubbleWrapNoLabels: bubblewrap.noLabelConfig,
  Cinnabar: cinnabar.basemapURL,
  CinnabarMoreLabels: cinnabar.moreLabelConfig,
  CinnabarNoLabels: cinnabar.noLabelConfig,
  Refill: refill.basemapURL,
  RefillMoreLabels: refill.moreLabelConfig,
  RefillNoLabels: refill.noLabelConfig,
  Walkabout: walkabout.basemapURL,
  WalkaboutMoreLabels: walkabout.moreLabelConfig,
  WalkaboutNoLabels: walkabout.noLabelConfig,
  Tron: tron.basemapURL,
  TronMoreLabels: tron.moreLabelConfig,
  TronNoLabels: tron.noLabelConfig,
  Zinc: zinc.basemapConfig,
  ZincMoreLabels: zinc.zincMoreLabelConfig,
  ZincNoLabels: zinc.zincNoLabelConfig
};

module.exports = style;

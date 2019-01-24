import Layer from './layer';

import {
  compact,
  isEmpty,
  isNumberLike,
  smartEscape,
  snakeCase
} from '../util';

var TextLayer = class TextLayer extends Layer {
  /**
   * @constructor TextLayer
   * @param {Object} options - layer parameters
   */
  constructor(options) {
    var keys;
    super(options);
    keys = ["resourceType", "resourceType", "fontFamily", "fontSize", "fontWeight", "fontStyle", "textDecoration", "textAlign", "stroke", "letterSpacing", "lineSpacing", "text"];
    if (options != null) {
      keys.forEach((key) => {
        var ref;
        return this.options[key] = (ref = options[key]) != null ? ref : options[Util.snakeCase(key)];
      });
    }
    this.options.resourceType = "text";
  }

  resourceType(resourceType) {
    throw "Cannot modify resourceType for text layers";
  }

  type(type) {
    throw "Cannot modify type for text layers";
  }

  format(format) {
    throw "Cannot modify format for text layers";
  }

  fontFamily(fontFamily) {
    this.options.fontFamily = fontFamily;
    return this;
  }

  fontSize(fontSize) {
    this.options.fontSize = fontSize;
    return this;
  }

  fontWeight(fontWeight) {
    this.options.fontWeight = fontWeight;
    return this;
  }

  fontStyle(fontStyle) {
    this.options.fontStyle = fontStyle;
    return this;
  }

  textDecoration(textDecoration) {
    this.options.textDecoration = textDecoration;
    return this;
  }

  textAlign(textAlign) {
    this.options.textAlign = textAlign;
    return this;
  }

  stroke(stroke) {
    this.options.stroke = stroke;
    return this;
  }

  letterSpacing(letterSpacing) {
    this.options.letterSpacing = letterSpacing;
    return this;
  }

  lineSpacing(lineSpacing) {
    this.options.lineSpacing = lineSpacing;
    return this;
  }

  text(text) {
    this.options.text = text;
    return this;
  }

  /**
   * generate the string representation of the layer
   * @function TextLayer#toString
   * @return {String}
   */
  toString() {
    var components, hasPublicId, hasStyle, publicId, re, res, start, style, text, textSource;
    style = this.textStyleIdentifier();
    if (this.options.publicId != null) {
      publicId = this.getFullPublicId();
    }
    if (this.options.text != null) {
      hasPublicId = !Util.isEmpty(publicId);
      hasStyle = !Util.isEmpty(style);
      if (hasPublicId && hasStyle || !hasPublicId && !hasStyle) {
        throw "Must supply either style parameters or a public_id when providing text parameter in a text overlay/underlay, but not both!";
      }
      re = /\$\([a-zA-Z]\w*\)/g;
      start = 0;
      //        textSource = text.replace(new RegExp("[,/]", 'g'), (c)-> "%#{c.charCodeAt(0).toString(16).toUpperCase()}")
      textSource = Util.smartEscape(this.options.text, /[,\/]/g);
      text = "";
      while (res = re.exec(textSource)) {
        text += Util.smartEscape(textSource.slice(start, res.index));
        text += res[0];
        start = res.index + res[0].length;
      }
      text += Util.smartEscape(textSource.slice(start));
    }
    components = [this.options.resourceType, style, publicId, text];
    return Util.compact(components).join(":");
  }

  textStyleIdentifier() {
    var components;
    components = [];
    if (this.options.fontWeight !== "normal") {
      components.push(this.options.fontWeight);
    }
    if (this.options.fontStyle !== "normal") {
      components.push(this.options.fontStyle);
    }
    if (this.options.textDecoration !== "none") {
      components.push(this.options.textDecoration);
    }
    components.push(this.options.textAlign);
    if (this.options.stroke !== "none") {
      components.push(this.options.stroke);
    }
    if (!(Util.isEmpty(this.options.letterSpacing) && !Util.isNumberLike(this.options.letterSpacing))) {
      components.push("letter_spacing_" + this.options.letterSpacing);
    }
    if (!(Util.isEmpty(this.options.lineSpacing) && !Util.isNumberLike(this.options.lineSpacing))) {
      components.push("line_spacing_" + this.options.lineSpacing);
    }
    if (!Util.isEmpty(Util.compact(components))) {
      if (Util.isEmpty(this.options.fontFamily)) {
        throw `Must supply fontFamily. ${components}`;
      }
      if (Util.isEmpty(this.options.fontSize) && !Util.isNumberLike(this.options.fontSize)) {
        throw "Must supply fontSize.";
      }
    }
    components.unshift(this.options.fontFamily, this.options.fontSize);
    components = Util.compact(components).join("_");
    return components;
  }

};

export default TextLayer;
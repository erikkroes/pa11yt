/* eslint-disable class-methods-use-this */
import { LitElement, html, css } from 'lit-element';

class ColorTool extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      selectedSwatch: { type: Number },
      color: {type: Object},
      swatches: { type: Array },
    };
  }

  constructor() {
    super();
    this.title = 'color-tool';
    this.selectedSwatch = 0;
    this.swatches = [
      { x: 0.9505,
      y: 1.0000,
      z: 1.0888,
      hex: '#ffffff',
      lum: 1,
      contrast: 1.0}
    ];
    this.color = {
      xyz : { x: 0.9505, y: 1.0000, z: 1.0888 },
      rgb : { r: 255, g: 255, b: 255},
      hex: '#ffffff',
      lum: 1,
      value: "#ffffff"
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;          
          max-width: 960px;
          margin: 0 auto;
          font-size: 16px;
        }

        .card {
          border-radius: 2px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); // https://codepen.io/sdthornton/pen/wBZdXq
        }

        .swatches__fieldset {
          border: 0;
          margin: 0;
          padding: 0;
        }

        .swatches__group {
          display: flex;
          justify-content: flex-start;    
          margin-bottom: 16px;   
        }

        .swatch {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          min-height: 120px;
          min-width: 140px;
          margin-right: 8px;
        }

        .swatch--selected {
          box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        }

        .swatch--button {
          
        }

        .swatch__add-button {
          all: inherit;
          display: flex;
          justify-content: center;
          min-height: 120px;
          min-width: 140px;
          border: 1px solid transparent;
          width; 100%;
        }

        .swatch__add-button:focus {
          border: 1px solid #005F62;
          box-shadow: 0 0 16px #005F62;
        }

        .swatch__radio {
          opacity: 1;
          // width: 1px;
        }

        .swatch__label {
          display: flex;
          justify-content: space-between;
          background-color: #fff;
        }


        .color {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;   
          grid-gap: 16px;       
        }

        .color__input-holder {
          display: flex;
          justify-content: center;
          align-items: center;
          grid-column: span 3;
          min-height: 240px;
        }

        .color__input {
          font-size: 24px;
          padding: 8px;
          border-radius: 8px;
          border-style: solid;
        }

        .color__block {
          max-width: 300px;
          padding: 24px;
          background-color: #ffffff;
        }

        .color__range {
          display: flex;
          justify-content: space-between;

        }
      `,
    ];
  }

  render() {
    return html`
      <header>
        
        <h1>${this.title}</h1>

      </header>
      <section class="swatches">       
        <!-- <form> -->
          <h2 class="swatches__title">Swatches</h2>
          <fieldset class="swatches__fieldset">
            <div class="swatches__group">
              ${this.swatches.map((swatch, i) => this._swatchTemplate(swatch, i))}
          </fieldset> 
              <div class="card swatch--button">
                <button @click="${this._addSwatch}" class="swatch__add-button">+</button> 
              </div>                           
            </div>
          <!-- </fieldset> -->
        <!-- </form>   -->
      </section>

      <main class="color">
        <div class="card color__input-holder" style="background-color: ${this.color.hex}">
          <input type="text" class="color__input" value="${this.color.value}" @change="${this._updateRgbFromHex}">
        </div>
        <div class="card color__block">
          <h2>RGB/HEX</h2>
          <div class="color__range">
            <label>Red</label>
            <input type="range" id="rgbRedRange" name="rgbRedRange" min="0" max="255" step="1" value="${Math.round(this.color.rgb.r)}" .val="${Math.round(this.color.rgb.r)}" @change="${this._updateRgbFromRange}">
            <input type="number" id="rgbRedNumber" name="rgbRedNumber" min="0" max="255" step="1" value="${Math.round(this.color.rgb.r)}" @change="${this._updateRgbFromNumber}">
          </div>
          <div class="color__range">
            <label>Green</label>
            <input type="range" id="rgbGreenRange" name="rgbGreenRange" min="0" max="255" step="1" value="${Math.round(this.color.rgb.g)}" @change="${this._updateRgbFromRange}">
            <input type="number" id="rgbGreenNumber" name="rgbGreenNumber" min="0" max="255" step="1" value="${Math.round(this.color.rgb.g)}" @change="${this._updateRgbFromNumber}">
          </div>
          <div class="color__range">
            <label>Blue</label>
            <input type="range" id="rgbBlueRange" name="rgbBlueRange" min="0" max="255" step="1" value="${Math.round(this.color.rgb.b)}" @change="${this._updateRgbFromRange}">
            <input type="number" id="rgbBlueNumber" name="rgbBlueNumber" min="0" max="255" step="1" value="${Math.round(this.color.rgb.b)}" @change="${this._updateRgbFromNumber}">
          </div>
        </div>
        <div class="card color__block">
          <h2>RGB/HEX</h2>
        </div>
        <div class="card color__block">
          <h2>RGB/HEX</h2>
        </div>
      </main>

    `;
  }

  _addSwatch() {
    const contrast = this._contrastFromLum(1, this.color.lum);
    const newSwatch = { x: 0.9505,
      y: 1.0000,
      z: 1.0888,
      hex: '#ffffff',
      lum: 1,
      contrast,
    }
    this.swatches = [
      ...this.swatches,
      newSwatch,
    ];
    
    
    // .push(newSwatch);
    // this.requestUpdate();
    // e.preventDefault();   <== add this for the form
  }

  _remSwatch(i) {
    this.swatches = this.swatch.splice(i, 1);
  }

  _setSwatch(i){
    console.log(i);
    console.log(this.swatches[i].x, this.swatches[i].y, this.swatches[i].z);
    this.selectedSwatch = i;
    // const xyz = [this.swatches[i].x, this.swatches[i].y, this.swatches[i].z]
    // this._setColorXyz([...xyz]);    
    this._setColorXyz(this.swatches[i].x, this.swatches[i].y, this.swatches[i].z);    
  }

  _setColorXyz(x, y, z) {
    this.color.xyz = {x, y, z};
    this._updateColor();
    this._updateSwatch();
    this._updateSwatches();
  }

  _setColorRgb(r, g, b) {
    const xyz = this._xyzFromRgb(r, g, b);   
    this._setColorXyz(xyz.x, xyz.y, xyz.z);
  }

  _updateColor() {
    const {x} = this.color.xyz;
    const {y} = this.color.xyz;
    const {z} = this.color.xyz;
    const xyz = {x, y, z};
    const rgb = this._rgbFromXyz(x, y, z);
    const hex = this._hexFromRgb(rgb.r, rgb.g, rgb.b);
    const lum = this._lumFromRgb(rgb.r, rgb.g, rgb.b);
    this.color = {
      xyz,
      rgb,
      hex,
      lum,
      value: hex,
    }; 
    // this.requestUpdate();
  }

  _updateSwatch(){
    this.swatches[this.selectedSwatch] = { x: this.color.xyz.x,
      y: this.color.xyz.y,
      z: this.color.xyz.z,
      hex: this.color.hex,
      lum: this.color.lum,
      contrast: '1.0',
    }
  }

  _updateSwatches(){
    this.swatches.forEach( swatch => (
      swatch.contrast = this._contrastFromLum(swatch.lum, this.color.lum)
    )); 
  }

  _rgbFromXyz(x, y, z) { // https://stackoverflow.com/questions/43494018/converting-xyz-color-to-rgb
    const r = this._toSrgb(3.2404542*x - 1.5371385*y - 0.4985314*z) * 255;
    const g = this._toSrgb(-0.9692660*x + 1.8760108*y + 0.0415560*z) * 255;
    const b = this._toSrgb(0.0556434*x - 0.2040259*y + 1.0572252*z) * 255;
    console.log(x, y ,z, r, g, b);
    return({r, g, b});
  }

  _xyzFromRgb(sr, sg, sb) {
    const r = this._fromSrgb(sr / 255);
    const g = this._fromSrgb(sg / 255);
    const b = this._fromSrgb(sb / 255);

    const x = 0.4124564*r + 0.3575761*g  + 0.1804375*b;
    const y = 0.2126729*r + 0.7151522*g  + 0.0721750*b;
    const z = 0.0193339*r + 0.1191920*g  + 0.9503041*b;
    return({x, y, z});
  }

  _hexFromRgb(r, g, b) { // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    const rgb = Math.round(b) | (Math.round(g) << 8) | (Math.round(r) << 16);
    const hex = `#${  (0x1000000 + rgb).toString(16).slice(1)}`;     
    return hex;
  }

  _lumFromRgb(r, g, b) {
    const rSrgb = r / 255;
    const gSrgb = g / 255;
    const bSrgb = b / 255;

    const rL = rSrgb <= 0.03928 ? rSrgb/12.92 : ((rSrgb + 0.055)/1.055) ** 2.4;
    const gL = gSrgb <= 0.03928 ? gSrgb/12.92 : ((gSrgb + 0.055)/1.055) ** 2.4;
    const bL = bSrgb <= 0.03928 ? bSrgb/12.92 : ((bSrgb + 0.055)/1.055) ** 2.4;

    const lum = (0.2126 * rL + 0.7152 * gL + 0.0722 * bL);    
    return lum;
  }

  _contrastFromLum(lum1, lum2) {
    const contrast = (lum1 > lum2 ? (lum1 + 0.05) / (lum2 + 0.05) : (lum2 + 0.05) / (lum1 + 0.05)).toFixed(1);;
    return contrast;
  }

  _updateRgbFromHex(hex){
    this._rgbFromHex(hex);
    this._setColorRgb(r, g, b);
  }

  _updateRgbFromRange(){
    const r = this.shadowRoot.getElementById('rgbRedRange').value;
    const g = this.shadowRoot.getElementById('rgbGreenRange').value;
    const b = this.shadowRoot.getElementById('rgbBlueRange').value;
    this._setColorRgb(r, g, b);
  }

  _updateRgbFromNumber(){    
    const r = this.shadowRoot.getElementById('rgbRedNumber').value;
    const g = this.shadowRoot.getElementById('rgbGreenNumber').value;
    const b = this.shadowRoot.getElementById('rgbBlueNumber').value;    
    this._setColorRgb(r, g, b);
  }

  _fromSrgb(c){
    if (Math.abs(c) < 0.0031308) {
      return 12.92 * c;
    }
    return 1.055 * (c ** 0.41666) - 0.055;   
  }

  _toSrgb(c){    
    if (Math.abs(c) <= 0.03928) {
      return c / 12.92;
    }
    return ((c + 0.055)/1.055) ** 2.4; 
  }


  _swatchTemplate(swatch, i) {
    return html`<div class="card swatch ${this.selectedSwatch} ${(this.selectedSwatch === i) ? 'swatch--selected' : ''}" style="background-color: ${swatch.hex}">
      <input type="radio" id="swatch-${i}" name="swatch" value="${i}" class="swatch__radio" @click="${() => this._setSwatch(i)}">
      <label for="swatch-${i}" class="swatch__label" >
        <h3 class="swatch__title">${swatch.hex}</h3>
        <h4 class="swatch__contrast">${swatch.contrast}:1</h4>    
      </label>
    </div>`;
  }
}



customElements.define('color-tool', ColorTool);

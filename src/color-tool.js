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
    this.swatches = [{ 
      r: 255,
      g: 255,
      b: 255,
      hex: '#ffffff',
      lum: 1,
      contrast: 1.0,
    }];
    this.color = {      
      rgb : { r: 255, g: 255, b: 255},
      hsl : { h : 0, s: 100, l: 100},
      hex: '#ffffff',
      lum: 1,
      lumRatio: 21,
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
          max-width: 960px;
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
          background-color: #fff;
        }

        .swatch__add-button {
          all: inherit;
          display: flex;
          justify-content: center;
          min-height: 120px;
          min-width: 140px;
          border: 1px solid transparent;
          width: 100%;
        }

        .swatch__add-button:focus {
          border: 1px solid #005F62;
          box-shadow: 0 0 16px #005F62;
        }

        .swatch__radio {
          opacity: 0;
          width: 1px;
          height: 1px;
          margin: 0;
          padding: 0;
        }

        .swatch__label {
          height: 100%;
          margin-top: -1px;
          display: flex;
          align-items: flex-end;
        }

        .swatch__label-box {
          display: flex;
          width: 100%;
          justify-content: space-between;
          border-top: 1px solid #bebebe;
          background-color: #fff;
          padding: 0 4px;
        }

        .swatch__title, .swatch__contrast {
          margin: 8px 0;
          font-size: 19px;
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

        .color__ranges { 
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
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
              <div class="card swatch--button">
                <button @click="${this._addSwatch}" class="swatch__add-button">+</button>             
              </div>
            </div>
          </fieldset> 
              
          <!-- </fieldset> -->
        <!-- </form>   -->
      </section>

      <main class="color">
        <div class="card color__input-holder" style="background-color: ${this.color.hex}">
          <input type="text" class="color__input" .value="${this.color.value}" @change="${this._updateHexToRgb}">
        </div>
        <div class="card color__block">
          <h2>RGB/HEX</h2>
          <div class="color__ranges">
            <label>Red</label>
            <input type="range" id="rgbRedRange" name="rgbRedRange" min="0" max="255" step="1" .value="${Math.round(this.color.rgb.r)}" .val="${Math.round(this.color.rgb.r)}" @change="${this._updateRgbFromRange}">
            <input type="number" id="rgbRedNumber" name="rgbRedNumber" min="0" max="255" step="1" .value="${Math.round(this.color.rgb.r)}" @change="${this._updateRgbFromNumber}">
            
            <label>Green</label>
            <input type="range" id="rgbGreenRange" name="rgbGreenRange" min="0" max="255" step="1" .value="${Math.round(this.color.rgb.g)}" @change="${this._updateRgbFromRange}">
            <input type="number" id="rgbGreenNumber" name="rgbGreenNumber" min="0" max="255" step="1" .value="${Math.round(this.color.rgb.g)}" @change="${this._updateRgbFromNumber}">
          
            <label>Blue</label>
            <input type="range" id="rgbBlueRange" name="rgbBlueRange" min="0" max="255" step="1" .value="${Math.round(this.color.rgb.b)}" @change="${this._updateRgbFromRange}">
            <input type="number" id="rgbBlueNumber" name="rgbBlueNumber" min="0" max="255" step="1" .value="${Math.round(this.color.rgb.b)}" @change="${this._updateRgbFromNumber}">
          </div>
        </div>
        <div class="card color__block">
          <h2>HSL</h2>
          <div class="color__ranges">
            <label>Hue</label>
            <input type="range" id="hslHueRange" name="hslHueRange" min="0" max="360" step="1" .value="${this.color.hsl.h}" @change="${this._updateHslFromRange}">
            <input type="number" id="hslHueNumber" name="hslHueNumber" min="0" max="360" step="1" .value="${Math.round(this.color.hsl.h)}" @change="${this._updateHslFromNumber}">
            
            <label>Saturation</label>
            <input type="range" id="hslSatRange" name="hslSatRange" min="0" max="100" step=".1" .value="${this.color.hsl.s}" @change="${this._updateHslFromRange}">
            <input type="number" id="hslSatNumber" name="hslSatNumber" min="0" max="100" step=".1" .value="${Math.round(this.color.hsl.s)}" @change="${this._updateHslFromNumber}">
          
            <label>Lightness</label>
            <input type="range" id="hslLitRange" name="hslLitRange" min="0" max="100" step=".1" .value="${this.color.hsl.l}" @change="${this._updateHslFromRange}">
            <input type="number" id="hslLitNumber" name="hslLitNumber" min="0" max="100" step=".1" .value="${Math.round(this.color.hsl.l)}" @change="${this._updateHslFromNumber}">
          </div>
        </div>
        </div>
      </main>

    `;
  }

  _addSwatch() {
    const contrast = this._lumToContrast(1, this.color.lum);
    const newSwatch = { 
      r: 255,
      g: 255,
      b: 255,
      hex: '#ffffff',
      lum: 1,
      contrast,
    }
    this.swatches = [
      ...this.swatches,
      newSwatch,
    ];
    this._setSwatch(this.swatches.length - 1);
  }

  _remSwatch(i) {
    this.swatches = this.swatch.splice(i, 1);
  }

  _setSwatch(i){
    this.selectedSwatch = i;
    this._setColorRgb(this.swatches[i].r, this.swatches[i].g, this.swatches[i].b);    
  }

  _setColorRgb(r, g, b) {
    this.color.rgb = {r, g, b};
    this._updateColor();
    this._updateSwatch();
    this._updateSwatches();
  }

  _setColorHsl(h, s, l) {
    const rgb = this._hslToRgb([h, s, l]);
    this._setColorRgb(rgb[0], rgb[1], rgb[2]);
  }

  _updateColor() {
    const {r} = this.color.rgb;
    const {g} = this.color.rgb;
    const {b} = this.color.rgb;
    const rgb = {r, g, b};
    const hex = this._rgbToHex(rgb.r, rgb.g, rgb.b);
    const hsl = this._rgbToHsl(rgb.r, rgb.g, rgb.b);
    const lum = this._rgbToLum(rgb.r, rgb.g, rgb.b);
    const lumRatio = this._lumToContrast(lum, 0);
    this.color = {
      rgb,
      hex,
      hsl,
      lum,
      lumRatio,
      value: hex,
    }; 
    // this.requestUpdate();
  }

  _updateSwatch(){
    this.swatches[this.selectedSwatch] = { 
      r: this.color.rgb.r,
      g: this.color.rgb.g,
      b: this.color.rgb.b,
      hex: this.color.hex,
      lum: this.color.lum,
      contrast: '1.0',
    }
  }

  _updateSwatches(){
    this.swatches.forEach( swatch => (
      swatch.contrast = this._lumToContrast(swatch.lum, this.color.lum)
    )); 
  }

  _hslToRgb(hsl){
    const h = hsl[0] / 360;
    const s = hsl[1] / 100;
    const l = hsl[2] / 100;
    
    let t2;
    let t3;
    let val;
  
    if (s === 0) {
      val = l * 255;
      return [val, val, val];
    }
  
    if (l < 0.5) {
      t2 = l * (1 + s);
    } else {
      t2 = l + s - l * s;
    }
  
    const t1 = 2 * l - t2;
  
    const rgb = [0, 0, 0];
    for (let i = 0; i < 3; i += 1) {
      t3 = h + 1 / 3 * -(i - 1);
      if (t3 < 0) {
        t3 += 1;
      }
  
      if (t3 > 1) {
        t3 -= 1;
      }
  
      if (6 * t3 < 1) {
        val = t1 + (t2 - t1) * 6 * t3;
      } else if (2 * t3 < 1) {
        val = t2;
      } else if (3 * t3 < 2) {
        val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
      } else {
        val = t1;
      }
  
      rgb[i] = val * 255;
    }
  
    return rgb;
  }

  _rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const valMin = Math.min(r, g, b);    // Min. value of RGB
    const valMax = Math.max(r, g, b);    // Max. value of RGB
    const valDelta = valMax - valMin; // Delta RGB value

    let h;
    let s;
    const l = ( valMax + valMin ) / 2 * 100;     

    if ( valDelta === 0 ) {
      h = 0;                   // HSL results from 0 to 1
      s = 0;
    }
    else                        // Chromatic data...
    {
      if ( l < 50 ) {
        s = valDelta / ( valMax + valMin );
      }
      else {
        s = valDelta / ( 2 - valMax - valMin );
      }

      const rDelta = ((( valMax - r ) / 6 ) + ( valDelta / 2 )) / valDelta;
      const gDelta = ((( valMax - g ) / 6 ) + ( valDelta / 2 )) / valDelta;
      const bDelta = ((( valMax - b ) / 6 ) + ( valDelta / 2 )) / valDelta;

      if ( r === valMax ) {
        h = bDelta - gDelta;
      }
      else if ( g === valMax ) {
        h = ( 1 / 3 ) + rDelta - bDelta;
      } 
      else if ( b === valMax ) {
        h = ( 2 / 3 ) + gDelta - rDelta;
      }

      if ( h < 0 ) h += 1
      if ( h > 1 ) h -= 1
    }
    h *= 360;
    s *= 100;    
    return {h, s, l};
  }

  _rgbToHex(r, g, b) { // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    const rgb = Math.round(b) | (Math.round(g) << 8) | (Math.round(r) << 16);
    const hex = `#${  (0x1000000 + rgb).toString(16).slice(1)}`;     
    return hex;
  }

  _hexToRgb(hex) {

    return({r, g, b});
  }

  _rgbToLum(r, g, b) {
    const rL = this._toSrgb(r / 255);
    const gL = this._toSrgb(g / 255);
    const bL = this._toSrgb(b / 255);

    const lum = (0.2126 * rL + 0.7152 * gL + 0.0722 * bL);    
    return lum;
  }

  _lumToContrast(lum1, lum2) {
    const contrast = (lum1 > lum2 ? (lum1 + 0.05) / (lum2 + 0.05) : (lum2 + 0.05) / (lum1 + 0.05)).toFixed(1);
    return contrast;
  }

  _hueToRgb(v1, v2, h ) {
     if ( h < 0 ) h += 1;
     if ( h > 1 ) h -= 1;
     if ( ( 6 * h ) < 1 ) return ( v1 + ( v2 - v1 ) * 6 * h )
     if ( ( 2 * h ) < 1 ) return ( v2 )
     if ( ( 3 * h ) < 2 ) return ( v1 + ( v2 - v1 ) * ( ( 2 / 3 ) - h ) * 6 )
     return ( v1 );
  }

  _updateHexToRgb(hex){
    this._hexToRgb(hex);
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

  _updateHslFromRange(){
    const h = this.shadowRoot.getElementById('hslHueRange').value;
    const s = this.shadowRoot.getElementById('hslSatRange').value;
    const l = this.shadowRoot.getElementById('hslLitRange').value;

    this.shadowRoot.getElementById('hslHueNumber').value = h;
    this.shadowRoot.getElementById('hslSatNumber').value = s;
    this.shadowRoot.getElementById('hslLitNumber').value = l;    

    this._setColorHsl(h, s, l);
  }

  _updateHslFromNumber(){    
    const h = this.shadowRoot.getElementById('hslHueNumber').value;
    const s = this.shadowRoot.getElementById('hslSatNumber').value;
    const l = this.shadowRoot.getElementById('hslLitNumber').value;    

    this.shadowRoot.getElementById('hslHueRange').value = h;
    this.shadowRoot.getElementById('hslSatRange').value = s;
    this.shadowRoot.getElementById('hslLitRange').value = l;

    this._setColorHsl(h, s, l);
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
        <div class="swatch__label-box">
          <h3 class="swatch__title">${swatch.hex}</h3>
          <h4 class="swatch__contrast">${swatch.contrast}:1</h4>    
        </div>
      </label>
    </div>`;
  }
}



customElements.define('color-tool', ColorTool);

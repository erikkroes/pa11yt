/* eslint-disable class-methods-use-this */
import { LitElement, html, css } from 'lit-element';

class Pa11yt extends LitElement {
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
    this.title = 'pa11yt';
    this.selectedSwatch = 2;
    this.swatches = [{ 
      r: 255,
      g: 255,
      b: 255,
      hex: '#ffffff',
      lum: 1,
      contrast: 3.0,
    },
    { 
      r: 0,
      g: 0,
      b: 0,
      hex: '#000000',
      lum: 0,
      contrast: 7.0,
    },
    { 
      r: 149,
      g: 149,
      b: 149,
      hex: '#959595',
      lum: 3,
      contrast: 1.0,
    }];
    this.color = {      
      rgb: { r: 149, g: 149, b: 149},
      hsl: { h : 0, s: 0, l: 58},
      ycc: { y: 0.301, cr: 0, cb: 0},
      hex: '#959595',
      lum: 3,
      lumRatio: 3,
      value: "#959595"
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
          flex-wrap: wrap; 
          margin-bottom: 16px;   
          max-width: 960px;
        }

        .swatch {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          min-height: 120px;
          min-width: 152px;
          margin-right: 8px;   
          margin-bottom: 16px;       
        }

        .swatch:nth-of-type(8n) {
          margin-right: 0;
        }

        .swatch--selected {
          box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        }

        .swatch--selected .swatch__title {
          font-size: 19px;
        }

        .swatch--selected .swatch__contrast {
          display: none;
        }

        .swatch--button {
          background-color: #fff;
          height: 120px;
          width: 113px;
        }

        .swatch__add-button {
          all: inherit;
          display: flex;
          justify-content: center;
          min-height: 120px;
          min-width: 113px;          
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
          font-size: 16px;
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

        .color__input-label {
          font-size: 24px;
          padding: 8px;
          border-radius: 8px 0 0 8px;          
          border: 2px solid #000;
          border-right: 0;
          background: #fff;
        }

        .color__input {
          font-size: 24px;
          padding: 8px;
          border-radius: 0 8px 8px 0;          
          border: 2px solid #000;
        }

        .color__block {
          grid-column: span 1 / auto;
          padding: 24px;
          background-color: #ffffff;
        }

        .color__block-lum {
          grid-column: span 3 / auto;        
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
                <button type="button" @click="${this._addSwatch}" class="swatch__add-button">+</button>             
              </div>
            </div>
          </fieldset> 
              
          <!-- </fieldset> -->
        <!-- </form>   -->
      </section>

      <main class="color">
        <div class="card color__input-holder" style="background-color: ${this.color.hex}">
          <label class="color__input-label">Color</label>
          <input type="text" class="color__input" .value="${this.color.value}" @change="${this._updateHexToRgb}">
        </div>

        <div class="card color__block">
          <h2>WCAG Luminance</h2>
          <div class="color__ranges">
            <label id="label_lum">Luminance</label>
            <input type="range" id="lumRange" name="lumRange" aria-labelledby="label_lum" min="1" max="21" step=".01" .value="${(this.color.lum).toFixed(2)}" @change="${this._updateLumFromRange}">
            <input type="number" id="lumNumber" name="lumNumber" aria-labelledby="label_lum" min="1" max="21" step=".01" .value="${(this.color.lum).toFixed(2)}" @change="${this._updateLumFromNumber}">
          </div>
        </div>

        <div class="card color__block">
          <h2>RGB/HEX</h2>
          <div class="color__ranges">
            <label id="label_rgb_red">Red</label>
            <input type="range" id="rgbRedRange" name="rgbRedRange" aria-labelledby="label_rgb_red" min="0" max="255" step="1" .value="${Math.round(this.color.rgb.r)}" @change="${this._updateRgbFromRange}">
            <input type="number" id="rgbRedNumber" name="rgbRedNumber" aria-labelledby="label_rgb_red" min="0" max="255" step="1" .value="${Math.round(this.color.rgb.r)}" @change="${this._updateRgbFromNumber}">
            
            <label id="label_rgb_green">Green</label>
            <input type="range" id="rgbGreenRange" name="rgbGreenRange" aria-labelledby="label_rgb_green" min="0" max="255" step="1" .value="${Math.round(this.color.rgb.g)}" @change="${this._updateRgbFromRange}">
            <input type="number" id="rgbGreenNumber" name="rgbGreenNumber" aria-labelledby="label_rgb_green" min="0" max="255" step="1" .value="${Math.round(this.color.rgb.g)}" @change="${this._updateRgbFromNumber}">
          
            <label id="label_rgb_blue">Blue</label>
            <input type="range" id="rgbBlueRange" name="rgbBlueRange" aria-labelledby="label_rgb_blue" min="0" max="255" step="1" .value="${Math.round(this.color.rgb.b)}" @change="${this._updateRgbFromRange}">
            <input type="number" id="rgbBlueNumber" name="rgbBlueNumber" aria-labelledby="label_rgb_blue" min="0" max="255" step="1" .value="${Math.round(this.color.rgb.b)}" @change="${this._updateRgbFromNumber}">
          </div>
        </div>
        <div class="card color__block">
          <h2>HSL</h2>
          <div class="color__ranges">
            <label id="label_hsl_hue">Hue</label>
            <input type="range" id="hslHueRange" name="hslHueRange" aria-labelledby="label_hsl_hue" min="0" max="360" step="1" .value="${this.color.hsl.h}" @change="${this._updateHslFromRange}">
            <input type="number" id="hslHueNumber" name="hslHueNumber" aria-labelledby="label_hsl_hue" min="0" max="360" step="1" .value="${Math.round(this.color.hsl.h)}" @change="${this._updateHslFromNumber}">
            
            <label id="label_hsl_sat">Saturation</label>
            <input type="range" id="hslSatRange" name="hslSatRange" aria-labelledby="label_hsl_sat" min="0" max="100" step=".1" .value="${this.color.hsl.s}" @change="${this._updateHslFromRange}">
            <input type="number" id="hslSatNumber" name="hslSatNumber" aria-labelledby="label_hsl_sat" min="0" max="100" step=".1" .value="${Math.round(this.color.hsl.s)}" @change="${this._updateHslFromNumber}">
          
            <label id="label_hsl_lit">Lightness</label>
            <input type="range" id="hslLitRange" name="hslLitRange" aria-labelledby="label_hsl_lit" min="0" max="100" step=".1" .value="${this.color.hsl.l}" @change="${this._updateHslFromRange}">
            <input type="number" id="hslLitNumber" name="hslLitNumber" aria-labelledby="label_hsl_lit" min="0" max="100" step=".1" .value="${Math.round(this.color.hsl.l)}" @change="${this._updateHslFromNumber}">
          </div>
        </div>  
        <div class="card color__block">
          <h2>YCrCb</h2>
          <div class="color__ranges">
            <label id="label_ycc_y">Y</label>
            <input type="range" id="yccYRange" name="yccYRange" aria-labelledby="label_ycc_y" min="0" max="1" step=".001" .value="${this.color.ycc.y}" @change="${this._updateYccFromRange}">
            <input type="number" id="yccYNumber" name="yccYNumber" aria-labelledby="label_ycc_y" min="0" max="1" step=".001" .value="${(this.color.ycc.y).toFixed(3)}" @change="${this._updateYccFromNumber}">
            
            <label id="label_ycc_cr">Cr</label>
            <input type="range" id="yccCrRange" name="yccCrRange" aria-labelledby="label_ycc_cr" min="-0.5" max="0.5" step=".001" .value="${this.color.ycc.cr}" @change="${this._updateYccFromRange}">
            <input type="number" id="yccCrNumber" name="yccCrNumber" aria-labelledby="label_ycc_cr" min="-0.5" max="0.5" step=".001" .value="${(this.color.ycc.cr).toFixed(3)}" @change="${this._updateYccFromNumber}">
          
            <label id="label_ycc_cb">Cb</label>
            <input type="range" id="yccCbRange" name="yccCbRange" aria-labelledby="label_ycc_cb" min="-0.5" max="0.5" step=".001" .value="${this.color.ycc.cb}" @change="${this._updateYccFromRange}">
            <input type="number" id="yccCbNumber" name="yccCbNumber" aria-labelledby="label_ycc_cb" min="-0.5" max="0.5" step=".001" .value="${(this.color.ycc.cb).toFixed(3)}" @change="${this._updateYccFromNumber}">
          </div>
        </div>        
      </main>

    `;
  }

  _addSwatch() {
    const contrast = this._lumToContrast(1, this.color.ycc.y);
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

  _setColorYcc(y, cr, cb) {
    console.log(y, cr, cb);
    const rgb = this._yccToRgb(y, cr, cb);
    console.log(rgb);
    this._setColorRgb(rgb.r, rgb.g, rgb.b);
  }

  _updateColor() {
    const {r} = this.color.rgb;
    const {g} = this.color.rgb;
    const {b} = this.color.rgb;
    const rgb = {r, g, b};
    const hex = this._rgbToHex(rgb.r, rgb.g, rgb.b);
    const hsl = this._rgbToHsl(rgb.r, rgb.g, rgb.b);
    const ycc = this._rgbToYcc(rgb.r, rgb.g, rgb.b);
    const lum =  (ycc.y + 0.05) / 0.05;
    const lumRatio = this._lumToContrast(lum, 0);
    this.color = {
      rgb,
      hex,
      hsl,
      ycc,
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
      lum: this.color.ycc.y,
      contrast: '1.0',
    }
  }

  _updateSwatches(){
    this.swatches.forEach( swatch => (
      swatch.contrast = this._lumToContrast(swatch.lum, this.color.ycc.y)
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
    const rL = this._toLinear(r / 255);
    const gL = this._toLinear(g / 255);
    const bL = this._toLinear(b / 255);

    const lum = (0.2126 * rL + 0.7152 * gL + 0.0722 * bL);    
    return lum;
  }

  _rgbToYcc(r, g, b){
    // https://www.itu.int/dms_pubrec/itu-r/rec/bt/R-REC-BT.709-6-201506-I!!PDF-E.pdf
    
    const rL = this._toLinear(r / 255);
    const gL = this._toLinear(g / 255);
    const bL = this._toLinear(b / 255);
    
    const y = (0.2126 * rL + 0.7152 * gL + 0.0722 * bL);

    const cr = ( rL - y ) / 1.5748;
    const cb = ( bL - y ) / 1.8556;

    // if ( ((y - (rL * 0.2126 +  bL * 0.0722)) / 0.7152) < 0 ){
    //   y = 0;
    // }
    // // else if ( ((y - (rL * 0.2126 +  bL * 0.0722)) / 0.7152) > 1 ){
    // //   y = 1;
    // // }

    // if ( ((cr * 1.5748) + y) < 0 ){
    //   cr = 0;
    // }
    // else if ( ((cr * 1.5748) + y) > 1 ){
    //   cr = 1;
    // }

    // if ( ((cb * 1.8556) + y) < 0 ){
    //   cb = 0;
    // }
    // else if ( ((cb * 1.8556) + y) > 1 ){
    //   cb = 1;
    // }

    // const cr = 0.6350 * ( rL - y );
    // const cb = 0.5389 * ( bL - y );

    // const cr = 0.5 * ((rL - y) / (1 - 0.2126));
    // const cb = 0.5 * ((bL - y) / (1 - 0.0722));  

    return {y, cr, cb};
  }

  _yccToRgb(y, cr, cb){  
    let rL = (cr * 1.5748) + y; 
    if (rL < 0) {
      rL = 0;
    }
    else if (rL > 1) {
      rL = 1;
    }
    
    let bL = (cb * 1.8556) + y;
    if (bL < 0) {
      bL = 0;
    } 
    else if (bL > 1) {
      bL = 1;
    }

    let gL = (y - (rL * 0.2126 +  bL * 0.0722)) / 0.7152 ;
    if (gL < 0) {
      gL = 0;
    }
    else if (gL > 1) {
      gL = 1;
    }
    // appears to be the same
    // const rL = (y + 2*(1 - 0.2126) * cr);
    // const bL = (y + 2*(1 - 0.0722) * cb);
    
           

    // didnt work
    // const rC = 0.2126;
    // const gC = 0.7152;
    // const bC = 0.0722;
    // const rL = y + cr*(1-rC);
    // const gL = y - cb*(1-bC)*bC/gC - cr*(1-rC)*rC/gC;
    // const bL = y + cb*(1-bC);

    const r = this._toSrgb(rL)*255;
    const g = this._toSrgb(gL)*255;
    const b = this._toSrgb(bL)*255;
    
    return {r, g, b};
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

    this._setColorHsl(h, s, l);
  }

  _updateHslFromNumber(){    
    const h = this.shadowRoot.getElementById('hslHueNumber').value;
    const s = this.shadowRoot.getElementById('hslSatNumber').value;
    const l = this.shadowRoot.getElementById('hslLitNumber').value;    

    this._setColorHsl(h, s, l);
  }

  _updateYccFromRange(){
    const y = parseFloat(this.shadowRoot.getElementById('yccYRange').value);
    const cr = parseFloat(this.shadowRoot.getElementById('yccCrRange').value);
    const cb = parseFloat(this.shadowRoot.getElementById('yccCbRange').value);

    this._setColorYcc(y, cr, cb);
  }

  _updateYccFromNumber(){    
    const y = parseFloat(this.shadowRoot.getElementById('yccYNumber').value);
    const cr = parseFloat(this.shadowRoot.getElementById('yccCrNumber').value);
    const cb = parseFloat(this.shadowRoot.getElementById('yccCbNumber').value);    

    this._setColorYcc(y, cr, cb);
  }

  _updateLumFromRange(){
    const y = parseFloat(this.shadowRoot.getElementById('lumRange').value) * 0.05 - 0.05;
    const cr = parseFloat(this.shadowRoot.getElementById('yccCrRange').value);
    const cb = parseFloat(this.shadowRoot.getElementById('yccCbRange').value);

// 1.05 / (ycc.y + 0.05);
// (ycc.y + 0.05) / 0.05;
    this._setColorYcc(y, cr, cb);
  }

  _updateLumFromNumber(){    
    const y = (1.05 / parseFloat(this.shadowRoot.getElementById('lumNumber').value)) - 0.05;
    const cr = parseFloat(this.shadowRoot.getElementById('yccCrNumber').value);
    const cb = parseFloat(this.shadowRoot.getElementById('yccCbNumber').value);    

    this._setColorYcc(y, cr, cb);
  }

  _toSrgb(c){
    if (Math.abs(c) < 0.0031308) {
      return 12.92 * c;
    }
    return 1.055 * (c ** (1/2.4)) - 0.055;   
  }

  _toLinear(c){    
    if (Math.abs(c) <= 0.04045) {
      return c / 12.92;
    }
    return ((c + 0.055)/1.055) ** 2.4; 
  }

  _swatchTemplate(swatch, i) {
    return html`<div class="card swatch ${(this.selectedSwatch === i) ? 'swatch--selected' : ''}" style="background-color: ${swatch.hex}">
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

customElements.define('pa1-1yt', Pa11yt);

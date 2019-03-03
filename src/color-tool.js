/* eslint-disable class-methods-use-this */
import { LitElement, html, css } from 'lit-element';

class ColorTool extends LitElement {
  static get properties() {
    return {
      title: { type: String },
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
      contrast: '1.0:1'}
    ];
    this.color = {
      xyz : { x: 0.9505, y: 1.0000, z: 1.0888 },
      rgb : { r: 255, g: 255, b: 255},
      hex: '#ffffff',
      value: "#ffffff"
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;          
          max-width: 960px;

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
          opacity: 0;
          width: 1px;
        }

        .swatch__label {
          display: flex;
          justify-content: space-between;
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
          <h2 class="swatches__title">Swatches</h2>
          <fieldset class="swatches__fieldset">
            <div class="swatches__group">
              ${this.swatches.map((swatch, i) => this._swatchTemplate(swatch, i))}
              
              <div class="card swatch--button">
                <button @click=${this._addSwatch} class="swatch__add-button">+</button> 
              </div>                           
            </div>
          </fieldset>
      </section>

      <main class="color">
        <div class="card color__input-holder" style="background-color: ${this.color.hex}">
          <input type="text" class="color__input" value="${this.color.value}">
        </div>
        <div class="card color__block">
          <h2>RGB/HEX</h2>
          <div class="color__range">
            <label>Red</label>
            <input type="range" id="rgb-redRange" name="rgb-redRange" min="0" max="255" step="1" value="255">
            <input type="number" id="rgb-redNumber" name="rgb-redRange" min="0" max="255" step="1" value="255">
          </div>
          <div class="color__range">
            <label>Green</label>
            <input type="range" id="rgb-greenRange" name="rgb-greenRange" min="0" max="255" step="1" value="255">
            <input type="number" id="rgb-greenNumber" name="rgb-greenRange" min="0" max="255" step="1" value="255">
          </div>
          <div class="color__range">
            <label>Blue</label>
            <input type="range" id="rgb-blueRange" name="rgb-blueRange" min="0" max="255" step="1" value="255">
            <input type="number" id="rgb-blueNumber" name="rgb-blueRange" min="0" max="255" step="1" value="255">
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
    const newSwatch = { x: 0.9505,
      y: 1.0000,
      z: 1.0888,
      hex: '#ffffff',
      contrast: '1.0:1'}
    this.swatches.push(newSwatch);
    this.requestUpdate();
  }

  _remSwatch(i) {
    this.swatches = this.swatch.splice(i, 1);
  }

  _setSwatch(i){
    this.selectedSwatch = i;
    const xyz = [this.swatches[i].x, this.swatches[i].y, this.swatches[i].z]
    this._setColor([...xyz]);
    console.log(i);
  }

  _setColor(x, y, z) {
    const xyz = (x, y, z);
    const rgb = this._rgbFromXyz(x, y, z);
    const hex = this._hexFromRgb([...rgb]);
    this.color = {
      xyz,
      rgb,
      hex,
      value: hex
    }
  }

  _rgbFromXyz(x, y, z) { // https://stackoverflow.com/questions/43494018/converting-xyz-color-to-rgb
    const r = 3.2404542*x - 1.5371385*y - 0.4985314*z;
    const g = -0.9692660*x + 1.8760108*y + 0.0415560*z;
    const b = 0.0556434*x - 0.2040259*y + 1.0572252*z;
    return([r, g, b]);
  }

  _hexFromRgb(r, g, b) { // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    const rgb = b | (g << 8) | (r << 16);
    const hex = '#' + (0x1000000 + rgb).toString(16).slice(1);     
    return hex;
  }

  _swatchTemplate(swatch, i) {
    return html`<div class="card swatch ${(this.selectedSwatch === i) ? 'swatch--selected' : ''}" style="background-color: ${swatch.hex}">
      <input type="radio" value="${swatch.hex}" class="swatch__radio" @click=${this._setSwatch(i)}>
      <label class="swatch__label">
        <h3 class="swatch__title">${swatch.hex}</h3>
        <h4 class="swatch__contrast">${swatch.contrast}</h4>    
      </label>
    </div>`;
  }
}



customElements.define('color-tool', ColorTool);

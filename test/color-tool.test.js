import { html, fixture, expect } from '@open-wc/testing';

import '../src/color-tool';

describe('<color-tool>', () => {
  it('has a default property header', async () => {
    const el = await fixture('<color-tool></color-tool>');
    expect(el.title).to.equal('open-wc');
  });

  it('allows property header to be overwritten', async () => {
    const el = await fixture(html`
      <color-tool title="different"></color-tool>
    `);
    expect(el.title).to.equal('different');
  });
});

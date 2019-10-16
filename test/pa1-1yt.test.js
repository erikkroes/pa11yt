import { html, fixture, expect } from '@open-wc/testing';

import '../src/pa1-1yt';

describe('<pa1-1yt>', () => {
  it('has a default property header', async () => {
    const el = await fixture('<pa1-1yt></pa1-1yt>');
    expect(el.title).to.equal('open-wc');
  });

  it('allows property header to be overwritten', async () => {
    const el = await fixture(html`
      <pa1-1yt title="different"></pa1-1yt>
    `);
    expect(el.title).to.equal('different');
  });
});

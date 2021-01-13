import { render, html } from 'lit-html';
import '@ircam/simple-components/sc-toggle';
import '@ircam/simple-components/sc-text';

function renderGui($container, state, toggleStarted) {
  render(html`
    <sc-text
      readonly
      value="start"
    ></sc-text>
    <sc-toggle
      .value="${state.started}"
      @change="${e => toggleStarted()}"
    ></sc-toggle>
  `, $container);
}

export default renderGui;

import type { SandboxHooks, Sandbox } from '../core/sandbox';


export function getElementPlugin (hooks: SandboxHooks) {
  let currentSandbox: Sandbox;
  hooks.sandbox.register('beforeInitialization', (end, sandbox) => {
    currentSandbox = sandbox;
  })
  hooks.document.register('get', (end, proxyDocument, property, receiver, rawDocument) => {
    if (property === 'getElementsByTagName') {
      return end((tagName: string) => {
        const shadowRoot = currentSandbox.shadowRoot;
        return shadowRoot.querySelectorAll(tagName);
      });
    }

    if (property === 'querySelector') {
      return end((selectors: string) => {
        const shadowRoot = currentSandbox.shadowRoot;
        return shadowRoot.querySelector(selectors);
      });
    }

    if (property === 'querySelectorAll') {
      return end((selectors: string) => {
        const shadowRoot = currentSandbox.shadowRoot;
        return shadowRoot.querySelectorAll(selectors);
      });
    }

    if (property === 'getElementById') {
      return end((id: string) => {
        const shadowRoot = currentSandbox.shadowRoot;
        return shadowRoot.querySelector('#' + id);
      });
    }

    if (property === 'getElementsByClassName') {
      return end((className: string) => {
        const shadowRoot = currentSandbox.shadowRoot;
        return shadowRoot.querySelectorAll('.' + className);
      });
    }
  })
}

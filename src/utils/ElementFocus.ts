const DEFAULT_CANDIDATES = `
  a, button, input, select, textarea, svg, area, details, summary,
  iframe, object, embed, 
  [tabindex], [contenteditable]
`;

type TrapFocus = {
  release: () => void;
};

class ElementFocus {
  private static instance: ElementFocus;

  candidates: string;

  constructor(candidates = '') {
    this.candidates = candidates || DEFAULT_CANDIDATES;
  }

  public trapFocus(focusElement: Element, rootNode: Document = document): TrapFocus {
    const candidatesNodeList: Element[] = Array.from(
      rootNode.querySelectorAll(this.candidates)
    );
    const nodes = [...candidatesNodeList]
      .filter((node: Element) => !focusElement.contains(node) && node.getAttribute('tabindex') !== '-1');
    nodes.forEach((node: Element) => node.setAttribute('tabindex', '-1'));

    return {
      release() {
        nodes.forEach((node: Element) => node.removeAttribute('tabindex'));
      }
    };
  }

  public static getInstance(): ElementFocus {
    if (!ElementFocus.instance) {
      ElementFocus.instance = new ElementFocus();
    }
    return ElementFocus.instance;
  }
}

export default ElementFocus;

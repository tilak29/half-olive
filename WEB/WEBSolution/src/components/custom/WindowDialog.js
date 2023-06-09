import React from "react";
import ReactDOM from "react-dom";

/**
 * Dialog which opens its child component in new Window
 * @param {String} title
 * @author Tejal Sali
 */
export default class WindowDialog extends React.PureComponent {
  constructor(props) {
    super(props);
    // STEP 1: create a container <div>
    this.containerEl = document.createElement("div");
    this.externalWindow = null;
  }

  render() {
    // STEP 2: append props.children to the container <div> that isn't mounted anywhere yet
    return ReactDOM.createPortal(this.props.children, this.containerEl);
  }

  copyStyles(sourceDoc, targetDoc) {
    Array.from(sourceDoc.styleSheets).forEach((styleSheet) => {
      // if (styleSheet.cssRules) {
      //   // for <style> elements
      //   const newStyleEl = sourceDoc.createElement("style");

      //   Array.from(styleSheet.cssRules).forEach((cssRule) => {
      //     // write the text of each rule into the body of the style element
      //     newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
      //   });

      //   targetDoc.head.appendChild(newStyleEl);
      // } else
      if (styleSheet.href) {
        // for <link> elements loading CSS from a URL
        const newLinkEl = sourceDoc.createElement("link");

        newLinkEl.rel = "stylesheet";
        newLinkEl.href = styleSheet.href;
        targetDoc.head.appendChild(newLinkEl);
      }
    });
  }

  componentDidMount() {
    // STEP 3: open a new browser window and store a reference to it
    this.externalWindow = window.open(
      "",
      "",
      "fullscreen=yes,toolbar=yes,scrollbars=yes,resizable=yes"
    );

    const { title = "Smart Lab" } = this.props;

    if (this.externalWindow) {
      const header = `<html><head><title>${title}</title></head><body height="100%" width="100%"></body></html>`;
      this.externalWindow.document.write(header);
    }

    // STEP 4: append the container <div> (that has props.children appended to it) to the body of the new window
    this.externalWindow.document.body.appendChild(this.containerEl);

    this.copyStyles(document, this.externalWindow.document);
  }

  componentWillUnmount() {
    // STEP 5: This will fire when this.state.showWindowPortal in the parent component becomes false
    // So we tidy up by closing the window

    this.externalWindow.close();
  }
}

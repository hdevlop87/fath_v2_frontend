let injected = false;

export function registerCss(cssContent) {
    if (injected) {
        return
    }
    content += '\n' + cssContent;
}

export function inject() {

    if (injected) {
        return;
    }

    injected = true;

    const cssContent = content;
    content = '';

    const cssNode = document.createElement('style');
    cssNode.id = 'blockly-common-style';
    const cssTextNode = document.createTextNode(cssContent);
    cssNode.appendChild(cssTextNode);
    document.head.insertBefore(cssNode, document.head.firstChild);
}


let content = `
    #SVG {
        outline: none;
        overflow: hidden;  /* IE overflows by default. */
        position: absolute;
        display: block;
    }
`
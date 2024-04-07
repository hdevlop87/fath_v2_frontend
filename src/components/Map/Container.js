import { SVG } from '@svgdotjs/svg.js';

export default class Container {

    constructor(svgDrawSpace= null) {
        this._children = new Map();
        this._svgDrawSpace = svgDrawSpace;
    }


    async add(svgPath) {
        const nodes = await this.parseFile(svgPath);
        let parentGroupElement;
        const groupNodes = nodes.filter(svgNode => svgNode.tagName.toLowerCase() === 'g');
        if (groupNodes.length > 0) {
            parentGroupElement = SVG(groupNodes[0].outerHTML);
        } else {
            parentGroupElement = SVG().group();
            nodes.forEach(svgNode => {
                const element = SVG(svgNode.outerHTML);
                parentGroupElement.add(element);
            });
        }
        const groupId = parentGroupElement.attr('id') ;
        parentGroupElement.attr('id', groupId);  
    
        this._svgDrawSpace.add(parentGroupElement);
        return parentGroupElement; 
    }
    
    
    
    
    
    setChildrenFromMap(map) {
        this._children = map;
    }
    
    parseSVGString(svgString) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgString, 'image/svg+xml');
        return [doc.documentElement];
    }

    async parseFile(filePath) {
        const response = await fetch(filePath);
        const svgContent = await response.text();
        return this.contentFromSVGString(svgContent);
    }

    contentFromSVGString(svgString) {
        const contentWithoutSvgTag = svgString.replace(/<\/?svg[^>]*>/g, '');
        const parser = new DOMParser();
        const doc = parser.parseFromString(contentWithoutSvgTag, 'image/svg+xml');
        return [doc.documentElement];
    }


}


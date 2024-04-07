import { SVG } from '@svgdotjs/svg.js';
import Container from './Container'
import { addClass } from "./utils/Myhelper.js";
import Grid from './grid.js';



export default class Scene extends Container {

    constructor(options) {
        super();
        this._container = options.container;
        this.setTargetDom();
        this.createDOMContent();
        this.createSvg();
        new Grid(this);
        this.createPartsLayer();
        this._svgDrawSpace = this.getSvgDrawSpace();
    }

    setTargetDom() {
        if (this._container && this._container !== '') {
            if (this._container && this._container.nodeType === 1) {
                target = this._container;
            }
            else if (typeof this._container === 'string') {
                if (this._container.charAt(0) === '.') {
                    var className = this._container.slice(1);
                    this._container = document.getElementsByClassName(className)[0];
                }
                else {
                    var id;
                    if (this._container.charAt(0) !== '#') {
                        id = this._container;
                    } else {
                        id = this._container.slice(1);
                    }
                    this._container = document.getElementById(id);
                }
            }
        }
        else {
            this._container = document.body;
        }

        this.width = this._container.offsetWidth;
        this.height = this._container.offsetHeight;
    }

    createDOMContent() {
        this.content = document.createElement('div');
        addClass(this.content, 'RimaSVG');
        this.content.setAttribute("id", "RimaSVG");
        this._container.appendChild(this.content);
    }

    createSvg() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("id", "SVG");
        svg.setAttribute("version", "1.1");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("width", this.width);
        svg.setAttribute("height", this.height);
        svg.setAttribute("preserveAspectRatio", "xMinYMin");
        svg.setAttribute("fill", "none");
        this.content.appendChild(svg);
        svg.setAttribute("viewBox", `0 0 ${svg.clientWidth} ${svg.clientHeight}`);
        this.svg = SVG('#SVG');
    }

    createPartsLayer() {
        this.partsLayer = this.svg.group().id('partsLayer');
    }

    getPartsLayer() {
        return this.partsLayer;
    }

    setMouse() {
        this.mouse = new Mouse();
    }

    setDraggable() {
        new dragabble(this, this.mouse)
    }

    setGrid() {
        new Grid(this);
    }

    getScene() {
        return this;
    }

    getSvgDrawSpace() {
        return this.getPartsLayer();
    }

    destroy() {
        if (this.content) {
            this.content.remove();
        }
        this.partsLayer = null; 
        this.svg = null;
        this.mouse = null;
    }

}


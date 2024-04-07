import { isElementID } from '../../utils'
import { RIGHT_CLICK } from '../../utils/constants';
import { SVG } from '@svgdotjs/svg.js';
import { handlePolylineMouse, isVertical } from '../geometry/polyline'

export default class Mouse {
    mouse: any;
    click: any;
    move: any;
    rightClick: any;
    svg: any;
    isDrawing = false;
    scene: any;
    isWireEdit = false;

    constructor(scene) {
        this.scene = scene;
        this.mouse = scene.mouse;
        this.svg = scene.mainSvg;
        this.registerMouseEvents();
    }

    registerMouseEvents() {
        this.mouse.registerEvent('mousedown', this._mousedown.bind(this));
        this.mouse.registerEvent('mouseup', this._mouseup.bind(this));
        this.mouse.registerEvent('mouseover', this._mouseover.bind(this));
        this.mouse.registerEvent('mouseout', this._mouseout.bind(this));
        this.scene.on('onDraw', this.handleDraw.bind(this));
        this.scene.on('onWireEdit', this.handleWireEdit.bind(this));
    }

    handleWireEdit(e) {
        this.isWireEdit = e.detail.isWireEdit
    }

    handleDraw(e) {
        this.isDrawing = e.detail.isDrawing
    }

    _mousedown(ev) {
        let el = ev.target;
        if (isElementID(el, 'gridChild') && (ev.button === RIGHT_CLICK)) {
            this.setCursorStyle('grabbing')
        }
    }

    _mouseup(ev) {
        let el = ev.target;
        if (isElementID(el, 'gridChild') && (ev.button === RIGHT_CLICK)) {
            this.setCursorStyle('default')
        }
    }

    _mouseover(ev) {
        let el = ev.target;

        if (isElementID(el, 'gridChild') && !this.isDrawing && !this.isWireEdit) {
            this.setCursorStyle('default');
            return
        }

        if ((isElementID(el, 'part_body') || isElementID(el, 'part_annotation') )&& !this.isDrawing) {
            this.setCursorStyle('move');
        }

    }

    _mouseout(ev) {
        let el = ev.target;
        if (isElementID(el, 'connection_')&& !this.isWireEdit ) {
            this.setCursorStyle('default');
        }
    }

    setCursorStyle(style) {
        document.body.style.cursor = style;
    }
}
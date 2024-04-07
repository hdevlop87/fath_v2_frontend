import { SVG } from '@svgdotjs/svg.js';
import { LEFT_CLICK } from '../../../utils/constants';
import { isElementID } from '../../../utils';
import { Rima } from '../../Rima'


export default class DrawingManager {
    [x: string]: any;

    constructor(scene) {
        this.scene = scene;
        this.mouse = scene.mouse;
        this.partManager = scene.partManager;
        this.partLayer = scene.partLayer;
        this.isDrawing = false;
        this.startPoint = { x: 0, y: 0 };
        this.points = [];
    }


    isGrid_LeftClick(ev) {
        let el = ev.target;
        return (isElementID(el, 'gridChild') && (ev.button === LEFT_CLICK))
    }

    startDrawing() {
        this.mouse.registerEvent('mousemove', this.onMouseMove.bind(this));
        this.mouse.registerEvent('mouseup', this.onMouseUp.bind(this));
    }

    stopDrawing() {
        this.isDrawing = false;
        this.mouse.unregisterEvent('mousemove', this.onMouseMove);
        this.mouse.unregisterEvent('mouseup', this.onMouseUp);
        this.currentShape = null;
    }
    //======================================================================//
    //=========================== Draw Shapes ==============================//
    onClick() {
        const selectedShape = this.scene.getToolShape();
        this.startDrawing();

        switch (selectedShape) {
            case 'polyline':

                break;
            case 'path':
                this.currentShape = Rima('circle', {
                    r: 100,
                    cx: 0,
                    cy: 0,
                    fill: 'gray',
                });
                break;

        }

        // this.currentShape.setLayer('parts')

    }

    onMouseDown() {
        this.isDrawing = true;
    }

    onMouseMove(e) {

    }

    onMouseUp(e) {

    }

}
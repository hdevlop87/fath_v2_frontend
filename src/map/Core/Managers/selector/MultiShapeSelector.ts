import { SVG } from '@svgdotjs/svg.js';
import { LEFT_CLICK } from '../../../utils/constants';
import { isElementID } from '../../../utils';
import { isBboxColliding } from '../../geometry/collision'

export default class MultiShapeSelector {
    [x: string]: any;

    constructor(scene) {
        this.scene = scene;
        this.mouse = scene.mouse;
        this.partManager = scene.partManager;

        this.layer = scene.mainSvg;
        this.rect = null;
        this.startPoint = { x: 0, y: 0 };
        this.isDrawing = false;
    }

    isGrid_LeftClick_Mouse(ev) {
        let el = ev.target;
        const selectedShape = this.scene.getToolShape();
        return (isElementID(el, 'gridChild') && (ev.button === LEFT_CLICK) && (selectedShape === 'select'))
    }

    startRectDrawing(ev) {

        //if (!this.isGrid_LeftClick_Mouse(ev)) return;
        this.isDrawing = true;
        this.mouse.registerEvent('mousemove', this.updateRectDrawing.bind(this));
        this.mouse.registerEvent('mouseup', this.stopRectDrawing.bind(this));
        this.startPoint = this.snapToGrid(ev.pos);
        this.rect = this.layer.rect(0, 0).attr({ x: this.startPoint.x, y: this.startPoint.y, stroke: 'orange', 'stroke-dasharray': "10,10", 'stroke-width': 1, fill: 'rgba(255, 99, 71, 0.05)' });
    }

    updateRectDrawing(e) {
        if (!this.isDrawing || !this.rect) return;
        let pos = this.snapToGrid(e.pos);
        const x = Math.min(pos.x, this.startPoint.x);
        const y = Math.min(pos.y, this.startPoint.y);
        const width = Math.abs(pos.x - this.startPoint.x);
        const height = Math.abs(pos.y - this.startPoint.y);
        this.rect.move(x, y).size(width, height);
    }

    stopRectDrawing() {
        this.selectElementsInRect()

        this.isDrawing = false;
        if (this.rect) {
            this.rect.remove();
            this.rect = null;
        }
        this.mouse.unregisterEvent('mousemove', this.updateRectDrawing);
        this.mouse.unregisterEvent('mouseup', this.stopRectDrawing);
    }

    snapToGrid(pos) {
        let gridCell = this.scene.getGridCell()
        return {
            x: Math.round(pos.x / gridCell) * gridCell,
            y: Math.round(pos.y / gridCell) * gridCell
        };
    }

    getRectBbox() {
        return this.rect ? this.rect.rbox() : null;
    }

    selectElementsInRect() {
        if (!this.isDrawing || !this.rect) return;
        const rectBbox = this.rect.rbox(this.layer);
        const allParts = this.scene.getAllParts()
        if (rectBbox.w == 0) return;

        let selectedParts = [];
        

        allParts.forEach(part => {
            const partBbox = part.rbox(this.layer);
            if (isBboxColliding(partBbox, rectBbox)) {
                selectedParts.push(part);
            }
        });

        if (selectedParts.length > 0) {
            this.scene.selectParts(selectedParts);
        }

    }

}


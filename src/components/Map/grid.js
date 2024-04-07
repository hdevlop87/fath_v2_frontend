import { SVG } from '@svgdotjs/svg.js';
import { SVG_ELEMENT_ID, GRID_CELL, RIGHT_CLICK } from './utils/constants'


class Grid {
    constructor(scene) {
        this.scene = scene;
        this.scaleFactor = 0.95;
        this.old_zoom = 1;
        this.svg = SVG(`#${SVG_ELEMENT_ID}`);
        this.zoom = 0.60;
        this.first_Click = { x: 0, y: 0 }
        this.drawGrid();

        this.input = {
            id: null,
            button: null,
            target: null,
            pos: {}
        }

        this.svg
            .on('mousedown', this.click.bind(this))
            .on('mousemove', this.move.bind(this))
            .on('mouseup', this.stop.bind(this))
            .on('wheel', this._wheel.bind(this))
            .on('contextmenu', this._contextmenu.bind(this));
    }

    drawGrid() {
        let a = GRID_CELL
        let gridCell = a * 5;
        let SmallCell = a;

        // this.patternS = this.svg.pattern(SmallCell, SmallCell, function (add) {
        //     add.path(`M ${SmallCell} 0 H 0 V ${SmallCell}`).attr({ "fill": 'none', "stroke": "#685858", "stroke-width": "0.2" });
        // })

        // this.patternG = this.svg.pattern(gridCell, gridCell, function (add) {
        //     add.rect(gridCell, gridCell).fill('url(#smallGrid)');
        //     add.path(`M ${gridCell} 0 H 0 V ${gridCell}`).attr({ "fill": 'none', "stroke": "#626262", "stroke-width": "0.3" });
        // })

        // this.patternS.attr({ "id": "smallGrid", "patternUnits": "userSpaceOnUse" });
        // this.patternG.attr({ "id": "grid", "patternUnits": "userSpaceOnUse" });

        this.group = this.svg.group().attr({ "id": "gridCanvas" });
        this.grid = this.group.rect('100%', '100%').move(0, 0).attr({ 'id': 'gridChild', "fill": 'url(#grid) ' });

        this.svg.attr({ "id": "SVG", "preserveAspectRatio": "xMinYMin" });
        this.viewBox = this.svg.node.viewBox.baseVal;
        this.viewBox.x = -this.svg.width() * 0.01
        this.viewBox.y = -this.svg.height() * 0.3
        this.grid.move(this.viewBox.x, this.viewBox.y);
        this.viewBox.width /= this.zoom; 
        this.viewBox.height /= this.zoom; 
    }

    _contextmenu(e) {
        e.preventDefault();
        return false;
     }

    _calculateXY(ev) {
        var startPoint = this.svg.point(ev.clientX, ev.clientY);
        this.input.pos.x = startPoint.x
        this.input.pos.y = startPoint.y
        this.input.button = ev.button
        this.input.target = ev.target 
        this.input.id = ev.target.id
        return this.input
    }

    click(e) {
        this._calculateXY(e);
        if (this.input.id === 'gridChild' && this.input.button === RIGHT_CLICK) {  
            this.panning = true;
            this.first_Click.x = this.input.pos.x;
            this.first_Click.y = this.input.pos.y;
            this.svg.node.style.cursor = 'grab';
        }
    }

    move(e) {
        this._calculateXY(e);
        if (this.panning) {
            this.viewBox.x -= (this.input.pos.x - this.first_Click.x);
            this.viewBox.y -= (this.input.pos.y - this.first_Click.y);
            this.grid.move(this.viewBox.x, this.viewBox.y);
            this.svg.node.style.cursor = 'grabbing'
        }
    }

    stop(e) {
        this.panning = false;
        this.first_Click.x = 0
        this.first_Click.y = 0
        this.svg.node.style.cursor = 'default'
    }

    _wheel(e) {
        this._calculateXY(e)
        var normalized;
        var delta = e.wheelDelta;

        if (delta) {
            normalized = (delta % 120) == 0 ? delta / 120 : delta / 12;
        } else {
            delta = e.deltaY || e.detail || 0;
            normalized = (delta % 3 ? delta * 10 : delta / 3);
        }

        var scaleDelta = normalized > 0 ? this.scaleFactor : 1 / this.scaleFactor;
        this.old_zoom *= scaleDelta;

        if (this.old_zoom >= 4) {
            scaleDelta = 1;
            this.old_zoom = 2
        }

        this.input.wheel = scaleDelta

        this.zoom = this.input.wheel
        this.viewBox.x -= (this.input.pos.x - this.viewBox.x) * (this.input.wheel - 1);
        this.viewBox.y -= (this.input.pos.y - this.viewBox.y) * (this.input.wheel - 1);
        this.viewBox.width *= this.input.wheel
        this.viewBox.height *= this.input.wheel;
        this.grid.size(this.viewBox.width * 2, this.viewBox.height * 2);
        this.grid.move(this.viewBox.x, this.viewBox.y);
    }

}

export default Grid
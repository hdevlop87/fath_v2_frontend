
class GridManager {
    [x: string]: any;


    constructor(scene) {
        this.scene = scene;
        this.mouse = scene.mouse;
        this.svg = scene.mainSvg;
        this.gridSvg = scene.gridSvg;
        this.first_Click = { x: 0, y: 0 };
        this.mouse.registerEvent('mousedown', this.mousedown.bind(this));
        this.mouse.registerEvent('mousemove', this.mousemove.bind(this));
        this.mouse.registerEvent('wheel', this.mousewheel.bind(this));
        this.viewBox = this.svg.node.viewBox.baseVal;
        this.viewBoxGrid = this.gridSvg.node.viewBox.baseVal;
        this.grid = this.gridSvg.findOne("#gridChild");
        this.zoomfactor = 1600/this.gridSvg.width();
        this.adjustViewBox()
    }

    adjustViewBox() {
        this.viewBox.x = 0;
        this.viewBox.y = -100;
        this.viewBox.width *= this.zoomfactor
        this.viewBox.height *= this.zoomfactor
        this.gridSvg.viewbox(this.viewBox.x, this.viewBox.y, this.viewBox.width, this.viewBox.height)
        this.grid.move(this.viewBox.x, this.viewBox.y);
    }

    startPaning() {
        this.mouse.registerEvent('mouseup', this.mouseup.bind(this));
        this.panning = true;
    }

    stopPaning() {
        this.mouse.unregisterEvent('mousemove', this.mousemove.bind(this));
        this.mouse.unregisterEvent('mouseup', this.mouseup.bind(this));
        this.panning = false;
    }

    mousedown({ pos, rightClick }) {
        if (rightClick) {
            this.startPaning();
            this.first_Click = pos;
            this.initialViewboxPos = [this.viewBox.x, this.viewBox.y]
        }
    }

    mousemove({ pos }) {
        if (this.panning) {
            const deltaX = pos.x - this.first_Click.x;
            const deltaY = pos.y - this.first_Click.y;
            this.viewBox.x -= deltaX;
            this.viewBox.y -= deltaY;
            this.gridSvg.viewbox(this.viewBox.x, this.viewBox.y, this.viewBox.width, this.viewBox.height)
            this.grid.move(this.viewBoxGrid.x, this.viewBoxGrid.y);
        }
    }

    mouseup(ev) {
        this.stopPaning();
        this.first_Click.x = 0
        this.first_Click.y = 0
    }

    mousewheel(e) {
        this.zoom = e.wheel
        this.viewBox.x -= (e.pos.x - this.viewBox.x) * (e.wheel - 1);
        this.viewBox.y -= (e.pos.y - this.viewBox.y) * (e.wheel - 1);
        this.viewBox.width *= e.wheel
        this.viewBox.height *= e.wheel;
        this.gridSvg.viewbox(this.viewBox.x, this.viewBox.y, this.viewBox.width, this.viewBox.height)
        this.grid.size(this.viewBox.width * 2, this.viewBox.height * 2);
        this.grid.move(this.viewBox.x, this.viewBox.y);

    }

}

export default GridManager
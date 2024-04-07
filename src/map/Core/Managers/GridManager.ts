
import { GRID_CELL, ZOOM } from '../../utils/constants'
import { registerCss, inject } from '../Css'

class GridManager {
    [x: string]: any;

    constructor(scene) {
        this.scene = scene;
        this.mouse = scene.mouse;
        this.gridSvg = scene.gridSvg;
        this.gridLayer = scene.gridLayer;
        this.zoom = ZOOM;
        this.first_Click = { x: 0, y: 0 };
        this.setGridCell(GRID_CELL);
    }

    setGridCell(newSize) {
        this.gridCellSize = newSize;
        this.clearPatterns();
        this.drawGrid();
    }

    getGridCell() {
        return this.gridCellSize
    }

    startPaning() {
        this.mouse.registerEvent('mouseup', this.boundStop);
        this.panning = true;
    }

    stopPaning() {
        this.mouse.unregisterEvent('mousemove', this.move.bind(this));
        this.mouse.unregisterEvent('mouseup', this.stop.bind(this));
        this.panning = false;
    }

    clearPatterns() {
        const existingPatterns = this.gridSvg.find('pattern');
        if (existingPatterns) {
            existingPatterns.forEach(pattern => pattern.remove());
        }
    }

    drawGrid() {
        const smallCellSize = this.gridCellSize;
        const largeCellSize = this.gridCellSize * 5;

        this.smallGridPattern = this.gridSvg.pattern(smallCellSize, smallCellSize, add => {
            add.path(`M ${smallCellSize} 0 H 0 V ${smallCellSize}`)
                .attr({ fill: 'none', stroke: "#685858", 'stroke-width': "0.2" });
        }).id("smallGrid");

        this.largeGridPattern = this.gridSvg.pattern(largeCellSize, largeCellSize, add => {
            add.rect(largeCellSize, largeCellSize).fill('url(#smallGrid)');
            add.path(`M ${largeCellSize} 0 H 0 V ${largeCellSize}`)
                .attr({ fill: 'none', stroke: "#626262", 'stroke-width': "0.3" });
        }).id("grid");

        this.grid = this.gridLayer.rect('100%', '100%').attr({ 'id': 'gridChild', "fill": 'url(#grid) ' });
    }

}

registerCss(`
    #GridSvg {
        position: absolute;
        background-color: #e9e9e9;
        border-radius: 12px;
    }
`);

export default GridManager
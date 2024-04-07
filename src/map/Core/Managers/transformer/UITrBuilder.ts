import { VERTEXNames } from '../../../utils/constants'
import { midpoint } from '../../geometry/polyline';
import { Rima } from '../../Rima';

export default class UIBuilder {
    [x: string]: any;

    constructor(tr) {
        this.vertices = new Map();
        this.transformer = tr;
        this.staticVertex = null;
        this.movingVertex = null;
        const points = [[0, 0], [100, 0], [100, 100], [0, 100]];
        this.createUI(points);
    }

    public createUI(points) {
        if (!points || points.length === 0) return;
        this.points = points;
        this.addSelectorLayer()
        this.addBox();
        this.addCornerVertices()
        this.addMidVertices();
        this.addRotationVertex();
        this.addRotationLine();
        this.addGTransfomer();
        this.addPivot();
        this.hideUI()
    }
    //=======================================================================//

    private addSelectorLayer() {
        this.trLayer = Rima('group', {
            layer: 'SVG',
            id: 'selectorG',
        });
    }

    private addCornerVertices() {
        this.points.forEach((point, index) => {
            this.addVertex(point, VERTEXNames[index]);
        });
    }

    private addMidVertices() {
        const midPoints = [
            midpoint(this.points[0], this.points[1]), // midTop
            midpoint(this.points[1], this.points[2]), // midRight
            midpoint(this.points[2], this.points[3]), // midBottom
            midpoint(this.points[3], this.points[0]), // midLeft
        ];

        midPoints.forEach((point, index) => {
            this.addVertex(point, VERTEXNames[index + 4]);
        });
    }

    private addVertex(point, name) {

        let vertex = Rima('rect', {
            layer: 'selectorG',
            id: `vertex_${name}`,
            fillOpacity: 0.5,
            fill: 'white',
            cx: point[0],
            cy: point[1],
            stroke: '#34a4e4',
            strokeWidth: 2,
            width: 8,
            height: 8,
        })

        vertex.name(name);
        vertex.category('UIElements');
        this.vertices.set(name, vertex);
    }

    private addPivot() {
        const centerPos = this.points.reduce((acc, point) => {
            return [acc[0] + point[0], acc[1] + point[1]]
        }, [0, 0])
            .map(coord => coord / this.points.length);

        this.pivot = Rima('circle', {
            layer: 'selectorG',
            r: 5,
            cx: centerPos[0],
            cy: centerPos[1],
            fill: 'none',
            id: 'vertex_pivot',
        })
        this.pivot.name('vertex_pivot');
        this.pivot.category('UIElements');
    }

    private addBox() {
        this.boxSelector = Rima('polygon', {
            layer: 'selectorG',
            id: 'transformerBox',
            points: this.points,
            fill: { color: '#34a4e4', opacity: 0 },
            stroke: { width: 3, color: '#34a4e4', dasharray: "5,5" }
        })
        this.boxSelector.category('UIElements');
    }

    private addRotationVertex() {
        const midTop = this.vertices.get('midTop');
        const rotationPoint = [midTop.cx(), midTop.cy() - 40];
        this.rotationVertex = Rima('circle', {
            layer: 'selectorG',
            id: 'rotator',
            r: 6,
            cx: rotationPoint[0],
            cy: rotationPoint[1],
            fill: 'red',
            stroke: { width: 2, color: '#34a4e4' },
        });
        this.rotationVertex.name('rotator');
        this.rotationVertex.category('UIElements');
        this.vertices.set('rotator', this.rotationVertex);
    }

    private addRotationLine() {
        const startVertex = this.vertices.get('midTop');
        const endVertex = this.rotationVertex;
        let p1 = [startVertex.cx(), startVertex.cy()];
        let p2 = [endVertex.cx(), endVertex.cy()];

        this.rotationLine = Rima('line', {
            layer: 'selectorG',
            id: 'line_rotate',
            points: [p1, p2],
            stroke: '#34a4e4',
            strokeWidth: 2,
        });

        this.rotationLine.name('line_rotate');
        this.rotationLine.backward();
    }

    private addGTransfomer() {
        this.GTransfomer = Rima('group', {
            layer: 'parts',
            id: 'GTransfomer',
        });
    }

    private addRotationText() {
        this.angleText = Rima('text', {
            layer: 'selectorG',
            text: 'Angle: 0°',
            x: 0,
            y: 0,
            fill: 'black'
        });
    }
    //=======================================================================//
    public removeUI() {
        if (this.vertices.size === 0) return;
        this.removeRotationVertex();
        this.removeRotationLine();
        this.removeBoxSelector();
        this.removeVertices();
        this.removePivot();
    }

    private removeVertices() {
        this.vertices.forEach(vertex => {
            this.scene.partManager.removePart(vertex);
            vertex.remove();
        });

        this.vertices.clear();
    }

    private removePivot() {
        this.pivot.remove();
        this.scene.partManager.removePart(this.pivot);
    }

    private removeBoxSelector() {
        this.boxSelector.remove();
        this.scene.partManager.removePart(this.boxSelector);
    }

    private removeRotationLine() {
        this.rotationLine.remove();
        this.scene.partManager.removePart(this.rotationLine);
    }

    private removeRotationVertex() {
        this.rotationVertex.remove();
        this.scene.partManager.removePart(this.rotationVertex);
    }
    //=======================================================================//
    public showVertices() {
        this.vertices.forEach(vertex => vertex.show());
    }

    public showRotationLine() {
        this.rotationLine.show();
    }

    public showRotationVertex() {
        this.rotationVertex.show();
    }

    public showBox() {
        this.boxSelector.show();
    }

    public showMidpointVertices() {
        const midVertexNames = ['midTop', 'midRight', 'midBottom', 'midLeft'];
        midVertexNames.forEach(name => {
            const vertex = this.getVertexByName(name);
            if (vertex) {
                vertex.show();
            }
        });
    }

    public showUI() {
        this.trLayer.show()
    }
    //=======================================================================//
    public hideUI() {
        this.trLayer.hide()
    }

    public hideBox() {
        this.boxSelector.hide();
    }

    public hideVertices() {
        this.vertices.forEach(vertex => vertex.hide());
    }

    public hideRotationLine() {
        this.rotationLine.hide();
    }

    public hideRotationVertex() {
        this.rotationVertex.hide();
    }

    public hideMidpointVertices() {
        const midVertexNames = ['midTop', 'midRight', 'midBottom', 'midLeft'];
        midVertexNames.forEach(name => {
            const vertex = this.getVertexByName(name);
            if (vertex) {
                vertex.hide();
            }
        });
    }
}

import { Rima } from '../../Rima';
import { SVG } from '@svgdotjs/svg.js';
import MouseManager from '../MouseManager';


export default class ShapesPanel {
    [x: string]: any;

    shapes = [
        { type: 'rect', id: 'RectangleBlock', width: "25", height: "25", x: "13.5", y: "13.5" },
        { type: 'circle', id: 'CircleBlock', r: "14", cx: "78", cy: "26" },
        { type: 'polygon', id: 'DiamondBlock', points: '130,10 146,26 130,42 114,26' },
        { type: 'polygon', id: 'TriangleBlock', points: '10,94 42,94 26,62' },
        { type: 'polygon', id: 'StarBlock', points: '77.9,60.55 72.4,71.85 60.3,73.95 68.90,82.95 67.10,95.45 78,89.75 88.9,95.45 87.1,82.95 95.70,73.95 83.60,71.85' },
        { type: 'polygon', id: 'ArrowBlock', points: '114,73 138.8,73 138.8,68 146,78 138.8,88 138.8,83 114,83' },
        { type: 'polygon', id: 'DoubleArrowBlock', points: '10,130 18,120 18,125 34,125 34,120 42,130 34,140 34,135 18,135 18,140' },
        { type: 'polygon', id: 'OctagonBlock', points: '64,124.1 72.1,116 83.9,116 92,124.1 92,135.9 83.9,144 72.1,144 64,135.9' },
        { type: 'polygon', id: 'DataBlock', points: '121.6,117.5 144,117.5 138.4,142.5 116,142.5' }
    ];

    constructor(scene) {
        this.scene = scene
        this.tr = scene.transformer;
        this.mouse = new MouseManager()
        this.svg = SVG('#SVG');
        this.scene.on('onDrag', this.onDrag.bind(this));
        this.scene.on('endDrag', this.endDrag.bind(this));
        this.createShapePanel();
    }

    createSVGElement(shape) {
        const svgNamespace = 'http://www.w3.org/2000/svg';
        const element = document.createElementNS(svgNamespace, shape.type);
        Object.entries(shape).forEach(([key, value]) => {
            if (key !== 'type') {
                element.setAttribute(key, value);
            }
        });
        element.classList.add('shape');
        return element;
    }

    addShapeToPanel(element, g) {
        g.appendChild(element);
        element.addEventListener('mousedown', this.handleMouseDown.bind(this));
      }

    createShapePanel() {
        const buttonTrigger = document.getElementById('tool_ShapePanel');
        const buttonTriggerPos = buttonTrigger.getBoundingClientRect();

        this.shapespanel = document.createElement('div');
        this.shapespanel.id = 'shapesPanel';
        this.shapespanel.style.top = (buttonTriggerPos.y - 50) + 'px';


        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '160');
        svg.setAttribute('height', '160');
        svg.setAttribute('viewBox', '0 0 160 160');

        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('fill', '#a7a7a7');

        this.shapes.forEach(shape => {
            const element = this.createSVGElement(shape);
            this.addShapeToPanel(element, g);
        });

        svg.appendChild(g);
        this.shapespanel.appendChild(svg);
        const targetElement = document.getElementById('GridSvg');
        targetElement.insertAdjacentElement('afterend', this.shapespanel);
    }

    getShapeById(id) {
        return this.shapes.find(shape => shape.id === id);
    }

    handleMouseDown(ev) {
        this.shapespanel.style.zIndex = '0';
        const shape = this.getShapeById(ev.target.id)
        this.originalEl = document.getElementById(ev.target.id);

        const absolutePos = this.originalEl.getBoundingClientRect();

        this.originalPos = this.svg.point(absolutePos.x, absolutePos.y);

        this.currentShape = Rima(shape.type, {
            ...shape,
            layer: 'parts',
            fill: '#fff',
            stroke: { color: 'black', width: 1.5 },
            x: this.originalPos.x,
            y: this.originalPos.y
        });

        this.isShapeOutsidePanel(this.currentShape)

        this.tr.attach(this.currentShape);
        this.mouse._mousedown(ev);

        this.originalSize = {
            width: this.tr.getTrWidth(),
            height: this.tr.getTrHeight()
        };
        this.tr.hideTrUI();
        this.originalEl.style.display = 'none'
    }

    onDrag({ detail: el }) {
        if (!this.currentShape) return;
        const { width, height } = this.originalSize;
        this.tr.centerTr([el.mouse.x, el.mouse.y]);
        if (this.isShapeOutsidePanel(el)) {
            this.tr.scaleTr(width * 3, height * 3);
        }
        else this.tr.scaleTr(width, height);

    }

    endDrag({ detail: el }) {
        if (!this.currentShape) return;
        let newShape = this.currentShape.clone({ layer: 'parts' })
        this.tr.attach(newShape);
        this.currentShape.remove();
        this.currentShape = null;
        this.shapespanel.style.zIndex = '100';
        this.originalEl.style.display = 'block'
    }

    isShapePanel() {
        this.currentShape = this.tr.getTrAttachedShape();
        let parent = this.currentShape.parent();
        return (parent.id() === 'shapesPanel')
    }

    isShapeOutsidePanel(el) {

        const shapesPanel = document.getElementById('shapesPanel');
        const absolutepanelPos = shapesPanel.getBoundingClientRect();
        const relativePanelPos = this.svg.point(absolutepanelPos.x, absolutepanelPos.y);
        const currentPos = { x: el.cx(), y: el.cy() };

        return (
            currentPos.x < relativePanelPos.x ||
            currentPos.x > relativePanelPos.x + 160 ||
            currentPos.y < relativePanelPos.y ||
            currentPos.y > relativePanelPos.y + 160
        );
    }

    show() {
        this.shapespanel.style.display = 'block'
    }

    hide() {
        this.shapespanel.style.display = 'none'
    }
}

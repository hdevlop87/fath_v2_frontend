import { registerCss, inject } from './Css'
import { SVG, G } from '@svgdotjs/svg.js';
import Grid from './Managers/GridManager';
import MouseManager from './Managers/MouseManager';
import CursorHandler from './Managers/CursorManager';
import PartManager from './Managers/PartManager'
import SelectionManager from './Managers/selector/SelectionManager';
import TransformerManager from './Managers/transformer/TransformerManager';
import GroupManager from './Managers/GroupManager'
import DrawingManager from './Managers/ShapeToolManager/DrawingManager';
import DragManager from './Managers/DragManager';
import KeyboardManager from './Managers/keyboardManager';
import PanZoom from './Managers/PanZoom';
import Invoker from './Commands/_Invoker';
import MoveShapeCommand from './Commands/MoveShape'
import CenterShapeCommand from './Commands/CenterShape'
import RotateShapeCommand from './Commands/RotateShape'
import ScaleShapeCommand from './Commands/ScaleShape';
import RemoveShapeCommand from './Commands/RemoveShape';
import FillChangeCommand from './Commands/FillChange';
import StrokeChangeCommand from './Commands/StrokeChange';

export default class Scene extends G {
    [x: string]: any;

    width: any;
    height: any
    static instance: any;

    constructor(props?) {

        if (!Scene.instance) {
            super();
            Scene.instance = this;
            this.props = props
            this.gridCell = 4;
            this.setTargetDom();
            this.createDOMContent();
            this.createGridSvg()
            this.createMainSvg();
            this.applyStyles();
            this.setLayers()
            this.setManagers();
            this.setupProxies();
            console.log('recreate scene');
        }

        return Scene.instance;
    }

    setTargetDom() {
        if (typeof this.props.container === 'string') {
            const selector = this.props.container.charAt(0) === '.' || this.props.container.charAt(0) === '#'
                ? this.props.container
                : ('#' + this.props.container);
            this.props.container = document.querySelector(selector);
        }
        this.props.container = this.props.container || document.body;
        this.width = this.props.width || this.props.container.offsetWidth;
        this.height = this.props.height || this.props.container.offsetHeight;
    }

    createDOMContent() {
        this.content = document.createElement('div');
        this.content.setAttribute("id", "RimaSVG");
        this.content.style.width = this.width + 'px';
        this.content.style.height = this.height + 'px';
        this.props.container.appendChild(this.content);
    }

    createMainSvg() {
        this.mainSvg = SVG().addTo(this.content).size(this.width, this.height);
        this.mainSvg.attr({
            'id': 'SVG',
            'version': '1.1',
            'xmlns': 'http://www.w3.org/2000/svg',
            'preserveAspectRatio': 'xMinYMin',
            'fill': 'none'
        });
        this.mainSvg.viewbox(0, 0, this.width, this.height);
    }

    createGridSvg() {
        this.gridSvg = SVG().addTo(this.content).size(this.width, this.height);
        this.gridSvg.attr({
            'id': 'GridSvg',
            'version': '1.1',
            'xmlns': 'http://www.w3.org/2000/svg',
            'preserveAspectRatio': 'xMinYMin',
            'fill': 'none'
        });
        this.gridSvg.viewbox(0, 0, this.width, this.height);
    }

    applyStyles() {
        registerCss(this.props.css);
        inject();
    }

    addPart(type?, props?) {
        return this.partManager.addPart(type, props);
    }

    setLayers() {
        this.gridLayer = this.gridSvg.group().attr({ id: 'gridCanvas' });
        this.partLayer = this.mainSvg.group().attr({ id: 'parts' });
        this.mainSvg.group().attr({ id: 'mouse' });
    }

    destroy() {
        this.gridSvg.remove();
        this.mainSvg.remove();
        this.content.remove();
        this.partManager.clearAllParts();
        this.mouse.clearAllEvents();
        MouseManager.instance = null
        Scene.instance = null
    }

    setManagers() {
        this.gridManager = new Grid(this);
        this.invoker = new Invoker();
        this.partManager = new PartManager(this);
        this.mouse = new MouseManager();
        this.cursorHandler = new CursorHandler(this);
        this.groupManager = new GroupManager(this);
        this.dragManager = new DragManager(this);
        this.panZoom = new PanZoom(this);
        this.drawingManager = new DrawingManager(this);
        this.transformer = new TransformerManager(this);
        this.selectionManager = new SelectionManager(this);
        this.keyboardManager = new KeyboardManager(this);

    }

    setupProxies() {
        const managerConfigs = [
            { manager: 'partManager', methods: ['getPartCategory', 'getPartById', 'removePart', 'removePartById', 'getAllPartsIds', 'getAllParts', 'isShape', 'isUIElements', 'getAll'] },
            { manager: 'selectionManager', methods: ['selectPart', 'selectParts', 'selectPartById', 'deselectPart', 'deselectPartById', 'getSelectedParts', 'deselectAll', 'removeSelectedParts', 'selectAllParts'] },
            { manager: 'invoker', methods: ['execute', 'undo', 'redo'] },
            { manager: 'gridManager', methods: ['setGridCell', 'getGridCell'] },
            { manager: 'transformer', methods: ['hideTrUI', 'rotate'] },
        ];

        managerConfigs.forEach(({ manager, methods }) => {
            methods.forEach(method => {
                this[method] = (...args) => {
                    if (this[manager] && typeof this[manager][method] === 'function') {
                        return this[manager][method](...args);
                    }
                    throw new Error(`${method} is not a function on ${manager}`);
                };
            });
        });
    }

    scaleShape(shape, scaleData) {
        let command = new ScaleShapeCommand(shape, scaleData);
        this.execute(command);
    }

    rotateShape(shape, angle) {
        let command = new RotateShapeCommand(shape, angle);
        this.execute(command);
    }

    centerShape(shape, newCenter) {
        let command = new CenterShapeCommand(shape, newCenter);
        this.execute(command);
    }

    moveShape(shape, newPos) {
        let command = new MoveShapeCommand(shape, newPos);
        this.execute(command);
    }

    removeShape(shape) {
        let command = new RemoveShapeCommand(shape, this.partManager);
        this.execute(command);
    }

    fillShape(shape, newFill) {
        let fillChangeCommand = new FillChangeCommand(shape, newFill);
        this.execute(fillChangeCommand);
    }

    strokeShape(shape, newStroke) {
        let fillChangeCommand = new StrokeChangeCommand(shape, newStroke);
        this.execute(fillChangeCommand);
    }
}










































































//==================================================================================//
//========================== scene serialization ===================================//

// clearScene() {
//     const allElement = this.getAllParts();
//     allElement.forEach(element => {
//         this.removePart(element);
//     });
//     this.deselectAll();
// }

// serializeScene() {
//     let sceneData = {
//         parts: this.partManager.serializeAllParts(),
//     };
//     return JSON.stringify(sceneData);
// }

// deserialize(jsonString) {
//     this.clearScene();
//     const sceneData = JSON.parse(jsonString);
//     this.partManager.deserializeAllParts(sceneData.parts);
// }

// saveToLocalStorage() {
//     try {
//         const serializedData = this.serializeScene();
//         localStorage.setItem('savedScene', serializedData);
//         console.log("Scene saved to localStorage");
//     } catch (error) {
//         console.error("Error saving scene to localStorage:", error);
//     }
// }

// loadFromLocalStorage() {
//     try {
//         const savedData = localStorage.getItem('savedScene');
//         if (savedData) {
//             this.deserialize(savedData);
//         } else {
//             console.log("No saved scene data found in localStorage");
//         }
//     } catch (error) {
//         console.error("Error loading scene from localStorage:", error);
//     }
// }
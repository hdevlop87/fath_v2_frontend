
export default class SelectionManager {
    [x: string]: any;

    constructor(scene) {
        this.scene = scene;
        this.mouse = scene.mouse;
        this.drawingManager = scene.drawingManager;
        this.transformer = scene.transformer;
        this.dragManager = scene.dragManager;
        this.layer = scene.mainSvg;
        this.partLayer = scene.partLayer;
        this.shapesList = new Map();
        this.mouse.registerEvent('mousedown', this.mousedown.bind(this));
    }

    private mousedown({ pos, id, leftClick }) {
        if (!leftClick) return;

        switch (true) {
            case this.isScene(id):
                this.handleSceneClick();
                break;
            case this.isShape(id):
                this.handleShapeClick(id, pos);
                break;
            case this.isUIElements(id):
                this.handleUIElementClick(id, pos);
                break;
        }

    }

    private handleSceneClick() {
        this.deselectAll();
    }

    private handleShapeClick(id, pos) {
        const shape = this.scene.getPartById(id);
        const transformerBox = this.scene.getPartById('transformerBox');
        this.deselectPart(shape);
        
        if (shape.isDraggable()){
            this.selectPart(shape);
            this.dragManager.startDrag(transformerBox, pos);   
        }
    }

    private handleUIElementClick(id, pos) {
        const part = this.scene.getPartById(id);
        this.dragManager.startDrag(part, pos);
    }

    //=================================================================//

    public selectPart(shape) {
        if (shape) {
            this.shapesList.set(shape.id(), shape);
            this.transformer.link(shape);
            this.scene.fire('ElementSelected', shape);
        }
    }

    public selectPartById(id) {
        const shape = this.shapesList.get(id);
        if (shape) {
            this.shapesList.set(shape.id(), shape);
            this.transformer.link(shape);
            this.scene.fire('ElementSelected', shape);
        }
    }

    public selectParts(shapes) {
        if (shapes.length === 1) {
            this.selectPart(shapes[0]);
            return
        }
        this.GTransfomer = this.transformer.ui.GTransfomer;
        this.addShapesToList(shapes)
        this.GTransfomer.group(shapes)
        this.transformer.link(this.GTransfomer);
        return this.GTransfomer
    }

    public addShapesToList(shapes) {
        if (shapes.length > 1) {
            shapes.forEach(shape => {
                if (shape) {
                    this.shapesList.set(shape.id(), shape);
                }
            });
        }
    }

    public removeShapesFromList(shapes) {
        if (shapes.length > 1) {
            shapes.forEach(shape => {
                if (shape) {
                    this.shapesList.delete(shape.id());
                }
            });
        }
    }

    public selectAllParts() {
        const shapes = this.scene.getAllParts();
        this.selectParts(shapes)
    }

    public deselectPart(shape) {
        if (shape) {
            this.transformer.removeTrUI();
            this.shapesList.delete(shape.id());
        }
    }

    public deselectPartById(id) {
        const shape = this.shapesList.get(id);
        if (shape) {
            this.transformer.removeTrUI();
            this.shapesList.delete(id);
        }
    }

    public deselectParts(shapes) {
        if (shapes.length === 1) {
            this.deselectPart(shapes[0]);
            return
        }

        this.removeShapesFromList(shapes)
        this.transformer.removeTrUI();
    }

    public deselectAll() {
        this.transformer.removeTrUI();
        this.shapesList.clear();
        this.scene.fire('SelectionCleared');
    }

    public getSelectedParts() {
        return Array.from(this.shapesList.values());
    }

    public getSelectedPart() {
        if (this.shapesList.size === 1) {
            return this.getSelectedParts()[0] as any;
        }
    }

    public removeSelectedParts() {
        this.shapesList.forEach((_, shapeId) => {
            this.scene.removePartById(shapeId);
        });
        this.deselectAll();
    }

    private isScene(id) {
        return id === 'SVG'
    }

    private isShape(id) {
        return this.scene.isShape(id)
    }

    private isUIElements(id) {
        return this.scene.isUIElements(id)
    }

    public hasMultipleSelectedParts() {
        return this.shapesList.size > 1;
    }

    public getSelectedPartType() {
        const selectedPart = this.getSelectedPart();
        return selectedPart.type
    }

}


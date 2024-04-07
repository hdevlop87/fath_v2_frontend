import Command from './_Command';

class RemoveShapeCommand implements Command {
    private shape: any;
    private partManager: any;
    private pushToHistory: boolean;
    private removedShapeId: string | null = null;
    private shapeProps: any;

    constructor(shape, partManager, pushToHistory = true) {
        this.shape = shape;
        this.partManager = partManager;
        this.pushToHistory = pushToHistory;
        this.shapeProps = shape.getState();
    }

    execute() {
        this.removedShapeId = this.shape.id();
        this.partManager.removePartById(this.shape.id());
    }

    undo() {
        if (this.removedShapeId !== null) {
            this.partManager.restorePart(this.shape)
            //this.shape = this.partManager.addPart(this.shapeProps.name, this.shapeProps);
        }
    }
}

export default RemoveShapeCommand;
import Command from './_Command';
import { isDifferentObj } from '../../utils'

export default class FillChangeCommand implements Command {
    private shape: any;
    private oldFill: any;
    private newFill: any;
    pushToHistory: boolean;

    constructor(shape, newFillProps, pushToHistory = true) {
        this.shape = shape;
        this.oldFill = shape.getInitialState().fill;
        this.newFill = { ...this.oldFill, ...newFillProps };
        this.pushToHistory = pushToHistory && isDifferentObj(this.oldFill, this.newFill);
    }

    execute() {
        this.shape.setFill(this.newFill);
        this.shape.setInitialState();
    }

    undo() {
        this.shape.setFill(this.oldFill);
        this.shape.setInitialState();
    }
}
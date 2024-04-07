import Command from './_Command';
import { isDifferentObj } from '../../utils'

export default class FillChangeCommand implements Command {
    private shape: any;
    private oldStroke: any;
    private newStroke: any;
    pushToHistory: boolean;
  
    constructor(shape, newStroke, pushToHistory = true) {
      this.shape = shape;
      this.oldStroke = shape.getInitialState().stroke;
      this.newStroke = newStroke;
      this.pushToHistory = pushToHistory && isDifferentObj(this.oldStroke, this.newStroke);
    }
  
    execute() {
      this.shape.setStroke(this.newStroke);
      this.shape.setInitialState();
    }
  
    undo() {
      this.shape.setStroke(this.oldStroke);
      this.shape.setInitialState();
    }
}
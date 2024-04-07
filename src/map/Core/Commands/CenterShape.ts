import Command from './_Command';
import {isDifferent} from '../../utils'

class CenterShapeCommand implements Command {

   shape: any;
   oldCenter: any;
   newCenter: any;
   pushToHistory: boolean;

   constructor(shape, newCenter, pushToHistory = true) {
      this.shape = shape;
      this.oldCenter = shape.getInitialState().pivot;
      this.newCenter = newCenter;
      this.pushToHistory = isDifferent(this.oldCenter,this.newCenter) && pushToHistory;
   }

   execute() {
      this.shape._center(this.newCenter);
      this.shape.setInitialState();
   }

   undo() {
      this.shape._center(this.oldCenter);
      this.shape.setInitialState();
   }
}

export default CenterShapeCommand;
import Command from './_Command';
import { isDifferent } from '../../utils';

class ScaleShapeCommand implements Command {
   shape: any;
   scaleData: any;
   pushToHistory: boolean;
   oldScaleData: any;
   newScaleData: any;

   constructor(shape, scaleData, pushToHistory = true) {
      this.shape = shape;
      this.oldScaleData = shape.getInitialState();
      this.newScaleData = scaleData;
      const hasSignificantChange = this.checkSignificantChange(this.oldScaleData, this.newScaleData);
      this.pushToHistory = hasSignificantChange && pushToHistory;
   }

   execute() {
      this.shape._scale(this.newScaleData);
      this.shape.setInitialState();
   }

   undo() {
      this.shape.revertScale(this.oldScaleData);
      this.shape.setInitialState();
   }

   checkSignificantChange(oldData, newData) {
      return isDifferent(oldData.width, newData.width) ||
             isDifferent(oldData.height, newData.height) ||
             isDifferent(oldData.pivot, newData.pivot);
   }
}

export default ScaleShapeCommand;
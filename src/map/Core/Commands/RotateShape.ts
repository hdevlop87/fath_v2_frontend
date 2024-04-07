import Command from './_Command'

class RotateShapeCommand implements Command {
   private shape: any;
   private newAngle: number;
   private oldAngle: number;
   pushToHistory: boolean;

   constructor(shape, angle, pushToHistory = true) {
      this.shape = shape;
      this.oldAngle = shape.getInitialState().rotation;
      this.newAngle = angle;
      this.pushToHistory = pushToHistory && (this.oldAngle !== this.newAngle);
   }

   execute() {
      this.shape._rotate(this.newAngle);
      this.shape.setInitialState();
   }

   undo() {
      this.shape._rotate(this.oldAngle);
      this.shape.setInitialState();
   }
}

export default RotateShapeCommand;
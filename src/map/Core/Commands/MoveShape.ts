import Command from './_Command';
import { isDifferent } from '../../utils';

class MoveShapeCommand implements Command {
  private shape: any;
  private oldPosition: [x: number, y: number ];
  private newPosition: [x: number, y: number ];
  pushToHistory: boolean;

  constructor(shape, newPosition, pushToHistory = true) {
    this.shape = shape;
    this.oldPosition = shape.getInitialState().position;
    this.newPosition = newPosition;
    this.pushToHistory = pushToHistory && isDifferent(this.oldPosition, this.newPosition) ;
  }

  execute() {
    this.shape._move(this.newPosition);
    this.shape.setInitialState();
  }

  undo() {
    this.shape._move(this.oldPosition);
    this.shape.setInitialState();
  }
}

export default MoveShapeCommand;
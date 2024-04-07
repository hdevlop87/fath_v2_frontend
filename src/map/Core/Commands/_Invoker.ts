export default class Invoker {
   private static instance: Invoker;
   private history = [];
   private redoStack = [];

   execute(command) {
      command.execute();
      if (command.pushToHistory) {
         this.history.push(command);
         this.redoStack = [];
      }
   }

   undo() {
      const lastCommand = this.history.pop();
      if (lastCommand) {
         lastCommand.undo();
         this.redoStack.push(lastCommand); 
      }
   }

   redo() {
      const commandToRedo = this.redoStack.pop();
      if (commandToRedo) {
         commandToRedo.execute();
         this.history.push(commandToRedo);
      }
   }

   static getInstance(): Invoker {
      if (!Invoker.instance) {
         Invoker.instance = new Invoker();
      }
      return Invoker.instance;
   }
}
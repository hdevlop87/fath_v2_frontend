class Keyboard {
   constructor(options) {
      this._keysPressed = new Set();
      document.addEventListener('keydown', this._post.bind(this));
      document.addEventListener('keyup', this._post.bind(this));
      this._updateCallback = options.updateKeyboard;
   }

   _post(data) {
      const { key, type } = data;
      if (!key) return;

      let keydown = type === 'keydown'

      if (keydown) {
         this._keysPressed.add(key);
      } else {
         this._keysPressed.delete(key);
      }

      if (this._updateCallback) this._updateCallback(this);
   }

   keyPressed(keyArg) {
      return this._keysPressed.has(keyArg);
   }

   key() {
      return this._keysPressed;
   }
}

export default Keyboard
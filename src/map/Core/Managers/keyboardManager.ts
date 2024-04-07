import Scene from '../Scene'

export default class Keyboard {

    private _keysPressed: Set<unknown>;
    scene: Scene;
    selectionManager: any;

    constructor(scene) {
        this.scene = scene;
        this._keysPressed = new Set();
        document.addEventListener('keydown', this.post.bind(this));
        document.addEventListener('keyup', this.post.bind(this));
    }

    private post(data) {
        const { key, type } = data;
        if (!key) return;

        let keydown = type === 'keydown'

        if (keydown) {
            this._keysPressed.add(key);
        } else {
            this._keysPressed.delete(key);
        }

        this.handleKeyboard(key)
    }

    keyPressed(keyArg) {
        return this._keysPressed.has(keyArg);
    }

    key() {
        return this._keysPressed;
    }

    handleKeyboard(e) {
        if (this.keyPressed('s')) { 
            let shapes = this.scene.getSelectedParts();
            shapes.forEach(sh => {
                this.scene.removeShape(sh);
            });
        }

        if (this.keyPressed('r')) { 
            this.scene.rotateSelected(45);
        }

        if (this.keyPressed('z')) { 
            this.scene.hideTrUI(); 
            this.scene.undo();
        }

        if (this.keyPressed('f')) { 
            this.scene.hideTrUI(); 
            this.scene.redo();
        }
    }
}



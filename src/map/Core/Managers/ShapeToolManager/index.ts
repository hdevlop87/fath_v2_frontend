

export default class ToolManager {

    drawingManager: any;
    selectedToolShape: string;
    shapePanel: any;

    constructor(scene) {
        this.drawingManager = scene.drawingManager;
        this.shapePanel = scene.shapesPanel;
        this.setupToolButtons();
        this.setDefaultTool();
        this.selectedToolShape = 'select'
    }

    setDefaultTool() {
        const defaultButton = document.getElementById('tool_select');
        if (defaultButton) {
            defaultButton.click();
            this.updateButtonStates('tool_select');
        }
    }

    getToolShape(){
        return this.selectedToolShape
    }

    setupToolButtons() {

        const toolButtonIds = ['tool_select', 'tool_fhpath', 'tool_line', 'tool_polyline', 'tool_ShapePanel', 'tool_path', 'tool_text'];

        toolButtonIds.forEach(buttonId => {
            const button = document.getElementById(buttonId);
            if (button) {
                button.addEventListener('click', () => {
                    const mode:any = button.getAttribute('data-mode');
                    this.shapePanel.hide();
                    this.selectedToolShape = mode;
                    if (mode !== 'select') {
                        this.drawingManager.onClick();
                    } 
                    if (mode === "shapePanel") {
                        this.shapePanel.show();
                    }
                    this.updateButtonStates(buttonId);
                });
            }
        });
    }

    updateButtonStates(activeButtonId) {
        document.querySelectorAll('.tool_button').forEach(button => {
            button.classList.remove('current');
        });

        const activeButton = document.getElementById(activeButtonId);
        if (activeButton) {
            activeButton.classList.add('current');
        }
    }

}

import { registerCss } from '../Core/Css'

export default class Tooltip {
    element: any
    props: any
    pos: any[];
    tooltipElement: HTMLDivElement;

    constructor(props) {
        this.props = props;
        this.pos = [100,100]
        this.setupTooltip()
    }

    setupTooltip() {
        this.tooltipElement = document.createElement('div');
        this.tooltipElement.className = 'tooltip';
        document.body.appendChild(this.tooltipElement);
        this.hide();

    }

    updatePos(pos) {
        this.tooltipElement.style.left = pos.x + 'px';
        this.tooltipElement.style.top = pos.y + 'px';
        this.show();
    }

    updateLabel(label) {
        this.props.label = label;
        this.tooltipElement.textContent = label;
        this.show();
    }

    updateTooltip({pos,label}) {
        this.tooltipElement.textContent = label;
        this.tooltipElement.style.left = pos[0] + 10 + 'px';
        this.tooltipElement.style.top = pos[1] + 'px';
        this.show(); 
    }

    show() {
        this.tooltipElement.style.display = 'block';
    }

    hide() {
        this.tooltipElement.style.display = 'none';
    }
} 

registerCss(`
    .tooltip {
    opacity: 1;
    position: absolute;
    width: auto;
    height: auto;
    min-height: 25px;
    line-height: 25px;
    font-size: 1rem;
    background-color: rgba(0, 0, 0, 0.7);
    color: #ffffff;
    border-radius: 5px;
    padding: 10px 15px;
    }
`);
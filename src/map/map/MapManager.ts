import { Rima } from '../Core/Rima';
import LotsMap from '../Shapes/lotsMap.svg';
import Tooltip from './Tooltip';
import { STATUS_COLORS } from '../utils/constants'


const formattedSize = (value: string) => {
    let size = parseFloat(value);
    size % 1 === 0 ? Math.floor(size) : size.toFixed(2);
    return size;
};

export default class MapManager {
    scene: any;
    static instance: MapManager;
    mouse: any;
    tooltip: Tooltip;
    lotsData: any;
    private onClickCallback: (lotInfo: any) => void;

    constructor(scene, lotsData, onClickCallback) {
        this.scene = scene;
        this.mouse = scene.mouse;
        this.lotsData = lotsData
        this.mouse.registerEvent('mouseover', this.onMouseOver.bind(this));
        this.mouse.registerEvent('click', this.onClick.bind(this));
        this.onClickCallback = onClickCallback;
    }

    public async render() {
        await Rima(LotsMap.src);
        this.tooltip = new Tooltip({ label: 'test data' });
    }

    public getAllLots() {
        let parts = this.scene.getAllParts();
        return parts.filter(part =>
            typeof part.id() === 'string' && part.id().startsWith('lot-')
        );
    }

    private getLotInfo(node) {
        const Text = node.findOne('text');
        const lotRef = Text ? Text.id() : null;
        return this.lotsData.find(lot => lot.lotRef == lotRef);
    }

    public getLotsWithInfo() {
        let mapLots = this.getAllLots();
        return mapLots.map(node => {
            const lotInfo = this.getLotInfo(node);
            node.css({ cursor: 'pointer' });
            node.addClass('lot')
            return { node, lotInfo };
        });
    }

    public processLots() {
        const mapLots = this.getLotsWithInfo();

        mapLots.forEach(lot => {
            let { node, lotInfo } = lot;
            const Path: any = node.findOne('path');
            let originalPathColor = Path.attr('fill');

            if (lotInfo && STATUS_COLORS[lotInfo.status]) {
                originalPathColor = STATUS_COLORS[lotInfo.status];
                Path.fill(originalPathColor);
            }

            node.on('mouseout', () => {
                Path.fill(originalPathColor);
                this.tooltip.hide()
            });
        });

    }

    private onMouseOver({ target, clientX, clientY }) {
        const node = this.getGroupByclass(target);
        if (!node) return;
        node.Path.fill('#e2e2e2f0');
        const pos = [clientX, clientY];
        const lotInfo = this.getLotInfo(node.group);
        this.setTooltipInfo(pos, lotInfo)
    }

    private onClick({ target }) {
        this.tooltip.hide()
        const node = this.getGroupByclass(target);
        if (!node) return;
        const lotInfo = this.getLotInfo(node.group);
        this.onClickCallback(lotInfo);
    }

    setTooltipInfo(pos, lotInfo) {
        const label = this.formatLotInfo(lotInfo)
        this.tooltip.updateTooltip({ label, pos });
    }

    getGroupByclass(target) {
        const targetPath = target?.closest('.lot');
        if (!targetPath) return;
        const group = this.scene.getPartById(targetPath.id);
        const Path: any = group.findOne('path');
        return { group, Path }
    }

    formatLotInfo(lotInfo) {
        let customerInfo = lotInfo?.customerName ? `, ${lotInfo?.customerName}` : '';
        return lotInfo ? `Lot: ${lotInfo.lotRef}, Taille: ${formattedSize(lotInfo.size)} m² ${customerInfo}` : '';
    }

    public static async init(lotsData, onClickCallback): Promise<MapManager> {
        let scene = Rima('scene', {
            container: 'app',
        });
        if (!MapManager.instance) {
            MapManager.instance = new MapManager(scene,lotsData, onClickCallback);
            await MapManager.instance.render();
            MapManager.instance.processLots();
        }
        return scene;
    }

    public static removeInstance() {
        MapManager.instance.scene.destroy();
        MapManager.instance = null;
    }

    public static async recreate(lotsData, onClickCallback): Promise<MapManager> {
        MapManager.removeInstance();
        return await MapManager.init(lotsData, onClickCallback);
    }
}
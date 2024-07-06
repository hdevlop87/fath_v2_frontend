import './style.css';
import lotsData from './map/lots.json';
import MapManager from './map/MapManager'


const map = await MapManager.init(lotsData, handleLotClick);

function handleLotClick(lotInfo) {

}
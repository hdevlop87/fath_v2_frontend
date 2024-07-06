import UserCard from './UserCard';
import FileCard from './FileCard';
import FolderCard from './FolderCard';
import CustomerCard from './CustomerCard';
import ImageCard from './ImageCard';
import AudioCard from './AudioCard';
import VideoCard from './VideoCard';

const cardsMapping = {
    user: UserCard,
    file: FileCard,
    folder: FolderCard,
    customer:CustomerCard,
    image: ImageCard,
    video:VideoCard,
    audio: AudioCard,
};

export default cardsMapping;
import type { ListeningHistoryItem } from "../../types/tracks";

interface TrackListProps {
  tracks: ListeningHistoryItem[];
}

export const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
  return (
    <div>
      <div>hello world</div>
    </div>
  );
};

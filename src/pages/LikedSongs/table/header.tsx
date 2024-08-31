import TableHeader, { TableHeaderComponents } from '../../../components/SongsTable/header';

// Redux
import { useAppSelector } from '../../../store/store';

export const PlaylistTableHeader = () => {
  const view = useAppSelector((state) => state.playlist.view);

  return (
    <TableHeader
      view={view}
      fields={[
        TableHeaderComponents.Index,
        TableHeaderComponents.Title,
        TableHeaderComponents.Artists,
        TableHeaderComponents.Album,
        TableHeaderComponents.DateAdded,
        TableHeaderComponents.Space,
        TableHeaderComponents.Time,
        TableHeaderComponents.Space,
      ]}
    />
  );
};

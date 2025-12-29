import TableHeader, { TableHeaderComponents } from '../../../../../components/SongsTable/header';
import { useAppSelector } from '../../../../../store/store';

// Redux

export const SearchSearchTableHeader = () => {
  const view = useAppSelector((state) => state.playlist.view);

  return (
    <TableHeader
      view={view}
      fields={[
        TableHeaderComponents.Index,
        TableHeaderComponents.Title,
        TableHeaderComponents.Album,
        TableHeaderComponents.Space,
        TableHeaderComponents.Time,
        TableHeaderComponents.Space,
      ]}
    />
  );
};

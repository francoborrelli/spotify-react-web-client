import type { Playlist, Song } from '../../interfaces/types';

// Utils
import { getAlbumPath, getEducationPath, getPublicationPath } from '../../utils/getPublicPath';

enum PublicationsTypesEnum {
  THESIS = 'THESIS',
  JOURNAL = 'JOURNAL',
  CONFERENCE = 'CONFERENCE',
}

const CACIC_2018 = {
  name: 'CACIC_2018_NAME',
  artist: 'CACIC_2018_ARTIST',
  type: PublicationsTypesEnum.CONFERENCE,
  length: 'CACIC_2018_LENGTH',
  description: 'CACIC_2018_DESCRIPTION',
  imageUrl: getPublicationPath('cacic/2018.png'),
  link: 'https://sedici.unlp.edu.ar/bitstream/handle/10915/73479/Documento_completo.pdf?sequence=1',
  certificate: 'https://drive.google.com/file/d/1Ux5hn_veDUi7nyEfbXbNDKvHEyrAh4fZ/view',
  skills: [],
} as Song;

// const ENFOQUE_UTE_2019 = {
//   name: 'ENFOQUE_UTE_2019_NAME',
//   artist: 'ENFOQUE_UTE_2019_ARTIST',
//   type: PublicationsTypesEnum.JOURNAL,
//   length: 'ENFOQUE_UTE_2019_LENGTH',
//   description: 'ENFOQUE_UTE_2019_DESCRIPTION',
//   imageUrl: getPublicationPath('enfoqueUte/logo.jpg'),
//   link: 'https://notablesdelaciencia.conicet.gov.ar/bitstream/handle/11336/130607/CONICET_Digital_Nro.6eccdc24-082e-445e-a72d-e04d2ec8fc35_A.pdf?sequence=2&isAllowed=y',
//   skills: [],
// } as Song;

const INCISCOS_2019 = {
  name: 'INCISCOS_2019_NAME',
  artist: 'INCISCOS_2019_ARTIST',
  type: PublicationsTypesEnum.CONFERENCE,
  length: 'INCISCOS_2019_LENGTH',
  description: 'INCISCOS_2019_DESCRIPTION',
  imageUrl: getPublicationPath('inciscos/logo.jpg'),
  link: 'https://sedici.unlp.edu.ar/bitstream/handle/10915/119020/Documento_completo.pdf?sequence=1',
  skills: [],
} as Song;

const ENFOQUE_UTE_2020 = {
  name: 'ENFOQUE_UTE_2020_NAME',
  artist: 'ENFOQUE_UTE_2020_ARTIST',
  type: PublicationsTypesEnum.JOURNAL,
  length: 'ENFOQUE_UTE_2020_LENGTH',
  description: 'ENFOQUE_UTE_2020_DESCRIPTION',
  imageUrl: getPublicationPath('enfoqueUte/logo.jpg'),
  link: 'http://scielo.senescyt.gob.ec/pdf/enfoqueute/v11n1/1390-6542-enfoqueute-11-01-00001.pdf',
  skills: [],
} as Song;

const THESIS_SYSTEMS = {
  name: 'THESIS_SYSTEMS_NAME',
  artist: 'THESIS_SYSTEMS_ARTIST',
  length: 'THESIS_SYSTEMS_LENGTH',
  type: PublicationsTypesEnum.THESIS,
  description: 'THESIS_SYSTEMS_DESCRIPTION',
  imageUrl: getEducationPath('unlp/logo.jpg'),
  link: 'https://sedici.unlp.edu.ar/bitstream/handle/10915/118826/Documento_completo.pdf?sequence=1',
  skills: [],
} as Song;

const JAIIO_2021 = {
  name: 'JAIIO_2021_NAME',
  artist: 'JAIIO_2021_ARTIST',
  type: PublicationsTypesEnum.CONFERENCE,
  length: 'JAIIO_2021_LENGTH',
  description: 'JAIIO_2021_DESCRIPTION',
  imageUrl: getPublicationPath('jaiio/2021.png'),
  link: 'https://sedici.unlp.edu.ar/bitstream/handle/10915/140427/Documento_completo.pdf-PDFA.pdf?sequence=1',
  certificate: 'https://drive.google.com/file/d/1jrLljfoInOGaKyLApB0T9j5Q8HrisSDP/view',
  skills: [],
} as Song;

const SADIO_2022 = {
  name: 'SADIO_2022_NAME',
  artist: 'SADIO_2022_ARTIST',
  type: PublicationsTypesEnum.JOURNAL,
  length: 'SADIO_2022_LENGTH',
  description: 'SADIO_2022_DESCRIPTION',
  imageUrl: getPublicationPath('sadio/logo.jpeg'),
  link: 'https://sedici.unlp.edu.ar/bitstream/handle/10915/142895/Documento_completo.pdf?sequence=1',
  skills: [],
} as Song;

const CC_BB_ET_2023 = {
  name: 'CC_BB_ET_2023_NAME',
  artist: 'CC_BB_ET_2023_ARTIST',
  type: PublicationsTypesEnum.CONFERENCE,
  length: 'CC_BB_ET_2023_LENGTH',
  description: 'CC_BB_ET_2023_DESCRIPTION',
  imageUrl: getPublicationPath('ccbbet/logo.png'),
  link: 'https://sedici.unlp.edu.ar/bitstream/handle/10915/155432/Documento_completo.pdf?sequence=1',
  skills: [],
} as Song;

export const Publications = {
  name: 'PUBLICATIONS',
  description: 'Description 4',
  songs: [
    CC_BB_ET_2023,
    SADIO_2022,
    JAIIO_2021,
    THESIS_SYSTEMS,
    ENFOQUE_UTE_2020,
    INCISCOS_2019,
    CACIC_2018,
  ],
  color: '#3d5255',
  filters: [
    PublicationsTypesEnum.THESIS,
    PublicationsTypesEnum.JOURNAL,
    PublicationsTypesEnum.CONFERENCE,
  ],
  getImage(lang) {
    return getAlbumPath('Publications-cover', lang, 'png');
  },
} as Playlist;

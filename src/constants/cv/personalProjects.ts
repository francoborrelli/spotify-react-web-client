import {
  getAlbumPath,
  getProjectPath,
  getExperiencePath,
  getSocialNetworkPath,
} from '../../utils/getPublicPath';

import { tags } from '../tags';
import type { Playlist, Song } from '../../interfaces/types';

enum ProjectTypesEnum {
  WEB = 'WEB',
  MOBILE = 'MOBILE',
}

export const SpotifyClone = {
  name: 'SPOTIFY_CLONE_NAME',
  artist: 'SPOTIFY_CLONE_ARTIST',
  length: 'SPOTIFY_CLONE_LENGTH',
  description: 'SPOTIFY_CLONE_DESCRIPTION',
  type: ProjectTypesEnum.WEB,
  imageUrl: getSocialNetworkPath('spotify.png'),
  link: 'https://spotify-react-web-client.onrender.com/',
  github: 'https://github.com/francoborrelli/spotify-react-web-client',
  skills: [
    tags.React,
    tags.SASS,
    tags.REDUX,
    tags.Spotify,
    tags.Docker,
    tags['CI/CD'],
    tags.Heroku,
  ],
  images: [
    getProjectPath('spotify_clone/3.png'),
    getProjectPath('spotify_clone/6.png'),
    getProjectPath('spotify_clone/1.png'),
    getProjectPath('spotify_clone/2.png'),
    getProjectPath('spotify_clone/4.png'),
    getProjectPath('spotify_clone/5.png'),
    getProjectPath('spotify_clone/7.png'),
  ],
} as Song;

export const LottieReactNative = {
  name: 'LOTTIE_NAME',
  artist: 'LOTTIE_ARTIST',
  length: 'LOTTIE_LENGTH',
  description: 'LOTTIE_DESCRIPTION',
  type: ProjectTypesEnum.MOBILE,
  imageUrl: getProjectPath('lottie/logo.png'),
  images: [getProjectPath('lottie/1.jpg'), getProjectPath('lottie/2.jpg')],
  link: 'https://expo.dev/@francoborrelli/react-native-lottie?serviceType=classic&distribution=expo-go/',
  github: 'https://github.com/francoborrelli/react-native-lottie-prototype',
  skills: [tags.ReactNative, tags.Expo, tags.TypeScript, tags.Android],
} as Song;

export const TensorflowReactNative = {
  name: 'TENSORFLOW_REACT_NATIVE_NAME',
  artist: 'TENSORFLOW_REACT_NATIVE_ARTIST',
  length: 'TENSORFLOW_REACT_NATIVE_LENGTH',
  description: 'TENSORFLOW_DESCRIPTION',
  type: ProjectTypesEnum.MOBILE,
  imageUrl: getProjectPath('tensorflowjs/logo.png'),
  github: 'https://github.com/francoborrelli/react-native-tensorflowjs',
  skills: [tags.TensorFlow, tags.ReactNative, tags.Expo, tags.TypeScript],
  images: [getProjectPath('tensorflowjs/1.jpg'), getProjectPath('tensorflowjs/2.jpg')],
} as Song;

export const TFD = {
  name: 'TFD_NAME',
  artist: 'TFD_ARTIST',
  length: 'TFD_LENGTH',
  description: 'TFD_DESCRIPTION',
  type: ProjectTypesEnum.WEB,
  imageUrl: getProjectPath('tfd/logo.png'),
  link: 'https://tufacturadigital.com.ar/',
  youtube: 'https://www.youtube.com/channel/UCA8witVr88Wj5sA8c9sI8qg',
  images: [
    getProjectPath('tfd/1.jpg'),
    getProjectPath('tfd/2.jpg'),
    getProjectPath('tfd/3.png'),
    getProjectPath('tfd/4.png'),
    getProjectPath('tfd/5.png'),
  ],
  skills: [
    tags.Angular,
    tags.Django,
    tags.Postgres,
    tags.Docker,
    tags.AWS,
    tags['CI/CD'],
    tags.SASS,
    tags.Mercadopago,
    tags.Redis,
  ],
} as Song;

export const DPAS = {
  name: 'DPAS_NAME',
  artist: 'DPAS_ARTIST',
  length: 'DPAS_LENGTH',
  type: ProjectTypesEnum.WEB,
  description: 'DPAS_DESCRIPTION',
  imageUrl: getProjectPath('dpas/logo.png'),
  link: 'https://sistema.accionsocialspb.org.ar/ingresar',
  youtube: 'https://www.youtube.com/@DPASSPB',
  skills: [tags.React, tags.Django, tags.Postgres, tags.Docker, tags.SASS],
  images: [
    getProjectPath('dpas/1.png'),
    getProjectPath('dpas/2.png'),
    getProjectPath('dpas/3.png'),
    getProjectPath('dpas/4.png'),
    getProjectPath('dpas/5.png'),
    getProjectPath('dpas/6.png'),
    getProjectPath('dpas/7.png'),
    getProjectPath('dpas/8.png'),
    getProjectPath('dpas/9.png'),
    getProjectPath('dpas/10.png'),
    getProjectPath('dpas/11.png'),
  ],
} as Song;

const OTI = {
  name: 'OTI_NAME',
  artist: 'OTI_ARTIST',
  length: 'OTI_LENGTH',
  type: ProjectTypesEnum.WEB,
  description: 'OTI_DESCRIPTION',
  imageUrl: getProjectPath('oti/logo.jpg'),
  link: 'https://www.oti.com.ar/',
  skills: [tags.Django, tags.Postgres, tags.Docker, tags['CI/CD'], tags['Ant design']],
} as Song;

export const CalmCovid = {
  name: 'CALM_COVID_NAME',
  artist: 'CALM_COVID_ARTIST',
  length: 'CALM_COVID_LENGTH',
  type: ProjectTypesEnum.MOBILE,
  description: 'CALM_COVID_DESCRIPTION',
  imageUrl: getProjectPath('calm_covid/logo.png'),
  github: '',
  skills: [tags.IONIC, tags.TypeScript, tags.SASS, tags.Firebase, tags.Android, tags.IOS],
  images: [
    getProjectPath('calm_covid/4.jpg'),
    getProjectPath('calm_covid/1.jpg'),
    getProjectPath('calm_covid/2.jpg'),
    getProjectPath('calm_covid/3.jpg'),
    getProjectPath('calm_covid/5.jpg'),
    getProjectPath('calm_covid/6.jpg'),
  ],
} as Song;

export const QwertyLandingPage = {
  name: 'QWERTY_LANDING_PAGE_NAME',
  artist: 'QWERTY_LANDING_PAGE_ARTIST',
  length: 'QWERTY_LANDING_PAGE_LENGTH',
  type: ProjectTypesEnum.WEB,
  description: 'QWERTY_LANDING_PAGE_DESCRIPTION',
  imageUrl: getProjectPath('qwertysite/logo.png'),
  link: 'http://qwertysoft.ar/',
  skills: [tags.Express, tags.Docker, tags.SASS, tags.AWS, tags['CI/CD']],
  images: [
    getProjectPath('qwertysite/1.png'),
    getProjectPath('qwertysite/5.png'),
    getProjectPath('qwertysite/4.png'),
    getProjectPath('qwertysite/2.png'),
    getProjectPath('qwertysite/3.png'),
  ],
} as Song;

export const AuthoringTool = {
  name: 'AUTHORING_TOOL_NAME',
  artist: 'AUTHORING_TOOL_ARTIST',
  length: 'AUTHORING_TOOL_LENGTH',
  type: ProjectTypesEnum.MOBILE,
  description: 'AUTHORING_TOOL_DESCRIPTION',
  imageUrl: getProjectPath('authoring_tool/logo.png'),
  images: [
    getProjectPath('authoring_tool/2.jpg'),
    getProjectPath('authoring_tool/1.jpg'),
    getProjectPath('authoring_tool/3.jpg'),
    getProjectPath('authoring_tool/4.jpg'),
    getProjectPath('authoring_tool/5.jpg'),
    getProjectPath('authoring_tool/6.jpg'),
    getProjectPath('authoring_tool/7.jpg'),
    getProjectPath('authoring_tool/8.jpg'),
  ],
  skills: [tags.IONIC, tags.Firebase, tags.Android],
} as Song;

export const GralLecturasWeb = {
  name: 'GRAL_LECTURAS_WEB_NAME',
  artist: 'GRAL_LECTURAS_WEB_ARTIST',
  length: 'GRAL_LECTURAS_WEB_LENGTH',
  type: ProjectTypesEnum.WEB,
  description: 'GRAL_LECTURAS_WEB_DESCRIPTION',
  imageUrl: getExperiencePath('gral.jpg'),
  skills: [
    tags.React,
    tags.Serverless,
    tags.Dynamo,
    tags['Ant design'],
    tags['CI/CD'],
    tags.Keycloak,
  ],
  images: [
    getProjectPath('gral_lecturas_web/1.png'),
    getProjectPath('gral_lecturas_web/2.png'),
    getProjectPath('gral_lecturas_web/3.png'),
    getProjectPath('gral_lecturas_web/4.png'),
    getProjectPath('gral_lecturas_web/5.png'),
  ],
} as Song;

export const GralLecturas = {
  name: 'GRAL_LECTURAS_NAME',
  artist: 'GRAL_LECTURAS_ARTIST',
  length: 'GRAL_LECTURAS_LENGTH',
  type: ProjectTypesEnum.MOBILE,
  description: 'GRAL_LECTURAS_DESCRIPTION',
  imageUrl: getExperiencePath('gral.jpg'),
  skills: [tags.ReactNative, tags.Android, tags.Docker, tags['CI/CD'], tags.GooglePlay],
  link: 'https://play.google.com/store/apps/details?id=com.gral.lecturas',
  relatedSongs: [GralLecturasWeb],
  images: [
    getProjectPath('gral_lecturas/1.jpg'),
    getProjectPath('gral_lecturas/2.jpg'),
    getProjectPath('gral_lecturas/3.jpg'),
    getProjectPath('gral_lecturas/4.jpg'),
    getProjectPath('gral_lecturas/5.jpg'),
    getProjectPath('gral_lecturas/6.jpg'),
    getProjectPath('gral_lecturas/7.jpg'),
  ],
} as Song;

export const GralVehicles = {
  name: 'GRAL_VEHICLES_NAME',
  artist: 'GRAL_VEHICLES_ARTIST',
  length: 'GRAL_VEHICLES_LENGTH',
  type: ProjectTypesEnum.WEB,
  description: 'GRAL_VEHICLES_DESCRIPTION',
  imageUrl: getExperiencePath('gral.jpg'),
  skills: [
    tags.React,
    tags.Django,
    tags.TypeScript,
    tags.Docker,
    tags.SASS,
    tags['CI/CD'],
    tags.AWS,
    tags['Ant design'],
    tags.Sentry,
    tags.Keycloak,
  ],
  images: [
    getProjectPath('gral_vehicles/1.png'),
    getProjectPath('gral_vehicles/3.png'),
    getProjectPath('gral_vehicles/4.png'),
    getProjectPath('gral_vehicles/5.png'),
    getProjectPath('gral_vehicles/7.png'),
  ],
} as Song;

export const MasEfectivo = {
  name: 'MAS_EFECTIVO_NAME',
  artist: 'MAS_EFECTIVO_ARTIST',
  length: 'MAS_EFECTIVO_LENGTH',
  type: ProjectTypesEnum.WEB,
  description: 'MAS_EFECTIVO_DESCRIPTION',
  imageUrl: getProjectPath('mas_efectivo/logo.webp'),
  skills: [tags.Express, tags.SASS, tags.Docker],
  images: [getProjectPath('mas_efectivo/1.png'), getProjectPath('mas_efectivo/2.png')],
} as Song;

export const GO4Clic = {
  name: 'GO4CLIC_NAME',
  artist: 'GO4CLIC_ARTIST',
  length: 'GO4CLIC_LENGTH',
  type: ProjectTypesEnum.WEB,
  description: 'GO4CLIC_DESCRIPTION',
  imageUrl: getProjectPath('go4clic/logo.jpg'),
  link: 'https://go4clic.com/',
  youtube: 'https://www.youtube.com/@go4clic',
  skills: [tags.Angular, tags.Django, tags.Postgres, tags.Docker, tags['CI/CD']],
  images: [
    getProjectPath('go4clic/0.jpg'),
    getProjectPath('go4clic/1.png'),
    getProjectPath('go4clic/2.png'),
    getProjectPath('go4clic/3.png'),
    getProjectPath('go4clic/4.png'),
    getProjectPath('go4clic/5.png'),
    getProjectPath('go4clic/6.png'),
  ],
} as Song;

export const RUKIR = {
  name: 'RUKIR_NAME',
  artist: 'RUKIR_ARTIST',
  length: 'RUKIR_LENGTH',
  type: ProjectTypesEnum.WEB,
  description: 'RUKIR_DESCRIPTION',
  imageUrl: getProjectPath('rukir/logo.jpg'),
  skills: [tags.Angular, tags.Django, tags.Postgres, tags.Docker, tags['CI/CD']],
  images: [getProjectPath('rukir/1.png'), getProjectPath('rukir/2.png')],
} as Song;

export const GralStores = {
  name: 'GRAL_STORES_NAME',
  artist: 'GRAL_STORES_ARTIST',
  length: 'GRAL_STORES_LENGTH',
  type: ProjectTypesEnum.WEB,
  description: 'GRAL_STORES_DESCRIPTION',
  imageUrl: getExperiencePath('gral.jpg'),
  skills: [
    tags.React,
    tags.Laravel,
    tags.TypeScript,
    tags['Ant design'],
    tags.SASS,
    tags.Mysql,
    tags.Docker,
    tags.Sentry,
    tags['CI/CD'],
    tags.Keycloak,
  ],
  images: [
    getProjectPath('gral_depositos/1.png'),
    getProjectPath('gral_depositos/2.png'),
    getProjectPath('gral_depositos/3.png'),
    getProjectPath('gral_depositos/4.png'),
    getProjectPath('gral_depositos/5.png'),
  ],
} as Song;

export const GralStatistics = {
  name: 'GRAL_STATISTICS_NAME',
  artist: 'GRAL_STATISTICS_ARTIST',
  length: 'GRAL_STATISTICS_LENGTH',
  type: ProjectTypesEnum.WEB,
  description: 'GRAL_STATISTICS_DESCRIPTION',
  imageUrl: getExperiencePath('gral.jpg'),
  skills: [
    tags.React,
    tags['Node.js'],
    tags.TypeScript,
    tags.SASS,
    tags.Mysql,
    tags['Ant design'],
    tags.Docker,
    tags.Sentry,
    tags['CI/CD'],
    tags.Keycloak,
  ],
  images: [
    getProjectPath('gral_estadisticas/1.png'),
    getProjectPath('gral_estadisticas/2.png'),
    getProjectPath('gral_estadisticas/3.png'),
    getProjectPath('gral_estadisticas/4.png'),
  ],
} as Song;

export const GralTasks = {
  name: 'GRAL_TASKS_WEB_NAME',
  artist: 'GRAL_TASKS_WEB_ARTIST',
  length: 'GRAL_TASKS_WEB_LENGTH',
  type: ProjectTypesEnum.WEB,
  description: 'GRAL_TASKS_WEB_DESCRIPTION',
  imageUrl: getExperiencePath('gral.jpg'),
  skills: [
    tags.React,
    tags.Graphql,
    tags.Telegram,
    tags.Laravel,
    tags.TypeScript,
    tags.SASS,
    tags.Mysql,
    tags['Ant design'],
    tags.Docker,
    tags.Sentry,
    tags['CI/CD'],
    tags.Keycloak,
  ],
  images: [
    getProjectPath('gral_tareas_web/1.png'),
    getProjectPath('gral_tareas_web/2.png'),
    getProjectPath('gral_tareas_web/3.png'),
    getProjectPath('gral_tareas_web/4.png'),
    getProjectPath('gral_tareas_web/5.png'),
  ],
} as Song;

export const GralTasksMobile = {
  name: 'GRAL_TASKS_MOBILE_NAME',
  artist: 'GRAL_TASKS_MOBILE_ARTIST',
  length: 'GRAL_TASKS_MOBILE_LENGTH',
  type: ProjectTypesEnum.MOBILE,
  relatedSongs: [GralTasks],
  description: 'GRAL_TASKS_MOBILE_DESCRIPTION',
  imageUrl: getExperiencePath('gral.jpg'),
  images: [
    getProjectPath('gral_tareas_mobile/1.jpg'),
    getProjectPath('gral_tareas_mobile/2.jpg'),
    getProjectPath('gral_tareas_mobile/3.jpg'),
    getProjectPath('gral_tareas_mobile/4.jpg'),
    getProjectPath('gral_tareas_mobile/5.jpg'),
  ],
  skills: [
    tags.ReactNative,
    tags.Laravel,
    tags.AWS,
    tags.TypeScript,
    tags['Ant design'],
    tags.SASS,
    tags.Android,
    tags.Sentry,
    tags.Docker,
    tags.AppCenter,
    tags['CI/CD'],
  ],
} as Song;

export const PUERTOS = {
  name: 'PUERTOS_NAME',
  artist: 'PUERTOS_ARTIST',
  length: 'PUERTOS_LENGTH',
  type: ProjectTypesEnum.WEB,
  description: 'PUERTOS_DESCRIPTION',
  imageUrl: getProjectPath('puertos/logo.jpg'),
  skills: [
    tags.React,
    tags.Laravel,
    tags.Mysql,
    tags.Docker,
    tags['CI/CD'],
    tags.GitLab,
    tags.Redash,
    tags['Ant design'],
  ],
  images: [
    getProjectPath('puertos/1.png'),
    getProjectPath('puertos/2.png'),
    getProjectPath('puertos/3.png'),
    getProjectPath('puertos/4.png'),
    getProjectPath('puertos/5.png'),
    getProjectPath('puertos/6.png'),
  ],
} as Song;

export const COOPERATIVAS = {
  name: 'COOPERATIVAS_NAME',
  artist: 'COOPERATIVAS_ARTIST',
  length: 'COOPERATIVAS_LENGTH',
  type: ProjectTypesEnum.WEB,
  description: 'COOPERATIVAS_DESCRIPTION',
  imageUrl: getProjectPath('puertos/logo.jpg'),
  skills: [
    tags.React,
    tags.Laravel,
    tags.Mysql,
    tags.Docker,
    tags['CI/CD'],
    tags.GitLab,
    tags.Redash,
    tags['Ant design'],
  ],
  images: [
    getProjectPath('cooperativas/1.png'),
    getProjectPath('cooperativas/2.png'),
    getProjectPath('cooperativas/3.png'),
    getProjectPath('cooperativas/4.png'),
    getProjectPath('cooperativas/5.png'),
    // getProjectPath('cooperativas/6.png'),
    getProjectPath('cooperativas/7.png'),
    getProjectPath('cooperativas/8.png'),
  ],
} as Song;

export const ObjectDetectionLocationApp = {
  name: 'OBJECT_DETECTION_LOCATION_APP_NAME',
  artist: 'OBJECT_DETECTION_LOCATION_APP_ARTIST',
  length: 'OBJECT_DETECTION_LOCATION_APP_LENGTH',
  type: ProjectTypesEnum.MOBILE,
  description: 'OBJECT_DETECTION_LOCATION_APP_DESCRIPTION',
  imageUrl: getProjectPath('object_detection_location/logo.png'),
  skills: [
    tags.ReactNative,
    tags.TensorFlow,
    tags.Expo,
    tags.TypeScript,
    tags.Firebase,
    tags.Android,
  ],
  images: [
    getProjectPath('object_detection_location/0.jpg'),
    getProjectPath('object_detection_location/1.jpg'),
    getProjectPath('object_detection_location/2.jpg'),
    getProjectPath('object_detection_location/3.jpg'),
    getProjectPath('object_detection_location/4.jpg'),
    getProjectPath('object_detection_location/5.jpg'),
    getProjectPath('object_detection_location/6.jpg'),
    getProjectPath('object_detection_location/7.jpg'),
    getProjectPath('object_detection_location/8.jpg'),
    getProjectPath('object_detection_location/9.jpg'),
    getProjectPath('object_detection_location/10.jpg'),
    getProjectPath('object_detection_location/11.jpg'),
    getProjectPath('object_detection_location/12.jpg'),
    getProjectPath('object_detection_location/13.jpg'),
  ],
};

export const PersonalProjects = {
  name: 'PROJECTS',
  color: '#2e3f43',
  songs: [
    // ObjectDetectionLocationApp,
    COOPERATIVAS,
    PUERTOS,
    TensorflowReactNative,
    LottieReactNative,
    GralVehicles,
    GralStatistics,
    GralTasksMobile,
    GralTasks,
    GralStores,
    TFD,
    OTI,
    CalmCovid,
    DPAS,
    AuthoringTool,
    QwertyLandingPage,
    MasEfectivo,
    GO4Clic,
    GralLecturas,
    GralLecturasWeb,
    RUKIR,
    SpotifyClone,
  ],
  filters: [ProjectTypesEnum.WEB, ProjectTypesEnum.MOBILE],
  getImage(lang) {
    return getAlbumPath('Projects-cover', lang, 'png');
  },
} as Playlist;

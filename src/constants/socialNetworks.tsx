import { FaGithub, FaGitlab, FaLinkedin, FaSpotify, FaUnsplash } from 'react-icons/fa6';
import type { SocialNetwork } from '../interfaces/types';
import { getSocialNetworkPath } from '../utils/getPublicPath';

export const SOCIAL_NETWORKS = [
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/francoborrelli/',
    imageUrl: getSocialNetworkPath('linkedin.jpg'),
    icon: <FaLinkedin />,
  },
  {
    name: 'GitHub',
    link: 'https://github.com/francoborrelli',
    imageUrl: getSocialNetworkPath('github.png'),
    icon: <FaGithub />,
  },
  {
    name: 'Gitlab',
    link: 'https://gitlab.com/francoborrelli',
    imageUrl: getSocialNetworkPath('gitlab.png'),
    icon: <FaGitlab />,
  },
  {
    name: 'Spotify',
    link: 'https://open.spotify.com/user/21dzxax5geyjawwrgvrjogqwa?si=54468bda2a7e422d',
    imageUrl: getSocialNetworkPath('spotify.png'),
    icon: <FaSpotify />,
  },
] as SocialNetwork[];

export const ALL_SOCIAL_NETWORKS = [
  ...SOCIAL_NETWORKS,
  {
    name: 'Unsplash',
    link: 'https://unsplash.com/@francoborrelli',
    icon: <FaUnsplash />,
  },
];

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './i18n';

import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en';
import es from 'javascript-time-ago/locale/es-AR';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(es);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// NOTE: StrictMode is intentionally disabled. In dev it double-invokes every effect, which
// fires every Spotify API request twice and was a major contributor to hitting Spotify's
// (tightened, Feb-2026) rate limits — half the calls on the Home/Artist/Album pages were
// duplicates. Re-enable (<React.StrictMode>) if you need its checks and can tolerate 2x calls.
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

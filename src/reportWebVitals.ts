import { onLCP, onINP, onCLS } from 'web-vitals/attribution';

const reportWebVitals = () => {
  onCLS(console.log);
  onINP(console.log);
  onLCP(console.log);
};

export default reportWebVitals;

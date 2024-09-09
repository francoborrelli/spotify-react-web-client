import { FC, memo } from 'react';
import './spinner.scss';

const Spin: FC<{ section?: string }> = (props) => (
  <div className={`spinner-container ${props.section ? 'section' : ''}`}>
    <div className='sk-circle'>
      <div className='sk-circle1 sk-child' />
      <div className='sk-circle2 sk-child' />
      <div className='sk-circle3 sk-child' />
      <div className='sk-circle4 sk-child' />
      <div className='sk-circle5 sk-child' />
      <div className='sk-circle6 sk-child' />
      <div className='sk-circle7 sk-child' />
      <div className='sk-circle8 sk-child' />
      <div className='sk-circle9 sk-child' />
      <div className='sk-circle10 sk-child' />
      <div className='sk-circle11 sk-child' />
      <div className='sk-circle12 sk-child' />
    </div>
  </div>
);

export const Spinner: FC<{ loading: boolean; section?: string; children?: any }> = memo((props) => {
  const { loading, section, children } = props;
  return loading ? <Spin section={section} /> : children;
});

Spinner.displayName = 'Spinner';

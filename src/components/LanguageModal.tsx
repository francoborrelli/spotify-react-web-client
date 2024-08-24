import { Modal } from 'antd';

import { memo } from 'react';

// Constants
import { AVAILABLE_LANGUAGES } from '../constants/languages';

// Redux
import { languageActions } from '../store/slices/language';
import { useAppDispatch, useAppSelector } from '../store/store';

// Interfaces
import type { Languages } from '../interfaces/languages';

export const LanguageModal = memo(() => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.language.isModalOpen);

  const onClose = (value?: Languages) => {
    dispatch(languageActions.closeLanguageModal({ language: value }));
  };

  return (
    <>
      <Modal
        centered
        width={900}
        open={open}
        footer={null}
        destroyOnClose
        onCancel={() => onClose()}
        title={
          <h1
            style={{
              fontWeight: 700,
              fontSize: '1.5rem',
              marginBlockStart: 0,
              paddingBlockEnd: 8,
              color: 'white',
            }}
          >
            Choose a language
          </h1>
        }
      >
        <div className='language-grid'>
          {AVAILABLE_LANGUAGES.map((language) => (
            <button key={language.value} onClick={() => onClose(language.value)}>
              <span className='title'>{language.label}</span>
              <span className='subtitle'>{language.englishLabel}</span>
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
});

LanguageModal.displayName = 'LanguageModal';

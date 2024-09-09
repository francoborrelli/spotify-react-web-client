import { memo } from 'react';
import { Space } from 'antd';
import { WorldIcon } from '../../../Icons';

// Redux
import { languageActions } from '../../../../store/slices/language';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

// Constants
import { AVAILABLE_LANGUAGES } from '../../../../constants/languages';

export const LanguageButton = memo(() => {
  const dispatch = useAppDispatch();

  const selectedLanguage = useAppSelector((state) => state.language.language);

  const currentLanguage = AVAILABLE_LANGUAGES.find(
    (language) => language.value === selectedLanguage
  );

  return (
    <>
      <button
        className={`language-button`}
        onClick={() => {
          dispatch(languageActions.openLanguageModal());
        }}
      >
        <Space align='center'>
          <WorldIcon /> {currentLanguage?.label}
        </Space>
      </button>
    </>
  );
});

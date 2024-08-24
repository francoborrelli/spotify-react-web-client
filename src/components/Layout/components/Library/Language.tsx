import { memo } from 'react';
import { Space } from 'antd';
import { WorldIcon } from '../../../Icons';
import { Tooltip } from '../../../Tooltip';

// Utils
import { useTranslation } from 'react-i18next';

// Redux
import { languageActions } from '../../../../store/slices/language';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

// Constants
import { AVAILABLE_LANGUAGES } from '../../../../constants/languages';

export const LanguageButton = memo(() => {
  const { t } = useTranslation(['navbar']);
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector((state) => state.library.collapsed);
  const selectedLanguage = useAppSelector((state) => state.language.language);

  const currentLanguage = AVAILABLE_LANGUAGES.find(
    (language) => language.value === selectedLanguage
  );

  if (collapsed) {
    return (
      <Tooltip placement='right' title={t('Language')}>
        <button
          className={'language-button collapsed'}
          onClick={() => {
            dispatch(languageActions.openLanguageModal());
          }}
        >
          <WorldIcon />
        </button>
      </Tooltip>
    );
  }

  return (
    <>
      <button
        className={`language-button`}
        onClick={() => {
          dispatch(languageActions.openLanguageModal());
        }}
      >
        <Space align='center'>
          <WorldIcon /> {collapsed ? '' : currentLanguage?.label}
        </Space>
      </button>
    </>
  );
});

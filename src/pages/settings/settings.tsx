import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { BaseLayout, Content } from '@components/layout';
import { Breadcrumbs, Button, FormGroup, Select } from '@components/ui';

import { LANGUAGES, ROUTE } from '@constants';

import { useTitle } from '@hooks';

import { doUpdateSettings } from '@store/actions';
import { selectSettings } from '@store/selectors';

import { TSettingsState } from '@types';

function SettingsPage() {
  const { t } = useTranslation();

  useTitle(t('page.settings'));

  const dispatch = useDispatch();

  const {
    language: currLanguage,
    theme: currTheme,
    textEditorMode: currTextEditorMode,
  } = useSelector(selectSettings);

  const [newSettings, setNewSettings] = useState({
    language: currLanguage,
    theme: currTheme,
    textEditorMode: currTextEditorMode,
  });

  const handleSettingsChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = evt.target;
    setNewSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSettingsSave = useCallback(
    () => dispatch(doUpdateSettings(newSettings as Partial<TSettingsState>)),
    [dispatch, newSettings],
  );

  const themeOptions = useMemo(
    () => [
      { value: 'system', label: t('themes.system') },
      { value: 'light', label: t('themes.light') },
      { value: 'dark', label: t('themes.dark') },
      { value: 'light-blue', label: t('themes.lightBlue') },
      { value: 'dark-blue', label: t('themes.darkBlue') },
      { value: 'light-red', label: t('themes.lightRed') },
      { value: 'dark-red', label: t('themes.darkRed') },
    ],
    [t],
  );

  const isSaveDisabled =
    newSettings.language === currLanguage &&
    newSettings.theme === currTheme &&
    newSettings.textEditorMode === currTextEditorMode;

  return (
    <BaseLayout>
      <Breadcrumbs
        links={[
          { label: t('page.home'), link: ROUTE.HOME },
          { label: t('page.settings') },
        ]}
        className="mb-2"
      />
      <Content>
        <div className="mb-6 w-fit">
          <FormGroup>
            <Select
              label={t('language')}
              name="language"
              value={newSettings.language}
              onChange={handleSettingsChange}
              options={LANGUAGES}
              title={t('changeLanguage')}
              className="w-full"
            />
          </FormGroup>
          <FormGroup>
            <Select
              label={t('theme')}
              name="theme"
              value={newSettings.theme}
              onChange={handleSettingsChange}
              className="w-full"
              options={themeOptions}
              title={t('changeTheme')}
            />
          </FormGroup>
          <Select
            label={t('textEditorMode')}
            name="textEditorMode"
            value={newSettings.textEditorMode}
            onChange={handleSettingsChange}
            className="w-full"
            options={[
              { value: 'visual', label: t('textEditor.visual') },
              { value: 'text', label: t('textEditor.text') },
              {
                value: 'text+preview',
                label: t('textEditor.textAndPreview'),
              },
            ]}
          />
        </div>
        <Button
          onClick={handleSettingsSave}
          className="w-fit"
          disabled={isSaveDisabled}
        >
          {t('save')}
        </Button>
      </Content>
    </BaseLayout>
  );
}

export default SettingsPage;

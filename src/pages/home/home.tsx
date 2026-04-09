import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { BaseLayout, Content } from '@components/layout';
import { Breadcrumbs, Widget, WidgetList } from '@components/ui';

import { ROUTE } from '@constants';

import { useTitle } from '@hooks';

import { selectUserData } from '@store/selectors';

import { getWelcomeMessage } from './home.utils';

function HomePage() {
  const { t } = useTranslation();

  useTitle(t('page.home'));

  const userName = useSelector(selectUserData).name;

  const welcomeMessage = getWelcomeMessage(t, userName);

  return (
    <BaseLayout>
      <Breadcrumbs className="mb-2" links={[{ label: t('page.home') }]} />
      <Content>
        <h2 className="mb-4">{welcomeMessage}</h2>
        <WidgetList>
          <Widget title={t('quickLinks')}>
            <ul className="list-disc">
              <li className="ml-6">
                <Link to={ROUTE.POST_ADD}>{t('addPost')}</Link>
              </li>
            </ul>
          </Widget>
        </WidgetList>
      </Content>
    </BaseLayout>
  );
}

export default HomePage;

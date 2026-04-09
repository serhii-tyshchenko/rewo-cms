import { useTranslation } from 'react-i18next';

import { Button, FormGroup, Input } from '@components/ui';

import { TLoginForm } from '../../types';
import './login-form.styles.scss';

interface IProps {
  data: TLoginForm;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function LoginForm(props: IProps) {
  const { data, onChange, onSubmit } = props;

  const { t } = useTranslation();

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <FormGroup>
        <Input
          name="username"
          placeholder={t('usernameOrEmail')}
          value={data.username}
          onChange={onChange}
          label={t('usernameOrEmail')}
          required
          autocomplete="username"
          autoFocus
        />
      </FormGroup>
      <FormGroup className="mb-6">
        <Input
          name="password"
          type="password"
          placeholder={t('password')}
          value={data.password}
          onChange={onChange}
          label={t('password')}
          autocomplete="password"
          required
        />
      </FormGroup>
      <Button type="submit" className="block ml-auto">
        {t('logIn')}
      </Button>
    </form>
  );
}

export default LoginForm;

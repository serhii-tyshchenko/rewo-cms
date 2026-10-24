import { useTranslation } from 'react-i18next';

import { Button, FormGroup, InputPassword, InputText } from '@components/ui';

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
        <InputText
          name="username"
          placeholder={t('usernameOrEmail')}
          value={data.username}
          onChange={onChange}
          label={t('usernameOrEmail')}
          required
          autoComplete="username"
          autoFocus
        />
      </FormGroup>
      <FormGroup className="mb-6">
        <InputPassword
          name="password"
          placeholder={t('password')}
          value={data.password}
          onChange={onChange}
          label={t('password')}
          autoComplete="current-password"
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

import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { useTitle } from '@hooks';

import { doLogIn } from '@store/actions';

import { LoginForm } from './components';
import { TLoginForm } from './types';

const INITIAL_STATE: TLoginForm = {
  username: '',
  password: '',
};

function LogIn() {
  const { t } = useTranslation();

  useTitle(t('page.login'));

  const dispatch = useDispatch();

  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
    [],
  );

  const handleSubmit = useCallback(
    (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      dispatch(doLogIn(formData.username, formData.password));
    },
    [dispatch, formData],
  );

  return (
    <LoginForm
      data={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}

export default LogIn;

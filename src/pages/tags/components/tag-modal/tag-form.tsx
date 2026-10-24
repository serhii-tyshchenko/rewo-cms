import { useTranslation } from 'react-i18next';

import { FormGroup, InputText, Textarea } from '@components/ui';

import { TTag } from '@types';

interface IProps {
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  formData?: Partial<TTag>;
}

function TagForm(props: IProps) {
  const {
    onChange,
    formData = {
      name: '',
      slug: '',
      description: '',
    },
  } = props;
  const { t } = useTranslation();

  return (
    <form>
      <FormGroup>
        <InputText
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder={t('tagName')}
          label={t('name')}
          required
        />
      </FormGroup>
      <FormGroup>
        <InputText
          name="slug"
          value={formData.slug}
          onChange={onChange}
          placeholder={t('tagSlug')}
          label={t('slug')}
          required
        />
      </FormGroup>
      <FormGroup>
        <Textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          placeholder={t('tagDescription')}
          label={t('description')}
        />
      </FormGroup>
    </form>
  );
}

export default TagForm;

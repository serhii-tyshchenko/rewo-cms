import { FormGroup, Input } from '@components/ui';

interface IProps {
  data: Array<{
    name: string;
    value: string;
  }>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function EntryMetaFields(props: IProps) {
  const { data, onChange } = props;

  return data.map(({ name, value }) => (
    <FormGroup key={name}>
      <Input name={name} value={value} label={name} onChange={onChange} />
    </FormGroup>
  ));
}

export default EntryMetaFields;

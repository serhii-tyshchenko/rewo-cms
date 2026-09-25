import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { isEmpty } from 'lodash-es';

import { DialogConfirm, InputFile, Progress, Select } from '@components/ui';

import {
  DEFAULT_DELAY_SECONDS,
  DELAY_OPTIONS,
} from './bulk-add-modal.constants';
import { useBulkCsvFile } from './use-bulk-csv-file';
import { useBulkPostUpload } from './use-bulk-post-upload';

interface IProps {
  onClose: () => void;
}

function BulkAddModal(props: IProps) {
  const { onClose } = props;

  const { t } = useTranslation();

  const [delay, setDelay] = useState<number>(DEFAULT_DELAY_SECONDS);
  const { file, handleFileChange, resetFile, parseError } = useBulkCsvFile();
  const { uploadPosts, isUploading, progress } = useBulkPostUpload();

  const handleModalClose = (): void => {
    resetFile();
    onClose();
  };

  const handleDelayChange = (
    ev: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setDelay(Number(ev.target.value));
  };

  const handleUploadConfirm = async (): Promise<void> => {
    await uploadPosts({
      file,
      delay,
    });
  };

  const isUploadDisabled = isEmpty(file) || isUploading;

  return (
    <DialogConfirm
      title={t('bulkAddPosts')}
      onCancel={handleModalClose}
      onConfirm={handleUploadConfirm}
      confirmDisabled={isUploadDisabled}
      cancelDisabled={isUploading}
      closeDisabled={isUploading}
      cancelBtnTitle={t('cancel')}
      confirmBtnTitle={t('confirm')}
    >
      <div className="mb-4">
        <InputFile
          name="file"
          onChange={handleFileChange}
          accept=".csv"
          disabled={isUploading}
          label={t('chooseFile')}
          error={parseError}
        />
      </div>
      <Progress
        value={progress}
        max={file?.length || 0}
        className="mb-2"
        size="big"
      />
      <div className="mb-4">
        {!isEmpty(file) &&
          t('uploadProgress', {
            loaded: progress,
            total: file?.length || 'N/A',
          })}
      </div>
      <Select
        label={t('delayBetweenUploads')}
        value={delay}
        onChange={handleDelayChange}
        options={DELAY_OPTIONS}
        disabled={isUploadDisabled}
        className="w-fit"
      />
    </DialogConfirm>
  );
}

export default BulkAddModal;

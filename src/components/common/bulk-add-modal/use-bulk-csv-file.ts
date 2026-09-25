import { useCallback, useState } from 'react';

import { first, isEmpty } from 'lodash-es';
import Papa from 'papaparse';

import { TCsvEntry } from './bulk-add-modal.types';

export function useBulkCsvFile() {
  const [file, setFile] = useState<TCsvEntry[] | null>([]);
  const [parseError, setParseError] = useState<string | null>(null);

  const resetFile = useCallback(() => {
    setFile(null);
    setParseError(null);
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (isEmpty(e.target.files)) {
        resetFile();
        return;
      }

      const selectedFile = first(e.target.files);
      if (!selectedFile) {
        resetFile();
        return;
      }

      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        try {
          const rawData = (event.target?.result as string) || '';
          const { data, errors } = Papa.parse<TCsvEntry>(rawData, {
            header: true,
            skipEmptyLines: true,
          });

          if (!isEmpty(errors)) {
            setParseError(errors[0]?.message || 'CSV parse error');
          } else {
            setParseError(null);
          }

          setFile(data);
        } catch {
          setParseError('CSV parse error');
          setFile(null);
        }
      };

      reader.onerror = () => {
        setParseError('File read error');
        setFile(null);
      };

      reader.readAsText(selectedFile);
    },
    [resetFile],
  );

  return { file, handleFileChange, resetFile, parseError };
}

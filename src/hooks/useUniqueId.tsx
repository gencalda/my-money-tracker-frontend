import { useCallback, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

const useUniqueId = (
  id: string
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [uniqueId, setUniqueId] = useState(id);

  useEffect(() => {
    if (id) {
      setUniqueId(id);
    }
  }, [id, setUniqueId]);

  const generateId = useCallback(() => {
    setUniqueId((currentValue) => currentValue || uuid());
  }, []);

  useEffect(() => {
    generateId();
  }, [generateId]);

  return [uniqueId, setUniqueId];
};

export default useUniqueId;

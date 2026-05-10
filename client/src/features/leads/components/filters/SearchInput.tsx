import { memo, useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import type { ISearchInputProps } from '../types';

const DEBOUNCE_MS = 250;

const SearchInputBase = ({ value, onChange }: ISearchInputProps) => {
  const [local, setLocal] = useState(value);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  useEffect(() => {
    if (local === value) return;
    const t = setTimeout(() => onChange(local), DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [local, value, onChange]);

  return (
    <div className="relative w-full max-w-sm">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-labels" />
      <input
        type="search"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder="Search leads..."
        className="w-full rounded-md border border-default bg-white py-2 pl-9 pr-3 text-body placeholder-default focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
};
SearchInputBase.displayName = 'SearchInput';

export const SearchInput = memo(SearchInputBase);

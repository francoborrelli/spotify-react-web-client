import { Input, Space } from 'antd';
import type { InputRef } from 'antd';
import NavigationButton from './NavigationButton';
import { RecentSearchesDropdown } from './RecentSearchesDropdown';
import {
  SearchSuggestionsDropdown,
  type SuggestionEntry,
} from './SearchSuggestionsDropdown';
import { ActiveHomeIcon, BrowseIcon, HomeIcon, SearchIcon } from '../../../Icons';

// Utils
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';

// Redux
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { searchHistoryActions } from '../../../../store/slices/searchHistory';

const INITIAL_VALUE = window.location.href.includes('/search/')
  ? decodeURIComponent(window.location.href.split('/').reverse()[0])
  : '';

const isMac =
  typeof navigator !== 'undefined' &&
  (/Mac|iPhone|iPad|iPod/.test(navigator.platform) || navigator.userAgent.includes('Mac'));

export const Search = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['navbar']);
  const inputRef = useRef<InputRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const recentItems = useAppSelector((state) => state.searchHistory.items);

  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>(INITIAL_VALUE);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [entries, setEntries] = useState<SuggestionEntry[]>([]);
  const [debouncedValue] = useDebounce(inputValue, 350);

  const query = inputValue.trim();
  const debouncedQuery = debouncedValue.trim();

  useEffect(() => {
    if (location.pathname.startsWith('/search/') && location.pathname !== '/search') {
      const segment = decodeURIComponent(location.pathname.split('/').pop() || '');
      if (segment && segment !== inputValue) setInputValue(segment);
    }
    if (location.pathname === '/search' || location.pathname === '/') {
      // keep typed value unless leaving search intentionally via browse
    }
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setActiveIndex(-1);
  }, [debouncedQuery]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isKeyK = event.key.toLowerCase() === 'k' || event.code === 'KeyK';
      const withModifier = event.metaKey || event.ctrlKey;

      if (!isKeyK || !withModifier || event.altKey || event.shiftKey) return;

      const target = event.target as HTMLElement | null;
      if (target?.closest?.('.search-input-container')) return;

      event.preventDefault();
      event.stopPropagation();

      const input = inputRef.current?.input;
      if (input) {
        input.focus();
        input.select();
      } else {
        inputRef.current?.focus({ cursor: 'all' });
      }

      setFocused(true);
      setDropdownOpen(true);
    };

    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, []);

  useEffect(() => {
    if (!dropdownOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (containerRef.current?.contains(event.target as Node)) return;
      setDropdownOpen(false);
      setActiveIndex(-1);
    };

    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [dropdownOpen]);

  const goToSearch = useCallback(
    (value: string) => {
      const next = value.trim();
      if (!next) {
        navigate('/search');
      } else {
        navigate(`/search/${encodeURIComponent(next)}`);
      }
      setDropdownOpen(false);
      setActiveIndex(-1);
      inputRef.current?.blur();
    },
    [navigate]
  );

  const onPickQuery = useCallback(
    (text: string) => {
      setInputValue(text);
      goToSearch(text);
    },
    [goToSearch]
  );

  const onEntriesChange = useCallback((next: SuggestionEntry[]) => {
    setEntries(next);
  }, []);

  const activateEntry = useCallback(
    (entry: SuggestionEntry) => {
      if (entry.kind === 'query') {
        onPickQuery(entry.text);
        return;
      }
      if (entry.kind === 'artist') {
        dispatch(searchHistoryActions.setItem(entry.artist));
        navigate(`/artist/${entry.artist.id}`);
      } else {
        dispatch(searchHistoryActions.setItem(entry.track));
        navigate(`/album/${entry.track.album.id}`);
      }
      setDropdownOpen(false);
      setActiveIndex(-1);
    },
    [dispatch, navigate, onPickQuery]
  );

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const showSuggestions = dropdownOpen && !!query;

    if (event.key === 'Escape') {
      setDropdownOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (event.key === 'ArrowDown' && showSuggestions) {
      event.preventDefault();
      setActiveIndex((prev) => {
        if (!entries.length) return -1;
        return prev < entries.length - 1 ? prev + 1 : 0;
      });
      return;
    }

    if (event.key === 'ArrowUp' && showSuggestions) {
      event.preventDefault();
      setActiveIndex((prev) => {
        if (!entries.length) return -1;
        return prev <= 0 ? entries.length - 1 : prev - 1;
      });
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      if (showSuggestions && activeIndex >= 0 && entries[activeIndex]) {
        activateEntry(entries[activeIndex]);
        return;
      }
      goToSearch(inputValue);
    }
  };

  const isHome = useMemo(() => location.pathname === '/', [location.pathname]);
  const showShortcut = hovered && !focused && !dropdownOpen && !inputValue;
  const showRecentSearches = dropdownOpen && recentItems.length > 0 && !query;
  const showSuggestions = dropdownOpen && !!query;

  return (
    <Space size={10} align='center'>
      <NavigationButton
        text={t('Home')}
        icon={isHome ? <ActiveHomeIcon /> : <HomeIcon />}
        onClick={() => navigate('/')}
      />

      <div
        ref={containerRef}
        className='search-input-container'
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Input
          ref={inputRef}
          size='large'
          className='search-input'
          prefix={<SearchIcon />}
          value={inputValue}
          suffix={
            <span className='search-input-suffix'>
              {showShortcut ? (
                <span className='search-shortcut' aria-hidden>
                  <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd>
                  <kbd>K</kbd>
                </span>
              ) : null}
              <button
                type='button'
                className='search-browse-button'
                onClick={() => {
                  setDropdownOpen(false);
                  navigate('/search');
                }}
              >
                <BrowseIcon />
              </button>
            </span>
          }
          onFocus={() => {
            setFocused(true);
            setDropdownOpen(true);
          }}
          onBlur={() => setFocused(false)}
          onChange={(e) => {
            setInputValue(e.target.value);
            setDropdownOpen(true);
          }}
          onKeyDown={onInputKeyDown}
          placeholder={t('SearchPlaceholder')}
        />

        {showRecentSearches ? (
          <RecentSearchesDropdown onNavigate={() => setDropdownOpen(false)} />
        ) : null}

        {showSuggestions ? (
          <SearchSuggestionsDropdown
            query={debouncedQuery}
            isPending={!debouncedQuery || debouncedQuery !== query}
            activeIndex={activeIndex}
            onActiveIndexChange={setActiveIndex}
            onEntriesChange={onEntriesChange}
            onClose={() => setDropdownOpen(false)}
            onPickQuery={onPickQuery}
          />
        ) : null}
      </div>
    </Space>
  );
});

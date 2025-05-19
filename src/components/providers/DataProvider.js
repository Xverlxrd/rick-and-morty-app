import axios from 'axios';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback
} from 'react';

const API_URL = 'https://rickandmortyapi.com/api/character/';

const FiltersContext = createContext();

export function DataProvider({ children }) {
  const [activePage, setActivePage] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [apiURL, setApiURL] = useState(API_URL);
  const [filters, setFilters] = useState({
    status: '',
    gender: '',
    species: '',
    name: '',
    type: ''
  });

  const buildApiUrl = useCallback(
    (page = activePage, currentFilters = filters) => {
      const params = new URLSearchParams();

      Object.entries(currentFilters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      if (page > 1) params.append('page', page);

      return `${API_URL}?${params.toString()}`;
    },
    [activePage, filters]
  );

  const fetchData = useCallback(
    async (url) => {
      setIsFetching(true);
      setIsError(false);

      try {
        const { data } = await axios.get(url || buildApiUrl());
        setIsFetching(false);
        setCharacters(data.results);
        setInfo(data.info);
      } catch (e) {
        setIsFetching(false);
        setIsError(true);
        console.error(e);
      }
    },
    [buildApiUrl]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateFilters = useCallback((newFilters) => {
    setFilters(newFilters);
    setActivePage(0);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      status: '',
      gender: '',
      species: '',
      name: '',
      type: ''
    });
    setActivePage(0);
  }, []);

  const dataValue = useMemo(
    () => ({
      activePage,
      setActivePage,
      characters,
      fetchData,
      isFetching,
      isError,
      info,
      apiURL,
      setApiURL,
      filters,
      updateFilters,
      resetFilters,
      buildApiUrl
    }),
    [
      activePage,
      characters,
      isFetching,
      isError,
      info,
      apiURL,
      filters,
      fetchData,
      updateFilters,
      resetFilters,
      buildApiUrl
    ]
  );

  return (
    <DataContext.Provider value={dataValue}>
      <FiltersContext.Provider value={{ filters, updateFilters, resetFilters }}>
        {children}
      </FiltersContext.Provider>
    </DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useData = () => useContext(DataContext);
export const useFilters = () => useContext(FiltersContext);

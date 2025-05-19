import styled from 'styled-components';
import { Pagination, useData, Header, AppState, ItemsGrid } from './components';
import { usePopup } from './components/popup/PopupProvider';

export function App() {
  const { isFetching, isError } = useData();
  const { popupOpen } = usePopup();

  return (
    <Main $popupOpen={popupOpen}>
      <Header />
      <AppState />

      {!isFetching && !isError && (
        <>
          <ItemsGrid />
          <Pagination />
        </>
      )}
    </Main>
  );
}

const Main = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px 0;
  max-width: 80%;
  margin: 0 auto;
  overflow: ${({ $popupOpen }) => ($popupOpen ? 'hidden' : 'visible')};

  @media (max-width: 1200px) {
    max-width: 95%;
  }

  @media (max-width: 930px) {
    max-width: 85%;
  }

  @media (max-width: 600px) {
    max-width: 90%;
  }
`;

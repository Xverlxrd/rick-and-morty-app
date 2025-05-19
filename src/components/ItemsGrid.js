import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Popup } from './popup';
import { Card } from './сard';
import { useData } from './providers';
import { usePopup } from './popup/PopupProvider';

const defaultPopupSettings = {
  visible: false,
  content: {}
};

export function ItemsGrid() {
  const { characters } = useData();
  const [popupSettings, setPopupSettings] = useState(defaultPopupSettings);
  const { setPopupOpen } = usePopup();
  const createClickHandler = useCallback(
    (props) => {
      return function () {
        setPopupOpen(true);
        setPopupSettings({
          visible: true,
          content: { ...props }
        });
      };
    },
    [setPopupOpen]
  );

  if (!characters.length) {
    return null;
  }

  return (
    <Container>
      {characters.map(function (props) {
        return (
          <Card
            key={props.id}
            onClickHandler={createClickHandler(props)}
            {...props}
          />
        );
      })}

      <Popup settings={popupSettings} setSettings={setPopupSettings} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-items: center;
  gap: 30px;
`;

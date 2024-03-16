import { useState } from 'react';
import { PanelHeader, Button } from '@vkontakte/vkui';
import FactPage from '../pages/FactPage';
import FormPage from '../pages/FormPage';

const App = () => {
  const [activePage, setActivePage] = useState('main');

  const handleNavigation = (page: string) => {
    setActivePage(page);
  };

  return (
    <>
      <PanelHeader className="panel-header">VK test app</PanelHeader>
      {activePage === 'fact' && <FactPage />}
      {activePage === 'form' && <FormPage />}
      <div className="button-container">
        <Button className="button" onClick={() => handleNavigation('fact')}>
          Facts Page
        </Button>
        <Button className="button" onClick={() => handleNavigation('form')}>
          Form Page
        </Button>
      </div>
    </>
  );
};

export default App;

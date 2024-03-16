import React, { useState, useRef, useEffect } from 'react';
import useCatFact from '../api/factApi'; // Предполагая, что у вас есть функция useCatFact
import '../styles/factPage.css';

const CatFactsComponent: React.FC = () => {
  const { data, isLoading, error, refetch } = useCatFact();
  const [factText, setFactText] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (data) {
      setFactText(data.fact);
      // Получение необходимого индекса (конец первого слова)
      const firstSpaceIndex = data.fact.indexOf(' ');

      if (firstSpaceIndex !== -1) {
        setCursorPosition(firstSpaceIndex + 1);
      }

      // Установка фокуса и перемещение каретки
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(cursorPosition, cursorPosition);
      }
    }
  }, [data, cursorPosition]);

  const handleClick = () => {
    refetch();
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFactText(event.target.value);
  };

  return (
    <div className="fact-container">
      <h1 className="fact-title">Cat Facts</h1>
      <button
        className="fact-button"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Get Cat Fact'}
      </button>
      {error && <div>Error: {error.message}</div>}
      <textarea
        ref={textareaRef}
        value={factText}
        onChange={handleChange}
        className="textarea"
      />
    </div>
  );
};

export default CatFactsComponent;

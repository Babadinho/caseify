import React from 'react';

const App = () => {
  const [selectedText, setSelectedText] = React.useState('');

  React.useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection()?.toString() ?? '';
      setSelectedText(selection);
    };

    document.addEventListener('selectionchange', handleSelection);

    return () => {
      document.removeEventListener('selectionchange', handleSelection);
    };
  }, []);

  const handleClick = (action: string) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab?.id) {
        chrome.runtime.sendMessage({ action, selectedText }, (response) => {
          if (!response) {
            console.log('No response from background script!');
            return;
          }
          console.log('Background script response:', response);
        });
      }
    });
  };

  return (
    <div>
      <p>Selected text: {selectedText}</p>
      <button onClick={() => handleClick('uppercase')}>Uppercase</button>
      <button onClick={() => handleClick('lowercase')}>Lowercase</button>
      <button onClick={() => handleClick('capitalize')}>Capitalize</button>
    </div>
  );
};

export default App;

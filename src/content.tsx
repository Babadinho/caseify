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
      <h1>Caseify</h1>
      {/* <p>
        Caseify allows you to convert selected text to uppercase, lowercase, or
        capitalize it using context menus.
      </p> */}
      <p>
        To use Caseify, simply select the text you want to modify, right-click,
        and choose the desired option from the context menu.
      </p>
      <p>
        For more information and support, please visit the{' '}
        <a
          href='https://github.com/Babadinho/caseify'
          target='_blank'
          rel='noopener noreferrer'
        >
          Caseify GitHub page
        </a>
        .
      </p>
      <hr />
    </div>
  );
};

export default App;

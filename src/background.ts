chrome.contextMenus.removeAll(() => {
  chrome.contextMenus.create({
    id: 'lowercase',
    title: 'lowercase',
    contexts: ['editable'],
    documentUrlPatterns: ['http://*/*', 'https://*/*'],
  });

  chrome.contextMenus.create({
    id: 'capitalize',
    title: 'Capitalize',
    contexts: ['editable'],
    documentUrlPatterns: ['http://*/*', 'https://*/*'],
  });

  chrome.contextMenus.create({
    id: 'uppercase',
    title: 'UPPERCASE',
    contexts: ['editable'],
    documentUrlPatterns: ['http://*/*', 'https://*/*'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (
    tab &&
    tab.url &&
    (tab.url.startsWith('http://') || tab.url.startsWith('https://')) &&
    info.selectionText
  ) {
    const action = info.menuItemId.toString();
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id || -1 },
        func: (selectedText: string, action: string) => {
          switch (action) {
            case 'lowercase':
              return selectedText.toLowerCase();
            case 'capitalize':
              return selectedText
                .toLowerCase()
                .split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            case 'uppercase':
              return selectedText.toUpperCase();
            default:
              return selectedText;
          }
        },
        args: [info.selectionText, action],
      },
      (result) => {
        const [response] = result;
        const { result: newText } = response;
        chrome.scripting.executeScript({
          target: { tabId: tab.id || -1 },
          func: (newText: string) => {
            const activeEl = document.activeElement as HTMLElement;
            if (activeEl && activeEl.isContentEditable) {
              const range = window.getSelection()?.getRangeAt(0);
              range?.deleteContents();
              range?.insertNode(document.createTextNode(newText));
            } else if (activeEl && 'setRangeText' in activeEl) {
              (<HTMLInputElement>activeEl)?.setRangeText(newText);
            }
          },
          args: [newText],
        });
      }
    );
  }
});

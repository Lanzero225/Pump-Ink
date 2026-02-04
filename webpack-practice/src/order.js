

export const orderDictionary = {
      'button-pin':0,
      'sticker':0,
      'magnet':0
    };

const savedOrder = localStorage.getItem('orderDictionary');
if (savedOrder) {
  Object.assign(orderDictionary, JSON.parse(savedOrder));
}

function saveOrder() {
  localStorage.setItem(
    'orderDictionary',
    JSON.stringify(orderDictionary)
  );
}
export function buildOrder(mainDiv) {


  const orderContainer = document.createElement('div');
  const orderCountDiv = document.createElement('div');

  const buttons = ['button-pin', 'sticker', 'magnet'];
  const countElements = {};

  buttons.forEach(button => {
    const newButton = document.createElement('button');
    newButton.id = button;
    newButton.textContent = button;
    orderContainer.append(newButton);

    const countText = document.createElement('p');
    countText.textContent = orderDictionary[button];
    orderCountDiv.append(countText);

    countElements[button] = countText;

    newButton.addEventListener('click', () => {
      orderDictionary[button] += 1;
      countElements[button].textContent = orderDictionary[button];
      saveOrder();
    });
    
  });

  const exportBtn = document.createElement('button');
  exportBtn.textContent = 'Export Order';
  exportBtn.onclick = exportOrder;
  const importInput = document.createElement('input');
  importInput.type = 'file';
  importInput.accept = '.json';
  importInput.onchange = importOrder;






function exportOrder() {
  const dataStr = JSON.stringify(orderDictionary, null, 2); // pretty print
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'order.json'; // file name
  a.click();

  URL.revokeObjectURL(url);
}

function importOrder(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    try {
      const importedData = JSON.parse(e.target.result);
      Object.assign(orderDictionary, importedData);
      console.log("Imported:", importedData);

      // Update the counts in the UI
      Object.keys(importedData).forEach(button => {
        if (countElements[button]) {
          countElements[button].textContent = orderDictionary[button];
        }
      });

      // Save to localStorage as well
      localStorage.setItem('orderDictionary', JSON.stringify(orderDictionary));
    } catch (err) {
      console.error('Error importing file:', err); // <-- log actual error
      alert('Invalid JSON file!');
    }
  };
  reader.readAsText(file);
}












  mainDiv.append(orderContainer, orderCountDiv, exportBtn, importInput);
}



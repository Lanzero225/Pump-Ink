

export const orderDictionary = {
      'button-pin':0,
      'sticker':0,
      'magnet':0
    };


export function buildOrder(mainDiv) {
    const savedOrder = localStorage.getItem('orderDictionary');
    if (savedOrder) {
        Object.assign(orderDictionary, JSON.parse(savedOrder));
    }

  const orderContainer = document.createElement('div');
  const orderCountDiv = document.createElement('div');

  const buttons = ['button-pin', 'sticker', 'magnet'];
  const countElements = {};

  buttons.forEach(button => {
    // Button
    const newButton = document.createElement('button');
    newButton.id = button;
    newButton.textContent = button;
    orderContainer.append(newButton);

    // Count text
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

  mainDiv.append(orderContainer, orderCountDiv);
}
export function saveOrder() {
  localStorage.setItem('orderDictionary', JSON.stringify(orderDictionary));
}
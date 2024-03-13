const menu = document.getElementById('menu')
const cartBtn = document.getElementById('cart-btn')
const cartModal = document.getElementById('cart-modal')
const dateSpan = document.getElementById('date-span')
const cartItems = document.getElementById('cart-items')
const cartTotal = document.getElementById('cart-total')
const checkoutBtn = document.getElementById('checkout-btn')
const closeModalBtn = document.getElementById('close-modal-btn')
const cartCount = document.getElementById('cart-count')
const address = document.getElementById('address')
const addressWarn = document.getElementById('address-warn')


let cart = []

cartBtn.addEventListener('click', () => {
  updateCart();
  cartModal.style.display = 'flex';
})

cartModal.addEventListener('click', (event) => {
  if(event.target === cartModal) {
    cartModal.style.display = 'none'
  }
})

closeModalBtn.addEventListener('click', (event) => {
  cartModal.style.display = 'none'
})

menu.addEventListener('click', (event) => {
  let parentButton = event.target.closest('.add-to-cart-btn')

  if(parentButton){
    const name = parentButton.getAttribute('data-name')
    const price = parseFloat(parentButton.getAttribute('data-price'))

    addToCart(name, price)
  }
})

const addToCart = (name, price) => {

  const existingItem = cart.find(item => item.name === name)

  if (existingItem) {
    existingItem.quantity += 1;
    return;
  } else {
    cart.push({
      name, 
      price,
      quantity: 1
    })
  }
  
  updateCart()
}

const updateCart = () => {
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const cartItemElement = document.createElement('div');
    cartItemElement.innerHTML = `
      <div>
        <div>
          <p>${item.name}</p>
          <p>${item.quantity}</p>
          <p>${item.price}</p>
        </div>
        <div>
          <button>
            Remover
          </button>
        </div>
      </div>
    `

    cartItems.appendChild(cartItemElement)
  })
}
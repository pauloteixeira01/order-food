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
      <div class="flex items-center justify-between">
        <div>
          <p class="font-medium">${item.name}</p>
          <p>Quantidade: ${item.quantity}</p>
          <p class="font-medium mt-2">${item.price.toFixed(2)}</p>
        </div>
        
        <button class="remove-item" data-name="${item.name}">
          Remover
        </button>
        
      </div>
    `

    total += item.price * item.quantity

    cartItems.appendChild(cartItemElement)
  })

  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  cartCount.innerText = cart.length
}

cartItems.addEventListener('click', (event) => {
  if(event.target.classList.contains('remove-item')) {
    const name = event.target.getAttribute('data-name')
    removeItemCart(name)
  }
})

const removeItemCart = (name) => {
  const index = cart.findIndex(item => item.name === name)

  if(index !== -1) {
    const item = cart[index]

    if(item.quantity > 1) {
      item.quantity -= 1
      updateCart();
      return;
    }

    cart.splice(index, 1)
    updateCart();
  }
}

address.addEventListener('input', (event) => {
  let inputValue = event.target.value;

  if(inputValue !== '') {
    address.classList.remove('border-red-500')
    addressWarn.classList.add('hidden')
  }

})


checkoutBtn.addEventListener('click', () => {
  const isOpen = statusRestaurant();
  if(!isOpen) {
    
    Toastify({
      text: "Ops! O restaurante está fechado.",
      duration: 3000,
      close: true,
      gravity: "top", 
      position: "center", 
      stopOnFocus: true, 
      style: {
        background: "#ef4444",
      },
    }).showToast();

    return;
  }

  if(cart.length === 0) return;

  if(address.value === '') {
    addressWarn.classList.remove("hidden")
    address.classList.add('border-red-500')
    return;
  }

  const cartItems = cart.map(item => {
    return (
      ` Ítem: ${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price} | `
    )
  }).join("")

  const message = encodeURIComponent(cartItems)
  const phone = '5585986629688'

  window.open(`https://wa.me/${phone}?text=${message} Endereço: ${address.value}`, "_blank")

  cart = [];
  updateCart()
})

const statusRestaurant = () => {
  const data = new Date();
  const hour = data.getHours()

  return hour >= 18 && hour < 22
}

const spanItem = document.getElementById('date-span')
const isOpen = statusRestaurant();

if (isOpen) {
  spanItem.classList.remove('bg-red-500');
  spanItem.classList.add('bg-green-600');
} else { 
  spanItem .classList.remove('bg-green-600');
  spanItem.classList.add('bg-red-500');
}
const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal  = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter =  document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");

// array inicial
let cart = [];


// abrir o modal do carrinho
cartBtn.addEventListener("click", function() {
    cartModal.style.display = "flex";
    updateCartModal()
});

// fechar o modal do carrinho quando clicar fora
cartModal.addEventListener("click", function(event) {
  if(event.target === cartModal){
    cartModal.style.display = "none";
  }
});

// fechar o modal do carrinho no btn fechar
closeModalBtn.addEventListener("click", function(){
    cartModal.style.display	= "none"
});
 
// adicionar produtos no carrinho
menu.addEventListener("click", function() {
    let parentBtn = event.target.closest(".add-to-cart-btn");

    if(parentBtn){
        const name = parentBtn.getAttribute("data-name");
        const price = parseFloat(parentBtn.getAttribute("data-price"));

        // add no carinho
        addToCart(name, price)
    }

})


// função para add no carrinho 
function addToCart(name, price){
    const existingItem = cart.find(item => item.name === name)
    if(existingItem){
        // se o item já existe, soma 1
        existingItem.quantify += 1
    } else{
        cart.push({
            name, 
            price,
            quantify: 1,
        }) 
    }
    updateCartModal()
}

// atualizar o carrinho
function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "jutify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
            <div  class="flex items-center justify-between">
                <div>
                    <p class="font-medium">${item.name}</p>
                    <p>Qtde: ${item.quantify}</p>
                    <p class="font-medium mt-2">R$ ${item.price}</p>
                </div>
                <div>
                    <button class="remove-btn" data-name="${item.name}">Remover</button>
                </div>
            </div>
        `

        total += item.price * item.quantify;

        cartItemsContainer.appendChild(cartItemElement);
    })

    // somar preço
    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    // soma produtos
    cartCounter.innerHTML = cart.length
}

// remover quantidade
cartItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-btn")){
        const name = event.target.getAttribute("data-name")


        removeItemCart(name)
    }
    
});

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart [index];
        
        if(item.quantify > 1){
            item.quantify -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();
    }
}

// address
addressInput.addEventListener('input', function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }

})

// finalizar pedido
checkoutBtn.addEventListener("click", function(){

    const isOpen = checkRestaurant()
    if(isOpen) {
        alert("Restaurante está fechado!");
        return;
    }

    if(cart.length === 0) return;
    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden");
        addressInput.classList.add("border-red-500")
        return;
    }

    cart.length = [];
    updateCartModal();

})




// verificar se o restaurante está aberto ou fechado
function checkRestaurant(){
    const horaAbertura = 18;
    const horaFechamento = 23;
    const spanItem = document.getElementById("date-span");

    if(horaAtual >= horaAbertura && horaAtual < horaFechamento){
        spanItem.classList.remove("bg-red-500")
        spanItem.classList.add("bg-green-500")
    } else{
        spanItem.classList.add("bg-red-500")
        spanItem.classList.remove("bg-green-500")
    }

    const data = new Date();

    
}

// obter hora atual
function horaAtual(){
    const agora = new Date();
    return agora.getHours();
}

checkRestaurant();


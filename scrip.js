const removeProduto = document.getElementsByClassName("remove")
for(var i = 0; i < removeProduto.length; i++) {
    removeProduto[i].addEventListener("click", function(event) {
        event.target.parentElement.parentElement.parentElement.remove()
    })
}


const cartProducts = document.getElementsByClassName("card=primary")
for(var i = 0; i <cartProducts.length; i++ ) {
    //console.log(cartProducts [i])
   const valor = valor[i].getElementsByClassName("card=primary-valor")[0].innerText
    console.log(valor)
}
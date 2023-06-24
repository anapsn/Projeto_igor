const removeProduto = document.getElementsByClassName("remove")
for(var i = 0; i < removeProduto.length; i++) {
    removeProduto[i].addEventListener("click", function(event) {
        event.target.parentElement.parentElement.parentElement.remove()
    })
}

    let totalGeral = 0
    const cartProducts = document.getElementsByClassName("card=primary")
    for(var i = 0; i <cartProducts.length; i++ ) {
        //console.log(cartProducts [i])
       const valor = cartProducts[i].getElementsByClassName("card=primary-valor")[0].innerText.replace("R$", "").replace(",", ".")
       const produto = cartProducts[i].getElementsByClassName("bx bx-minus")[0].value
       
       totalGeral = totalGeral + (valor + produto)
    }

    console.log(totalGeral)


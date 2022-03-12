$("#txtSelectItemCode").on('keyup',function (e) {
    console.log(e.key);
    var existItem=0;
    if (e.key=="Enter") {
        var itemCode = $("#txtSelectItemCode").val();

        for (var i in itemDB) {
            if (itemCode == itemDB[i].code) {
                $("#txtSelectItemDescription").val(itemDB[i].iName);
                $("#txtSelectItemPrice").val(itemDB[i].price);
                $("#txtSelectQTYOnHand").val(itemDB[i].quantity);
                $("#txtSelectItemDiscount").val(itemDB[i].getDiscount());
                alert("No Such as Item..!");
                existItem=1;
            }
        }
        if (existItem==0){
            $("#txtSelectItemDescription").val('');
            $("#txtSelectItemPrice").val('');
            $("#txtSelectQTYOnHand").val('');
            $("#txtSelectItemDiscount").val('');
            alert("No Such as Item..!");
        }
    }
});


$("#btnAddToTable").click(function () {

    var itemCode= $("#txtSelectItemCode").val();
    var itemName= $("#txtSelectItemDescription").val();
    var itemPrice= $("#txtSelectItemPrice").val();
    var qty=parseInt( $("#txtQty").val());

    //var itemFinallyPrice= itemPrice-((discount/100)*itemPrice);
    var totalItemPrice=itemPrice*qty;


    var itemExist=0;
    for(var i in cartItems){
        if (cartItems[i].getItemCode()==itemCode){

            var oldItemQty =cartItems[i].getItemQty();
            var newItemQty=oldItemQty+qty;

            cartItems[i].setItemQty(newItemQty);
            cartItems[i].setItemPrice(itemPrice);
            cartItems[i].setTotalItemPrice(totalItemPrice);
            itemExist=1;
            loadCart();
            break;
        }
    }
    if (itemExist==0){
        var orderCart = new OrderCart(itemCode,itemName,qty,itemPrice,totalItemPrice);
        cartItems.push(orderCart);
        loadCart();
    }
});


function loadCart(){
    var total=0;
    $("#orderTable").empty();
    cartItems.forEach(function (i) {
        let row = `<tr><td>${i.getItemCode()}</td><td>${i.getItemName()}</td><td>${i.getItemQty()}</td><td>${i.getItemPrice()}</td><td>${i.getTotalItemPrice()}</td></tr>`;
        total+=i.getTotalItemPrice();
        $("#orderTable").append(row);
    });

    $("#total").text('');
    $("#total").text(total);
    $("#subtotal").text('');
    $("#subtotal").text(total);

}


$("#txtCash,#txtDiscount").on('keyup',function (e) {
    console.log(e.key);
    keyPress();
});

function keyPress() {
    var total=$("#total").text();
    var subTotal=$("#subtotal").text();
    var cash= $("#txtCash").val();
    var discount=$("#txtDiscount").val();
    var itemFinallytotal= total-((discount/100)*total);
    $("#subtotal").text(itemFinallytotal);

    if (discount==''){
        $("#subtotal").text(total);
    }
    if (cash==''){
        $("#txtBalance").val('');
    }else{
        var balance=cash-subTotal;
        $("#txtBalance").val(balance);
    }
}


/*function genarateOrderId() {
    var array=new Array();

    for (var i in customerDB){
        if ((customerDB[i].getCustomerOrder().length)!=0){

            var orderArray=customerDB[i].getCustomerOrder();
            array.push( orderArray[orderArray.length-1].getOrderId());
        }
    }
    array.sort();
    alert(array[array.length-1]);
}*/


//customer search start
$("#btnOrderCusSearch").click(function () {
    let id = $("#orderCustomerID").val();

    var customerExist=0
    for (var i in customerDB){
        if (id==customerDB[i].id){
            $("#orderCustomerName").val(customerDB[i].name);
            $("#orderCustomerTp").val(customerDB[i].tp);
            $("#orderCustomerSalary").val(customerDB[i].salary);
            customerExist=1;
            break;
        }
    }
    if (customerExist==0){
        alert("No Such as Customer ..!");
    }
});
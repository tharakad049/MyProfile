$("#btnSaveAndUpdate").click(function () {
    saveItem();
    clearAllItems();
    loadAllItems();
    updateItem();
    generateItemCode();
});

function generateItemCode() {
    if (itemDB.length!=0) {
        let lastrecord = itemDB[itemDB.length - 1].code;
        let split = lastrecord.split("-");
        let splitElement = ++split[1];
        if (splitElement < 10 && splitElement > 0) {
            $("#txtCode").val("I00-" + "00" + splitElement);
        } else if (splitElement > 99) {
            $("#txtCode").val("I00-" + splitElement);
        } else {
            $("#txtCode").val("I00-001");
        }
    }else{
        $("#txtCode").val("I00-001");
    }
}


$("#itemDelete").click(function (){
    var itemCode= $("#txtSearchItemCode").val();
    for (var i in itemDB){
        if (itemCode==itemDB[i].code){
            itemDB.splice(i,1);
            loadAllItems();
            alert("Item Delete Complete");
            break;
        }
    }
});

function saveItem() {
    let itemCode = $("#txtCode").val();
    let itemName = $("#txtItemName").val();
    let itemQuantity = $("#txtQuantity").val();
    let itemPrice = $("#txtPrice").val();

    //create Object
    var itemObject = {
        code: itemCode,
        iName: itemName,
        quantity: itemQuantity,
        price: itemPrice
    };
    itemDB.push(itemObject);
}

function searchItem(id) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].code == id) {
            return itemDB[i];
        }
    }
}

$("#btnUpdated").click(function () {
    for (var i in itemDB){
        if ($("#txtCode").val()==itemDB[i].code){

            var name=$(" #txtItemName").val();
            var qty=$(" #txtQuantity").val();
            var price=$(" #txtPrice").val();

            itemDB[i].setName(name);
            itemDB[i].setQty(qty);
            itemDB[i].setPrice(price);

            loadAllItems();
            alert("Item Update complete");
            break;
        }
    }
});

function updateItem(){
    $("#itemTable>tr").on('dblclick',function (e) {
        $("#txtCode").val($(this).children(':eq(0)').text());
        $(" #txtCode").prop( "disabled", true );
        $(" #txtItemName").val($(this).children(':eq(1)').text());
        $(" #txtQuantity").val($(this).children(':eq(2)').text());
        $(" #txtPrice").val($(this).children(':eq(3)').text());
    });
    $("#btnSave").attr('disabled', true);
}

function loadAllItems() {
    $("#itemTable").empty();
    for (var i of itemDB) {
        let row = `<tr><td>${i.code}</td><td>${i.iName}</td><td>${i.quantity}</td><td>${i.price}</td></tr>`;
        $("#itemTable").append(row);
    }
}

function clearAllItems() {
    $('#txtCode,#txtItemName,#txtQuantity,#txtPrice').val("");
    $('#txtCode,#txtItemName,#txtQuantity,#txtPrice').css('border', '2px solid #ced4da');
    $('#txtCode').focus();
    $("#btnSaveAndUpdate").attr('disabled', true);
    loadAllItems();
    $("#lblItemCode,#lblItemName,#lblItemQuantity,#lblItemPrice").text("");
}

// search customer
$("#btnsearch").click(function () {
    var searchID = $("#txtSearchItemCode").val();
    var response = searchItem(searchID);
    if (response) {
        $("#txtCode").val(response.code);
        $("#txtItemName").val(response.iName);
        $("#txtQuantity").val(response.quantity);
        $("#txtPrice").val(response.price);
    } else {
        clearAll();
        alert("No Such a Item");
    }
});

const itemCodeRegEx = /^(I00)[0-9]{1,3}$/;
const itemNameRegEx = /^[A-z ]{3,20}$/;
const itemQuantityRegEx = /^[0-9/A-z. ,]{1,}$/;
const itemPriceRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


$('#txtCode,#txtItemName,#txtQuantity,#txtPrice').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});

$('#txtCode,#txtItemName,#txtQuantity,#txtPrice').on('blur', function () {
    formValid();
});

//focusing events
$("#txtCode").on('keyup', function (eventOb) {
    setButtons();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }

    if (eventOb.key == "Control") {
        var typedItemCode = $("#txtCode").val();
        var srcItem = searchItemFromCode(typedItemCode);
        $("#txtCode").val(srcItem.getItemCode());
        $("#txtItemName").val(srcItem.getItemName());
        $("#txtQuantity").val(srcItem.getItemQuantity());
        $("#txtPrice").val(srcItem.getItemPrice());
    }
});

$("#txtItemName").on('keyup', function (eventOb) {
    setButtons();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtQuantity").on('keyup', function (eventOb) {
    setButtons();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtPrice").on('keyup', function (eventOb) {
    setButtons();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});


$("#btnSaveAndUpdate").attr('disabled', true);

function Valid() {
    var itemCode = $("#txtCode").val();
    $("#txtCode").css('border', '2px solid green');
    $("#lblItemCode").text("");
    if (itemCodeRegEx.test(itemCode)) {
        var itemName = $("#txtItemName").val();
        if (itemNameRegEx.test(itemName)) {
            $("#txtItemName").css('border', '2px solid green');
            $("#lblItemName").text("");
            var itemQuantity = $("#txtQuantity").val();
            if (itemQuantityRegEx.test(itemQuantity)) {
                var itemPrice = $("#txtPrice").val();
                var resp = itemPriceRegEx.test(itemPrice);
                    $("#txtQuantity").css('border', '2px solid green');
                    $("#lblItemQuantity").text("");
                        if (resp) {
                            $("#txtPrice").css('border', '2px solid green');
                            $("#lblItemPrice").text("");
                                return true;
                } else {
                    $("#txtPrice").css('border', '2px solid red');
                    $("#lblItemPrice").text("Item Price is a required field : Pattern 100.00 or 100");
                    return false;
                }
            } else {
                $("#txtQuantity").css('border', '2px solid red');
                $("#lblItemQuantity").text("Item Quantity is a required field : Mimum 7");
                return false;
            }
        } else {
            $("#txtItemName").css('border', '2px solid red');
            $("#lblItemName").text("Item Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#txtCode").css('border', '2px solid red');
        $("#lblItemCode").text("Item Code is a required field : Pattern I00");
        return false;
    }
}

function checkIfValid() {
    var itemCode = $("#txtCode").val();
    if (itemCodeRegEx.test(itemCode)) {
        $("#txtItemName").focus();
        var itemName = $("#txtItemName").val();
        if (itemNameRegEx.test(itemName)) {
            $("#txtQuantity").focus();
            var itemQuantity = $("#txtQuantity").val();
            if (itemQuantityRegEx.test(itemQuantity)) {
                $("#txtPrice").focus();
                var itemPrice = $("#txtPrice").val();
                var resp = itemPriceRegEx.test(itemPrice);
                if (resp) {
                    let res = confirm("Do you really need to add this Item..?");
                    if (res) {
                        saveItem();
                        clearAll();
                    }
                } else {
                    $("#txtPrice").focus();
                }
            } else {
                $("#txtQuantity").focus();
            }
        } else {
            $("#txtItemName").focus();
        }
    } else {
        $("#txtCode").focus();
    }
}

function setButtons() {
    let c = Valid();
    if (c) {
        $("#btnSaveAndUpdate").attr('disabled', false);
    } else {
        $("#btnSaveAndUpdate").attr('disabled', true);
    }
}

$('#btnSaveAndUpdate').click(function () {
    checkIfValid();
});

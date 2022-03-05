$("#btnSaveAndUpdate").click(function () {
    saveItem();
    clearAll();
    loadAllItems();
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

function searchItem(code) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].code == code) {
            return itemDB[i];
        }
    }
}

function deleteItem() {
    //write the code
}

function updateItem() {
    //write the code
}

function loadAllItems() {
    $("#itemTable").empty();
    for (var i of itemDB) {
        let row = `<tr><td>${i.code}</td><td>${i.iName}</td><td>${i.quantity}</td><td>${i.price}</td></tr>`;
        $("#itemTable").append(row);
    }
}

function clearAll() {
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

const itemCodeRegEx = /^(I00-)[0-9]{1,3}$/;
const itemNameRegEx = /^[A-z ]{5,20}$/;
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
    setButton();
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
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtQuantity").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtPrice").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});


$("#btnSaveAndUpdate").attr('disabled', true);

function formValid() {
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
        $("#lblItemCode").text("Item Code is a required field : Pattern I00-000");
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

function setButton() {
    let b = formValid();
    if (b) {
        $("#btnSaveAndUpdate").attr('disabled', false);
    } else {
        $("#btnSaveAndUpdate").attr('disabled', true);
    }
}

$('#btnSaveAndUpdate').click(function () {
    checkIfValid();
});
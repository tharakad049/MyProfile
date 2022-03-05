
$("#btnSave").click(function () {
    saveCustomer();
    clearAll();
    loadAllCustomers();
});

function saveCustomer() {
    let customerID = $("#txtId").val();
    let customerName = $("#txtName").val();
    let customerTp = $("#txtTp").val();
    let customerSalary = $("#txtSalary").val();

    //create Object
    var customerObject = {
        id: customerID,
        name: customerName,
        tp: customerTp,
        salary: customerSalary
    };

    customerDB.push(customerObject);
}

function searchCustomer(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].id == id) {
            return customerDB[i];
        }
    }
}

function deleteCustomer() {
    //write the code
}

function updateCustomer() {
    //write the code
}

function loadAllCustomers() {
    $("#customerTable").empty();
    for (var i of customerDB) {
        /*create a html row*/
        let row = `<tr><td>${i.id}</td><td>${i.name}</td><td>${i.tp}</td><td>${i.salary}</td></tr>`;
        /*select the table body and append the row */
        $("#customerTable").append(row);
    }
}

function clearAll() {
    $('#txtId,#txtName,#txtTp,#txtSalary').val("");
    $('#txtId,#txtName,#txtTp,#txtSalary').css('border', '2px solid #ced4da');
    $('#txtId').focus();
    $("#btnSave").attr('disabled', true);
    loadAllCustomers();
    $("#lblcusid,#lblcusname,#lblcusaddress,#lblcussalary").text("");
}

// search customer
$("#btnSearch").click(function () {
    var searchID = $("#txtSearchCusID").val();

    var response = searchCustomer(searchID);
    if (response) {
        $("#txtId").val(response.id);
        $("#txtName").val(response.name);
        $("#txtTp").val(response.tp);
        $("#txtSalary").val(response.salary);
    } else {
        clearAll();
        alert("No Such a Customer");
    }
});

const cusIDRegEx = /^(C00-)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusTpRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


$('#txtId,#txtName,#txtTp,#txtSalary').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});

$('#txtId,#txtName,#txtTp,#txtSalary').on('blur', function () {
    formValid();
});

//focusing events
$("#txtId").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }

    if (eventOb.key == "Control") {
        var typedCustomerID = $("#txtId").val();
        var srcCustomer = searchCustomerFromID(typedCustomerID);
        $("#txtId").val(srcCustomer.getCustomerID());
        $("#txtName").val(srcCustomer.getCustomerName());
        $("#txtTp").val(srcCustomer.getCustomerTp());
        $("#txtSalary").val(srcCustomer.getCustomerSalary());
    }
});

$("#txtName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtTp").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtSalary").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});


$("#btnSave").attr('disabled', true);

function formValid() {
    var cusID = $("#txtId").val();
    $("#txtId").css('border', '2px solid green');
    $("#lblcusid").text("");
    if (cusIDRegEx.test(cusID)) {
        var cusName = $("#txtName").val();
        if (cusNameRegEx.test(cusName)) {
            $("#txtName").css('border', '2px solid green');
            $("#lblcusname").text("");
            var cusTp = $("#txtTp").val();
            if (cusTpRegEx.test(cusTp)) {
                var cusSalary = $("#txtSalary").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                $("#txtTp").css('border', '2px solid green');
                $("#lblcustp").text("");
                if (resp) {
                    $("#txtSalary").css('border', '2px solid green');
                    $("#lblcussalary").text("");
                    return true;
                } else {
                    $("#txtSalary").css('border', '2px solid red');
                    $("#lblcussalary").text("Cus Salary is a required field : Pattern 100.00 or 100");
                    return false;
                }
            } else {
                $("#txtTp").css('border', '2px solid red');
                $("#lblcustp").text("Cus Tp is a required field : Mimum 7");
                return false;
            }
        } else {
            $("#txtName").css('border', '2px solid red');
            $("#lblcusname").text("Cus Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#txtId").css('border', '2px solid red');
        $("#lblcusid").text("Cus ID is a required field : Pattern C00-000");
        return false;
    }
}

function checkIfValid() {
    var cusID = $("#txtId").val();
    if (cusIDRegEx.test(cusID)) {
        $("#txtName").focus();
        var cusName = $("#txtName").val();
        if (cusNameRegEx.test(cusName)) {
            $("#txtTp").focus();
            var cusTp = $("#txtTp").val();
            if (cusTpRegEx.test(cusTp)) {
                $("#txtSalary").focus();
                var cusSalary = $("#txtSalary").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                if (resp) {
                    let res = confirm("Do you really need to add this Customer..?");
                    if (res) {
                        saveCustomer();
                        clearAll();
                    }
                } else {
                    $("#txtSalary").focus();
                }
            } else {
                $("#txtTp").focus();
            }
        } else {
            $("#txtName").focus();
        }
    } else {
        $("#txtId").focus();
    }
}

function setButton() {
    let b = formValid();
    if (b) {
        $("#btnSave").attr('disabled', false);
    } else {
        $("#btnSave").attr('disabled', true);
    }
}

$('#btnSave').click(function () {
    checkIfValid();
});

$(document).ready(function () {

    loadData();
    //Validacion para los input solo numeros 
    $(".numerico").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
            // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

})


//Load Data function  
function loadData() {
    $.ajax({
        url: "../DashBoard/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
          
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + parseInt(key+1) + '</td>';
                html += '<td>' + item.Name + '</td>';
                html += '<td>' + item.Position + '</td>';
                html += '<td>' + item.Office + '</td>';
                html += '<td>' + item.Salary + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.EmployeeId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.EmployeeId + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            console.log(errormessage.responseText);
        }
    });
}

//Add Data Function   
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        EmployeeID: $('#EmployeeID').val(),
        Name: $('#name').val(),
        Position: $('#position').val(),
        Office: $('#office').val(),
        Salary: parseInt( $('#salary').val())
    };
    $.ajax({
        url: "../DashBoard/Add",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
           // console.info(result)
            $('#myModal').modal('hide');
            swal("Registrado correctamente!", "", "success");
        },
        error: function (errormessage) {
            console.log(errormessage.responseText);
        }
    });
}

//Function for getting the Data Based upon Employee ID  
function getbyID(EmpID) {
    $('#name').css('border-color', 'lightgrey');
    $('#position').css('border-color', 'lightgrey');
    $('#office').css('border-color', 'lightgrey');
    $('#salary').css('border-color', 'lightgrey');

    
    $.ajax({
        url: "../DashBoard/getbyID/" + EmpID,

        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            //console.info(result)
            $('#EmployeeID').val(result.EmployeeId);
            $('#name').val(result.Name);
            $('#position').val(result.Position);
            $('#office').val(result.Office);
            $('#salary').val(result.Salary);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//function for updating employee's record  
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        EmployeeID: $('#EmployeeID').val(),
        Name: $('#name').val(),
        Position: $('#position').val(),
        Office: $('#office').val(),
        Salary: parseInt($('#salary').val())
    };
    $.ajax({
        url: "../DashBoard/Update",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#EmployeeID').val("");
            $('#name').val("");
            $('#position').val("");
            $('#office').val("");
            $('#salary').val("");
            swal("Actualizado correctamente!", "", "success");
        },
        error: function (errormessage) {
            console.log(errormessage.responseText);
        }
    });
}

//function for deleting employee's record  
function Delele(ID) {
    swal({
        title: "Quieres borrar este registro?",
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url: "../DashBoard/Delete/" + ID,
                    type: "POST",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {
                        loadData();
                        swal("Poof! El registro ha sido eliminado!", {
                            icon: "success",
                        });
                    },
                    error: function (errormessage) {
                        alert(errormessage.responseText);
                    }
                });
            } 
        });

}

//Function for clearing the textboxes  
function clearTextBox() {
    $('#EmployeeID').val("");
    $('#name').val("");
    $('#position').val("");
    $('#office').val("");
    $('#salary').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#name').css('border-color', 'lightgrey');
    $('#position').css('border-color', 'lightgrey');
    $('#office').css('border-color', 'lightgrey');
    $('#salary').css('border-color', 'lightgrey');
}
//Valdidation using jquery  
function validate() {
    var isValid = true;
    if ($('#name').val().trim() == "") {
        $('#name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#name').css('border-color', 'lightgrey');
    }
    if ($('#position').val().trim() == "") {
        $('#position').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#position').css('border-color', 'lightgrey');
    }
    if ($('#office').val().trim() == "") {
        $('#office').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#office').css('border-color', 'lightgrey');
    }
    if ($('#salary').val().trim() == "") {
        $('#salary').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#salary').css('border-color', 'lightgrey');
    }
    return isValid;
}  
//scripts.j

var party;
var hobbies;
var citizens = [];

//For First Page Cookie Counter


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


//called this function when onload index page
function getVisits() {
    var visitString = getCookie("twVisited");  ///to store string of "twVisited", getCookie function
    var visitCount;
    if (visitString == "") {
        visitCount = 1;
    }
    else {
        visitCount = parseInt(visitString) + 1;
    }
    setCookie("twVisited", visitCount, 100)  //using setCookie function to enter parameter
    $("#SpanShowCookieCounter").html("This page has been visited " + visitCount + " times");
}


//For Second Page: Registration Form: Select Dropdown List for Number of Households
$(function () {
    var s = $("#DDHouseholds");
    for (var i = 0; i < 19; i++) {
        s.append($('<option></option>').val(i+1).html(i+1))
    }
});

function ResetErrors() {
    $(".error").hide();
}

function ClearForm() {
    ResetErrors();

}


//may not need this function
function ClearCheckBox() {
    party = [];
    $("input[name='Party']:checked").each(function () {
        $(this).prop('checked', false);
    });
}


//may not need this function
function ClearRadioBox() {
    gender = [];
    $("input[name='Gender']:checked").each(function () {
        $(this).prop('checked', false);
    });
}



//Validation for Form
function Validate() {
    ResetErrors();
    var valid = true;

    var fname = $("#TBFName").val();
    if (fname.trim().length === 0) {
        $("#SpanFirstError").show();
        valid = false;
    }

    var lname = $("#TBLName").val();
    if (lname.trim().length === 0) {
        $("#SpanLastError").show();
        valid = false;
    }

    var address = $("#TBAddress").val();
    if (address.trim().length === 0) {
        $("#SpanAddressError").show();
        valid = false;
    }

    var city = $("#TBCity").val();
    if (city.trim().length === 0) {
        $("#SpanCityError").show();
        valid = false;
    }

    var state = $("#DDState").val();
    if (state == "") {
        $("#SpanStateError").show()
        valid = false;
    }

    var zipcode = $("#TBZipcode").val();
    if (zipcode.trim().length === 0) {
        $("#SpanZipError").show()
        valid = false;
    }

    var phone = $("#TBPhone").val();
    if (phone.trim().length === 0) {
        $("#SpanPhoneError").show();
        valid = false;
    }

    var gender = $('input[name=Gender]:checked').val();
    if (gender === undefined) {
        $("#SpanGenderError").show();
        valid = false;
    }

    //var partycheck = GetPartyCheckBox();
    //if (partycheck != valid) {
    //    $("#SpanPartyError").show();
    //    valid = false;
    //}

    var partycheck = $('input[name=Party]:checked').val();
    if (partycheck === undefined) {
        $("#SpanPartyError").show();
        valid = false;
    }


    var salary = $("#TBSalary").val();
    if (salary.trim().length === 0) {
        $("#SpanSalaryError").show();
        valid = false;
    }

    var bdstate = $("#DDStateBorn").val();
    if (bdstate.trim().length === 0) {
        $("#SpanStateBornError").show();
        valid = false;
    }

    var household = $("#DDHouseholds").val();
    if (household.trim().length === 0) {
        $("#SpanHouseholdsError").show();
        valid = false;
    }

    //if (valid) {
    //var partycheck = GetPartyCheckBox();
    //var pol = GetPartyCheckBox();
    //var hob = GetHobbies();
    // code here for URL variables to results page
    //AddCitizen(fname, lname, address, city, state, zipcode, phone, gender, pol, hob, salary, bornstate, households)
    //$("#DivSubmitMessage").show().fadeOut(2000, function () {
    //ClearForm();
    //});
    //}
    if (!valid) {
        $("#DivMessage").show();
    }
    else {
        $("#DivSubmitMessage").show().fadeOut(2000);
    }
    return valid;
}


function GetVars() {
    var VarResult = [];
    var SearchString = window.location.search.substring(1);
    var VariableArray = SearchString.split('&');
    for (var i = 0; i < VariableArray.length; i++)
        VarResult.push(VariableArray[i].split('='));
    return VarResult;
}

function GetResults() {
    var VarResult = GetVars(); //call GetVars to get variables
    var gender;
    var party;
    var hobbies = [];
    var firstname, lastname, staddress, city, state, zipcode, phone, salary, bornstate, household;
    for (var i = 0; i < VarResult.length; i++) {
        if (VarResult[i][0] == 'fname')
            firstname = FixSpecialChars(VarResult[i][1]);
        if (VarResult[i][0] == 'lname')
            lastname = FixSpecialChars(VarResult[i][1]);
        if (VarResult[i][0] == 'address')
            staddress = FixSpecialChars(VarResult[i][1]);
        if (VarResult[i][0] == 'city')
            city = FixSpecialChars(VarResult[i][1]);
        if (VarResult[i][0] == 'state')
            state = FixSpecialChars(VarResult[i][1]);
        if (VarResult[i][0] == 'zip')
            zipcode = FixSpecialChars(VarResult[i][1]);
        if (VarResult[i][0] == 'phone')
            phone = FixSpecialChars(VarResult[i][1]);
        if (VarResult[i][0] == 'Gender')
            gender = FixSpecialChars(VarResult[i][1]);
        if (VarResult[i][0] == 'Party')
            party = FixSpecialChars(VarResult[i][1]);
        if (VarResult[i][0] == 'CGHobbies')
            hobbies.push(" " + FixSpecialChars(VarResult[i][1]));
        if (VarResult[i][0] == 'salary')
            salary = FixSpecialChars(VarResult[i][1]);
        if (VarResult[i][0] == 'bornstate')
            bornstate = FixSpecialChars(VarResult[i][1]);
        if (VarResult[i][0] == 'households')
            household = FixSpecialChars(VarResult[i][1]);
    }
    AddCitizen(firstname, lastname, staddress, city, state, zipcode, phone, gender, party, hobbies.join(), salary, bornstate, household);
    $("#SpanFirstName").html(firstname);
    $("#SpanLastName").html(lastname);
    $("#SpanAddress").html(staddress);
    $("#SpanCity").html(city);
    $("#SpanState").html(state);
    $("#SpanZipcode").html(zipcode);
    $("#SpanPhone").html(phone);
    $("#SpanGender").html(gender);
    $("#SpanParty").html(party);
    $("#SpanHobbies").html(hobbies);
    $("#SpanSalary").html(salary);
    $("#SpanBornState").html(bornstate);
    $("#SpanHousehold").html(household);

}

function GetPartyCheckBox() {
    party = [];
    $("input[name='Party']:checked").each(function () {
        party.push(" " + this.value);
    });
    if (party.length == 0) {
        $("#SpanPartyError").show();
        valid = false;
    }
    return party;
}

function GetHobbies() {
    hobbies = [];
    $("input[name='CGHobbies']:checked").each(function () {
        hobbies.push(" " + this.value);
    });
    if (hobbies.length == 0)
        hobbies.push("No Hobby was selected.");
    return hobbies;
}


function FixSpecialChars(data) {
    data = data.replace(/\+/g, " "); //To fix for + which is a space in the URL
    data = data.replace(/%2B/g, "+"); //To fix for a plus as data
    data = data.replace(/%40/g, "@"); //To fix for an @ as data
    data = data.replace(/%3D/g, "="); //To fix for an equals in data
    data = data.replace(/%3F/g, "?"); //To fix for a question mark in data.
    data = data.replace(/%21/g, "!"); //To fix for an exclamation point in data.
    data = data.replace(/%2F/g, "/"); //To fix for a forward slash.
    data = data.replace(/%5C/g, "\\"); //To fix for a backward slash.
    data = data.replace(/%28/g, "("); //To fix for a Open Parenthesis.
    data = data.replace(/%29/g, ")"); //To fix for a Close Parenthesis.
    data = data.replace(/%26/g, "&"); //To fix for an Ampersand.
    data = data.replace(/%23/g, "#"); //To fix for an pount sign.
    data = data.replace(/%24/g, "$"); //To fix for an dollar sign.
    data = data.replace(/%25/g, "%"); //To fix for an percent sign.
    data = data.replace(/%5E/g, "^"); //To fix for an caret.
    data = data.replace(/%3C/g, "<"); //To fix for a less than.
    data = data.replace(/%3E/g, ">"); //To fix for a greater than.
    data = data.replace(/%3A/g, ":"); //To fix for a colon.
    data = data.replace(/%3B/g, ";"); //To fix for a semi-colon.
    data = data.replace(/%27/g, "'"); //To fix for a single quote.
    data = data.replace(/%22/g, "\""); //To fix for a double quote.
    data = data.replace(/%2C/g, ","); //To fix for a comma.
    data = data.replace(/%7E/g, "~"); //To fix for a tilda.
    data = data.replace(/%60/g, "`"); //To fix for a backward apostrophe.
    data = data.replace(/%5B /g, "["); //To fix for a opening square bracket.
    data = data.replace(/%5D/g, "]"); //To fix for a closing square bracket.
    data = data.replace(/%7B/g, "{"); //To fix for a opening curly brace.
    data = data.replace(/%7D/g, "}"); //To fix for a closing curly brace.
    data = data.replace(/%7C/g, "|"); //To fix for a pipe.
    return (data);
}

//For Fourth Page Display All
function AddCitizen(fname, lname, address, city, state, zipcode, phone, gender, political, hobbies, salary, bornstate, households) {
    var newCitizen = { "first": fname, "last": lname, "address": address, "city": city, "state": state, "zipcode": zipcode, "phone": phone, "gender": gender, "political": political, "hobbies": hobbies, "salary": salary, "bornstate": bornstate, "household": households }
    if (localStorage.getItem("citizens") === null) {
        localStorage.setItem("citizens", JSON.stringify(newCitizen));
    } else {
        var citizenArray = JSON.parse(localStorage.getItem("citizens"));
        if (!Array.isArray(citizenArray)) {
            var newArray = [];
            newArray.push(citizenArray);
            citizenArray = newArray;
        }
        citizenArray.push(newCitizen);
        localStorage.setItem("citizens", JSON.stringify(citizenArray));
    }
}

$("#BtnClear").click(function () {
    localStorage.clear();
    window.location = "leads.html";
});

function GetCitizens() {
    var tableHTML = "<table><tr><th>First Name</th><th>Last Name</th><th>Address</th><th>City</th><th>State</th><th>Zip Code</th><th>Phone</th><th>Gender</th><th>Political Party</th><th>Hobbies</th><th>Salary</th><th>Birth State</th><th>Household</th></tr>"; //heading
    if (localStorage.getItem("citizens") === null) {
        tableHTML += "<tr><td colspan='13' class='center'>No information has been entered yet</td></tr>";
    } else {
        var citizenList = JSON.parse(localStorage.getItem("citizens"));
        if (Array.isArray(citizenList)) {
            for (var i = 0; i < citizenList.length; i++) {
                tableHTML += BuildTableRow(citizenList[i].first, citizenList[i].last, citizenList[i].address, citizenList[i].city, citizenList[i].state, citizenList[i].zipcode, citizenList[i].phone, citizenList[i].gender, citizenList[i].political, citizenList[i].hobbies, citizenList[i].salary, citizenList[i].bornstate, citizenList[i].household);
            }
        } else {
            tableHTML += BuildTableRow(citizenList.first, citizenList.last, citizenList.address, citizenList.city, citizenList.state, citizenList.zipcode, citizenList.phone, citizenList.gender, citizenList.political, citizenList.hobbies, citizenList.salary, citizenList.bornstate, citizenList.household);
        }
    }

    tableHTML += "</table>";
    $("#DivAllRecords").html(tableHTML);
}

function BuildTableRow(fname, lname, address, city, state, zipcode, phone, gender, political, hobbies, salary, bornstate, households) {
    var tableRow = "";
    tableRow += "<tr>";
    tableRow += "<td> ";
    tableRow += fname;
    tableRow += "</td>";
    tableRow += "<td> ";
    tableRow += lname;
    tableRow += "</td>";
    tableRow += "<td> ";
    tableRow += address;
    tableRow += "</td>";
    tableRow += "<td> ";
    tableRow += city;
    tableRow += "</td>";
    tableRow += "<td>";
    tableRow += state;
    tableRow += "</td>";
    tableRow += "<td> ";
    tableRow += zipcode;
    tableRow += "</td>";
    tableRow += "<td>";
    tableRow += phone;
    tableRow += "</td>";
    tableRow += "<td> ";
    tableRow += gender;
    tableRow += "</td>";
    tableRow += "<td> ";
    tableRow += political;
    tableRow += "</td>";
    tableRow += "<td> ";
    tableRow += hobbies;
    tableRow += "</td>";
    tableRow += "<td> ";
    tableRow += salary;
    tableRow += "</td>";
    tableRow += "<td> ";
    tableRow += bornstate;
    tableRow += "</td>";
    tableRow += "<td> ";
    tableRow += households;
    tableRow += "</td>";
    tableRow += "</tr>";
    return tableRow;

}




//For Fifth Page- Widget- TO DO List

$("#BtnCount").click(function () {
    countText();
})

function countText() {
    var text = $("#TXTArea").val();
    if (text.length == 0) {
        $("#SpanCharResult").html(0);
        $("#SpanWordResult").html(0);
        $("#SpanSentenceResult").html(0);
        return;
    }
    var reg = /\s+/gi;
    var sentences = text.split(/[.|!|?]\s/gi);

    var charCount = text.replace(reg, '').length;
    var wordCount = text.trim().replace(reg, ' ').split(' ').length;
    var sentenceCount = sentences.length;

    $("#SpanCharResult").html(charCount);
    $("#SpanWordResult").html(wordCount);
    $("#SpanSentenceResult").html(sentenceCount);
}

//for Change font size
//$(function () {
//    $("#DDSize").change(function () {
//        //var text = $("#TXTArea").val();
//        $("#TXTArea").css("font-size", $(this).val() + "px");
//    })
//});


function changeSize() {
    var size = document.getElementById("DDSize").value;
    document.getElementById("TXTArea").style.fontSize = size;
}

function changeColor() {
    var color = document.getElementById("DDColor").value;
    document.getElementById("TXTArea").style.color = color;
}

//Toggle Bold and UnBold
function Bold() {
    var text = document.getElementById('TXTArea');

    if (text.style.fontWeight == 'bold') {
        text.style.fontWeight = 'normal';
    } else {
        text.style.fontWeight = 'bold';
    }

}

//Toggle Italic and Un-Italic
function Italic() {
    var text = document.getElementById('TXTArea');

    if (text.style.fontStyle == 'italic') {
        text.style.fontStyle = 'normal';
    } else {
        text.style.fontStyle = 'italic';
    }
}

//For Sixth Page - AboutMe Pictures from Mexico

var index = 0
var items = $('.container div')
var itemAmt = items.length;

function Cycle() {
    var item = $('.container div').eq(index);
    items.hide();
    item.css('display', 'inline-block');
}

var autoSliding = setInterval(function () {
    index += 1;
    if (index > itemAmt - 1) {
        index = 0;
    }
    Cycle();
}, 6000);


$('.next').click(function () {
    clearInterval(autoSliding);
    index += 1;
    if (index > itemAmt - 1) {
        index = 0;
    }
    Cycle();
});

$('.prev').click(function () {
    clearInterval(autoSliding);
    index -= 1;
    if (index < 0) {
        index = itemAmt - 1;
    }
    Cycle();
});

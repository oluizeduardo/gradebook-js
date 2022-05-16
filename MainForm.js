var btnRegister = document.querySelector("#register");
var gradebook = JSON.parse(localStorage.getItem("gradebook")) || [];
var tableRows = document.getElementsByClassName("table-row");
var saveButton = document.querySelector("#save");
var cleanButton = document.querySelector("#cleanRecords");

gradebook.forEach((student) => {
    addNewLine(student);
    formatSavedRows();
});

adjustButtonAvaliability();

btnRegister.addEventListener("click", function(){

    var fieldName = document.querySelector("#info-name");
    var fieldHTML = document.querySelector("#grade-html");
    var fieldCSS  = document.querySelector("#grade-css");
    var fieldJS   = document.querySelector("#grade-js");

    var name      = fieldName.value;
    var gradeHTML = parseFloat(fieldHTML.value);
    var gradeCSS  = parseFloat(fieldCSS .value);
    var gradeJS   = parseFloat(fieldJS  .value);

    var errorMessage = document.querySelector("#message-error");
    var negativeGradeMessage = document.querySelector("#message-negative-grade");

    if(name && gradeHTML && gradeCSS && gradeJS){
        
        errorMessage.classList.add("invisible");

        if(gradeHTML >= 0 && gradeCSS >= 0 && gradeJS >= 0){ 
            negativeGradeMessage.classList.add("invisible");

            var total   = sumGrades(gradeHTML, gradeCSS, gradeJS);
            var average = doAvearge(total).toFixed(2);
            var result  = buildStringResult(average);

            const newStudent = buildNewStudent(name, total, average, result);
            addNewLine(newStudent);

            cleanFields(fieldName, fieldHTML, fieldCSS, fieldJS);
        }else{            
            negativeGradeMessage.classList.remove("invisible");
        }
    }else{
        negativeGradeMessage.classList.add("invisible");
        errorMessage.classList.remove("invisible");
    }
    adjustButtonAvaliability();
});

function createTR(name, total, average){
    var newTR = document.createElement("tr");
    newTR.appendChild(createTD(name, "info-name"));
    newTR.appendChild(createTD(total, "info-total"));
    newTR.appendChild(createTD(average, "info-average"));
    newTR.appendChild(createTDResult(average));

    newTR.classList.add("table-row");

    return newTR;
}

function createTD(info, cssClass){
    var td = document.createElement("td");
    td.textContent = info;
    td.classList.add(cssClass);
    return td;
}

function createTDResult(average){    
    var result = buildStringResult(average);    
    var cssClass = (result === "Aprovado") ? "approved" : "fail";
    var tdResult = createTD(result, "info-result");
    tdResult.classList.add(cssClass);
    
    return tdResult;
}

function sumGrades(gradeHTML, gradeCSS, gradeJS){
    return (gradeHTML + gradeCSS + gradeJS);
}

function doAvearge(sumAllGrades){
    return (sumAllGrades / 3);
}

function buildStringResult(average){
    return (average >= 70) ? "Aprovado" : "Reprovado";
}

function addNewLine(student){
    var tabelGrades = document.querySelector("#table-grades");
    tabelGrades.appendChild(createTR(student.name, student.total, student.average));
}

function buildNewStudent(name, total, average, result){
    const newStudent = {
        "name": name,
        "total": total,
        "average": average,
        "result": result
    }
    return newStudent;
}

function cleanFields(name, gradeHTML, gradeCSS, gradeJS){
    name     .value = "";
    gradeHTML.value = "";
    gradeCSS .value = "";
    gradeJS  .value = "";
}

function adjustButtonAvaliability(){
    if(tableRows.length > 0){
        saveButton.disabled = false;  
        cleanButton.disabled = false;    
    }else{
        saveButton.disabled = true;
        cleanButton.disabled = true;  
    }    
}

function formatSavedRows(){
    for(i=0; i < tableRows.length; i++){
        tableRows[i].classList.add("saved-row");
    }
}
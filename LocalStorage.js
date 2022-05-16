var saveButton = document.querySelector("#save");
var tableGrades = document.getElementsByClassName("table-row");

function checkFilledtable(){
    if(tableGrades.length > 0) 
        saveButton.removeAttribute("disabled");
}

saveButton.addEventListener("click", function(){

    gradebook = [];

    if(tableGrades.length > 0){
        for (i = 0; i < tableGrades.length; i++) {
            var name    = tableGrades[i].querySelector(".info-name").textContent;
            var total   = tableGrades[i].querySelector(".info-total").textContent;
            var average = tableGrades[i].querySelector(".info-average").textContent;
            var result  = tableGrades[i].querySelector(".info-result").textContent;
    
            const student = buildNewStudent(name, total, average, result);
    
            gradebook.push(student);
            localStorage.setItem("gradebook", JSON.stringify(gradebook));
        }
        formatSavedRows();
        alert("Dados salvos com sucesso!");
    }
});
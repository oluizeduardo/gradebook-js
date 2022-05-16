var cleanButton = document.querySelector("#cleanRecords");

cleanButton.addEventListener("click", function(){
    
    if (confirm("Deseja mesmo excluir todos os registros?")) {
        localStorage.clear();

        let table = document.getElementById('table-grades');

        while(tableGrades.length > 0){
            table.deleteRow( 1 );
        }
        adjustButtonAvaliability();
        alert("Registros excluídos com sucesso!");
    }    
});
async function getStudents() {
    let result = await fetch('http://localhost/rest-api-authentication/api/index.php');
    let students = await result.json();

    students.forEach((student) => {
        document.querySelector('.list_students').innerHTML += `
        <div class="row">
            <div class="col-sm text_center">
                ${students[0]}
            </div>
            <div class="col-sm text_center">
                ${student[1]}
            </div>
            <div class="col-sm text_center">
                ${student[2]}
            </div>
        </div>
        `
    })
}


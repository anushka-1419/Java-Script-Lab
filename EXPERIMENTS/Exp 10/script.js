// Function to display student data in the table

function displayStudents(students) {

    let tableBody = document.getElementById("studentTable");

    // Clear previous data
    tableBody.innerHTML = "";

    // Loop through student records
    students.forEach(function(student) {

        // Create a new table row
        let row = document.createElement("tr");

        // Add student data into table cells
        row.innerHTML = `
            <td>${student.rollNo}</td>
            <td>${student.name}</td>
            <td>${student.course}</td>
            <td>${student.year}</td>
            <td>${student.email}</td>
            <td>${student.marks}</td>
        `;

        // Append row to table body
        tableBody.appendChild(row);
    });
}


// ============================================
// USING FETCH()
// ============================================

document.getElementById("fetchBtn").addEventListener("click", function() {

    document.getElementById("message").innerText =
        "Loading data using fetch()...";

    fetch("students.json")

        .then(function(response) {

            return response.json();

        })

        .then(function(data) {

            displayStudents(data);

            document.getElementById("message").innerText =
                "Student data loaded using fetch()";

        })

        .catch(function(error) {

            console.log(error);

            document.getElementById("message").innerText =
                "Error loading student data.";

        });
});


// ============================================
// USING jQuery $.getJSON()
// ============================================

$("#jqueryBtn").click(function() {

    $("#message").text(
        "Loading data using $.getJSON()..."
    );

    $.getJSON("students.json")

        .done(function(data) {

            displayStudents(data);

            $("#message").text(
                "Student data loaded using $.getJSON()"
            );

        })

        .fail(function() {

            $("#message").text(
                "Error loading student data."
            );

        });
});

let students = [];

// ================================
// FETCH API
// ================================

$("#fetchBtn").click(function () {

    fetch("students.json")
        .then(response => {

            if (!response.ok) {
                throw new Error("JSON file could not be loaded");
            }

            return response.json();
        })

        .then(data => {

            students = data;

            displayStudents(students);

            $("#message").html(
                "✅ Student data loaded successfully using <b>JavaScript Fetch API</b>."
            );

        })

        .catch(error => {

            $("#message").html(
                "❌ Error: Unable to load students.json"
            );

            console.error(error);
        });

});


// ================================
// jQUERY getJSON()
// ================================

$("#jqueryBtn").click(function () {

    $.getJSON("students.json")

        .done(function (data) {

            students = data;

            displayStudents(students);

            $("#message").html(
                "⚡ Student data loaded successfully using <b>jQuery $.getJSON()</b>."
            );

        })

        .fail(function () {

            $("#message").html(
                "❌ Error: Unable to load students.json"
            );

        });

});


// ================================
// DISPLAY STUDENTS
// ================================

function displayStudents(data) {

    const table = $("#studentTable");

    table.empty();

    if (data.length === 0) {

        table.html(`
            <tr>
                <td colspan="6" class="empty">
                    😕 No student matches the search/filter criteria.
                </td>
            </tr>
        `);

    } else {

        data.forEach(student => {

            let statusClass =
                student.registrationStatus.toLowerCase();

            table.append(`

                <tr>

                    <td>
                        <b>${student.studentName}</b>
                    </td>

                    <td>${student.PRN}</td>

                    <td>${student.department}</td>

                    <td>${student.year}</td>

                    <td>${student.eventName}</td>

                    <td>
                        <span class="status ${statusClass}">
                            ${student.registrationStatus}
                        </span>
                    </td>

                </tr>

            `);

        });

    }

    updateStats();
    $("#resultCount").text(data.length + " Results");
}


// ================================
// SEARCH + FILTER
// ================================

function filterStudents() {

    const search =
        $("#searchInput").val().toLowerCase();

    const status =
        $("#statusFilter").val();

    const filtered = students.filter(student => {

        const matchesSearch =
            student.studentName.toLowerCase().includes(search) ||
            student.PRN.toLowerCase().includes(search);

        const matchesStatus =
            status === "All" ||
            student.registrationStatus === status;

        return matchesSearch && matchesStatus;

    });

    displayStudents(filtered);

    if (filtered.length === 0 && students.length > 0) {

        $("#message").html(
            "⚠️ No student matches the search/filter criteria."
        );

    } else if (students.length > 0) {

        $("#message").html(
            `Showing <b>${filtered.length}</b> matching student(s).`
        );
    }
}


// Search

$("#searchInput").on("input", function () {
    filterStudents();
});


// Status filter

$("#statusFilter").change(function () {
    filterStudents();
});


// ================================
// STATISTICS
// ================================

function updateStats() {

    $("#totalCount").text(students.length);

    $("#registeredCount").text(
        students.filter(
            s => s.registrationStatus === "Registered"
        ).length
    );

    $("#pendingCount").text(
        students.filter(
            s => s.registrationStatus === "Pending"
        ).length
    );

    $("#cancelledCount").text(
        students.filter(
            s => s.registrationStatus === "Cancelled"
        ).length
    );
}


// ================================
// DARK / LIGHT MODE
// ================================

$("#themeBtn").click(function () {

    $("body").toggleClass("dark");

    if ($("body").hasClass("dark")) {

        $(this).text("☀️ Light Mode");

    } else {

        $(this).text("🌙 Dark Mode");

    }

});

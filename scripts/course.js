
document.addEventListener("DOMContentLoaded", () => {
    // Course data array
    const courses = [
        { code: "CSE 110", name: "Intro to Programming", credits: 2, completed: true },
        { code: "WDD 130", name: "Web Fundamentals", credits: 2, completed: true },
        { code: "CSE 111", name: "Programming with Functions", credits: 2, completed: false },
        { code: "CSE 210", name: "Programming Structures", credits: 2, completed: false },
        { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 2, completed: false },
        { code: "WDD 231", name: "Front-End Web Dev I", credits: 2, completed: false }
    ];

    const courseContainer = document.querySelector(".courses");
    const creditCount = document.createElement("p");
    courseContainer.appendChild(creditCount);

    // Function to display courses based on filter
    function displayCourses(filter = "All") {
        let filteredCourses = courses;
        if (filter !== "All") {
            filteredCourses = courses.filter(course => course.code.startsWith(filter));
        }

        courseContainer.innerHTML = ""; // Clear existing courses
        filteredCourses.forEach(course => {
            const card = document.createElement("div");
            card.classList.add("course-card");
            if (course.completed) {
                card.classList.add("completed");
            }

            card.innerHTML = `
                <h4>${course.code}</h4>
                <p>${course.name}</p>
                <p>Credits: ${course.credits}</p>
            `;
            courseContainer.appendChild(card);
        });

        // Calculate total credits for filtered courses
        const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        creditCount.textContent = `Total Credits: ${totalCredits}`;
    }

    // Set up event listeners for filter buttons
    document.querySelectorAll(".majors a").forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default link behavior
            const filter = link.textContent === "All" ? "All" : link.textContent;
            displayCourses(filter); // Display filtered courses based on the selected category
        });
    });

    // Initially, do not show any courses (empty container)
    // Do not call displayCourses("All") here, so no courses are displayed initially.
});

const courses = [
    { title: 'WDD 231', completed: true, credits: 3 },
    { title: 'CSE 101', completed: false, credits: 4 },
    { title: 'WDD 140', completed: true, credits: 3 },
    { title: 'CSE 120', completed: false, credits: 3 }
];

// Dynamically display courses
const courseContainer = document.querySelector('#courses');
courses.forEach(course => {
    const courseCard = document.createElement('div');
    courseCard.classList.add('course-card');
    if (course.completed) {
        courseCard.classList.add('completed');
    }
    courseCard.innerHTML = `
        <h3>${course.title}</h3>
        <p>Credits: ${course.credits}</p>
    `;
    courseContainer.appendChild(courseCard);
});

// Filter courses dynamically
function filterCourses(filter) {
    const filteredCourses = courses.filter(course => filter === 'All' || (filter === 'Completed' && course.completed) || (filter === 'In Progress' && !course.completed));
    updateCourseDisplay(filteredCourses);
}

function updateCourseDisplay(filteredCourses) {
    courseContainer.innerHTML = '';
    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');
        if (course.completed) {
            courseCard.classList.add('completed');
        }
        courseCard.innerHTML = `
            <h3>${course.title}</h3>
            <p>Credits: ${course.credits}</p>
        `;
        courseContainer.appendChild(courseCard);
    });
}

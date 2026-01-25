// I wish this was json and not javascript...
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];


function filterBySubject(subject) {
    if (subject === null) {
        return courses;
    }
    return courses.filter(val => val.subject === subject);
}

function addButton(value) {
    const {text, checked, element, callback, button, callbackData} = value;
    const input = document.createElement("input");
    const label = document.createElement("label");
    input.type = button ? "button" : "checkbox";
    input.checked = checked || false;
    input.value = text;
    label.appendChild(input);
    if (!button) {
        const labelText = document.createTextNode(text);
        label.appendChild(labelText);
        input.disabled = true;
    }
    element.appendChild(label);
    if (typeof callback === "function") {
        label.addEventListener("click", (e) => {
            callback(e, callbackData);
        });
    }
}

function updateCreditUI(cat) {
    const creditsElem = document.getElementById("credits");
    const category = filterBySubject(cat || null);
    creditsElem.innerText = category.reduce((total, current) => {
        return total + current.credits;
    }, 0);
}

const courseDetails = document.querySelector("#course-details");

function displayCourseDetails(e, course) {
    courseDetails.innerHTML = "";

    const closeButton = document.createElement("button");
    closeButton.id = "closeModal";
    closeButton.textContent = "❌";

    const h2 = document.createElement("h2");
    h2.textContent = `${course.subject} ${course.number}`;

    const h3 = document.createElement("h3");
    h3.textContent = course.title;

    const credits = document.createElement("p");
    const creditsStrong = document.createElement("strong");
    creditsStrong.textContent = "Credits";
    credits.appendChild(creditsStrong);
    credits.append(`: ${course.credits}`);

    const certificate = document.createElement("p");
    const certificateStrong = document.createElement("strong");
    certificateStrong.textContent = "Certificate";
    certificate.appendChild(certificateStrong);
    certificate.append(`: ${course.certificate}`);

    const description = document.createElement("p");
    description.textContent = course.description;

    const technologies = document.createElement("p");
    const techStrong = document.createElement("strong");
    techStrong.textContent = "Technologies";
    technologies.appendChild(techStrong);
    technologies.append(`: ${course.technology.join(", ")}`);

    courseDetails.appendChild(closeButton);
    courseDetails.appendChild(h2);
    courseDetails.appendChild(h3);
    courseDetails.appendChild(credits);
    courseDetails.appendChild(certificate);
    courseDetails.appendChild(description);
    courseDetails.appendChild(technologies);

    courseDetails.showModal();

    closeButton.addEventListener("click", () => {
        courseDetails.close();
    });
}


function renderCategory(cat) {
    const classButtons = document.getElementById("classes");
    classButtons.innerHTML = "";
    const category = filterBySubject(cat || null);
    category.forEach(obj => {
        addButton({text: `${obj.subject} ${obj.number}`, element: classButtons, checked: obj.completed, callback: displayCourseDetails, callbackData: obj});
    })
}

function courseSelectionCallback(event, cat) {
    console.log(arguments);
    renderCategory(cat);
    updateCreditUI(cat);
}

const courseButtons = document.getElementById("courses");

addButton({text: "All", element: courseButtons, button: true, callback: courseSelectionCallback});
const unique = courses.filter((obj, index, self) => self.findIndex((t) => t.subject === obj.subject) === index);
unique.forEach(obj => {
    addButton({text: obj.subject, element: courseButtons, button: true, callback: courseSelectionCallback, callbackData: obj.subject});
})

courseSelectionCallback();

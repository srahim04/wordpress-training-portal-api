
/* Aviation Training Portal - React */

function App() {

    // Store courses and filter selections
    const [courses, setCourses] = React.useState([]);
    const [search, setSearch] = React.useState("");
    const [category, setCategory] = React.useState("All");

    // Get course information from WordPress
    React.useEffect(() => {
        fetch("/wp-json/wp/v2/training-courses")
            .then(response => response.json())
            .then(data => setCourses(data))
            .catch(error => console.log(error));
    }, []);

    // Assign a category based on the course name
    function getCategory(title) {
        if (title.includes("Pilot")) return "Pilot Training";
        if (title.includes("Airport")) return "Airport Operations";
        if (title.includes("Safety")) return "Safety";
        if (title.includes("Maintenance")) return "Maintenance";
        return "Other";
    }

    // Search and filter the courses
    const filteredCourses = courses.filter(course => {
        const title = course.title.rendered;

        const matchesSearch = title.toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory = category === "All" ||
            getCategory(title) === category;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="atp-portal">

            <div className="portal-header">
                <h1>Aviation Training Portal</h1>
                <p>Explore aviation training courses</p>
            </div>

            <div className="portal-content">

                <h2>Available Courses</h2>

                <input
                    type="search"
                    placeholder="Search courses"
                    aria-label="Search courses"
                    value={search}
                    onChange={event => setSearch(event.target.value)}
                />

                <select
                    aria-label="Filter by category"
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                >
                    <option value="All">All Categories</option>
                    <option value="Pilot Training">Pilot Training</option>
                    <option value="Airport Operations">Airport Operations</option>
                    <option value="Safety">Safety</option>
                    <option value="Maintenance">Maintenance</option>
                </select>

                <p>{filteredCourses.length} courses found</p>

                <div className="courses">

                    {filteredCourses.map(course => (
                        <div className="course" key={course.id}>

                            <h3>
                                {course.title.rendered.replace("&amp;", "&")}
                            </h3>

                            <p>{getCategory(course.title.rendered)}</p>

                            <a href={course.link}>View Course</a>

                        </div>
                    ))}

                </div>

            </div>
        </div>
    );
}

// Display React inside the WordPress page
ReactDOM.createRoot(
    document.getElementById("atp-portal")
).render(<App />);

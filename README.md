# Aviation Hub – WordPress Training Portal

## About the Project

Aviation Hub is a training course website I built using WordPress, PHP, React, JavaScript, and CSS.

The idea was to make it easier for visitors to browse aviation training programs, compare courses, and find the information they need in one place.

I built a custom WordPress plugin to manage the courses and used the WordPress REST API to connect that information to a React dashboard. This way, I can add or update courses through WordPress without having to manually change the frontend.

I developed and tested the project locally using LocalWP.

## Project Features

- **Custom WordPress Plugin:** Created a PHP plugin to manage training courses, including their duration, difficulty level, and training format.
- **React Dashboard:** Built a dashboard with a sidebar, rotating image slideshow, and course statistics.
- **REST API:** Used the WordPress REST API to pull course information and images into the React dashboard.
- **Course Catalog:** Designed course cards showing images, descriptions, difficulty levels, and durations.
- **Search and Filters:** Added keyword search and filters for training categories and difficulty levels.
- **Course Details:** Added a popup so visitors can read more about a course without leaving the catalog.
- **Individual Course Pages:** Created separate WordPress pages for each course, including featured images and Previous/Next navigation.
- **Loading and Error Messages:** Added loading indicators, retry functionality, and messages for errors or searches with no results.
- **Responsive Layout:** Used CSS Grid, Flexbox, and media queries to make the website work across desktop, tablet, and mobile screens.

## Technologies Used

- **Frontend:** React, JavaScript, HTML5, CSS3
- **Backend:** WordPress, PHP
- **API:** WordPress REST API, Fetch API
- **Development Tools:** Visual Studio Code, LocalWP

## How It Works

1. Courses are added and managed through the WordPress dashboard.
2. The custom PHP plugin stores course information, including duration, difficulty level, and training format.
3. WordPress makes the course data available through its REST API.
4. The React dashboard uses `fetch()` to load the courses.
5. Visitors can browse the catalog, search for courses, apply filters, and open a popup for more information.
6. Each course also has its own WordPress page with additional details.

For the category filter, I used WordPress training categories when they're available. If a course doesn't have one assigned, the dashboard uses its title to determine the training area.

## Project Screenshots
I included screenshots in the [Project Demo](./Project-Demo) folder to show how the website looks and works.

The screenshots cover the main dashboard, training course catalog, search and filtering, course details popup, individual course pages, and the WordPress dashboard where I manage the courses.

I also included a sample JSON response showing the course information returned through the WordPress REST API.

## Project Files

```text
aviation-training-courses/
├── aviation-training-courses.php
└── portal/
    ├── script.js
    └── style.css
```

- `aviation-training-courses.php` – Contains the custom WordPress plugin, course fields, REST API data, shortcode, and individual course page functionality.
- `portal/script.js` – Handles the React dashboard, API requests, slideshow, course search, filters, and details popup.
- `portal/style.css` – Contains the dashboard styling and responsive layouts.

The repository also includes project screenshots and a sample API response.

## Running the Project Locally

1. Install WordPress using LocalWP.
2. Copy the `aviation-training-courses` folder into `wp-content/plugins/`.
3. Activate **Aviation Training Courses** in the WordPress dashboard.
4. Create and publish courses under **Training Courses**.
5. Add the duration, difficulty level, training format, and featured image for each course.
6. Create a WordPress page and add the shortcode `[aviation_portal]`.
7. Go to **Settings → Reading** and set that page as the homepage.

The dashboard retrieves course information from the local WordPress REST API.

Some of the slideshow and course images are stored in the local WordPress media library, so those images will need to be added to a new installation.

## What I Learned

Before this project, most of my WordPress experience involved updating websites and working with existing pages. I wanted to try building more of the functionality myself.

I got to work with PHP to create a custom plugin, set up course fields, and use the WordPress REST API to display that information through React.

I also spent a lot of time adjusting the layout, fixing navigation issues, and making sure features like search, filters, and course details worked together.

The biggest thing I learned was how to connect the WordPress backend with a React frontend. Being able to update courses in WordPress and see those changes reflected in the dashboard was one of the main things I wanted to accomplish with this project.

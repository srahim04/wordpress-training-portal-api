# Aviation Hub – WordPress Training Portal

## About the Project

Aviation Hub is an aviation training directory I built using WordPress, PHP, React, JavaScript, and CSS.

I wanted to create a website where visitors could explore aviation training courses, compare program details, and find information without having to navigate through multiple pages.

I built a custom WordPress plugin to manage the courses and connected it to a React dashboard through the WordPress REST API. This allows me to update course information directly in WordPress without having to change the frontend code.

The project was developed locally using LocalWP.

## Project Features

- **Custom WordPress Plugin:** Built a PHP plugin that registers aviation training courses as a custom post type, with fields for duration, difficulty level, and training format.
- **React Dashboard:** Created a course directory with a navigation sidebar, rotating image slideshow, and course overview statistics.
- **REST API Integration:** Connected the React frontend to WordPress to retrieve course information, descriptions, and featured images.
- **Interactive Course Catalog:** Displayed courses as cards with images, descriptions, difficulty levels, and durations.
- **Search and Filtering:** Added keyword search across course titles and descriptions, along with category and difficulty-level filters.
- **Course Details Popup:** Built a popup that displays additional course information without leaving the catalog.
- **Individual Course Pages:** Created WordPress course pages with featured images and Previous/Next navigation.
- **Error Handling:** Added loading messages, error handling, retry functionality, and messages when no courses match the selected filters.
- **Responsive Design:** Used CSS Grid, Flexbox, and media queries to adjust the layout for desktop, tablet, and mobile screens.

## Technologies Used

- **Frontend:** React, JavaScript, HTML5, CSS3
- **Backend:** WordPress, PHP
- **API:** WordPress REST API, Fetch API
- **Development Tools:** Visual Studio Code, LocalWP

## How It Works

1. Training courses are created and managed through the WordPress dashboard.
2. A custom PHP plugin registers the training course post type and adds fields for duration, difficulty level, and format.
3. The plugin makes course information available through the WordPress REST API.
4. React uses JavaScript's `fetch()` function to retrieve the course records when the dashboard loads.
5. The dashboard displays the courses dynamically, including their images, descriptions, and training details.
6. Visitors can search, filter, and open a course details popup or visit the full WordPress course page.

The category filter uses WordPress training categories when available and falls back to identifying training areas from course titles.

## Project Screenshots

Screenshots are available in the [Training Portal folder](TrainingPortal/).

They show the main dashboard, course catalog, search and filtering, course details popup, individual course pages, and WordPress course management.

A sample JSON response is also included to show the course information returned by the WordPress REST API.

## Project Files

```text
aviation-training-courses/
├── aviation-training-courses.php
└── portal/
    ├── script.js
    └── style.css
```

- `aviation-training-courses.php` — Registers the course post type, custom fields, REST API data, shortcode, and individual course page features.
- `portal/script.js` — Handles the React dashboard, API requests, slideshow, course catalog, filtering, and details popup.
- `portal/style.css` — Contains the dashboard styling, course layouts, and responsive design.

The repository also includes project screenshots and a sample API response.

## Running the Project Locally

1. Install WordPress using LocalWP.
2. Copy the `aviation-training-courses` folder into `wp-content/plugins/`.
3. Activate **Aviation Training Courses** in the WordPress dashboard.
4. Create and publish training courses under **Training Courses**.
5. Add the course duration, difficulty level, training format, and featured image.
6. Create a WordPress page and insert the shortcode `[aviation_portal]`.
7. Set that page as the homepage under **Settings → Reading**.

The React dashboard retrieves course information from the local WordPress REST API.

The slideshow images and some course images currently reference files stored in the local WordPress media library, so those images need to be available in the local installation.

## What I Learned

This project gave me more hands-on experience working with WordPress beyond regular page updates and content management.

I learned how to build a custom PHP plugin, add custom fields to WordPress, and connect that information to a React frontend through the REST API.

I also spent time working through layout and navigation issues, making the interface responsive, and adding features like search, filters, and course details that make the website easier to use.

One of the most useful parts was figuring out how to keep the WordPress backend and React frontend connected so I could manage the content in one place.

---

*This is a locally developed portfolio project using sample aviation training content. It is not an official airline training platform.*

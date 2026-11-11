# Custom WordPress Training Portal & API Integration

## About the Project

I built an aviation training portal to explore how WordPress, PHP, React, and APIs can work together to create an interactive website.

The goal was to create a simple course directory where visitors could browse aviation training programs, search for specific courses, and filter courses by category.

## Project Features

- **Custom WordPress Plugin:** Used PHP to register and manage aviation training courses as a custom post type.
- **REST API Integration:** Retrieved course information from WordPress using the REST API.
- **React Course Directory:** Displayed course information dynamically using React and JavaScript.
- **Search Functionality:** Allowed users to search courses by name.
- **Category Filtering:** Added a dropdown to filter courses by training area.
- **Individual Course Pages:** Connected each course card to its corresponding WordPress page.
- **Responsive Design:** Used CSS Grid and media queries to support desktop and mobile layouts.

## Tools Used

WordPress, PHP, HTML5, CSS3, JavaScript, React, WordPress REST API, Visual Studio Code, LocalWP

## How It Works

1. Training courses are created and managed in the WordPress dashboard.
2. A custom PHP plugin registers the training course post type and makes its information available through the WordPress REST API.
3. React uses JavaScript's `fetch()` function to retrieve the course information.
4. The application displays the courses as cards with links to their individual WordPress pages.
5. Users can search by course name or filter by training category.

For this demonstration, the category filter assigns categories based on course titles.

## Project Screenshots

Screenshots are available in the [screenshots folder](screenshots/).

They demonstrate the course directory, search functionality, category filtering, individual course pages, and WordPress REST API response.

## Project Files

- `aviation-training-courses/aviation-training-courses.php` — Custom WordPress plugin and shortcode integration.
- `aviation-training-courses/portal/script.js` — React application and course filtering.
- `aviation-training-courses/portal/style.css` — Website styling and responsive layout.
- `aviation-training-courses/portal/index.html` — Original standalone prototype.

## Running the Project Locally

1. Install WordPress using LocalWP.
2. Copy the `aviation-training-courses` folder into `wp-content/plugins/`.
3. Activate the plugin in the WordPress dashboard.
4. Create and publish training courses.
5. Create a WordPress page and add the shortcode `[aviation_portal]`.
6. Set that page as the homepage under Settings → Reading.

The React application loads the course information from the local WordPress REST API.

## What I Learned

This project helped me understand how WordPress can work with React to create a more interactive experience. I practiced building a custom post type with PHP, retrieving data through an API, and using React to display and filter that information.

I also gained experience troubleshooting WordPress navigation, styling issues, and connecting custom code to an existing WordPress theme.

*This is a local development portfolio project using sample aviation training content.*

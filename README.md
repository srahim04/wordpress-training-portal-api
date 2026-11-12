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
- **Development Tools:** Visual

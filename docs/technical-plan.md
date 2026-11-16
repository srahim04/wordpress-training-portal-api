# Aviation Hub – Technical Plan

## Project Overview

Aviation Hub is an aviation training website I built using WordPress, PHP, React, JavaScript, and CSS.

I wanted to create a place where visitors could browse different aviation training courses, compare their details, and find what they're looking for without going through several pages.

I used WordPress to manage the courses and built a React dashboard to display them. I also created a custom PHP plugin to connect everything together.

## WordPress Backend

I built a custom PHP plugin so I could add and manage training courses directly through WordPress.

The plugin handles:

- A custom post type (`training_course`) for adding and editing courses
- Custom fields for course duration, difficulty level, and training format
- Training categories and featured images
- REST API data so the React dashboard can access course information
- Individual course pages with featured images and Previous/Next navigation

I wanted to be able to update courses from the WordPress dashboard without having to go back and change the React code every time.

## React Frontend

I built the dashboard using React, JavaScript, and CSS.

It includes a navigation sidebar, rotating image slideshow, course statistics, and a catalog where visitors can browse training programs.

I spent time adjusting the layout and navigation so the different sections worked well together. I also used CSS Grid, Flexbox, and media queries to make the dashboard work on smaller screens.

## Main Features

- Course cards showing images, descriptions, difficulty levels, and durations
- Keyword search for course titles and descriptions
- Filters for training categories and difficulty levels
- Course details popup with additional information
- Links to individual WordPress course pages
- Automatic image slideshow with manual controls
- Course statistics based on the courses stored in WordPress
- Loading messages, error handling, retry functionality, and messages when no results are found
- Responsive layouts for desktop, tablet, and mobile screens

## API Integration

I used the WordPress REST API to get course information from the backend and display it in React.

The PHP plugin registers the training courses and adds their details to the API response. The dashboard then uses JavaScript's `fetch()` function to retrieve that information when the page loads.

The course data is available through the `/wp-json/wp/v2/training-courses` endpoint.

This was an important part of the project because I wanted the course catalog to update based on what's stored in WordPress instead of having to manually add courses to the JavaScript.

## Testing

I tested the main parts of the website as I built them, including:

- Checking that the REST API returned the correct course information and custom fields
- Searching courses by title and description
- Testing the category and difficulty filters
- Opening and closing the course details popup, including with the Escape key
- Checking what happens when courses are loading, an API request fails, or a search returns no results
- Adjusting the layout for different screen sizes
- Checking course links, featured images, and Previous/Next navigation

I also tested adding and editing courses through WordPress to make sure the changes appeared in the React dashboard.

## Technologies Used

**Frontend:** React, JavaScript, HTML5, CSS3

**Backend:** WordPress, PHP, WordPress REST API

**Development Tools:** LocalWP, Visual Studio Code

## Project Outcome

I finished the project with four aviation training courses managed through WordPress and displayed in the React dashboard.

Visitors can browse the courses, search and filter the catalog, open a popup for more information, or visit an individual course page.

Before this project, most of my WordPress experience involved updating existing websites. With Aviation Hub, I wanted to try building more of the functionality myself.

I got more practice working with PHP, creating custom WordPress features, and using the REST API to connect WordPress with React. One of the more interesting parts was getting the frontend to display information directly from WordPress and making sure everything still worked when I added or changed courses.

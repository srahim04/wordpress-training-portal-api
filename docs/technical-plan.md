# Aviation Hub – Technical Plan

## Project Overview

Aviation Hub is a WordPress-based aviation training directory I built to make it easier for visitors to explore courses, compare training options, and find information in one place.

The project uses WordPress and PHP to manage course information, with a custom React interface for browsing and filtering courses.

## WordPress Backend

I developed a custom PHP plugin to manage the training courses through WordPress.

The plugin includes:
- A custom post type for adding and editing training courses
- Custom fields for course duration, difficulty level, and training format
- Training categories and featured image support
- REST API integration to make course information available to the frontend
- Individual course pages with featured images and Previous/Next navigation

Course information can be updated through the WordPress dashboard without manually changing the React code.

## React Frontend

I built the frontend using React, JavaScript, and CSS, with WordPress handling the course data.

The dashboard includes a navigation sidebar, rotating image slideshow, course overview statistics, and an interactive course catalog.

I focused on making the interface easy to navigate, keeping course information organized, and creating a consistent layout across different screen sizes.

## Main Features

- Course cards with images, descriptions, difficulty levels, and durations
- Keyword search across course titles and descriptions
- Category and difficulty-level filters
- Course details popup showing duration, level, format, and description
- Links to individual WordPress course pages
- Automatic slideshow with manual navigation controls
- Course statistics based on the information returned by WordPress
- Loading messages, error handling, retry functionality, and empty search results
- Responsive layouts for desktop, tablet, and mobile screens

## API Integration

I connected the React dashboard to the WordPress REST API using JavaScript's Fetch API.

The custom PHP plugin registers the training course content type and adds course details to the API response.

React retrieves this information when the page loads and uses it to populate the catalog, filters, and course details popup.

This keeps the course content separate from the frontend, so new courses and updates can be managed directly in WordPress.

## Testing

I tested the main features of the portal, including:

- Retrieving course records and custom fields through the REST API
- Searching courses by title and description
- Filtering by category and difficulty level
- Opening and closing course details, including using the Escape key
- Checking loading, error, retry, and empty-result states
- Reviewing the layout at different screen sizes
- Checking navigation links, featured images, and individual course pages

## Technologies Used

**Frontend:** React, JavaScript, HTML, CSS

**Backend:** WordPress, PHP, WordPress REST API

**Development Environment:** Local WordPress installation, Visual Studio Code

## Project Outcome

The finished project is a working aviation training directory with four courses managed through WordPress. Visitors can browse training options, search and filter courses, view additional details, and open individual course pages.

Building Aviation Hub gave me hands-on experience connecting a custom WordPress backend to an interactive React frontend while working on responsive design, content management, and usability.

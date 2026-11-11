
<?php
/*
Plugin Name: Aviation Training Courses
Description: Adds custom aviation training courses to WordPress.
Version: 1.0
Author: Portfolio Project
*/

// Register a custom post type for training courses.
function atp_register_training_courses() {

    $labels = array(
        'name' => 'Training Courses',
        'singular_name' => 'Training Course',
        'add_new_item' => 'Add New Training Course',
        'edit_item' => 'Edit Training Course'
    );

    $settings = array(
        'labels' => $labels,
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'rest_base' => 'training-courses',
        'menu_icon' => 'dashicons-welcome-learn-more',
        'supports' => array('title', 'editor', 'thumbnail')
    );

    register_post_type('training_course', $settings);
}

add_action('init', 'atp_register_training_courses');



/* Display the React training portal */
function atp_display_portal() {

    // Load the portal's CSS
    wp_enqueue_style(
        'atp-style',
        plugin_dir_url(__FILE__) . 'portal/style.css'
    );

    // Load React
    wp_enqueue_script(
        'atp-react',
        'https://unpkg.com/react@18/umd/react.production.min.js',
        array(),
        '18',
        true
    );

    // Load React DOM
    wp_enqueue_script(
        'atp-react-dom',
        'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
        array('atp-react'),
        '18',
        true
    );

    // Load Babel
    wp_enqueue_script(
        'atp-babel',
        'https://unpkg.com/@babel/standalone/babel.min.js',
        array('atp-react-dom'),
        null,
        true
    );

    // Load our React application
    wp_enqueue_script(
        'atp-script',
        plugin_dir_url(__FILE__) . 'portal/script.js',
        array('atp-babel'),
        '1.0',
        true
    );

    // Tell Babel to process the JSX
    add_filter('script_loader_tag', 'atp_script_type', 10, 3);

    return '<div id="atp-portal"></div>';
}

/* Set the script type for Babel */
function atp_script_type($tag, $handle, $src) {

    if ($handle === 'atp-script') {
        return '<script type="text/babel" src="' .
            esc_url($src) . '"></script>';
    }

    return $tag;
}

add_shortcode('aviation_portal', 'atp_display_portal');

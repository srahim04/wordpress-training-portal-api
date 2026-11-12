
<?php
/**
 * Plugin Name: Aviation Training Courses
 * Description: WordPress course directory with a React catalog.
 * Version: 2.2
 */

if (!defined('ABSPATH')) {
    exit;
}

// Course registration

function atp_register_courses() {
    register_post_type('training_course', array(
        'labels' => array(
            'name' => 'Training Courses',
            'singular_name' => 'Training Course'
        ),
        'public' => true,
        'show_in_rest' => true,
        'rest_base' => 'training-courses',
        'has_archive' => true,
        'menu_icon' => 'dashicons-welcome-learn-more',
        'supports' => array('title', 'editor', 'excerpt', 'thumbnail')
    ));

    register_taxonomy('training_category', 'training_course', array(
        'label' => 'Training Categories',
        'public' => true,
        'hierarchical' => true,
        'show_in_rest' => true
    ));

    foreach (array('duration', 'level', 'format') as $field) {
        register_post_meta('training_course', 'atp_' . $field, array(
            'type' => 'string',
            'single' => true,
            'show_in_rest' => true,
            'sanitize_callback' => 'sanitize_text_field',
            'auth_callback' => function() {
                return current_user_can('edit_posts');
            }
        ));
    }
}
add_action('init', 'atp_register_courses');


// Course fields

function atp_course_fields($post) {
    wp_nonce_field('atp_save_course', 'atp_course_nonce');

    $fields = array(
        'duration' => 'Duration',
        'level' => 'Level',
        'format' => 'Format'
    );

    foreach ($fields as $key => $label) {
        $value = get_post_meta($post->ID, 'atp_' . $key, true);

        echo '<p>';
        echo '<label for="atp_' . esc_attr($key) . '">';
        echo esc_html($label);
        echo '</label><br>';

        echo '<input type="text" ';
        echo 'id="atp_' . esc_attr($key) . '" ';
        echo 'name="atp_' . esc_attr($key) . '" ';
        echo 'value="' . esc_attr($value) . '" ';
        echo 'style="width:100%;max-width:400px">';
        echo '</p>';
    }
}

function atp_add_course_fields() {
    add_meta_box(
        'atp_course_fields',
        'Course Information',
        'atp_course_fields',
        'training_course'
    );
}
add_action('add_meta_boxes', 'atp_add_course_fields');


function atp_save_course($post_id) {
    if (
        !isset($_POST['atp_course_nonce']) ||
        !wp_verify_nonce(
            sanitize_text_field(wp_unslash($_POST['atp_course_nonce'])),
            'atp_save_course'
        )
    ) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    foreach (array('duration', 'level', 'format') as $field) {
        $key = 'atp_' . $field;

        if (isset($_POST[$key])) {
            update_post_meta(
                $post_id,
                $key,
                sanitize_text_field(wp_unslash($_POST[$key]))
            );
        }
    }
}
add_action('save_post_training_course', 'atp_save_course');


// REST API

function atp_register_api_details() {
    register_rest_field('training_course', 'course_details', array(
        'get_callback' => function($course) {
            $id = $course['id'];
            $terms = get_the_terms($id, 'training_category');
            $image = get_the_post_thumbnail_url($id, 'large');

            return array(
                'duration' => get_post_meta($id, 'atp_duration', true),
                'level' => get_post_meta($id, 'atp_level', true),
                'format' => get_post_meta($id, 'atp_format', true),
                'category' => ($terms && !is_wp_error($terms))
                    ? $terms[0]->name
                    : '',
                'image' => $image ? esc_url_raw($image) : ''
            );
        },
        'schema' => array(
            'type' => 'object',
            'context' => array('view', 'edit')
        )
    ));
}
add_action('rest_api_init', 'atp_register_api_details');


// React catalog

function atp_portal_shortcode() {
    $url = plugin_dir_url(__FILE__);

    wp_enqueue_style(
        'atp-portal-style',
        $url . 'portal/style.css',
        array(),
        '2.2'
    );

    wp_enqueue_script(
        'atp-portal-script',
        $url . 'portal/script.js',
        array('wp-element'),
        filemtime(plugin_dir_path(__FILE__) . 'portal/script.js'),
        true
    );

    wp_add_inline_script(
        'atp-portal-script',
        'window.atpSettings = ' . wp_json_encode(array(
            'apiUrl' => esc_url_raw(rest_url('wp/v2/training-courses'))
        )) . ';',
        'before'
    );

    return '<div id="atp-portal"></div>';
}
add_shortcode('aviation_portal', 'atp_portal_shortcode');

function atp_display_featured_image($content) {
    if (
        !is_singular('training_course') ||
        !is_main_query() ||
        !in_the_loop() ||
        !has_post_thumbnail()
    ) {
        return $content;
    }

    $image = get_the_post_thumbnail(
        get_the_ID(),
        'large',
        array(
            'class' => 'atp-single-course-image',
            'alt' => get_the_title()
        )
    );

    return $image . $content;
}
add_filter('the_content', 'atp_display_featured_image', 10);


function atp_course_navigation($content) {
    if (
        !is_singular('training_course') ||
        !is_main_query() ||
        !in_the_loop()
    ) {
        return $content;
    }

    $courses = get_posts(array(
        'post_type' => 'training_course',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'orderby' => 'title',
        'order' => 'ASC'
    ));

    $current_id = get_the_ID();
    $position = -1;

    foreach ($courses as $index => $course) {
        if ((int) $course->ID === (int) $current_id) {
            $position = $index;
            break;
        }
    }

    if ($position === -1) {
        return $content;
    }

    $navigation = '<nav class="atp-course-navigation" aria-label="Course navigation">';

    if ($position > 0) {
        $previous = $courses[$position - 1];

        $navigation .= '<a href="' . esc_url(get_permalink($previous->ID)) . '">';
        $navigation .= '&larr; Previous: ' . esc_html($previous->post_title);
        $navigation .= '</a>';
    }

    if ($position < count($courses) - 1) {
        $next = $courses[$position + 1];

        $navigation .= '<a href="' . esc_url(get_permalink($next->ID)) . '">';
        $navigation .= 'Next: ' . esc_html($next->post_title) . ' &rarr;';
        $navigation .= '</a>';
    }

    $navigation .= '</nav>';

    return $content . $navigation;
}
add_filter('the_content', 'atp_course_navigation', 20);


function atp_single_course_styles() {
    if (!is_singular('training_course')) {
        return;
    }

    $css = '
        .single-training_course .atp-single-course-image {
            display: block;
            width: 100%;
            height: auto;
            max-height: 420px;
            object-fit: cover;
            border-radius: 10px;
            margin-bottom: 24px;
        }

        .single-training_course .post-navigation,
        .single-training_course .navigation.post-navigation {
            display: none !important;
        }

        .single-training_course .atp-course-navigation {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            margin-top: 35px;
            padding-top: 20px;
            border-top: 1px solid #dce5ed;
        }

        .single-training_course .atp-course-navigation a {
            color: #17649a;
            font-weight: 600;
            text-decoration: none;
        }

        .single-training_course .atp-course-navigation a:hover {
            text-decoration: underline;
        }

        .single-training_course .atp-course-navigation a:last-child {
            margin-left: auto;
            text-align: right;
        }
    ';

    wp_register_style('atp-single-course', false, array(), '2.2');
    wp_enqueue_style('atp-single-course');
    wp_add_inline_style('atp-single-course', $css);
}
add_action('wp_enqueue_scripts', 'atp_single_course_styles');

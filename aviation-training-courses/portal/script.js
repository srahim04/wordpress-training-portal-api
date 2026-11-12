
(function () {
    'use strict';

    const el = wp.element.createElement;
    const { useState, useEffect } = wp.element;

    const slideshowImages = [
        'http://aviation-training-portal.local/wp-content/uploads/2026/11/images-10.jpg',
        'http://aviation-training-portal.local/wp-content/uploads/2026/11/images-7.jpg',
        'http://aviation-training-portal.local/wp-content/uploads/2026/11/images-8.jpg',
        'http://aviation-training-portal.local/wp-content/uploads/2026/11/images-9.jpg'
    ];

    const photos = {
        'Pilot Training': 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&fit=crop',
        'Airport Operations': 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=900&fit=crop',
        'Safety': 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=900&fit=crop',
        'Maintenance': 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&fit=crop'
    };

    function getText(html) {
        const element = document.createElement('div');
        element.innerHTML = html || '';
        return element.textContent.trim();
    }

    function getCategory(course) {
        if (course.course_details && course.course_details.category) {
            return course.course_details.category;
        }

        const title = getText(course.title.rendered).toLowerCase();

        if (title.includes('pilot') || title.includes('flight')) return 'Pilot Training';
        if (title.includes('airport')) return 'Airport Operations';
        if (title.includes('safety')) return 'Safety';
        if (title.includes('maintenance')) return 'Maintenance';

        return 'General';
    }

    function getDescription(course) {
        return getText(
            course.excerpt && course.excerpt.rendered
                ? course.excerpt.rendered
                : course.content && course.content.rendered
                    ? course.content.rendered
                    : ''
        );
    }

    function getImage(course) {
        const details = course.course_details || {};
        return details.image || photos[getCategory(course)] || photos.Safety;
    }

    function HeroSlideshow() {
        const [activeSlide, setActiveSlide] = useState(0);

        useEffect(function () {
            const interval = setInterval(function () {
                setActiveSlide(function (current) {
                    return (current + 1) % slideshowImages.length;
                });
            }, 5000);

            return function () {
                clearInterval(interval);
            };
        }, []);

        return el('div', { className: 'atp-slideshow' },
            slideshowImages.map(function (src, index) {
                return el('img', {
                    key: index,
                    src: src,
                    alt: 'Aviation aircraft photograph ' + (index + 1),
                    className: 'atp-slide' +
                        (index === activeSlide ? ' atp-slide-active' : '')
                });
            }),
            el('div', {
                className: 'atp-slide-dots',
                'aria-label': 'Slideshow navigation'
            },
                slideshowImages.map(function (_, index) {
                    return el('button', {
                        key: index,
                        type: 'button',
                        className: 'atp-slide-dot' +
                            (index === activeSlide ? ' atp-dot-active' : ''),
                        'aria-label': 'Show slide ' + (index + 1),
                        'aria-pressed': index === activeSlide,
                        onClick: function () {
                            setActiveSlide(index);
                        }
                    });
                })
            )
        );
    }

    function CourseCard(props) {
        const course = props.course;
        const details = course.course_details || {};
        const category = getCategory(course);

        return el('article', { className: 'atp-course-card' },
            el('img', {
                src: getImage(course),
                alt: category + ' training',
                loading: 'lazy'
            }),
            el('div', { className: 'atp-course-body' },
                el('span', { className: 'atp-category' }, category),
                el('h3', null, getText(course.title.rendered)),
                el('p', { className: 'atp-course-description' },
                    getDescription(course) || 'View the course for more information.'
                ),
                el('div', { className: 'atp-course-meta' },
                    el('span', null, details.level || 'Open level'),
                    el('span', null, details.duration || 'Flexible duration')
                ),
                el('button', {
                    type: 'button',
                    className: 'atp-details-button',
                    onClick: function () {
                        props.onSelect(course);
                    }
                }, 'View details →')
            )
        );
    }

    function App() {
        const [courses, setCourses] = useState([]);
        const [search, setSearch] = useState('');
        const [category, setCategory] = useState('All');
        const [level, setLevel] = useState('All');
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState('');
        const [selected, setSelected] = useState(null);
        const [retry, setRetry] = useState(0);

        useEffect(function () {
            const controller = new AbortController();

            setLoading(true);
            setError('');

            async function loadCourses() {
                try {
                    const response = await fetch(
                        window.atpSettings.apiUrl + '?per_page=100',
                        { signal: controller.signal }
                    );

                    if (!response.ok) {
                        throw new Error('Server returned ' + response.status);
                    }

                    const data = await response.json();

                    if (!Array.isArray(data)) {
                        throw new Error('Unexpected API response');
                    }

                    setCourses(data);
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        setError('Could not load courses. ' + err.message);
                    }
                } finally {
                    if (!controller.signal.aborted) {
                        setLoading(false);
                    }
                }
            }

            loadCourses();

            return function () {
                controller.abort();
            };
        }, [retry]);

        useEffect(function () {
            if (!selected) return;

            function onKeyDown(event) {
                if (event.key === 'Escape') {
                    setSelected(null);
                }
            }

            document.addEventListener('keydown', onKeyDown);

            return function () {
                document.removeEventListener('keydown', onKeyDown);
            };
        }, [selected]);

        const categories = ['All', ...new Set(courses.map(getCategory))];

        const levels = [
            'All',
            ...new Set(courses.map(function (course) {
                return (course.course_details || {}).level || 'Open level';
            }))
        ];

        const formats = [
            ...new Set(courses.map(function (course) {
                return (course.course_details || {}).format;
            }).filter(function (format) {
                return typeof format === 'string' && format.trim() !== '';
            }))
        ];

        const results = courses.filter(function (course) {
            const query = search.trim().toLowerCase();
            const title = getText(course.title.rendered).toLowerCase();
            const description = getDescription(course).toLowerCase();
            const courseLevel = (course.course_details || {}).level || 'Open level';

            return (
                (title.includes(query) || description.includes(query)) &&
                (category === 'All' || category === getCategory(course)) &&
                (level === 'All' || level === courseLevel)
            );
        });

        function clearFilters() {
            setSearch('');
            setCategory('All');
            setLevel('All');
        }

        return el('div', { className: 'atp-layout' },

            el('aside', { className: 'atp-sidebar' },
                el('div', { className: 'atp-logo' },
                    el('span', { className: 'atp-logo-icon' }, '✈'),
                    el('span', null, 'Aviation Hub')
                ),
                el('p', { className: 'atp-side-label' }, 'TRAINING WORKSPACE'),
                el('a', {
                    href: '#atp-catalog',
                    className: 'atp-side-link'
                }, 'Course catalog'),
                el('a', {
                    href: '#atp-about',
                    className: 'atp-side-link'
                }, 'About this project'),
                el('div', { className: 'atp-side-note' },
                    el('strong', null, 'AVIATION TRAINING PLATFORM'),
                    el('p', null,
                        'Explore aviation training programs, compare course details, and find the right learning path.'
                    )
                )
            ),

            el('main', { className: 'atp-main' },

                el('div', { className: 'atp-topbar' },
                    el('span', null, 'Training / Course catalog'),
                    el('span', { className: 'atp-demo-label' }, 'Portfolio project')
                ),

                el('section', { className: 'atp-hero' },
                    el('div', { className: 'atp-hero-content' },
                        el('span', { className: 'atp-overline' },
                            'AVIATION TRAINING DIRECTORY'
                        ),
                        el('h1', null, 'Training courses, all in one place.'),
                        el('p', null,
                            'Find aviation courses, compare training areas, and review program details.'
                        ),
                        el('a', {
                            href: '#atp-catalog',
                            className: 'atp-hero-button'
                        }, 'Explore courses →')
                    ),
                    el(HeroSlideshow)
                ),

                el('section', {
                    className: 'atp-stats',
                    'aria-label': 'Course overview'
                },
                    el('div', { className: 'atp-stat' },
                        el('span', null, 'AVAILABLE COURSES'),
                        el('strong', null, loading ? '—' : courses.length),
                        el('small', null, 'WordPress course records')
                    ),
                    el('div', { className: 'atp-stat' },
                        el('span', null, 'TRAINING AREAS'),
                        el('strong', null, loading ? '—' : categories.length - 1),
                        el('small', null, 'Course categories')
                    ),
                    el('div', { className: 'atp-stat' },
                        el('span', null, 'TRAINING FORMATS'),
                        el('strong', null, loading ? '—' : formats.length),
                        el('small', null, 'Online, in-person & hybrid')
                    )
                ),

                el('section', {
                    id: 'atp-catalog',
                    className: 'atp-catalog'
                },
                    el('div', { className: 'atp-section-header' },
                        el('div', null,
                            el('span', { className: 'atp-overline' },
                                'COURSE DIRECTORY'
                            ),
                            el('h2', null, 'Browse training courses'),
                            el('p', null, 'Search by name or use the filters below.')
                        ),
                        el('span', { className: 'atp-result-count' },
                            loading ? 'Loading' : results.length + ' results'
                        )
                    ),

                    el('div', { className: 'atp-filters' },
                        el('label', null,
                            'Search',
                            el('input', {
                                type: 'search',
                                placeholder: 'Search courses...',
                                value: search,
                                onChange: function (event) {
                                    setSearch(event.target.value);
                                }
                            })
                        ),
                        el('label', null,
                            'Category',
                            el('select', {
                                value: category,
                                onChange: function (event) {
                                    setCategory(event.target.value);
                                }
                            },
                                categories.map(function (item) {
                                    return el('option', {
                                        key: item,
                                        value: item
                                    }, item === 'All' ? 'All categories' : item);
                                })
                            )
                        ),
                        el('label', null,
                            'Level',
                            el('select', {
                                value: level,
                                onChange: function (event) {
                                    setLevel(event.target.value);
                                }
                            },
                                levels.map(function (item) {
                                    return el('option', {
                                        key: item,
                                        value: item
                                    }, item === 'All' ? 'All levels' : item);
                                })
                            )
                        ),
                        el('button', {
                            type: 'button',
                            className: 'atp-clear',
                            onClick: clearFilters
                        }, 'Clear')
                    ),

                    loading
                        ? el('p', {
                            className: 'atp-message',
                            role: 'status'
                        }, 'Loading courses...')
                        : error
                            ? el('div', {
                                className: 'atp-message',
                                role: 'alert'
                            },
                                el('p', null, error),
                                el('button', {
                                    type: 'button',
                                    onClick: function () {
                                        setRetry(function (current) {
                                            return current + 1;
                                        });
                                    }
                                }, 'Try again')
                            )
                            : results.length === 0
                                ? el('div', { className: 'atp-message' },
                                    el('h3', null, 'No courses found'),
                                    el('p', null,
                                        'Try a different search or reset the filters.'
                                    ),
                                    el('button', {
                                        type: 'button',
                                        onClick: clearFilters
                                    }, 'Reset filters')
                                )
                                : el('div', { className: 'atp-course-grid' },
                                    results.map(function (course) {
                                        return el(CourseCard, {
                                            key: course.id,
                                            course: course,
                                            onSelect: setSelected
                                        });
                                    })
                                )
                ),

                el('section', {
                    className: 'atp-about',
                    id: 'atp-about'
                },
                    el('span', { className: 'atp-overline' }, 'ABOUT THE PROJECT'),
                    el('h2', null, 'About Aviation Hub'),
                    el('p', null,
                        'I created Aviation Hub to make it easier to explore aviation training opportunities in one place. Instead of searching through separate program pages, visitors can browse available courses, filter by training category and level, and compare details such as duration and learning format.'
                    ),
                    el('p', null,
                        'The platform combines WordPress for managing course information with a custom React dashboard for browsing it. I designed it so that course details can be updated directly in WordPress and automatically reflected in the catalog, without having to edit the website\'s code.'
                    ),
                    el('p', null,
                        'My goal was to build a user-friendly training directory while demonstrating how content management, web development, and interactive design can work together.'
                    )
                )
            ),

            selected && el('div', {
                className: 'atp-modal-backdrop',
                onClick: function (event) {
                    if (event.target === event.currentTarget) {
                        setSelected(null);
                    }
                }
            },
                el('div', {
                    className: 'atp-modal',
                    role: 'dialog',
                    'aria-modal': 'true',
                    'aria-labelledby': 'atp-detail-title'
                },
                    el('button', {
                        type: 'button',
                        className: 'atp-close',
                        'aria-label': 'Close course details',
                        onClick: function () {
                            setSelected(null);
                        }
                    }, '×'),
                    el('img', {
                        className: 'atp-detail-image',
                        src: getImage(selected),
                        alt: 'Aviation training'
                    }),
                    el('div', { className: 'atp-modal-body' },
                        el('span', { className: 'atp-category' },
                            getCategory(selected)
                        ),
                        el('h2', { id: 'atp-detail-title' },
                            getText(selected.title.rendered)
                        ),
                        el('div', { className: 'atp-detail-facts' },
                            el('span', null,
                                'Duration: ' +
                                ((selected.course_details || {}).duration || 'Not specified')
                            ),
                            el('span', null,
                                'Level: ' +
                                ((selected.course_details || {}).level || 'Open level')
                            ),
                            el('span', null,
                                'Format: ' +
                                ((selected.course_details || {}).format || 'Not specified')
                            )
                        ),
                        el('h3', null, 'Course overview'),
                        el('p', null,
                            getText(
                                selected.content && selected.content.rendered
                                    ? selected.content.rendered
                                    : ''
                            ) || 'No additional description has been added.'
                        ),
                        el('a', {
                            href: selected.link,
                            className: 'atp-hero-button'
                        }, 'Open full course page →')
                    )
                )
            )
        );
    }

    const container = document.getElementById('atp-portal');

    if (container) {
        wp.element.render(el(App), container);
    }
})();

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Property Listings Carousel
const listingsContainer = document.querySelector('.listings-container');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');

if (listingsContainer && prevBtn && nextBtn) {
    let scrollAmount = 0;
    const scrollStep = 300;

    prevBtn.addEventListener('click', () => {
        scrollAmount = Math.max(0, scrollAmount - scrollStep);
        listingsContainer.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        const maxScroll = listingsContainer.scrollWidth - listingsContainer.clientWidth;
        scrollAmount = Math.min(maxScroll, scrollAmount + scrollStep);
        listingsContainer.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Update scroll buttons visibility
    listingsContainer.addEventListener('scroll', () => {
        scrollAmount = listingsContainer.scrollLeft;
        const maxScroll = listingsContainer.scrollWidth - listingsContainer.clientWidth;
        
        prevBtn.style.opacity = scrollAmount > 0 ? '1' : '0.5';
        nextBtn.style.opacity = scrollAmount < maxScroll ? '1' : '0.5';
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add scroll animation to service blocks
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-block, .property-card, .neighborhood-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Search form handling and dropdown
const heroSearch = document.querySelector('.hero-search');
const searchDropdown = document.querySelector('.search-dropdown');
const searchClearBtn = document.querySelector('.search-clear-btn');
const searchResultsList = document.querySelector('.search-results-list');
const searchResultItems = document.querySelectorAll('.search-result-item[data-address]');

// Mock address data for predictive typing
const mockAddresses = [
    '1150 100th Lane NE #C, Blaine, MN',
    '1146 & 1150 Bingham Lake Drive, Bingham Lake, MN',
    '1148 Countess Avenue, Lehigh Acres, FL',
    '1150 107th Avenue NE, Blaine, MN',
    '1150 119th Avenue NW, Coon Rapids, MN',
    '1150 132nd Lane NE, Blaine, MN',
    '1150 13th Avenue NW, Hutchinson, MN',
    '1150 14th Street W, Hastings, MN',
    '1150 150th Street W, Rosemount, MN',
    '1150 16th Street, Minneapolis, MN',
    '1150 18th Avenue, Saint Paul, MN',
    '1150 1st Avenue N, Minneapolis, MN',
    '1150 2nd Street SE, Rochester, MN',
    '1150 3rd Avenue, Duluth, MN',
    '1150 4th Street, Bloomington, MN'
];

if (heroSearch) {
    // Function to position dropdown
    const positionDropdown = () => {
        if (searchDropdown && searchDropdown.classList.contains('active')) {
            const searchRect = heroSearch.getBoundingClientRect();
            const containerRect = heroSearch.parentElement.getBoundingClientRect();
            searchDropdown.style.top = (searchRect.top + searchRect.height) + 'px';
            searchDropdown.style.left = containerRect.left + 'px';
            searchDropdown.style.width = containerRect.width + 'px';
            searchDropdown.style.transform = 'none';
            searchDropdown.style.marginLeft = '0';
        }
    };

    // Get hero background element for blur effect
    const heroBackground = document.querySelector('.hero-background');

    // Show dropdown on focus
    heroSearch.addEventListener('focus', () => {
        if (searchDropdown) {
            searchDropdown.classList.add('active');
            heroSearch.parentElement.classList.add('active');
            if (heroBackground) {
                heroBackground.classList.add('search-active');
            }
            positionDropdown();
            // Show addresses immediately when focused
            filterAddresses();
        }
    });

    // Hide dropdown on blur (with delay to allow clicks)
    heroSearch.addEventListener('blur', (e) => {
        setTimeout(() => {
            if (searchDropdown && !searchDropdown.matches(':hover') && document.activeElement !== heroSearch) {
                searchDropdown.classList.remove('active');
                heroSearch.parentElement.classList.remove('active');
                if (heroBackground) {
                    heroBackground.classList.remove('search-active');
                }
            }
        }, 200);
    });

    // Keep dropdown open when clicking inside it
    if (searchDropdown) {
        searchDropdown.addEventListener('mousedown', (e) => {
            e.preventDefault();
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!heroSearch.contains(e.target) && !searchDropdown.contains(e.target)) {
                searchDropdown.classList.remove('active');
                heroSearch.parentElement.classList.remove('active');
                if (heroBackground) {
                    heroBackground.classList.remove('search-active');
                }
            }
        });
    }

    // Update clear button visibility
    const updateClearButton = () => {
        if (searchClearBtn) {
            searchClearBtn.style.display = heroSearch.value.trim() ? 'flex' : 'none';
        }
    };

    // Reposition dropdown on scroll/resize
    window.addEventListener('scroll', positionDropdown);
    window.addEventListener('resize', positionDropdown);

    heroSearch.addEventListener('input', (e) => {
        updateClearButton();
        // Show dropdown if not already visible
        if (searchDropdown && !searchDropdown.classList.contains('active')) {
            searchDropdown.classList.add('active');
            heroSearch.parentElement.classList.add('active');
            if (heroBackground) {
                heroBackground.classList.add('search-active');
            }
            positionDropdown();
        }
        filterAddresses();
    });

    // Clear search
    if (searchClearBtn) {
        searchClearBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            heroSearch.value = '';
            heroSearch.focus();
            updateClearButton();
            filterAddresses();
        });
    }

    // Handle "Homes near me" click
    const homesNearMe = document.querySelector('.homes-near-me');
    if (homesNearMe) {
        homesNearMe.addEventListener('click', () => {
            heroSearch.value = '';
            updateClearButton();
            if (searchDropdown) {
                searchDropdown.classList.remove('active');
                heroSearch.parentElement.classList.remove('active');
            }
            if (heroBackground) {
                heroBackground.classList.remove('search-active');
            }
            console.log('Searching for homes near me');
            // Add location-based search functionality here
        });
    }

    // Filter addresses based on input
    const filterAddresses = () => {
        const searchTerm = heroSearch.value.toLowerCase();
        
        if (!searchResultsList) return;

        // Clear existing results (except "Homes near me")
        const existingItems = searchResultsList.querySelectorAll('.search-result-item[data-address]');
        existingItems.forEach(item => item.remove());

        // Always show addresses when user is typing (even with empty string after focus)
        // Filter addresses that match the search term, or show all if no term yet
        let filtered;
        if (searchTerm.length === 0) {
            // Show all addresses when no search term (user just focused)
            filtered = mockAddresses;
        } else {
            // Filter addresses that match the search term
            filtered = mockAddresses.filter(address => 
                address.toLowerCase().includes(searchTerm)
            );
        }

        if (filtered.length > 0) {
            filtered.forEach(address => {
                const item = createAddressItem(address);
                searchResultsList.appendChild(item);
            });
        } else if (searchTerm.length > 0) {
            // Show "No results" message only if user has typed something
            const noResults = document.createElement('div');
            noResults.className = 'search-result-item';
            noResults.style.padding = '1rem';
            noResults.style.color = '#999';
            noResults.textContent = 'No addresses found';
            searchResultsList.appendChild(noResults);
        }
    };

    // Create address result item
    const createAddressItem = (address) => {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        item.setAttribute('data-address', address);
        item.textContent = address;
        
        item.addEventListener('click', () => {
            heroSearch.value = address;
            updateClearButton();
            if (searchDropdown) {
                searchDropdown.classList.remove('active');
                heroSearch.parentElement.classList.remove('active');
            }
            if (heroBackground) {
                heroBackground.classList.remove('search-active');
            }
            // Trigger search
            console.log('Selected address:', address);
        });

        item.addEventListener('mouseenter', () => {
            item.classList.add('selected');
        });

        item.addEventListener('mouseleave', () => {
            item.classList.remove('selected');
        });

        return item;
    };

    // Don't initialize addresses until user focuses or types

    // Handle Enter key
    heroSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const searchTerm = heroSearch.value.trim();
            if (searchTerm) {
                console.log('Searching for:', searchTerm);
                if (searchDropdown) {
                    searchDropdown.classList.remove('active');
                    heroSearch.parentElement.classList.remove('active');
                }
                if (heroBackground) {
                    heroBackground.classList.remove('search-active');
                }
                // Add your search functionality here
            }
        }
    });

    // Handle Escape key to close dropdown
    heroSearch.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchDropdown) {
            searchDropdown.classList.remove('active');
            heroSearch.parentElement.classList.remove('active');
            if (heroBackground) {
                heroBackground.classList.remove('search-active');
            }
            heroSearch.blur();
        }
    });
}

// Filter functionality
const bedroomsFilter = document.getElementById('bedrooms-filter');
const priceFilter = document.getElementById('price-filter');
const listingTypeRadios = document.querySelectorAll('input[name="listing-type"]');

if (bedroomsFilter) {
    bedroomsFilter.addEventListener('change', () => {
        console.log('Bedrooms filter:', bedroomsFilter.value);
        // Add filter logic here
    });
}

if (priceFilter) {
    priceFilter.addEventListener('change', () => {
        console.log('Price filter:', priceFilter.value);
        // Add filter logic here
    });
}

listingTypeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        console.log('Listing type:', radio.value);
        // Add filter logic here
    });
});

// Service button indicators animation
const serviceIndicators = document.querySelectorAll('.indicator');
if (serviceIndicators.length > 0) {
    let currentIndicator = 0;
    
    setInterval(() => {
        serviceIndicators.forEach(indicator => indicator.classList.remove('active'));
        serviceIndicators[currentIndicator].classList.add('active');
        currentIndicator = (currentIndicator + 1) % serviceIndicators.length;
    }, 3000);
}

// Sticky header shadow on scroll
const header = document.querySelector('.main-header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
    });
}

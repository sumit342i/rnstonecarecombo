const CONTACT = {
  whatsappNumber: '919876543210', // Replace with your actual WhatsApp number
  callNumber: '+919876543210',    // Replace with your actual phone number
};

let videoSlider = null;
let videoCardCount = 0;
let countdownInterval = null;
let scrollDebounceTimer = null;  // For debounced scroll
let lazyLoadObserver = null;     // For lazy loading images
let videoObserver = null;        // For pausing videos when out of view
let skeletonProgressInterval = null; // For skeleton progress tracking

// IMMEDIATE SCROLL PREVENTION - Apply as soon as script loads
(function() {
  // Function to apply scroll prevention
  const applyScrollPrevention = () => {
    const skeleton = document.getElementById('skeleton-loader');
    if (skeleton && !skeleton.classList.contains('hidden')) {
      // Apply scroll prevention immediately
      document.body.classList.add('skeleton-active');
      document.documentElement.classList.add('skeleton-active');

      // Block scroll events immediately at window level (highest priority)
      const preventScroll = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      };

      const scrollHandler = (e) => {
        // Allow Tab and Escape for accessibility
        if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Escape')) {
          return;
        }
        preventScroll(e);
      };

      // Add immediate scroll prevention at window level with capture
      ['wheel', 'touchmove', 'scroll', 'keydown'].forEach(event => {
        window.addEventListener(event, scrollHandler, { passive: false, capture: true });
        document.addEventListener(event, scrollHandler, { passive: false, capture: true });
      });

      // Store for cleanup
      window.immediateScrollCleanup = () => {
        ['wheel', 'touchmove', 'scroll', 'keydown'].forEach(event => {
          window.removeEventListener(event, scrollHandler, true);
          document.removeEventListener(event, scrollHandler, true);
        });
      };
    }
  };

  // Apply immediately if DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyScrollPrevention);
  } else {
    applyScrollPrevention();
  }
})();

// Enhanced skeleton loader with progress tracking
function hideSkeletonLoader() {
  const skeleton = document.getElementById('skeleton-loader');
  const body = document.body;
  const html = document.documentElement;

  if (skeleton) {
    // Clear any progress interval
    if (skeletonProgressInterval) {
      clearInterval(skeletonProgressInterval);
      skeletonProgressInterval = null;
    }

    // Clean up all scroll prevention
    if (window.immediateScrollCleanup) {
      window.immediateScrollCleanup();
      window.immediateScrollCleanup = null;
    }
    if (window.skeletonScrollCleanup) {
      window.skeletonScrollCleanup();
      window.skeletonScrollCleanup = null;
    }

    // Add hidden class for smooth transition
    skeleton.classList.add('hidden');

    // Set aria-hidden for accessibility
    skeleton.setAttribute('aria-hidden', 'true');

    // Remove scroll prevention classes
    body.classList.remove('skeleton-active');
    html.classList.remove('skeleton-active');

    // Remove from DOM after transition completes
    setTimeout(() => {
      if (skeleton.parentNode) {
        skeleton.parentNode.removeChild(skeleton);
      }
    }, 500); // Match CSS transition duration
  }
}

// Show skeleton loader with progress tracking
function showSkeletonLoader() {
  const skeleton = document.getElementById('skeleton-loader');
  const body = document.body;
  const html = document.documentElement;

  if (skeleton) {
    // Add scroll prevention classes
    body.classList.add('skeleton-active');
    html.classList.add('skeleton-active');

    skeleton.classList.remove('hidden');
    skeleton.setAttribute('aria-hidden', 'false');

    // Start progress tracking
    startSkeletonProgress();
  }
}

// Start skeleton progress animation
function startSkeletonProgress() {
  const progressBar = document.querySelector('.skeleton-progress-bar');
  const loadingText = document.querySelector('.skeleton-loading-text');

  if (!progressBar) return;

  let progress = 0;
  const loadingMessages = [
    'Loading Stone-Go...',
    'Preparing content...',
    'Almost ready...'
  ];
  let messageIndex = 0;

  skeletonProgressInterval = setInterval(() => {
    progress += Math.random() * 15; // Random progress increment

    if (progress >= 100) {
      progress = 100;
      clearInterval(skeletonProgressInterval);
      skeletonProgressInterval = null;
    }

    progressBar.style.width = progress + '%';

    // Update loading message at certain progress points
    if (progress > 30 && messageIndex === 0) {
      messageIndex = 1;
      if (loadingText) loadingText.textContent = loadingMessages[1];
    } else if (progress > 70 && messageIndex === 1) {
      messageIndex = 2;
      if (loadingText) loadingText.textContent = loadingMessages[2];
    }
  }, 200);
}

// Enhanced skeleton loader with minimum display time and scroll prevention
function initSkeletonLoader() {
  const skeleton = document.getElementById('skeleton-loader');
  const body = document.body;
  const html = document.documentElement;

  if (!skeleton) return;

  // Only apply scroll prevention if not already applied by immediate script
  if (!body.classList.contains('skeleton-active')) {
    // Prevent scrolling immediately to avoid UX issues during loading
    body.classList.add('skeleton-active');
    html.classList.add('skeleton-active');

    // Additional scroll prevention: block scroll events
    const preventScroll = (e) => {
      if (body.classList.contains('skeleton-active')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Add scroll prevention listeners (allow Tab/Escape for accessibility)
    const scrollEvents = ['wheel', 'touchmove', 'scroll', 'keydown'];
    const scrollHandler = (e) => {
      // Allow Tab key for accessibility
      if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Escape')) {
        return;
      }
      preventScroll(e);
    };

    scrollEvents.forEach(event => {
      document.addEventListener(event, scrollHandler, { passive: false });
    });

    // Store cleanup function for later
    window.skeletonScrollCleanup = () => {
      scrollEvents.forEach(event => {
        document.removeEventListener(event, scrollHandler);
      });
    };
  }

  // Start progress tracking
  startSkeletonProgress();

  // Ensure minimum display time for better UX (at least 1.5 seconds)
  const minDisplayTime = 1500;
  const startTime = Date.now();

  // Function to hide skeleton after minimum time
  const hideAfterMinTime = () => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, minDisplayTime - elapsed);

    setTimeout(() => {
      hideSkeletonLoader();
    }, remaining);
  };

  // Check if page is already loaded
  if (document.readyState === 'complete') {
    hideAfterMinTime();
  } else {
    // Wait for page load
    window.addEventListener('load', hideAfterMinTime);

    // Fallback: hide after 5 seconds max
    setTimeout(() => {
      if (skeleton && !skeleton.classList.contains('hidden')) {
        hideSkeletonLoader();
      }
    }, 5000);
  }
}

function isConfiguredContact(value, minDigits = 10) {
  return typeof value === 'string' && !/[xX]/.test(value) && value.replace(/\D/g, '').length >= minDigits;
}

function cleanNumber(value) {
  return (value || '').replace(/\D/g, '');
}

function initLazyLoadImages() {
  try {
    if (!('IntersectionObserver' in window)) {
      // Fallback: load all images immediately for older browsers
      const images = document.querySelectorAll('img[data-src]');
      images.forEach(img => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
      });
      return;
    }

    lazyLoadObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.tagName === 'IMG') {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.style.opacity = '1';
            lazyLoadObserver.unobserve(img);
          }
        }
      });
    }, { rootMargin: '50px' });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s ease';
      lazyLoadObserver.observe(img);
    });
  } catch (error) {
    console.error('Error initializing lazy load:', error);
  }
}

function debouncedScroll(callback, delay = 250) {
  return function() {
    clearTimeout(scrollDebounceTimer);
    scrollDebounceTimer = setTimeout(callback, delay);
  };
}

function buildWhatsAppUrl(message) {
  if (!isConfiguredContact(CONTACT.whatsappNumber)) {
    return '';
  }

  return `https://wa.me/${cleanNumber(CONTACT.whatsappNumber)}?text=${encodeURIComponent(message)}`;
}

function openExternalUrl(url) {
  if (!url) {
    return false;
  }

  const popup = window.open(url, '_blank', 'noopener,noreferrer');
  if (!popup) {
    window.location.href = url;
  }

  return true;
}

function showContactSetupMessage(channel) {
  const label = channel === 'call' ? 'call number' : 'WhatsApp number';
  alert(`Please set your real ${label} in script.js before using this feature.`);
}

function initFadeInObserver() {
  try {
    const fadeItems = document.querySelectorAll('.fi');
    if (!fadeItems || fadeItems.length === 0) {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      fadeItems.forEach((item) => {
        if (item) item.classList.add('on');
      });
      return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry, index) => {
        if (!entry || !entry.isIntersecting) {
          return;
        }

        if (entry.target) {
          // Add small stagger delay to prevent all animations at once
          setTimeout(() => {
            entry.target.classList.add('on');
            currentObserver.unobserve(entry.target);
          }, index * 50); // 50ms delay between each element
        }
      });
    }, { threshold: 0.05 });  // Reduced from 0.06 for better responsiveness

    fadeItems.forEach((item) => {
      if (item) observer.observe(item);
    });
  } catch (error) {
    console.error('Error initializing fade-in observer:', error);
  }
}

function initCountdown() {
  const countdown = document.getElementById('countdown');
  if (!countdown) {
    return;
  }

  // Clear previous interval if it exists
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  let totalSeconds = (4 * 3600) + (30 * 60);

  function tick() {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    countdown.textContent = [
      String(hours).padStart(2, '0'),
      String(minutes).padStart(2, '0'),
      String(seconds).padStart(2, '0'),
    ].join(':');

    totalSeconds -= 1;
    if (totalSeconds < 0) {
      totalSeconds = (4 * 3600) + (30 * 60);
    }
  }

  tick();
  countdownInterval = window.setInterval(tick, 1000);
}

function initNavState() {
  try {
    const nav = document.querySelector('.topnav');
    if (!nav) {
      return;
    }

    const syncNav = debouncedScroll(() => {
      if (nav) {
        nav.classList.toggle('scrolled', window.scrollY > 24);
      }
    }, 100);  // Increased debounce delay

    syncNav();
    window.addEventListener('scroll', syncNav, { passive: true });
  } catch (error) {
    console.error('Error initializing nav state:', error);
  }
}

function faq(element) {
  if (!element || !element.nextElementSibling) {
    return;
  }

  const answer = element.nextElementSibling;
  const alreadyOpen = answer.classList.contains('show');

  document.querySelectorAll('.faq-a').forEach((item) => item.classList.remove('show'));
  document.querySelectorAll('.faq-q').forEach((item) => item.classList.remove('open'));

  if (!alreadyOpen) {
    answer.classList.add('show');
    element.classList.add('open');
  }
}

function animateCount(id, target, suffix = '', duration = 1500) {
  try {
    const element = document.getElementById(id);
    if (!element) {
      return;
    }

    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const currentValue = Math.floor(progress * target);
      
      if (element) {
        element.textContent = `${currentValue.toLocaleString('en-IN')}${suffix}`;
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  } catch (error) {
    console.error('Error animating count:', error);
  }
}

function initCounters() {
  try {
    const counterSection = document.getElementById('s-counter');
    if (!counterSection) {
      return;
    }

    let hasAnimated = false;

    function startAnimation() {
      if (hasAnimated) {
        return;
      }

      hasAnimated = true;
      animateCount('c1', 5000, '+', 2000);
      animateCount('c2', 98, '%', 1500);
      animateCount('c3', 15, '+', 1500);
      animateCount('c4', 8, '', 1200);
    }

    if (!('IntersectionObserver' in window)) {
      startAnimation();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (!entries || !entries[0] || !entries[0].isIntersecting) {
        return;
      }

      startAnimation();
      observer.disconnect();
    }, { threshold: 0.3 });

    observer.observe(counterSection);
  } catch (error) {
    console.error('Error initializing counters:', error);
  }
}

function getSliderStepSize() {
  try {
    if (!videoSlider) {
      return 0;
    }

    const firstCard = videoSlider.querySelector('.vid-card');
    if (!firstCard) {
      return 0;
    }

    const styles = window.getComputedStyle(videoSlider);
    const gap = parseFloat(styles.columnGap || styles.gap || '0');

    return firstCard.getBoundingClientRect().width + gap;
  } catch (error) {
    console.error('Error getting slider step size:', error);
    return 0;
  }
}

function updateVideoDots() {
  const dots = document.querySelectorAll('#vidDots .vdot');
  if (!videoSlider || !dots.length) {
    return;
  }

  const stepSize = getSliderStepSize();
  if (!stepSize) {
    return;
  }

  const activeIndex = Math.max(0, Math.min(
    videoCardCount - 1,
    Math.round(videoSlider.scrollLeft / stepSize),
  ));

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === activeIndex);
  });
}

function scrollToVid(index) {
  if (!videoSlider) {
    return;
  }

  const stepSize = getSliderStepSize();
  if (!stepSize) {
    return;
  }

  const safeIndex = Math.max(0, Math.min(index, videoCardCount - 1));
  videoSlider.scrollTo({
    left: safeIndex * stepSize,
    behavior: 'smooth',
  });
}

function initVideoSlider() {
  try {
    videoSlider = document.getElementById('vidSlider');
    const dotsRoot = document.getElementById('vidDots');

    if (!videoSlider || !dotsRoot) {
      return;
    }

    const cards = Array.from(videoSlider.querySelectorAll('.vid-card'));
    videoCardCount = cards.length;

    dotsRoot.innerHTML = '';

    cards.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = index === 0 ? 'vdot active' : 'vdot';
      dot.setAttribute('aria-label', `Go to video ${index + 1}`);
      dot.addEventListener('click', () => scrollToVid(index));
      dotsRoot.appendChild(dot);
    });

    // Add keyboard navigation for video cards
    cards.forEach((card, index) => {
      const playBtn = card.querySelector('.play-btn');
      if (playBtn) {
        playBtn.setAttribute('tabindex', '0');
        playBtn.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            playVideo(playBtn);
          }
        });
      }

      // Add video keyboard controls
      const video = card.querySelector('.vid-player');
      if (video) {
        video.addEventListener('keydown', (e) => {
          if (e.key === ' ') {
            e.preventDefault();
            if (video.paused) {
              video.play();
            } else {
              video.pause();
            }
          }
        });
      }
    });

    videoSlider.addEventListener('scroll', updateVideoDots, { passive: true });
    window.addEventListener('resize', updateVideoDots);
    updateVideoDots();

    // Initialize video observer to pause videos when out of view
    initVideoObserver();
  } catch (error) {
    console.error('Error initializing video slider:', error);
  }
}

function initVideoObserver() {
  try {
    // Disconnect existing observer if it exists
    if (videoObserver) {
      videoObserver.disconnect();
    }

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      console.warn('IntersectionObserver not supported, videos will not auto-pause when out of view');
      return;
    }

    // Create new observer for videos
    videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        if (!entry.isIntersecting && !video.paused) {
          // Video is out of view, pause it
          video.pause();
        }
      });
    }, {
      threshold: 0.1, // Trigger when 10% of video is visible
      rootMargin: '50px' // Add some margin for better UX
    });

    // Observe all video elements
    const videos = document.querySelectorAll('.vid-player');
    videos.forEach(video => {
      videoObserver.observe(video);
    });

    // Also pause videos when page becomes hidden (user switches tabs)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        pauseAllVideos();
      }
    });

  } catch (error) {
    console.error('Error initializing video observer:', error);
  }
}

// Function to re-observe videos (useful if new videos are added dynamically)
function reobserveVideos() {
  if (videoObserver) {
    const videos = document.querySelectorAll('.vid-player');
    videos.forEach(video => {
      videoObserver.observe(video);
    });
  }
}

// Cleanup function to disconnect observers
function cleanupObservers() {
  if (lazyLoadObserver) {
    lazyLoadObserver.disconnect();
    lazyLoadObserver = null;
  }
  if (videoObserver) {
    videoObserver.disconnect();
    videoObserver = null;
  }
}

function playVideo(buttonElement) {
  try {
    // Find the video element within the same card
    const card = buttonElement.closest('.vid-card');
    if (!card) {
      console.error('Video card not found');
      return;
    }

    const video = card.querySelector('.vid-player');
    if (!video) {
      console.error('Video element not found');
      return;
    }

    const overlay = card.querySelector('.vid-overlay');
    const loading = card.querySelector('.vid-loading');

    // Pause all other videos first
    pauseAllVideos(card);

    // Show loading state
    if (loading) {
      loading.style.display = 'flex';
    }

    // Hide overlay when video starts playing
    const handleCanPlay = () => {
      if (loading) {
        loading.style.display = 'none';
      }
      video.removeEventListener('canplay', handleCanPlay);
    };

    const handlePlay = () => {
      if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
      }
      if (loading) {
        loading.style.display = 'none';
      }
    };

    const handlePause = () => {
      if (overlay) {
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
      }
      if (loading) {
        loading.style.display = 'none';
      }
    };

    const handlePlaying = () => {
      if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
      }
      if (loading) {
        loading.style.display = 'none';
      }
    };

    const handleError = () => {
      if (loading) {
        loading.style.display = 'none';
      }
      const errorDiv = card.querySelector('.vid-error');
      if (errorDiv) {
        errorDiv.classList.add('show');
      }
      console.error('Video failed to load');
      video.removeEventListener('error', handleError);
    };

    // Add event listeners
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('play', handlePlay);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);

    // Play the video
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error('Video play failed:', error);
        if (loading) {
          loading.style.display = 'none';
        }
      });
    }

  } catch (error) {
    console.error('Error playing video:', error);
  }
}

function pauseAllVideos(exceptCard = null) {
  try {
    const allVideos = document.querySelectorAll('.vid-player');
    allVideos.forEach(video => {
      const videoCard = video.closest('.vid-card');
      if (videoCard && videoCard !== exceptCard && !video.paused) {
        video.pause();
      }
    });
  } catch (error) {
    console.error('Error pausing videos:', error);
  }
}

function getFieldValue(id) {
  const field = document.getElementById(id);
  return field ? field.value.trim() : '';
}

function getSelectText(id) {
  const field = document.getElementById(id);
  if (!field || field.selectedIndex < 0) {
    return '';
  }

  return field.options[field.selectedIndex].text.trim();
}

function submitOrder() {
  const name = getFieldValue('f-name');
  const phone = getFieldValue('f-phone');
  const address = getFieldValue('f-address');
  const productValue = getFieldValue('f-product');

  // Validate all required fields
  if (!name || !phone || !address || !productValue) {
    alert('⚠️ प्लीज़ सभी required fields भरें (*से चिह्नित)');
    return;
  }

  // Validate phone number
  const phoneDigits = phone.replace(/\D/g, '');
  if (phoneDigits.length < 7) {
    alert('⚠️ कृपया valid mobile number दर्ज करें (कम से कम 7 नंबर)।');
    return;
  }

  // Get optional fields
  const wa = getFieldValue('f-wa');
  const size = getFieldValue('f-size');
  const message = getFieldValue('f-msg');

  try {
    // Build order message
    const orderLines = [
      'RN Herbal - New Order',
      '',
      `Name: ${name}`,
      `Mobile: ${phone}`,
    ];

    if (wa) {
      orderLines.push(`WhatsApp: ${wa}`);
    }

    orderLines.push(`Product: ${getSelectText('f-product')}`);
    orderLines.push(`Stone Type: ${getSelectText('f-type') || 'Not shared'}`);
    orderLines.push(`Size: ${size || 'Not shared'}`);
    orderLines.push(`Address: ${address}`);
    orderLines.push(`Country: ${getSelectText('f-country')}`);
    orderLines.push(`Payment: ${getSelectText('f-payment')}`);

    if (message) {
      orderLines.push(`Message: ${message}`);
    }

    orderLines.push('');
    orderLines.push('Please confirm order and delivery time.');

    const url = buildWhatsAppUrl(orderLines.join('\n'));
    if (!url) {
      showContactSetupMessage('whatsapp');
      return;
    }

    // Open WhatsApp URL
    const opened = openExternalUrl(url);
    
    if (opened) {
      // Show success message
      const successBox = document.getElementById('formSuccess');
      if (successBox) {
        successBox.style.display = 'block';
      }

      // Scroll to success message
      const orderForm = document.getElementById('orderForm');
      if (orderForm && typeof orderForm.scrollIntoView === 'function') {
        orderForm.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
      
      // Reset form after a short delay
      setTimeout(() => {
        if (typeof orderForm?.reset === 'function') {
          orderForm.reset();
        }
      }, 1000);
    }
  } catch (error) {
    console.error('Error submitting order:', error);
    alert('❌ Order भेजने में error आई। कृपया फिर से कोशिश करें।');
  }
}

function fallbackCopyText(text) {
  const tempInput = document.createElement('input');
  tempInput.type = 'text';
  tempInput.value = text;
  tempInput.setAttribute('readonly', '');
  tempInput.style.position = 'absolute';
  tempInput.style.left = '-9999px';

  document.body.appendChild(tempInput);
  tempInput.select();
  tempInput.setSelectionRange(0, text.length);

  try {
    document.execCommand('copy');
    alert('Link copied successfully.');
  } catch (error) {
    window.prompt('Copy this link:', text);
  }

  tempInput.remove();
}

function copyLink(event) {
  if (event && typeof event.preventDefault === 'function') {
    event.preventDefault();
  }

  const url = window.location.href;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(url)
      .then(() => {
        alert('Link copied successfully.');
      })
      .catch(() => {
        fallbackCopyText(url);
      });
    return;
  }

  fallbackCopyText(url);
}

function initShareLinks() {
  try {
    const currentPageUrl = window.location.href;
    const whatsappShareLink = document.getElementById('shareWaLink');
    const facebookShareLink = document.getElementById('shareFbLink');
    const shareMessage = 'Pathri ka Ayurvedic ilaaj - bina operation ke! RN Herbal Stone-Go Capsule. Abhi dekhein:';

    if (whatsappShareLink) {
      whatsappShareLink.href = `https://wa.me/?text=${encodeURIComponent(`${shareMessage}\n${currentPageUrl}`)}`;
    }

    if (facebookShareLink) {
      facebookShareLink.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentPageUrl)}`;
    }
  } catch (error) {
    console.error('Error initializing share links:', error);
  }
}

function initContactLinks() {
  try {
    const ctaWaLink = document.getElementById('ctaWaLink');
    const ctaCallLink = document.getElementById('ctaCallLink');
    const footerWhatsappText = document.getElementById('footerWhatsappText');

    if (ctaWaLink) {
      const waUrl = buildWhatsAppUrl('Mujhe Stone-Go Combo chahiye');
      if (waUrl) {
        ctaWaLink.href = waUrl;
        ctaWaLink.target = '_blank';
        ctaWaLink.rel = 'noopener noreferrer';
      } else {
        ctaWaLink.href = '#s-form';
        ctaWaLink.title = 'Set your WhatsApp number in script.js to enable direct chat.';
      }
    }

    if (ctaCallLink) {
      if (isConfiguredContact(CONTACT.callNumber)) {
        ctaCallLink.href = `tel:${cleanNumber(CONTACT.callNumber)}`;
      } else {
        ctaCallLink.href = '#s-form';
        ctaCallLink.title = 'Set your call number in script.js to enable direct calling.';
      }
    }

    if (footerWhatsappText && isConfiguredContact(CONTACT.whatsappNumber)) {
      footerWhatsappText.textContent = CONTACT.whatsappNumber;
    }
  } catch (error) {
    console.error('Error initializing contact links:', error);
  }
}

function init() {
  try {
    // Only initialize if DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    initNavState();
    initFadeInObserver();
    initLazyLoadImages();  // Initialize lazy loading
    initCountdown();
    initCounters();
    initVideoSlider();
    initShareLinks();
    initContactLinks();

    // Initialize enhanced skeleton loader
    initSkeletonLoader();

    // Add a comment about contact setup for reference
    if (!isConfiguredContact(CONTACT.whatsappNumber)) {
      console.warn('⚠️ WhatsApp number not configured. Please update CONTACT.whatsappNumber in script.js');
    }
    if (!isConfiguredContact(CONTACT.callNumber)) {
      console.warn('⚠️ Call number not configured. Please update CONTACT.callNumber in script.js');
    }
  } catch (error) {
    console.error('Error during initialization:', error);
  }
}

// Start initialization
init();

// Cleanup on page unload
window.addEventListener('beforeunload', cleanupObservers);

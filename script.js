function toggleMenu() {
            document.getElementById('navMenu').classList.toggle('active');
        }

        function activateLink(element) {
            // Remove jumping effect from others
            document.querySelectorAll('.nav-links a').forEach(link => {
                if(!link.classList.contains('login-btn')) {
                    link.classList.remove('jumping-link');
                }
            });

            // Add jumping rainbow effect to the one you clicked
            element.classList.add('jumping-link');
        }

        

        //slider 
        document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.slider-track');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const nextBtn = document.querySelector('.next-btn');
  const prevBtn = document.querySelector('.prev-btn');
  const dotsContainer = document.querySelector('.dots-container');

  let currentIndex = 0;

  // 1. Dynamic Pagination Dots Generation
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  // 2. Core Slider Transition Update
  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update dots active state
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    updateSlider();
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
  }

  // Button Event Listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // 3. Mobile Touch Swipe Functionality
  let startX = 0;
  let endX = 0;
  const swipeThreshold = 50; // Minimum drag distance in pixels to trigger slide swap

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', () => {
    const totalSwipeDistance = startX - endX;

    // Check if the swipe crossed our threshold limits
    if (Math.abs(totalSwipeDistance) > swipeThreshold) {
      if (totalSwipeDistance > 0) {
        // Swiped Left -> Load Next Slide
        nextSlide();
      } else {
        // Swiped Right -> Load Previous Slide
        prevSlide();
      }
    }
    
    // Reset positions
    startX = 0;
    endX = 0;
  });
});

        // search interface toggle
 document.addEventListener('DOMContentLoaded', () => {
            const searchToggleBtn = document.getElementById('searchToggleBtn');
            const closeSearchBtn = document.getElementById('closeSearchBtn');
            const searchOverlay = document.getElementById('searchOverlay');
            const searchInput = document.getElementById('searchInput');
            const executeSearchBtn = document.getElementById('executeSearchBtn');
            const searchErrorBlock = document.getElementById('searchErrorBlock');
            const searchItems = document.querySelectorAll('.search-item');

            // Interactive Dynamic Kinetic Text Typist Setup Logic
            const kineticErrorText = document.getElementById('kineticErrorText');
            let textEngineTimer = null;
            let charIndex = 0;
            let currentMessageString = "";

            function runKineticWriter(textToPrint) {
                if (charIndex < textToPrint.length) {
                    kineticErrorText.innerHTML += textToPrint.charAt(charIndex);
                    charIndex++;
                    textEngineTimer = setTimeout(() => {
                        runKineticWriter(textToPrint);
                    }, 45);
                }
            }

            function clearKineticWriter() {
                clearTimeout(textEngineTimer);
                charIndex = 0;
                kineticErrorText.innerHTML = "";
            }

            // Opens the full-screen covering canvas block overlay
            searchToggleBtn.addEventListener('click', () => {
                searchOverlay.classList.add('is-active');
                document.body.style.overflow = 'hidden'; // Prevents background page scrolling while searching
                searchInput.focus();
            });

            // Closes the full-screen covering view completely
            closeSearchBtn.addEventListener('click', () => {
                searchOverlay.classList.remove('is-active');
                document.body.style.overflow = 'auto'; // Restores natural background page navigation actions
                
                // Reset standard parameters upon engine close
                searchInput.value = '';
                searchErrorBlock.style.display = 'none';
                clearKineticWriter();
                searchItems.forEach(item => item.style.display = 'none');
            });

            // Master data structure execution filter framework
            function runIntegratedSearch() {
                const rawInput = searchInput.value.trim().toLowerCase();
                let matchesFound = false;

                // Hide error block indicator at the start of search run action
                searchErrorBlock.style.display = 'none';
                clearKineticWriter();

                searchItems.forEach(item => {
                    // Check if query field is filled and targets specific category classes accurately
                    if (rawInput !== '' && item.classList.contains(rawInput)) {
                        item.style.display = 'block'; 
                        matchesFound = true;
                    } else {
                        item.style.display = 'none';
                    }
                });

                // Display error prompt box if input does not match target collection keywords
                if (rawInput !== '' && !matchesFound) {
                    searchErrorBlock.style.display = 'block';
                    currentMessageString = `"${rawInput}" pattern is out of stock. Try searching blouse, frock or gown instead.`;
                    runKineticWriter(currentMessageString);
                }
            }

            // Map user input trigger events
            executeSearchBtn.addEventListener('click', runIntegratedSearch);
            searchInput.addEventListener('keyup', (event) => {
                if (event.key === 'Enter') {
                    runIntegratedSearch();
                }
            });
        });


// search interface toggle end

//send feedback box
const toggleBtn = document.getElementById('toggleBtn');
        const feedbackBox = document.getElementById('feedbackBox');
        const feedbackForm = document.getElementById('feedbackForm');
        const statusMessage = document.getElementById('statusMessage');

        // 1. Toggle visibility of the feedback box
        toggleBtn.addEventListener('click', () => {
            feedbackBox.classList.toggle('show');
            // Change button text based on state
            if(feedbackBox.classList.contains('show')) {
                toggleBtn.innerText = 'Close';
                toggleBtn.style.backgroundColor = '#dc3545'; // red when open
            } else {
                toggleBtn.innerText = 'Send Feedback';
                toggleBtn.style.backgroundColor = '#007bff'; // blue when closed
            }
        });

        // 2. Handle Form Submission to EmailJS
        feedbackForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const emailInput = document.getElementById('userEmail').value;
            const messageInput = document.getElementById('userMessage').value;
            const submitBtn = feedbackForm.querySelector('.submit-btn');

            // Change button UI during sending state
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            // Prepare parameters matching your EmailJS Template variables
            // Example: {{user_email}} and {{message}} inside your EmailJS dashboard template
            const templateParams = {
                user_email: emailInput,
                message: messageInput
            };

            // Send via EmailJS
            // REPLACE "YOUR_SERVICE_ID" and "YOUR_TEMPLATE_ID" with your dashboard values
            emailjs.send('service_cgqww9c', 'template_wm4uake', templateParams)
                .then(() => {
                    statusMessage.style.display = 'block';
                    statusMessage.style.color = '#28a745';
                    statusMessage.innerText = 'Feedback sent successfully!';
                    
                    // Reset Form
                    feedbackForm.reset();
                    
                    // Automatically hide widget after 2 seconds
                    setTimeout(() => {
                        feedbackBox.classList.remove('show');
                        toggleBtn.innerText = 'Send Feedback';
                        toggleBtn.style.backgroundColor = '#007bff';
                        statusMessage.style.display = 'none';
                    }, 2000);

                }, (error) => {
                    statusMessage.style.display = 'block';
                    statusMessage.style.color = '#dc3545';
                    statusMessage.innerText = 'Failed to send. Try again.';
                    console.error('EmailJS Error:', error);
                })
                .finally(() => {
                    submitBtn.innerText = 'Send to Gmail';
                    submitBtn.disabled = false;
                });
        });

        //background music

       
// --- Keep your existing toggleMenu() or activeLink() functions below this line ---
 // FIXED TIME EVALUATOR ENGINE (12-Hour Format & Sunday Open)
        document.addEventListener("DOMContentLoaded", () => {
            const hoursToggle = document.getElementById("hoursToggle");
            const hoursWidget = document.getElementById("hoursWidget");
            const dropdownArrow = document.getElementById("dropdownArrow");
            const currentStatus = document.getElementById("currentStatus");
            const todaysHoursText = document.getElementById("todaysHours");

            hoursToggle.addEventListener("click", () => {
                hoursWidget.classList.toggle("active");
                dropdownArrow.classList.toggle("active");
            });

            // Every day (0 to 6) is configured identically to be completely open
            const schedule = {
                1: { closed: false, open: "10:00", close: "21:00" }, // Mon
                2: { closed: false, open: "10:00", close: "21:00" }, // Tue
                3: { closed: false, open: "10:00", close: "21:00" }, // Wed
                4: { closed: false, open: "10:00", close: "21:00" }, // Thu
                5: { closed: false, open: "10:00", close: "21:00" }, // Fri
                6: { closed: false, open: "10:00", close: "21:00" }, // Sat
                0: { closed: false, open: "10:00", close: "20:00" }  // Sun is now OPEN!
            };

            const now = new Date();
            const currentDay = now.getDay(); 
            
            const todayRow = document.querySelector(`.hours-table tr[data-day="${currentDay}"]`);
            if (todayRow) {
                todayRow.classList.add("today");
                todaysHoursText.textContent = "Closes 10:00 PM";
            }

            function checkStatus() {
                const todaySchedule = schedule[currentDay];
                
                const currentHour = now.getHours();
                const currentMinute = now.getMinutes();
                const [openHour, openMinute] = todaySchedule.open.split(":").map(Number);
                const [closeHour, closeMinute] = todaySchedule.close.split(":").map(Number);

                const currentTotal = currentHour * 60 + currentMinute;
                const openTotal = openHour * 60 + openMinute;
                const closeTotal = closeHour * 60 + closeMinute;

                // Verifies time directly on local browser thread
                if (currentTotal >= openTotal && currentTotal < closeTotal) { 
                    setOpen(); 
                } else { 
                    setClosed(); 
                }
            }

            function setOpen() {
                currentStatus.textContent = "Open";
                currentStatus.className = "status-badge open";
            }
            function setClosed() {
                currentStatus.textContent = "Closed";
                currentStatus.className = "status-badge closed";
            }

            checkStatus();
        });



        
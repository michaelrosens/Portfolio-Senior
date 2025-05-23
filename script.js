// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Delayed follower effect
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Cursor effects
document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
    cursorFollower.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
    cursorFollower.style.transform = 'scale(1)';
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    themeToggle.querySelector('i').classList.toggle('fa-moon');
    themeToggle.querySelector('i').classList.toggle('fa-sun');
});

// Fullscreen Toggle
const fullscreenToggle = document.querySelector('.fullscreen-toggle');

fullscreenToggle.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        fullscreenToggle.querySelector('i').classList.replace('fa-expand', 'fa-compress');
    } else {
        document.exitFullscreen();
        fullscreenToggle.querySelector('i').classList.replace('fa-compress', 'fa-expand');
    }
});

// Project data
const projects = [
    {
        id: 'project1',
        title: 'Year 1 portfolio',
        description: 'A simple portfolio discussing my life, aspirations and goals.',
        skills: ['HTML', 'CSS'],
        images: ['portfolio.png'],
        date: 'September 12, 2023',
        link: 'https://michaelrosens.github.io/Year-1-Portfolio/' 
    },
    {
        id: 'project2',
        title: 'Summer-tainment Site',
        description: 'A website displaying a movie I watched that summer, The Shawshank Redemption.',
        skills: ['HTML', 'CSS'],
        images: ['shawshank.png'],
        date: 'October 6, 2023',
        link: 'https://michaelrosens.github.io/Summer-tainment-site/' 
    },
    {
        id: 'project3',
        title: 'Look Ma, Im Famous!',
        description: 'Website discussing the Seventh president, Andrew Jackson.',
        skills: ['HTML', 'CSS'],
        images: ['andrew.png'],
        date: 'December 4, 2023',
        link: 'https://michaelrosens.github.io/look-ma--im-famous/' // Add your actual dashboard URL here
    },
    {
        id: 'project4',
        title: 'Magic 8 Ball',
        description: 'Ask the 8 ball a question, and it will randomly generate an answer. This was our first Javascript intensive project.',
        skills: ['HTML', 'CSS', 'JS'],
        images: ['8-ball.png'],
        date: 'December 18, 2023',
        link: 'https://michaelrosens.github.io/8-ball/' // Add your actual dashboard URL here
    },
    {
        id: 'project5',
        title: 'Birthday Site',
        description: 'A user-friendly and javascript-heavy website displaying events that occurred on my birthday, October 12th, throughout the years.',
        skills: ['HTML', 'CSS', 'JS'],
        images: ['birthday.png'],
        date: 'January 30, 2024',
        link: 'https://michaelrosens.github.io/Birthday/' // Add your actual dashboard URL here
    },
    {
        id: 'project6',
        title: 'NBA Superteam',
        description: 'Another early javascript website, displaying my favorite NBA players of alltime',
        skills: ['HTML', 'CSS', 'JS'],
        images: ['nba.png'],
        date: 'May 16, 2024',
        link: 'https://github.com/michaelrosens/superteam' // Add your actual dashboard URL here
    },
    {
        id: 'project7',
        title: 'TCNJ recruitment project',
        description: 'My first project of my senior year, a website talking about the college I wanted to go, and the one I ended up committing to a few months later. ',
        skills: ['HTML', 'CSS', 'JS'],
        images: ['tcn.png'],
        date: 'September 20, 2024',
        link: 'https://michaelrosens.github.io/College-Recruitment/' // Add your actual dashboard URL here
    },
    {
        id: 'project8',
        title: 'Family Convenience Store Website',
        description: 'My most recent site, as well as the longest time ever spent on one.  ',
        skills: ['HTML', 'CSS', 'JS', 'Vue'  ],
        images: ['madison.png'],
        date: 'March 14, 2025',
        link: 'https://michaelrosens.github.io/madison-variety/' // Add your actual dashboard URL here
    },

];

// Initialize timeline
function initializeTimeline() {
    const timeline = document.querySelector('.timeline');
    
    projects.forEach((project, index) => {
        const node = createProjectNode(project, index);
        timeline.appendChild(node);
    });

    // Add navigation buttons functionality
    document.querySelector('.prev-btn').addEventListener('click', () => {
        timelineContainer.scrollBy({ left: -400, behavior: 'smooth' });
    });

    document.querySelector('.next-btn').addEventListener('click', () => {
        timelineContainer.scrollBy({ left: 400, behavior: 'smooth' });
    });
}

// Create project node
function createProjectNode(project, index) {
    const node = document.createElement('div');
    node.className = 'project-node';
    node.dataset.project = project.id;
    
    node.innerHTML = `
        <div class="node-content">
            <div class="project-date">${project.date}</div>
            <h3>${project.title}</h3>
            <div class="project-details">
                <button class="close-btn"><i class="fas fa-times"></i></button>
                <h2 class="project-title">${project.title}</h2>
                <div class="project-images">
                    ${project.images.map(img => `
                        <a href="${project.link}" target="_blank" rel="noopener noreferrer">
                            <img src="${img}" alt="${project.title}">
                        </a>
                    `).join('')}
                </div>
                <div class="project-skills">
                    ${project.skills.map(skill => `<span>${skill}</span>`).join('')}
                </div>
                <p class="project-description">${project.description}</p>
            </div>
        </div>
    `;
    
    // Add hover sound effect
    node.addEventListener('mouseenter', () => {
        cursorFollower.style.transform = 'scale(1.5)';
    });

    node.addEventListener('mouseleave', () => {
        cursorFollower.style.transform = 'scale(1)';
    });
    
    node.addEventListener('click', (e) => {
        expandProject(node);
    });

    // Add close button functionality
    const closeBtn = node.querySelector('.close-btn');
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the click from triggering the expand
        closeProject(node);
    });
    
    return node;
}

// Expand project
function expandProject(node) {
    const allNodes = document.querySelectorAll('.node-content');
    allNodes.forEach(n => n.classList.remove('active'));
    
    const details = node.querySelector('.project-details');
    details.classList.add('active');
    node.querySelector('.node-content').classList.add('active');
    
    // Typewriter effect for title
    const title = node.querySelector('.project-title');
    title.classList.add('typing');
    
    // Fade in other elements
    const elements = node.querySelectorAll('.project-images, .project-skills, .project-description');
    elements.forEach(el => el.classList.add('fade-in'));

    // Scroll to center the expanded project
    const container = document.querySelector('.timeline-container');
    const nodeRect = node.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const scrollLeft = nodeRect.left + container.scrollLeft - (containerRect.width / 2) + (nodeRect.width / 2);
    
    container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
    });

    // Add click outside listener
    document.addEventListener('click', closeOnClickOutside);
}

// Close project
function closeProject(node) {
    const details = node.querySelector('.project-details');
    details.classList.add('closing');
    
    // Wait for animation to complete before removing active class
    setTimeout(() => {
        details.classList.remove('active', 'closing');
        node.querySelector('.node-content').classList.remove('active');
    }, 300); // Match this with your transition speed
    
    // Remove click outside listener
    document.removeEventListener('click', closeOnClickOutside);
}

// Close on click outside
function closeOnClickOutside(e) {
    const activeNode = document.querySelector('.node-content.active');
    if (activeNode && !activeNode.contains(e.target)) {
        const node = activeNode.closest('.project-node');
        closeProject(node);
    }
}

// Smooth scroll handling
const timelineContainer = document.querySelector('.timeline-container');
let isScrolling = false;
let startX;
let scrollLeft;

timelineContainer.addEventListener('mousedown', (e) => {
    isScrolling = true;
    startX = e.pageX - timelineContainer.offsetLeft;
    scrollLeft = timelineContainer.scrollLeft;
    cursorFollower.style.transform = 'scale(0.8)';
});

timelineContainer.addEventListener('mouseleave', () => {
    isScrolling = false;
    cursorFollower.style.transform = 'scale(1)';
});

timelineContainer.addEventListener('mouseup', () => {
    isScrolling = false;
    cursorFollower.style.transform = 'scale(1)';
});

timelineContainer.addEventListener('mousemove', (e) => {
    if (!isScrolling) return;
    e.preventDefault();
    const x = e.pageX - timelineContainer.offsetLeft;
    const walk = (x - startX) * 2;
    timelineContainer.scrollLeft = scrollLeft - walk;
});

// Hide scroll indicator after first interaction
let hasInteracted = false;
timelineContainer.addEventListener('scroll', () => {
    if (!hasInteracted) {
        hasInteracted = true;
        document.querySelector('.scroll-indicator').style.opacity = '0';
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeTimeline();
}); 
let posts = [];
let filteredPosts = []; // Store filtered posts based on search
let currentSort = "created";
let isAscending = false;

const loadPosts = async () => {
  try {
    const response = await fetch('posts.json');  // Fetch the JSON file
    posts = await response.json();  // Store the posts in the global 'posts' variable
    filteredPosts = [...posts]; // Initially, all posts are considered filtered
    console.log("Posts loaded:", posts);

    // Once the posts are loaded, call displayPosts()
    displayPosts();
  } catch (error) {
    console.error("Error loading posts:", error);
  }
};

const toggleDropdown = () => {
  document.getElementById('sort_by_listctn').classList.toggle('show');
};

const sortPosts = (criteria) => {
  // Set the sorting criteria
  currentSort = criteria;

  // Resort posts when criteria changes
  resortPosts();
};

const resortPosts = () => {
  // Sorting logic
  filteredPosts.sort((a, b) => {
    let dateA, dateB;

    if (currentSort === 'alphabetical') {
      return isAscending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    } else if (currentSort === 'created') {
      dateA = new Date(a.created);
      dateB = new Date(b.created);
    } else if (currentSort === 'last_modified') {
      dateA = new Date(a.last_modified);
      dateB = new Date(b.last_modified);
    }

    return isAscending ? dateA - dateB : dateB - dateA;
  });

  // Display the sorted posts
  displayPosts();
};

// Function to display the posts (same as before)
const displayPosts = () => {
  // Clear the existing posts before displaying the new ones
  const blogList = document.getElementById('blog-list');
  blogList.innerHTML = '';

  if (filteredPosts.length === 0) {
    blogList.innerHTML = '<p>No posts to display.</p>';
    return;
  }

  filteredPosts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('blog-post');
    
    const lastModified = new Date(post.last_modified).toLocaleString();
    const created = new Date(post.created).toLocaleString();

    postElement.innerHTML = `
      <a href="${post.url}" class="post-title">${post.title}</a>
      <p class="post-dates">Created: ${created} | Last Modified: ${lastModified}</p>
    `;
    blogList.appendChild(postElement);
  });
};

const toggleDirection = () => {
  isAscending = !isAscending;

  const directionText = document.getElementById('directionText');
  const directionIcon = document.getElementById('directionIcon');
  const toggleButton = document.getElementById('toggleSortDirection');
  
  if (isAscending) {
    directionText.textContent = 'Ascending';
    directionIcon.classList.remove('arrow-down');
    directionIcon.classList.add('arrow-up');
    toggleButton.classList.add('active');
  } else {
    directionText.textContent = 'Descending';
    directionIcon.classList.remove('arrow-up');
    directionIcon.classList.add('arrow-down');
    toggleButton.classList.remove('active');
  }

  // Resort the posts after changing the direction
  resortPosts();
};

// Call loadPosts to fetch the posts and render them once loaded
loadPosts();

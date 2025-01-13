let posts = [];
let filteredPosts = []; // Store filtered posts based on search

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

const displayPosts = () => {
  // Clear the existing posts before displaying the new ones
  const blogList = document.getElementById('blog-list');
  blogList.innerHTML = '';

  if (filteredPosts.length === 0) {
    blogList.innerHTML = '<p>No posts to display.</p>';
    return;
  }

  // Loop through the filtered posts and display them
  filteredPosts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('blog-post');
    
    // Format the dates to a more readable format
    const lastModified = new Date(post.last_modified).toLocaleString();
    const created = new Date(post.created).toLocaleString();

    postElement.innerHTML = `
      <a href="${post.url}" class="post-title">${post.title}</a>
      <p class="post-dates">Created: ${created} | Last Modified: ${lastModified}</p>
    `;
    blogList.appendChild(postElement);
  });
};

const sortPosts = (criteria, order = 'asc') => {
  // Sorting logic
  filteredPosts.sort((a, b) => {
    let dateA, dateB;

    if (criteria === 'alphabetical') {
      return order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    } else if (criteria === 'created') {
      dateA = new Date(a.created);
      dateB = new Date(b.created);
    } else if (criteria === 'last_modified') {
      dateA = new Date(a.last_modified);
      dateB = new Date(b.last_modified);
    }

    return order === 'asc' ? dateA - dateB : dateB - dateA;
  });

  displayPosts();
};

// Sorting buttons
document.getElementById('sort-alphabetical').addEventListener('click', () => sortPosts('alphabetical'));
document.getElementById('sort-alphabetical-desc').addEventListener('click', () => sortPosts('alphabetical', 'desc'));
document.getElementById('sort-created').addEventListener('click', () => sortPosts('created'));
document.getElementById('sort-created-desc').addEventListener('click', () => sortPosts('created', 'desc'));
document.getElementById('sort-modified').addEventListener('click', () => sortPosts('last_modified'));
document.getElementById('sort-modified-desc').addEventListener('click', () => sortPosts('last_modified', 'desc'));

// Search function
function searchPosts() {
  const query = document.getElementById('search').value.toLowerCase();
  
  // Filter posts based on the search query (case-insensitive)
  filteredPosts = posts.filter(post => post.title.toLowerCase().includes(query));

  // Display the filtered posts
  displayPosts();
}

// Call loadPosts to fetch the posts and render them once loaded
loadPosts();

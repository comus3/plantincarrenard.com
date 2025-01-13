let posts = [];

const loadPosts = async () => {
  try {
    const response = await fetch('posts.json');  // Fetch the JSON file
    posts = await response.json();  // Store the posts in the global 'posts' variable
    console.log("Posts loaded:", posts);

    // Once the posts are loaded, call displayPosts()
    displayPosts();
  } catch (error) {
    console.error("Error loading posts:", error);
  }
};

const displayPosts = () => {
  posts.forEach(post => {
    console.log(`Title: ${post.title}`);
    console.log(`URL: ${post.url}`);
    console.log(`Last Modified: ${post.last_modified}`);
    console.log(`Created: ${post.created}`);
  });
};


let currentPage = 1;
const postsPerPage = 10;

function displayPosts() {
  // Make sure posts are loaded before trying to display them
  if (posts.length === 0) {
    console.log("No posts to display.");
    return;
  }

  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const visiblePosts = posts.slice(start, end);

  const blogList = document.getElementById('blog-list');
  blogList.innerHTML = '';  // Clear existing posts

  visiblePosts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('blog-post');
    postElement.innerHTML = `<a href="${post.url}">${post.title}</a>`;
    blogList.appendChild(postElement);
  });

  // Update page number
  document.getElementById('page-num').textContent = `Page ${currentPage}`;
}

function changePage(direction) {
  const totalPages = Math.ceil(posts.length / postsPerPage);

  currentPage += direction;

  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  displayPosts();
}

function searchPosts() {
  const query = document.getElementById('search').value.toLowerCase();
  const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(query));

  // Display only filtered posts
  const blogList = document.getElementById('blog-list');
  blogList.innerHTML = '';

  filteredPosts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('blog-post');
    postElement.innerHTML = `<a href="${post.url}">${post.title}</a>`;
    blogList.appendChild(postElement);
  });
}

// Call loadPosts to fetch the posts and render them once loaded
loadPosts();

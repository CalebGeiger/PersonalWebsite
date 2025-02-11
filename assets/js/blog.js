document.addEventListener("DOMContentLoaded", function () {
    fetch('assets/json/posts.json')
        .then(response => response.json())
        .then(posts => {
            const blogList = document.getElementById('blog-list');
            const blogDetail = document.getElementById('blog-detail');
            const blogMainView = document.querySelector('.blog-main-view');
            const delay = 325;

            // Create blog post list
            posts.forEach(post => {
                const listItem = document.createElement('div');
                
                const link = document.createElement('a');
                link.href = '#';
                link.textContent = post.title;
                link.dataset.postId = post.id;
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    showPostDetail(post.id);
                });

                const snippet = document.createElement('p');
                snippet.textContent = post.snippet;
                snippet.className = 'snippet';

                listItem.appendChild(link);
                listItem.appendChild(snippet);
                blogList.appendChild(listItem);
            });

            function showPostDetail(postId) {
                const post = posts.find(p => p.id === postId);
                if (post) {
                    // Prepare the detail content
                    blogDetail.innerHTML = `
                        <h2 class="major">${post.title}</h2>
                        <span class="image main">
                            <img src="${post.image}" alt="${post.title}" />
                        </span>
                        <p>Published on ${new Date(post.date).toLocaleDateString()}</p>
                        <div>${post.content}</div>
                        <button id="back-to-blog-list">Back to list</button>
                    `;

                    // Start transition
                    blogMainView.classList.add('is-transitioning');

                    // Use requestAnimationFrame for smooth transition
                    requestAnimationFrame(() => {
                        blogDetail.classList.add('is-visible');
                    });

                    // Set up back button
                    document.getElementById('back-to-blog-list')
                        .addEventListener('click', hideBlogDetail);
                }
            }

            function hideBlogDetail() {
                // Hide detail view
                blogDetail.classList.remove('is-visible');

                // After transition, show main view
                setTimeout(() => {
                    blogMainView.classList.remove('is-transitioning');
                }, delay);
            }
        })
        .catch(error => {
            console.error('Error loading the blog posts:', error);
        });
});
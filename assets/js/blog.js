document.addEventListener("DOMContentLoaded", function() {
    fetch('assets/json/posts.json')
        .then(response => response.json())
        .then(posts => {
            const blogList = document.getElementById('blog-list');
            const blogDetail = document.getElementById('blog-detail');
            const blogHeader = document.getElementById('blog-header');
            const blogImage = document.getElementById('blog-image');
            
            posts.forEach(post => {
                // Create a link for each blog post
                const link = document.createElement('a');
                link.href = '#';
                link.textContent = post.title;
                link.dataset.postId = post.id;
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    showPostDetail(post.id);
                });

                const snippet = document.createElement('p');
                snippet.textContent = post.snippet;
                snippet.className = 'snippet';

                const listItem = document.createElement('div');
                listItem.appendChild(link);
                listItem.appendChild(snippet);
                blogList.appendChild(listItem);
            });

            function showPostDetail(postId) {
                const post = posts.find(p => p.id === postId);
                
                if (post) {
                    // Hide the original blog header and image
                    blogHeader.style.display = 'none';
                    blogImage.style.display = 'none';
                    blogList.style.display = 'none';
                    
                    // Show blog post detail
                    blogDetail.innerHTML = `
                        <h2 class="major">${post.title}</h2>
                        <p>Published on ${new Date(post.date).toLocaleDateString()}</p>
                        <span class="image main"><img src="${post.image}" alt="${post.title}" /></span>
                        <div>${post.content}</div>
                        <button id="back-to-blog-list">Back to list</button>
                    `;
                    blogDetail.style.display = 'block';
                    
                    // Back button functionality
                    document.getElementById('back-to-blog-list').addEventListener('click', function() {
                        blogDetail.style.display = 'none';
                        blogHeader.style.display = 'block';
                        blogImage.style.display = 'block';
                        blogList.style.display = 'block';
                    });
                }
            }
        })
        .catch(error => console.error('Error loading the blog posts:', error));
});

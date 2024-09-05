document.addEventListener("DOMContentLoaded", function() {
    fetch('assets/json/projects.json')
        .then(response => response.json())
        .then(projects => {
            const projectsList = document.getElementById('projects-list');
            const projectsDetail = document.getElementById('projects-detail');
            const projectsHeader = document.getElementById('projects-header');
            const projectsImage = document.getElementById('projects-image');

            projects.forEach(project => {
                // Create a link for each project
                const link = document.createElement('a');
                link.href = '#';
                link.textContent = project.title;
                link.dataset.projectId = project.id;
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    showProjectDetail(project.id);
                });

                const snippet = document.createElement('p');
                snippet.textContent = project.snippet;
                snippet.className = 'snippet';

                const listItem = document.createElement('div');
                listItem.appendChild(link);
                listItem.appendChild(snippet);
                projectsList.appendChild(listItem);
            });

            function showProjectDetail(projectId) {
                const project = projects.find(p => p.id === projectId);
                
                if (project) {
                    // Use inline styles as in the working blog code
                    projectsHeader.style.display = 'none';
                    projectsImage.style.display = 'none';
                    projectsList.style.display = 'none';
                    
                    // Show project detail
                    projectsDetail.innerHTML = `
                        <h2 class="major">${project.title}</h2>
                        <p>Published on ${new Date(project.date).toLocaleDateString()}</p>
                        <span class="image main"><img src="${project.image}" alt="${project.title}" /></span>
                        <div>${project.content}</div>
                        <button id="back">Back to list</button>
                    `;
                    projectsDetail.style.display = 'block';
                    
                    // Back button functionality
                    document.getElementById('back').addEventListener('click', function() {
                        projectsDetail.style.display = 'none';
                        projectsHeader.style.display = 'block';
                        projectsImage.style.display = 'block';
                        projectsList.style.display = 'block';
                    });
                }
            }
        })
        .catch(error => console.error('Error loading the projects:', error));
});

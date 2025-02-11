document.addEventListener("DOMContentLoaded", function () {
    fetch('assets/json/projects.json')
        .then(response => response.json())
        .then(projects => {
            const projectsList = document.getElementById('projects-list');
            const projectsDetail = document.getElementById('projects-detail');
            const projectsHeader = document.getElementById('projects-header');
            const projectsImage = document.getElementById('projects-image');
            const delay = 325; // Match the delay from the main script

            projects.forEach(project => {
                // Create a link for each project
                const link = document.createElement('a');
                link.href = '#';
                link.textContent = project.title;
                link.dataset.projectId = project.id;
                link.addEventListener('click', function (e) {
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
                    // Hide the list, header, and image with transitions
                    projectsHeader.classList.add('is-transitioning');
                    projectsImage.classList.add('is-transitioning');
                    projectsList.classList.add('is-transitioning');

                    setTimeout(() => {
                        projectsHeader.style.display = 'none';
                        projectsImage.style.display = 'none';
                        projectsList.style.display = 'none';

                        // Show project detail
                        projectsDetail.innerHTML = `
                            <h2 class="major">${project.title}</h2>
                            <span class="image main"><img src="${project.image}" alt="${project.title}" /></span>
                            <p>Published on ${new Date(project.date).toLocaleDateString()}</p>
                            <div>${project.content}</div>
                            <button id="back-to-project-list">Back to list</button>
                        `;
                        projectsDetail.style.display = 'block';
                        projectsDetail.classList.add('is-visible');

                        // Back button functionality
                        document.getElementById('back-to-project-list').addEventListener('click', function () {
                            hideProjectDetail();
                        });
                    }, delay);
                }
            }

            function hideProjectDetail() {
                // Hide project detail with transitions
                projectsDetail.classList.remove('is-visible');

                setTimeout(() => {
                    projectsDetail.style.display = 'none';

                    // Show the list, header, and image
                    projectsHeader.style.display = 'block';
                    projectsImage.style.display = 'block';
                    projectsList.style.display = 'block';

                    projectsHeader.classList.remove('is-transitioning');
                    projectsImage.classList.remove('is-transitioning');
                    projectsList.classList.remove('is-transitioning');
                }, delay);
            }
        })
        .catch(error => console.error('Error loading the projects:', error));
});
document.addEventListener("DOMContentLoaded", function () {
    fetch('assets/json/projects.json')
        .then(response => response.json())
        .then(projects => {
            const projectsList = document.getElementById('projects-list');
            const projectsDetail = document.getElementById('projects-detail');
            const projectsMainView = document.querySelector('.projects-main-view');
            const delay = 325; // Match the delay from the main script

            projects.forEach(project => {
                const listItem = document.createElement('a');

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

                listItem.appendChild(link);
                listItem.appendChild(snippet);
                projectsList.appendChild(listItem);
            });

            function showProjectDetail(projectId) {
                const project = projects.find(p => p.id === projectId);

                if (project) {
                    // Show project detail
                    projectsDetail.innerHTML = `
                        <h2 class="major">${project.title}</h2>                            
                        <span class="image main">
                            <img src="${project.image}" alt="${project.title}" />
                        </span>
                        <p>Published on ${new Date(project.date).toLocaleDateString()}</p>
                        <div>${project.content}</div>
                        <button id="back-to-project-list">Back to list</button>
                    `;

                    projectsMainView.classList.add('is-transitioning');

                    requestAnimationFrame(() => {
                        projectsDetail.classList.add('is-visible');
                    });

                    // Back button functionality
                    document.getElementById('back-to-project-list')
                        .addEventListener('click', hideProjectDetail);
                }
            }

            function hideProjectDetail() {
                // Hide project detail with transitions
                projectsDetail.classList.remove('is-visible');

                setTimeout(() => {
                    projectsMainView.classList.remove('is-transitioning')
                }, delay);
            }
        })
        .catch(error => console.error('Error loading the projects:', error));
});
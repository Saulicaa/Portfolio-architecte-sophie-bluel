document.addEventListener('DOMContentLoaded', () => {
    const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 Mo
    const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png'];
    const works = [
      {
        id: 1,
        title: 'Abajour Tahina',
        imageUrl: 'http://localhost:5678/images/abajour-tahina1651286843956.png',
        categoryId: 1,
        userId: 1,
        category: { id: 1, name: 'Objets' }
      },
      {
        id: 2,
        title: 'Appartement Paris V',
        imageUrl: 'http://localhost:5678/images/appartement-paris-v1651287270508.png',
        categoryId: 2,
        userId: 1,
        category: { id: 2, name: 'Appartements' }
      },
      {
        id: 3,
        title: 'Restaurant Sushisen - Londres',
        imageUrl: 'http://localhost:5678/images/restaurant-sushisen-londres1651287319271.png',
        categoryId: 3,
        userId: 1,
        category: { id: 3, name: 'Hotels & restaurants' }
      },
      {
        id: 4,
        title: 'Villa “La Balisiere” - Port Louis',
        imageUrl: 'http://localhost:5678/images/la-balisiere1651287350102.png',
        categoryId: 2,
        userId: 1,
        category: { id: 2, name: 'Appartements' }
      },
      {
        id: 5,
        title: 'Structures Thermopolis',
        imageUrl: 'http://localhost:5678/images/structures-thermopolis1651287380258.png',
        categoryId: 1,
        userId: 1,
        category: { id: 1, name: 'Objets' }
      },
      {
        id: 6,
        title: 'Appartement Paris X',
        imageUrl: 'http://localhost:5678/images/appartement-paris-x1651287435459.png',
        categoryId: 2,
        userId: 1,
        category: { id: 2, name: 'Appartements' }
      },
      {
        id: 7,
        title: 'Pavillon “Le coteau” - Cassis',
        imageUrl: 'http://localhost:5678/images/le-coteau-cassis1651287469876.png',
        categoryId: 2,
        userId: 1,
        category: { id: 2, name: 'Appartements' }
      },
      {
        id: 8,
        title: 'Villa Ferneze - Isola d’Elba',
        imageUrl: 'http://localhost:5678/images/villa-ferneze1651287511604.png',
        categoryId: 2,
        userId: 1,
        category: { id: 2, name: 'Appartements' }
      },
      {
        id: 9,
        title: 'Appartement Paris XVIII',
        imageUrl: 'http://localhost:5678/images/appartement-paris-xviii1651287541053.png',
        categoryId: 2,
        userId: 1,
        category: { id: 2, name: 'Appartements' }
      },
      {
        id: 10,
        title: 'Bar “Lullaby” - Paris',
        imageUrl: 'http://localhost:5678/images/bar-lullaby-paris1651287567130.png',
        categoryId: 3,
        userId: 1,
        category: { id: 3, name: 'Hotels & restaurants' }
      },
      {
        id: 11,
        title: 'Hotel First Arte - New Delhi',
        imageUrl: 'http://localhost:5678/images/hotel-first-arte-new-delhi1651287605585.png',
        categoryId: 3,
        userId: 1,
        category: { id: 3, name: 'Hotels & restaurants' }
      }
    ];
   
    const gallerySection = document.getElementById('gallery');
    const buttonsContainer = document.getElementById('buttons-container');
    const imageList = document.getElementById('image-list');
    const imageCategorySelect = document.getElementById('image-category');
    const manageImagesPage = document.getElementById('manage-images-page');
    const addImagePage = document.getElementById('add-image-page');

    function createFigure(work) {
        const figure = document.createElement('figure');
        const image = document.createElement('img');
        image.src = work.imageUrl;
        image.alt = work.title;
        const caption = document.createElement('figcaption');
        caption.textContent = work.title;
        figure.appendChild(image);
        figure.appendChild(caption);
        return figure;
    }

    function displayWorks(worksToDisplay) {
        gallerySection.innerHTML = '';
        const fragment = document.createDocumentFragment();
        worksToDisplay.forEach(work => {
            fragment.appendChild(createFigure(work));
        });
        gallerySection.appendChild(fragment);
    }

    function displayWorksByCategory(categoryName) {
        const worksByCategory = works.filter(work => work.category.name === categoryName);
        displayWorks(worksByCategory);
    }

    function displayAllWorks() {
        displayWorks(works);
    }

    function createCategoryButton(category) {
        const button = document.createElement('button');
        button.textContent = category;
        button.addEventListener('click', () => {
            if (category === 'Tous') {
                displayAllWorks();
            } else {
                displayWorksByCategory(category);
            }
        });
        return button;
    }

    function populateCategorySelect() {
        const categories = [...new Set(works.map(work => work.category.name))];
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            imageCategorySelect.appendChild(option);
        });
    }

    function createEditModeButton() {
        const editModeButton = document.createElement('img');
        editModeButton.src = '../FrontEnd/assets/icons/edit_button.svg'; 
        editModeButton.classList.add('edit-mode-button');
        editModeButton.addEventListener('click', () => {
            document.getElementById('modal').style.display = 'block';
            displayModalImages(); 
        });
        return editModeButton;
    }  

    const editionMode = localStorage.getItem("editionMode");

    if (editionMode === "true") {
        const editModeButtonContainer = document.querySelector('#edit-mode-button-container');
        const editModeButton = createEditModeButton();
        editModeButtonContainer.appendChild(editModeButton);
    }

    function createCategoryButton(category) {
        const button = document.createElement('button');
        button.textContent = category;
        button.addEventListener('click', () => {
            if (category === 'Tous') {
                displayAllWorks();
            } else {
                displayWorksByCategory(category);
            }
        });
        return button;
    }

    function createImageContainer(work) {
        const container = document.createElement('div');
        container.classList.add('image-container');
        const img = document.createElement('img');
        img.src = work.imageUrl;
        img.alt = work.title;

        const trashIcon = document.createElement('img');
        trashIcon.src = '../FrontEnd/assets/icons/trash.svg'; 
        trashIcon.alt = 'Supprimer';
        trashIcon.classList.add('trash-icon');
        trashIcon.style.width = '17px';  
        trashIcon.style.height = '17px'; 
        trashIcon.addEventListener('click', () => {
            if (confirm('Voulez-vous vraiment supprimer cette image ?')) {
                const index = works.indexOf(work);
                if (index > -1) {
                    works.splice(index, 1);
                    displayModalImages();
                    displayAllWorks();
                }
            }
        });

        container.appendChild(img);
        container.appendChild(trashIcon);
        return container;
    }

    function displayModalImages() {
        imageList.innerHTML = ''; 
        const fragment = document.createDocumentFragment();
        works.forEach(work => {
            fragment.appendChild(createImageContainer(work));
        });
        imageList.appendChild(fragment);
    }

    function initializeModal() {
        const modal = document.getElementById('modal');
        const closeButton = document.querySelector('.close-button');
        const addImagePageButton = document.getElementById('add-image-page-button');
        const backButton = document.getElementById('back-button');
        const saveImageButton = document.getElementById('save-image-button');
        
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        addImagePageButton.addEventListener('click', () => {
            manageImagesPage.style.display = 'none';
            addImagePage.style.display = 'block';
        });

        backButton.addEventListener('click', () => {
            addImagePage.style.display = 'none';
            manageImagesPage.style.display = 'block';
        });

        saveImageButton.addEventListener('click', () => {
            const imageUpload = document.getElementById('image-upload');
            const imageTitle = document.getElementById('image-title').value;
            const imageCategory = document.getElementById('image-category').value;
            
            const file = imageUpload.files[0];

            if (!file) {
                alert('Veuillez sélectionner une image.');
                return;
            }

            if (!VALID_IMAGE_TYPES.includes(file.type)) {
                alert('Le fichier doit être en format PNG ou JPG.');
                return;
            }

            if (file.size > MAX_FILE_SIZE) {
                alert('Le fichier ne doit pas dépasser 4 Mo.');
                return;
            }

            if (imageTitle && imageCategory) {
                const imageUrl = URL.createObjectURL(file);

                const newWork = {
                    id: works.length + 1,
                    title: imageTitle,
                    imageUrl: imageUrl,
                    categoryId: works.length + 1,
                    userId: 1,
                    category: { id: works.length + 1, name: imageCategory }
                };

                works.push(newWork);
                displayModalImages();
                displayAllWorks();
                imageUpload.value = '';
                document.getElementById('image-title').value = '';
                document.getElementById('image-category').selectedIndex = 0;

                addImagePage.style.display = 'none';
                manageImagesPage.style.display = 'block';
            } else {
                alert('Veuillez remplir tous les champs et sélectionner une image.');
            }
        });    
    }

    const categories = ['Tous', ...new Set(works.map(work => work.category.name))];
    categories.forEach(category => {
        const button = createCategoryButton(category);
        buttonsContainer.appendChild(button);
    });
    const tousButton = document.querySelector('button');
    tousButton.click();

    populateCategorySelect();
    initializeModal();
    displayAllWorks();
});
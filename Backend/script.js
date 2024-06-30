document.addEventListener('DOMContentLoaded', () => {
  const gallerySection = document.getElementById('gallery');
  const buttonsContainer = document.getElementById('buttons-container');
  const imageList = document.getElementById('image-list');
  const imageCategorySelect = document.getElementById('image-category');
  const manageImagesPage = document.getElementById('manage-images-page');
  const addImagePage = document.getElementById('add-image-page');
  const imagePreview = document.getElementById('image-preview'); // Image preview element

  const MAX_FILE_SIZE = 4 * 1024 * 1024;
  const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png'];

  let works = []; // Tableau des travaux récupérés de l'API

  // Fonction pour créer une figure (image + légende) pour un travail donné.
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

  // Fonction pour afficher une liste de travaux dans la galerie principale.
  function displayWorks(worksToDisplay) {
    gallerySection.innerHTML = ''; // Efface le contenu précédent
    const fragment = document.createDocumentFragment();
    worksToDisplay.forEach(work => {
      fragment.appendChild(createFigure(work));
    });
    gallerySection.appendChild(fragment);
  }

  // Fonction pour afficher les travaux par catégorie.
  function displayWorksByCategory(categoryName) {
    const worksByCategory = works.filter(work => work.category.name === categoryName);
    displayWorks(worksByCategory);
  }

  // Fonction pour afficher tous les travaux.
  function displayAllWorks() {
    displayWorks(works);
  }

  // Fonction pour créer un bouton de catégorie.
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

  // Fonction pour peupler le sélecteur de catégorie dans le formulaire d'ajout d'image.
  function populateCategorySelect() {
    const categories = [...new Set(works.map(work => work.category.name))];
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      imageCategorySelect.appendChild(option);
    });
  }

  // Fonction pour créer le bouton de mode édition (si le mode édition est activé).
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

  // Vérifie si le mode édition est activé dans le stockage local.
  const editionMode = localStorage.getItem("editionMode");

  if (editionMode === "true") {
    const editModeIndicator = document.getElementById('edit-mode-indicator');
    editModeIndicator.style.display = '';

    if (window.location.pathname.includes('index.html')) {
      const header = document.querySelector('header');
      header.classList.add('edit-mode-header');
    }

    const editModeButtonContainer = document.querySelector('#edit-mode-button-container');
    const editModeButton = createEditModeButton();
    editModeButtonContainer.appendChild(editModeButton);

    const modifierText = document.createElement('p');
    modifierText.textContent = 'modifier';
    modifierText.classList.add('modifier-text-edition');  
    editModeButtonContainer.appendChild(modifierText);
  }

  // Fonction pour créer un conteneur d'image dans la modal.
  function createImageContainer(work) {
    const container = document.createElement('div');
    container.classList.add('image-container');
    const img = document.createElement('img');
    img.src = work.imageUrl;
    img.alt = work.title;

    // Ajoute une icône de poubelle pour supprimer l'image.
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

  // Fonction pour afficher les images dans la modal.
  function displayModalImages() {
    imageList.innerHTML = ''; 
    const fragment = document.createDocumentFragment();
    works.forEach(work => {
      fragment.appendChild(createImageContainer(work));
    });
    imageList.appendChild(fragment);
  }

  // Fonction pour initialiser la modal.
  function initializeModal() {
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-button');
    const addImagePageButton = document.getElementById('add-image-page-button');
    const backButton = document.getElementById('back-button');
    const saveImageButton = document.getElementById('save-image-button');
    const imageUpload = document.getElementById('image-upload'); // Image upload input

    // Ferme la modal en cliquant sur le bouton de fermeture.
    closeButton.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    // Ferme la modal en cliquant en dehors de celle-ci.
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });

    // Affiche la page d'ajout d'image.
    addImagePageButton.addEventListener('click', () => {
      manageImagesPage.style.display = 'none';
      addImagePage.style.display = 'block';
    });

    // Retourne à la page de gestion des images.
    backButton.addEventListener('click', () => {
      addImagePage.style.display = 'none';
      manageImagesPage.style.display = 'block';
    });

    // Prévisualisation de l'image uploadée
    imageUpload.addEventListener('change', () => {
      const file = imageUpload.files[0];
      if (file && VALID_IMAGE_TYPES.includes(file.type)) {
        const imageUrl = URL.createObjectURL(file);
        imagePreview.src = imageUrl; // Remplace l'icône par l'image uploadée
      } else {
        alert('Le fichier doit être en format PNG ou JPG.');
      }
    });

    // Sauvegarde l'image ajoutée.
    saveImageButton.addEventListener('click', () => {
      const imageTitle = document.getElementById('image-title').value;
      const imageCategory = document.getElementById('image-category').value;

      const file = imageUpload.files[0];

      // Vérifications des contraintes de fichier.
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

      if (!imageTitle || !imageCategory) {
        alert('Veuillez remplir tous les champs.');
        return;
      }

      const imageUrl = URL.createObjectURL(file);

      const newWork = {
        title: imageTitle,
        category: { name: imageCategory },
        imageUrl: imageUrl,
      };

      works.push(newWork);
      displayAllWorks();
      displayModalImages();

      // Réinitialise le formulaire.
      document.getElementById('image-title').value = '';
      document.getElementById('image-category').value = '';
      imageUpload.value = '';
      imagePreview.src = './assets/icons/gallery.svg'; 
      addImagePage.style.display = 'none';
      manageImagesPage.style.display = 'block';
    });
  }

  // Récupère les travaux via l'API.
  fetch('http://localhost:5678/api/works')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      works = data; 
      displayAllWorks();
      populateCategoryButtons();
      populateCategorySelect();
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
    });

  // Fonction pour créer les boutons de catégories et les ajouter au conteneur.
  function populateCategoryButtons() {
    const categories = ['Tous', ...new Set(works.map(work => work.category.name))];
    buttonsContainer.innerHTML = ''; 
    categories.forEach(category => {
      const button = createCategoryButton(category);
      buttonsContainer.appendChild(button);
    });
    const tousButton = document.querySelector('button');
    if (tousButton) {
      tousButton.click();
    }
  }

  // Initialise la modal.
  initializeModal();
});
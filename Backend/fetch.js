fetch('http://localhost:5678/api/works')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(works => {
    // Ici, vous pouvez traiter les données récupérées
    console.log(works);
    // Par exemple, vous pouvez les afficher dans votre interface utilisateur
    displayWorks(works);
  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
  });

function displayWorks(works) {
  // Code pour afficher les projets dans votre interface utilisateur
  // Par exemple, vous pouvez créer des éléments HTML pour chaque projet et les ajouter à votre page
  // Assurez-vous d'avoir un endroit approprié dans votre HTML pour afficher les projets
}


fetch('http://localhost:5678/api/works')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(works => {
    console.log(works);
    displayWorks(works);
  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
  });

function displayWorks(works) {
}


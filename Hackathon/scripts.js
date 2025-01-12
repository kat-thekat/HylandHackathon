// Enter a search query, then returns the list of IDs
function getIDsFromSearch (input)
{
    return fetch("https://api.jikan.moe/v4/manga?q=" + input + "&page=1&limit=5&type=manga&sfw=true&order_by=score&sort=desc")
    .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('bro it messed up');
        }
      })
      .then(data => {
        const ids = data.data.map(item => item.mal_id);
        return ids;
      })
      .catch(error => {
        console.error(error);
      });
}

/* getIDsFromSearch("kanojo").then(ids => { 
    console.log(ids); 
}); */

function getInfoFromID (input)
{
    return fetch("https://api.jikan.moe/v4/manga/" + input)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('nah bro it done messed up again');
        }
    })
    .then(data => {
        const name = data.data.titles.find(title => title.type === "Default")?.title;
        const desc = data.data.synopsis || "Description not available.";
        const image_url = data.data.images.jpg.image_url;
        info = [name, desc, image_url];
        return info;
    })
}

getInfoFromID("17").then(info => { 
    console.log(info); 
});
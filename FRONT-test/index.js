const runTest = (artworks) => {
  for (const artwork of artworks) {
    const div = document.createElement("div");
    div.style.backgroundImage = `url(${artwork.imgUrl})`;
    div.classList.add("artwork");

    div.innerHTML = `
      <h2>${artwork.title}</h2>
      <p>${artwork.artist}</p>
      <p>${artwork.year}</p>
    `;

    if (artwork.gallery && artwork.gallery[0]) {
      const p = document.createElement("p");
      p.textContent = artwork.gallery[0].name;
      div.append(p);
    }
    document.body.append(div);
  }
};

fetch("http://localhost:3000/api/v1/artworks")
  .then((res) => res.json())
  .then((artworks) => {
    console.log(artworks);
    runTest(artworks);
  });

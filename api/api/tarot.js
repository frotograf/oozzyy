export default async function(req, res) {
  const deck = Array.from({length: 22}, (_,i) => i); // 0–21 keys of Marseille deck
  // Shuffle & pick 3
  for(let i=deck.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [deck[i],deck[j]]=[deck[j],deck[i]];
  }
  const chosen = deck.slice(0,3);
  // Map to image URLs (you’ll host these on GitHub)
  const images = chosen.map(n => `https://raw.githubusercontent.com/YOUR-USERNAME/esoteric-app/main/cards/${n}.jpg`);
  // Very simple reading:
  const readings = chosen.map(n => `Card ${n}: [Interpretation of card ${n} here]`);
  res.status(200).json({ result: readings.join('\n'), cards: images });
}

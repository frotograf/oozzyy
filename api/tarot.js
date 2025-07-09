export default async function(req, res) {
  const deck = Array.from({length: 22}, (_,i) => i);
  // Shuffle
  for (let i = deck.length-1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  const chosen = deck.slice(0,3);
  const images = chosen.map(n => `https://raw.githubusercontent.com/YOUR-USERNAME/esoteric-app/main/cards/${n}.jpg`);
  const readings = chosen.map(n => `Card ${n}: [Your interpretation for card ${n}]`);
  res.status(200).json({ result: readings.join('\n'), cards: images });
}

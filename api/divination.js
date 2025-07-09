import OpenAI from 'openai';
const openai = new OpenAI();

export default async function(req, res) {
  const { dob, city, country, time, question } = req.body;
  const prompt = `
Based on the input data:
DOB: ${dob}, ${time}
Place: ${city}, ${country}
Question: ${question}

Please Provide:
1. Complete Natal Chart Analysis: ...
2. Goal-Specific Astrological Guidance: ...
... (continue with your full divination prompt here)
  `;
  const chat = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }]
  });
  res.status(200).json({ result: chat.choices[0].message.content });
}

# Lotti AI

[Lotti AI](https://lotti-chatbot.vercel.app/) is a chatbot that helps older users nagivate the digital world!

## Getting Started

Run the development server:

```bash
# first install any dependencies
npm install

# run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies Used

- Typescript, React, Next.js, Tailwind.css, Upstash, GPT-4

## Deployed on Vercel

This project is deployed on Vercel. Check it out here:
[https://lotti-chatbot.vercel.app/](https://lotti-chatbot.vercel.app/)

### Rate Limiting

Since this project is deployed on the web and using my OpenAI API keys, I added an extra layer of security and implemented rate limiting using Upstash.

### Future work

The MVP serves it's purpose of allowing older users to chat with Lotti, ask questions and get answers about digital topics. But there are improvements that can be made:

- Fine-tuning: I have added a script that fine-tunes the OpenAI LLM but we need more data to do it
- Retrieval-augmented generation (RAG): We could add a RAG pipeline to the chatbot to make it more context aware
- UI/UX: the font types, font sizes and colors could be improved after user testing to make them more accessible and readible for older users
- Adding a feature that keeps track of historial data or previous questions the user has asked
- Quality of life features: making the whole thing a lot faster


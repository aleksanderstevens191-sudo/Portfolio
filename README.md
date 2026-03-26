# Aleksander Stevens Portfolio

A production-ready personal portfolio built with Next.js App Router, Tailwind CSS, Framer Motion, Recharts, and an OpenAI-powered recruiter assistant.

## Stack

- Next.js 14 App Router
- Tailwind CSS
- Framer Motion
- Recharts
- OpenAI API for the chatbot route

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` in the project root:

   ```bash
   OPENAI_API_KEY=your_key_here
   ```

   Optional:

   ```bash
   OPENAI_MODEL=gpt-4o-mini
   GITHUB_TOKEN=your_optional_github_token
   ```

3. Start the local dev server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Features

- Futuristic night-sky visual system with a canvas starfield background
- Sticky glassmorphism navigation and motion-rich hero section
- Experience timeline, featured project case studies, and dynamic GitHub repository feed
- Interactive resume dashboard with skill bars, KPI cards, and Recharts visualizations
- Recruiter Mode overlay with an animated pitch summary
- Floating AI chatbot with streaming responses and mock fallback when no OpenAI key is available

## Deployment

### Vercel

1. Push the project to GitHub.
2. Import the repository into [Vercel](https://vercel.com/).
3. Add the environment variable below in the Vercel project settings:

   ```bash
   OPENAI_API_KEY=your_key_here
   ```

4. Add `OPENAI_MODEL` or `GITHUB_TOKEN` if you want to customize the assistant model or raise GitHub API limits.
5. Deploy.

The GitHub feed works without authentication for public repos, but a `GITHUB_TOKEN` helps avoid public rate limits during heavier traffic.

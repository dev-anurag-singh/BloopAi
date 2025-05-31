# BloopAi

An AI-powered video call application built from scratch with comprehensive real-time communication features, intelligent meeting assistance, and seamless integration capabilities.

## Overview

BloopAi provides a complete video conferencing solution that combines traditional video calling with advanced AI capabilities. The application features custom real-time agents, automated meeting summaries, transcript generation, and a full post-call experience including video playback and AI-powered chat assistance.

## Key Features

### 🎥 Core Video Communication

- **AI-powered video calls** - Enhanced video conferencing with intelligent features
- **Custom real-time agents** - Personalized AI assistants for your meetings
- **Stream Video SDK** - Robust video streaming capabilities
- **Stream Chat SDK** - Integrated chat functionality

### 📝 Meeting Intelligence

- **Summaries, transcripts, recordings** - Comprehensive meeting documentation
- **Meeting history & statuses** - Track and manage all your meetings
- **Transcript search** - Quickly find specific moments in your meetings
- **AI meeting Q&A** - Get answers about your meeting content

### 🎬 Post-Meeting Experience

- **Video playback** - Review your recorded meetings
- **OpenAI integration** - Advanced AI processing and insights

### 🔧 Technical Features

- **Polar subscriptions** - Flexible subscription management
- **Better Auth login** - Secure and streamlined authentication
- **Mobile responsive** - Optimized for all devices
- **Next.js 15 + React 19** - Built with the latest web technologies
- **Tailwind v4 + Shadcn/ui** - Modern, responsive design system

### ⚙️ Development & Deployment

- **Inngest background jobs** - Reliable background processing
- **CodeRabbit PR reviews** - Automated code review assistance
- **Full Git workflow with AI-assisted code reviews** - Streamlined development process

## Technology Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS v4, Shadcn/ui
- **Backend**: Next.js 15, Drizzle, Trpc and Neon DB
- **Authentication**: Better Auth
- **Video/Chat**: Stream Video SDK, Stream Chat SDK
- **AI Integration**: OpenAI
- **Background Processing**: Inngest
- **Subscriptions**: Polar
- **Code Review**: CodeRabbit

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables (create a `.env.local` file by coping `.env.example`):

   ```env
   # Add your API keys and configuration here
   # OpenAI API Key
   # Stream API credentials
   # Database connection string
   # Other service credentials
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Resources

### Free Assets

Access free design assets and resources to customize your BloopAi instance.

### Documentation

- **Neon Database**: Cloud PostgreSQL database setup and management
- **CodeRabbit**: Automated code review integration
- **Stream**: Video and chat SDK documentation
- **Inngest**: Background job processing
- **DrizzleORM**: Database ORM and query builder

## Features in Detail

### AI-Powered Meeting Assistant

BloopAi's AI agents can participate in meetings, take notes, answer questions, and provide real-time assistance to meeting participants.

### Comprehensive Meeting Management

Track meeting statuses, access complete histories, and search through transcripts to find exactly what you need from past conversations.

### Developer-Friendly Architecture

Built with modern web technologies and includes automated code reviews, background job processing, and a complete Git workflow optimized for team collaboration.

### Mobile-First Design

Fully responsive design ensures a seamless experience across desktop, tablet, and mobile devices.

## Contributing

We welcome contributions! Please review our contributing guidelines and submit pull requests for any improvements.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please refer to the documentation links provided in the resources section or open an issue in the project repository.

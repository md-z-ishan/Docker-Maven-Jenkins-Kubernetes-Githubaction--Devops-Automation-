# DevOps Simulation Ecosystem

A comprehensive simulation of a DevOps environment demonstrating CI/CD pipelines, containerization, monitoring, and AI-powered insights using Google's Gemini AI. Enhanced edition version 2.0

## Features

- **CI/CD Pipeline Visualization**: Interactive pipeline diagrams showing build, test, and deployment stages
- **Real-time Monitoring**: Charts and metrics for system performance and health
- **AI-Powered Assistance**: Chat with an AI DevOps engineer for guidance on DevOps concepts, troubleshooting, and best practices
- **Log Analysis**: Upload and analyze build logs with AI recommendations
- **Containerization Insights**: Docker and Kubernetes workflow simulations

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite & Maven (`frontend-maven-plugin`)
- **AI Integration**: Google Gemini AI
- **Containerization**: Docker & Docker Compose
- **CI/CD Automation**: Jenkins (via `Jenkinsfile`) & GitHub Actions
- **Monitoring**: Prometheus & Grafana
- **Web Server**: Nginx (Production Build)
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React

## Complete DevOps Toolchain Integrated

This project successfully integrates a complete, enterprise-grade DevOps ecosystem:

1. **Docker**: Containerization of the React application using a multi-stage Dockerfile.
2. **GitHub Actions**: Automated CI pipeline triggered on every push and pull request.
3. **Maven**: Frontend build orchestration using the `frontend-maven-plugin` (`pom.xml`).
4. **Jenkins**: Complete CI/CD pipeline definition (`Jenkinsfile`).
5. **Prometheus**: Time-series database for collecting metrics from the application and host.
6. **Grafana**: Interactive dashboards for real-time visualization of Prometheus metrics.



S₹
## Prerequisites

- Node.js (v16 or higher)
- A Google Gemini API key

## Setup and Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd devops-simops-ecosystem
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Copy `.env.local` and add your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

### Docker Deployment

Alternatively, you can run the application using Docker:

1. **Create .env file**:
   Create a `.env` file in the root directory with your API key:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

2. **Run with Docker Compose**:
   ```bash
   docker-compose up --build
   ```

   The application will be served via Nginx at `http://localhost:3000`

## Project Architecture

The application follows a modular React architecture with the following key components:

### Core Components
- **App.tsx**: Main application component managing state and orchestrating all features
- **Sidebar.tsx**: Navigation component providing access to different views (Dashboard, Pipeline, Monitoring, Terminal)
- **PipelineVisualizer.tsx**: Interactive CI/CD pipeline visualization with stage-by-stage execution
- **MonitoringCharts.tsx**: Real-time system metrics visualization using Recharts
- **TerminalWindow.tsx**: Simulated terminal interface for DevOps command demonstration

### Services Layer
- **geminiService.ts**: Handles AI integration with Google Gemini for chat assistance and log analysis

### Type Definitions
- **types.ts**: Comprehensive TypeScript interfaces for type safety across the application

### Configuration Files
- **vite.config.ts**: Vite build configuration optimized for React and TypeScript
- **tsconfig.json**: TypeScript compiler configuration
- **tailwind.config.js**: Tailwind CSS customization for styling

## AI Integration Details

The project integrates Google Gemini AI for two main functionalities:

1. **DevOps Chat Assistant**: Provides intelligent responses to DevOps-related queries, troubleshooting guidance, and best practices
2. **Log Analysis**: Analyzes uploaded build logs and provides AI-powered recommendations for issue resolution

### Implementation
- Uses `@google/genai` SDK for seamless API integration
- Implements chat session management for conversational AI experience
- Handles file upload and processing for log analysis features

## Git and GitHub Workflow Demonstrated

This project demonstrates a comprehensive Git workflow suitable for DevOps environments:

### Branching Strategy
- **main**: Production-ready code
- **feature/***: Feature development branches (monitoring, pipeline, sidebar, terminal)
- **bugfix/***: Bug fixes and styling improvements
- **experiment/***: Experimental features (dark-mode)
- **test/***: Testing and integration branches
- **conflict-demo***: Demonstration of merge conflict resolution

### Commit History Analysis
- **22 commits** total demonstrating incremental development
- Feature branches merged back to main after completion
- Conflict resolution demonstrated through dedicated branches
- Meaningful commit messages following conventional standards

### Remote Operations
- Repository synchronized with GitHub remote
- Demonstrates push/pull operations for collaborative development
- Branch tracking and remote branch management

## Viva Preparation: Key Aspects to Cover

### Project Understanding
1. **Purpose**: DevOps simulation platform for learning CI/CD concepts
2. **Target Audience**: Students learning DevOps practices and tools
3. **Key Features**: Pipeline visualization, monitoring, AI assistance, terminal simulation

### Technical Implementation
1. **Frontend Framework**: React 19 with TypeScript for type safety
2. **Build System**: Vite for fast development and optimized production builds
3. **Styling**: Tailwind CSS for utility-first responsive design
4. **Data Visualization**: Recharts library for interactive charts
5. **AI Integration**: Google Gemini API for intelligent assistance

### Component Architecture
1. **State Management**: React hooks (useState, useEffect) for local state
2. **Component Communication**: Props passing and callback functions
3. **Type Safety**: Comprehensive TypeScript interfaces
4. **Modular Design**: Separation of concerns across components and services

### DevOps Concepts Demonstrated
1. **CI/CD Pipeline**: Source → Build → Test → Deploy stages
2. **Monitoring**: CPU, memory, request metrics visualization
3. **Containerization**: Docker and Kubernetes workflow simulation
4. **Version Control**: Git branching, merging, conflict resolution

### Git Operations Mastery
1. **Repository Initialization**: `git init` and remote setup
2. **Branching Strategy**: Feature branches, bugfix branches, experimental branches
3. **Merging**: Fast-forward and three-way merges
4. **Conflict Resolution**: Manual conflict resolution process
5. **Remote Collaboration**: Push, pull, fetch operations
6. **History Management**: Commit history, branch visualization

### Challenges and Solutions
1. **Merge Conflicts**: Demonstrated through conflict-demo branches
2. **Branch Management**: Maintaining clean branch history
3. **Commit Organization**: Ensuring meaningful, atomic commits
4. **Remote Synchronization**: Handling remote branch updates

### Best Practices Demonstrated
1. **Code Organization**: Clean folder structure and file naming
2. **Documentation**: Comprehensive README with setup instructions
3. **Version Control**: Proper Git workflow and commit conventions
4. **Type Safety**: Full TypeScript implementation
5. **Responsive Design**: Mobile-friendly UI with Tailwind CSS

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally

## Project Structure

```
src/
├── components/          # React components
│   ├── MonitoringCharts.tsx
│   ├── PipelineVisualizer.tsx
│   ├── Sidebar.tsx
│   └── TerminalWindow.tsx
├── services/            # API and utility services
│   └── geminiService.ts
├── App.tsx             # Main application component
├── index.tsx           # React entry point
└── types.ts            # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational and demonstration purposes.

## Git Operations and Version Control

### Introduction

This project demonstrates comprehensive Git and GitHub operations as part of DevOps practices. It includes repository setup, branching strategies, merging, conflict resolution, and remote repository management. The project maintains 22 commits across multiple branches demonstrating real-world development workflow.

### Commands Used

#### Repository Initialization
```bash
git init
git remote add origin <repository-url>
```

#### Staging and Committing
```bash
git add <file>
git add .                    # Stage all changes
git commit -m "Meaningful commit message"
git commit --amend          # Amend last commit
```

#### Branching Strategy Implemented
```bash
# Feature branches
git checkout -b feature/monitoring
git checkout -b feature/pipeline
git checkout -b feature/sidebar
git checkout -b feature/terminal

# Bugfix branches
git checkout -b bugfix/styling

# Experimental branches
git checkout -b experiment/dark-mode

# Test branches
git checkout -b test/integration

# Conflict demonstration branches
git checkout -b conflict-demo
git checkout -b conflict-demo2
```

#### Merging Operations
```bash
git checkout main
git merge feature/monitoring
git merge feature/pipeline
git merge feature/sidebar
git merge feature/terminal
git merge bugfix/styling
```

#### Conflict Resolution Process
```bash
git checkout main
git merge conflict-demo
# Resolve conflicts in conflicted files
git add <resolved-file>
git commit
```

#### Remote Operations
```bash
git push -u origin main
git push origin feature/monitoring
git pull origin main
git fetch origin
```

#### History and Visualization
```bash
git log --oneline
git log --graph --oneline --all
git branch -a
git status
```

### Branch Analysis
- **Feature Branches**: 4 branches (monitoring, pipeline, sidebar, terminal) - 8 commits
- **Bugfix Branches**: 1 branch (styling) - 1 commit
- **Experimental Branches**: 1 branch (dark-mode) - 1 commit
- **Test Branches**: 1 branch (integration) - 2 commits
- **Conflict Demo Branches**: 2 branches - 3 commits demonstrating merge conflicts
- **Main Branch**: 7 commits including merges and conflict resolutions

### Screenshots and Evidence

- **Repository Structure**: Clean organization with components/, services/, and configuration files
- **Branch Diagram**: 11 branches total (4 feature, 1 bugfix, 1 experiment, 1 test, 2 conflict-demo, 1 main)
- **Commit History**: 22 commits with descriptive messages like "Add interactive CI/CD pipeline visualizer feature"
- **Merge Conflict Resolution**: Demonstrated on README.md title changes, resolved by combining descriptions

### Challenges & Solutions

#### Challenges Faced
- **Branch Management**: Ensuring commits are made on correct branches, requiring resets and re-commits
- **Merge Conflicts**: Creating and resolving conflicts to demonstrate the resolution process
- **Commit Organization**: Maintaining minimum 22 meaningful commits across different branches
- **Remote Synchronization**: Keeping local repository synchronized with GitHub remote
- **Branch Naming**: Following consistent naming conventions (feature/, bugfix/, experiment/)

#### Solutions Implemented
- Used `git reset --soft HEAD~1` for commit reorganization
- Created dedicated conflict-demo branches for conflict demonstration
- Maintained atomic commits with clear, descriptive messages
- Regular push/pull operations to maintain remote synchronization
- Followed Git Flow branching strategy

#### Conclusion
This project successfully demonstrates essential Git and GitHub operations required for DevOps workflows. The implementation showcases:
- Proper branching strategies for feature development
- Conflict resolution techniques
- Remote collaboration workflows
- Clean commit history maintenance
- Professional repository management

All requirements have been met including proper repository setup, comprehensive branching, merging operations, conflict resolution, and remote operations with GitHub.

### Professionalism Demonstrated
- Clean repository structure with organized directories
- Consistent naming conventions (feature/branch-name, bugfix/, experiment/)
- Meaningful commit messages describing specific changes
- Comprehensive documentation in README.md
- No unnecessary files or repository clutter
- Proper .gitignore configuration
- Regular commits demonstrating incremental development

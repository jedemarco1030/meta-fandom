# Meta Fandom

Welcome to Meta Fandom, your ultimate destination for discovering and sharing your favorite video games, Pokémon, movies, TV shows, and books. This README provides an overview of the site's features and instructions on how to set up and run the project.

## Features

### Search

- **Video Games**: Use our powerful search feature to find your next game to play. You can search by title, genre, developer, and more. View detailed information about each game to help you decide your next adventure.
- **Pokémon**: Discover detailed information about your favorite Pokémon. Search by name or type to find the Pokémon you're looking for.
- **Movies**: Explore a vast collection of movies. Search by name and view detailed information about each movie.
- **TV Shows**: Discover TV shows by searching by name. Get detailed information about each show.
- **Books**: Search for books by title and view detailed information including authors, publish year, and more.

### User Accounts

- **Register an Account**: Join the Meta Fandom community by registering an account. With an account, you can save your favorite games, participate in discussions, and more.

## Setup and Running the Project

### Prerequisites

Make sure you have the following installed:
- Node.js
- Yarn

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/meta-fandom.git
    cd meta-fandom
    ```

2. Install dependencies:

    ```bash
    yarn install
    ```

### Running the Project

#### Development

To start the development server:

```bash
yarn dev
```

The site will be available at http://localhost:3000.

#### Building for Production

To build the project for production:

```bash
yarn build
```

To start the production server:

```bash
yarn start
```

#### Other Scripts

Linting: To run ESLint:

```bash
yarn lint
```

Formatting: To format code with Prettier:

```bash
yarn format
```

Testing: To run tests:

```bash
yarn test
```

## Project Structure

### Search

- **actions/**: Contains action files for different functionalities like login, logout, register, etc.
- **app/**: The main application directory, containing different subdirectories for various pages and layouts.
- **components/**: UI components used throughout the application.
- **data/**: Data models and related logic.
- **hooks/**: Custom hooks for different functionalities.
- **lib/**: Library files including API clients and utility functions.
- **schemas/**: GraphQL schemas.
- **public/**: Public assets like images and icons.

### Dependencies

#### Main Dependencies

- **Next.js**: The React framework for production.
- **React**: A JavaScript library for building user interfaces.
- **TailwindCSS**: A utility-first CSS framework for rapid UI development.
- **Apollo Client**: A comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL.
- **Prisma**: Next-generation ORM for Node.js and TypeScript.
- **Supabase**: An open source Firebase alternative.

#### DevDependencies

- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **ESLint**: A tool for identifying and fixing problems in JavaScript code.
- **Prettier**: An opinionated code formatter.
- **Jest**: A delightful JavaScript testing framework with a focus on simplicity.
- **Husky**: Git hooks made easy.
- **Lint-staged**: Run linters on git staged files.

### Environment Variables

Create a .env.local file at the root of the project and add the following environment variables:

```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
DATABASE_URL=your_database_url
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

### Contributing

Contributions are welcome! Please open an issue or submit a pull request.

### License

This project is licensed under the MIT License.

Thank you for using Meta Fandom. Happy exploring!

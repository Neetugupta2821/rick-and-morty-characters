#Features
1.Displays a list of episodes from the Rick and Morty API.
2.Allows users to select an episode and view its characters.
3.Characters are displayed in a grid with pagination.
Responsive design, with a scrollable episode list on smaller screens.

#Technologies
React with TypeScript
Axios for API calls
Bootstrap for styling
Rick and Morty API for fetching episodes and character data

#Installation
Prerequisites
Node.js (version 16.x or higher)
npm (or yarn)
Steps
Clone the repository:
 
 
git clone https://github.com/Neetugupta2821/rick-and-morty-characters.git
cd rick-and-morty-characters
Install dependencies:
 
 
npm install
# or
yarn install
Running the Project
Start the development server:
 
 
npm start
# or
yarn start
Open http://localhost:3000 to view the app in your browser.
Project Structure
 
 
├── src
│   ├── components
│   │   └── InitalPage.tsx  # Main component displaying episodes and characters
│   ├── App.tsx            # App component
│   ├── index.tsx          # Entry point
│   └── styles.css         # Custom styles
├── public
│   └── index.html         # HTML template
├── package.json           # Project metadata and dependencies
├── README.md              # Project instructions (this file)
├── tsconfig.json          # TypeScript configuration
└── .gitignore             # Files to ignore in git
API
This project uses the Rick and Morty API. It fetches episodes and character details using Axios.

Endpoint for episodes: https://rickandmortyapi.com/api/episode
Character data for each episode is fetched dynamically using URLs provided in the episode data.
License
This project is open-source and licensed under the MIT License.
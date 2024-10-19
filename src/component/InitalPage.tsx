import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Episode {
  id: number;
  name: string;
  characters: string[];
}

const InitalPage: React.FC = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [characters, setCharacters] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedEpisode, setSelectedEpisode] = useState<number>(0);
  const charactersPerPage = 20; // Number of characters to display per page

  useEffect(() => {
    // Fetch episodes
    const fetchEpisodes = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/episode');
        const fetchedEpisodes: Episode[] = response.data.results.map((ep: any) => ({
          id: ep.id,
          name: ep.name,
          characters: ep.characters,
        }));
        setEpisodes(fetchedEpisodes);

        // Select the first episode by default
        if (fetchedEpisodes.length > 0) {
          setSelectedEpisode(0);
          fetchCharacters(fetchedEpisodes[0].characters);
        }
      } catch (error) {
        console.error('Error fetching episodes:', error);
      }
    };

    fetchEpisodes();
  }, []);

  const fetchCharacters = async (characterUrls: string[]) => {
    try {
      const responses = await Promise.all(characterUrls.map(url => axios.get(url)));
      setCharacters(responses.map(response => response.data.image));
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  const handleEpisodeClick = (index: number) => {
    setSelectedEpisode(index);
    setCurrentPage(1); // Reset to the first page when changing episode
    fetchCharacters(episodes[index].characters);
  };

  // Calculate the index range of characters to display
  const totalCharacterPages = Math.ceil(characters.length / charactersPerPage);
  const startIndex = (currentPage - 1) * charactersPerPage;
  const currentCharacters = characters.slice(startIndex, startIndex + charactersPerPage);

  // Handle character page change
  const handleCharacterPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Left Sidebar */}
        <div className="col-12 col-md-3 bg-light p-3 mb-3 mb-md-0">
          <h5>Episodes</h5>
          <ul className="list-group">
            {episodes.map((episode, index) => (
              <li
                key={episode.id}
                className={`list-group-item List_item ${selectedEpisode === index ? 'border-2 border-danger' : ''}`}
                onClick={() => handleEpisodeClick(index)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: selectedEpisode === index ? '#f8f9fa' : 'transparent',
                  borderRadius: "20px"
                }}
              >
                {episode.name}
              </li>
            ))}
          </ul>
          <p className="mt-3">Scrollable list of episodes</p>
        </div>

        {/* Character Grid */}
        <div className="col-12 col-md-9 p-3">
          <h5>Rick and Morty Characters</h5>
          <div className="row">
            {/* Character boxes */}
            {currentCharacters.map((character, index) => (
             <div className="col-6 col-sm-4 col-md-3 p-2" key={index}>
             <div className="" style={{ height: '150px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <img src={character} alt="Character" style={{ maxWidth: '100%', maxHeight: '100%' }} />
             </div>
           </div>
           
            ))}
          </div>

          {/* Pagination for Characters */}
          <div className="d-flex justify-content-center mt-3">
            <nav>
              <ul className="pagination">
                {Array.from({ length: totalCharacterPages }, (_, index) => (
                  <li className="page-item" key={index}>
                    <a
                      className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}
                      href="#"
                      onClick={() => handleCharacterPageChange(index + 1)}
                    >
                      {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitalPage;

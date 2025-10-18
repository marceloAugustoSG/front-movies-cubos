import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import FiltersModal from '../../components/FiltersModal';
import type { Movie } from '../../types';
import * as S from './styles';

const MoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<any>({});
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  
  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMovies, setTotalMovies] = useState(28);
  const moviesPerPage = 14; // Ajustado para mostrar o máximo que cabe na sua tela
  const totalPages = Math.ceil(totalMovies / moviesPerPage); // Calcula dinamicamente
  
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 480);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const mockMovies: Movie[] = [
    {
      id: 1,
      title: "Capitã Marvel",
      originalTitle: "Captain Marvel",
      description: "Uma guerreira alienígena que se torna uma das mais poderosas heroínas do universo.",
      releaseDate: "2019-03-08T00:00:00.000Z",
      duration: 124,
      budget: 152000000,
      imageUrl: "https://image.tmdb.org/t/p/w500/AtsgWhDnODqQWklEo1i0t8i2e.jpg",
      createdAt: "2025-01-17T20:05:42.229Z",
      updatedAt: "2025-01-17T20:05:42.229Z",
      userId: "8e0334a3-55cc-4fba-9d9f-72fce3450773",
      user: { id: "8e0334a3-55cc-4fba-9d9f-72fce3450773", name: "joao", email: "jo.soares@hotmail.com" }
    },
    {
      id: 2,
      title: "Vingadores: Ultimato",
      originalTitle: "Avengers: Endgame",
      description: "Os Vingadores se reúnem para desfazer o estalo de Thanos.",
      releaseDate: "2019-04-26T00:00:00.000Z",
      duration: 181,
      budget: 356000000,
      imageUrl: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
      createdAt: "2025-01-17T20:05:42.229Z",
      updatedAt: "2025-01-17T20:05:42.229Z",
      userId: "8e0334a3-55cc-4fba-9d9f-72fce3450773",
      user: { id: "8e0334a3-55cc-4fba-9d9f-72fce3450773", name: "joao", email: "jo.soares@hotmail.com" }
    },
    {
      id: 3,
      title: "Homem-Aranha: Sem Volta para Casa",
      originalTitle: "Spider-Man: No Way Home",
      description: "Peter Parker pede ajuda ao Doutor Estranho para fazer o mundo esquecer sua identidade.",
      releaseDate: "2021-12-17T00:00:00.000Z",
      duration: 148,
      budget: 200000000,
      imageUrl: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
      createdAt: "2025-01-17T20:05:42.229Z",
      updatedAt: "2025-01-17T20:05:42.229Z",
      userId: "8e0334a3-55cc-4fba-9d9f-72fce3450773",
      user: { id: "8e0334a3-55cc-4fba-9d9f-72fce3450773", name: "joao", email: "jo.soares@hotmail.com" }
    },
    {
      id: 4,
      title: "Batman",
      originalTitle: "The Batman",
      description: "Quando um assassino visando a elite de Gotham com uma série de maquinações sádicas.",
      releaseDate: "2022-03-04T00:00:00.000Z",
      duration: 176,
      budget: 185000000,
      imageUrl: "https://image.tmdb.org/t/p/w500/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
      createdAt: "2025-01-17T20:05:42.229Z",
      updatedAt: "2025-01-17T20:05:42.229Z",
      userId: "8e0334a3-55cc-4fba-9d9f-72fce3450773",
      user: { id: "8e0334a3-55cc-4fba-9d9f-72fce3450773", name: "joao", email: "jo.soares@hotmail.com" }
    },
    {
      id: 5,
      title: "Top Gun: Maverick",
      originalTitle: "Top Gun: Maverick",
      description: "Depois de mais de 30 anos de serviço, Pete 'Maverick' Mitchell continua sendo o melhor piloto da Marinha.",
      releaseDate: "2022-05-27T00:00:00.000Z",
      duration: 131,
      budget: 170000000,
      imageUrl: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
      createdAt: "2025-01-17T20:05:42.229Z",
      updatedAt: "2025-01-17T20:05:42.229Z",
      userId: "8e0334a3-55cc-4fba-9d9f-72fce3450773",
      user: { id: "8e0334a3-55cc-4fba-9d9f-72fce3450773", name: "joao", email: "jo.soares@hotmail.com" }
    },
    {
      id: 6,
      title: "Duna",
      originalTitle: "Dune",
      description: "Paul Atreides, um jovem brilhante e talentoso, deve viajar para o planeta mais perigoso do universo.",
      releaseDate: "2021-10-22T00:00:00.000Z",
      duration: 155,
      budget: 165000000,
      imageUrl: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
      createdAt: "2025-01-17T20:05:42.229Z",
      updatedAt: "2025-01-17T20:05:42.229Z",
      userId: "8e0334a3-55cc-4fba-9d9f-72fce3450773",
      user: { id: "8e0334a3-55cc-4fba-9d9f-72fce3450773", name: "joao", email: "jo.soares@hotmail.com" }
    },
    {
      id: 7,
      title: "Encanto",
      originalTitle: "Encanto",
      description: "A história de uma família extraordinária, os Madrigal, que vivem escondidos nas montanhas da Colômbia.",
      releaseDate: "2021-11-24T00:00:00.000Z",
      duration: 102,
      budget: 120000000,
      imageUrl: "https://image.tmdb.org/t/p/w500/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg",
      createdAt: "2025-01-17T20:05:42.229Z",
      updatedAt: "2025-01-17T20:05:42.229Z",
      userId: "8e0334a3-55cc-4fba-9d9f-72fce3450773",
      user: { id: "8e0334a3-55cc-4fba-9d9f-72fce3450773", name: "joao", email: "jo.soares@hotmail.com" }
    },
    {
      id: 8,
      title: "Shang-Chi e a Lenda dos Dez Anéis",
      originalTitle: "Shang-Chi and the Legend of the Ten Rings",
      description: "Shang-Chi deve confrontar o passado que pensava ter deixado para trás.",
      releaseDate: "2021-09-03T00:00:00.000Z",
      duration: 132,
      budget: 150000000,
      imageUrl: "https://image.tmdb.org/t/p/w500/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg",
      createdAt: "2025-01-17T20:05:42.229Z",
      updatedAt: "2025-01-17T20:05:42.229Z",
      userId: "8e0334a3-55cc-4fba-9d9f-72fce3450773",
      user: { id: "8e0334a3-55cc-4fba-9d9f-72fce3450773", name: "joao", email: "jo.soares@hotmail.com" }
    },
    {
      id: 9,
      title: "Eternos",
      originalTitle: "Eternals",
      description: "Uma aventura épica que atravessa milhares de anos e apresenta uma nova equipe de super-heróis.",
      releaseDate: "2021-11-05T00:00:00.000Z",
      duration: 157,
      budget: 200000000,
      imageUrl: "https://image.tmdb.org/t/p/w500/6AdXwFTRTAzggD2QUTt5B7JFGKL.jpg",
      createdAt: "2025-01-17T20:05:42.229Z",
      updatedAt: "2025-01-17T20:05:42.229Z",
      userId: "8e0334a3-55cc-4fba-9d9f-72fce3450773",
      user: { id: "8e0334a3-55cc-4fba-9d9f-72fce3450773", name: "joao", email: "jo.soares@hotmail.com" }
    },
    {
      id: 10,
      title: "Black Widow",
      originalTitle: "Black Widow",
      description: "Natasha Romanoff confronta o passado mais sombrio de sua história.",
      releaseDate: "2021-07-09T00:00:00.000Z",
      duration: 134,
      budget: 200000000,
      imageUrl: "https://image.tmdb.org/t/p/w500/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg",
      createdAt: "2025-01-17T20:05:42.229Z",
      updatedAt: "2025-01-17T20:05:42.229Z",
      userId: "8e0334a3-55cc-4fba-9d9f-72fce3450773",
      user: { id: "8e0334a3-55cc-4fba-9d9f-72fce3450773", name: "joao", email: "jo.soares@hotmail.com" }
    },
    {
      id: 11,
      title: "Duna",
      originalTitle: "Dune",
      description: "Paul Atreides, um jovem brilhante e talentoso, deve viajar para o planeta mais perigoso do universo.",
      releaseDate: "2021-10-22T00:00:00.000Z",
      duration: 155,
      budget: 165000000,
      imageUrl: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
      createdAt: "2025-01-17T20:05:42.229Z",
      updatedAt: "2025-01-17T20:05:42.229Z",
      userId: "8e0334a3-55cc-4fba-9d9f-72fce3450773",
      user: { id: "8e0334a3-55cc-4fba-9d9f-72fce3450773", name: "joao", email: "jo.soares@hotmail.com" }
    },
    {
      id: 12,
      title: "Matrix Resurrections",
      originalTitle: "The Matrix Resurrections",
      description: "Neo volta ao mundo da Matrix com mais uma missão: descobrir se a realidade é física ou mental.",
      releaseDate: "2021-12-22T00:00:00.000Z",
      duration: 148,
      budget: 190000000,
      imageUrl: "https://image.tmdb.org/t/p/w500/8c4a8kE7PizaGQQnditMmI1xbRp.jpg",
      createdAt: "2025-01-17T20:05:42.229Z",
      updatedAt: "2025-01-17T20:05:42.229Z",
      userId: "8e0334a3-55cc-4fba-9d9f-72fce3450773",
      user: { id: "8e0334a3-55cc-4fba-9d9f-72fce3450773", name: "joao", email: "jo.soares@hotmail.com" }
    },
    {
      id: 13,
      title: "Top Gun: Maverick",
      originalTitle: "Top Gun: Maverick",
      description: "Após mais de 30 anos de serviço, Pete 'Maverick' Mitchell ainda é um dos melhores pilotos da Marinha.",
      releaseDate: "2022-05-27T00:00:00.000Z",
      duration: 131,
      budget: 170000000,
      imageUrl: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
      createdAt: "2025-01-17T20:05:42.229Z",
      updatedAt: "2025-01-17T20:05:42.229Z",
      userId: "8e0334a3-55cc-4fba-9d9f-72fce3450773",
      user: { id: "8e0334a3-55cc-4fba-9d9f-72fce3450773", name: "joao", email: "jo.soares@hotmail.com" }
    },
    {
      id: 14,
      title: "Jurassic World: Domínio",
      originalTitle: "Jurassic World Dominion",
      description: "Quatro anos após a destruição de Isla Nublar, os dinossauros agora vivem e caçam ao lado dos humanos.",
      releaseDate: "2022-06-10T00:00:00.000Z",
      duration: 147,
      budget: 185000000,
      imageUrl: "https://image.tmdb.org/t/p/w500/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg",
      createdAt: "2025-01-17T20:05:42.229Z",
      updatedAt: "2025-01-17T20:05:42.229Z",
      userId: "8e0334a3-55cc-4fba-9d9f-72fce3450773",
      user: { id: "8e0334a3-55cc-4fba-9d9f-72fce3450773", name: "joao", email: "jo.soares@hotmail.com" }
    },
    {
      id: 15,
      title: "O Poderoso Chefão",
      originalTitle: "The Godfather",
      description: "A história da família Corleone, uma das mais poderosas famílias do crime organizado nos Estados Unidos.",
      releaseDate: "1972-03-24T00:00:00.000Z",
      duration: 175,
      budget: 6000000,
      imageUrl: "https://br.web.img3.acsta.net/medias/nmedia/18/90/93/20/20120876.jpg",
      createdAt: "2025-01-17T20:05:42.229Z",
      updatedAt: "2025-01-17T20:05:42.229Z",
      userId: "8e0334a3-55cc-4fba-9d9f-72fce3450773",
      user: { id: "8e0334a3-55cc-4fba-9d9f-72fce3450773", name: "joao", email: "jo.soares@hotmail.com" }
    },
    {
      id: 16,
      title: "Pulp Fiction",
      originalTitle: "Pulp Fiction",
      description: "Histórias entrelaçadas de crime e redenção em Los Angeles.",
      releaseDate: "1994-10-14T00:00:00.000Z",
      duration: 154,
      budget: 8000000,
      imageUrl: "https://br.web.img3.acsta.net/medias/nmedia/18/90/93/20/20120876.jpg",
      createdAt: "2025-01-17T20:05:42.229Z",
      updatedAt: "2025-01-17T20:05:42.229Z",
      userId: "8e0334a3-55cc-4fba-9d9f-72fce3450773",
      user: { id: "8e0334a3-55cc-4fba-9d9f-72fce3450773", name: "joao", email: "jo.soares@hotmail.com" }
    },
    {
      id: 17,
      title: "Forrest Gump",
      originalTitle: "Forrest Gump",
      description: "A vida de um homem simples que vive momentos históricos dos Estados Unidos.",
      releaseDate: "1994-07-06T00:00:00.000Z",
      duration: 142,
      budget: 55000000,
      imageUrl: "https://br.web.img3.acsta.net/medias/nmedia/18/90/93/20/20120876.jpg",
      createdAt: "2025-01-17T20:05:42.229Z",
      updatedAt: "2025-01-17T20:05:42.229Z",
      userId: "8e0334a3-55cc-4fba-9d9f-72fce3450773",
      user: { id: "8e0334a3-55cc-4fba-9d9f-72fce3450773", name: "joao", email: "jo.soares@hotmail.com" }
    },
    {
      id: 18,
      title: "Matrix",
      originalTitle: "The Matrix",
      description: "Um programador descobre que a realidade é uma simulação computacional.",
      releaseDate: "1999-03-31T00:00:00.000Z",
      duration: 136,
      budget: 63000000,
      imageUrl: "https://br.web.img3.acsta.net/medias/nmedia/18/90/93/20/20120876.jpg",
      createdAt: "2025-01-17T20:05:42.229Z",
      updatedAt: "2025-01-17T20:05:42.229Z",
      userId: "8e0334a3-55cc-4fba-9d9f-72fce3450773",
      user: { id: "8e0334a3-55cc-4fba-9d9f-72fce3450773", name: "joao", email: "jo.soares@hotmail.com" }
    },
    {
      id: 19,
      title: "Titanic",
      originalTitle: "Titanic",
      description: "Uma história de amor a bordo do navio mais famoso da história.",
      releaseDate: "1997-12-19T00:00:00.000Z",
      duration: 194,
      budget: 200000000,
      imageUrl: "https://br.web.img3.acsta.net/medias/nmedia/18/90/93/20/20120876.jpg",
      createdAt: "2025-01-17T20:05:42.229Z",
      updatedAt: "2025-01-17T20:05:42.229Z",
      userId: "8e0334a3-55cc-4fba-9d9f-72fce3450773",
      user: { id: "8e0334a3-55cc-4fba-9d9f-72fce3450773", name: "joao", email: "jo.soares@hotmail.com" }
    },
    {
      id: 20,
      title: "Avatar",
      originalTitle: "Avatar",
      description: "Um ex-fuzileiro naval explora um mundo alienígena habitável.",
      releaseDate: "2009-12-18T00:00:00.000Z",
      duration: 162,
      budget: 237000000,
      imageUrl: "https://br.web.img3.acsta.net/medias/nmedia/18/90/93/20/20120876.jpg",
      createdAt: "2025-01-17T20:05:42.229Z",
      updatedAt: "2025-01-17T20:05:42.229Z",
      userId: "8e0334a3-55cc-4fba-9d9f-72fce3450773",
      user: { id: "8e0334a3-55cc-4fba-9d9f-72fce3450773", name: "joao", email: "jo.soares@hotmail.com" }
    },
    {
      id: 21,
      title: "Interestelar",
      originalTitle: "Interstellar",
      description: "Um grupo de astronautas viaja através de um buraco de minhoca no espaço.",
      releaseDate: "2014-11-07T00:00:00.000Z",
      duration: 169,
      budget: 165000000,
      imageUrl: "https://br.web.img3.acsta.net/medias/nmedia/18/90/93/20/20120876.jpg",
      createdAt: "2025-01-17T20:05:42.229Z",
      updatedAt: "2025-01-17T20:05:42.229Z",
      userId: "8e0334a3-55cc-4fba-9d9f-72fce3450773",
      user: { id: "8e0334a3-55cc-4fba-9d9f-72fce3450773", name: "joao", email: "jo.soares@hotmail.com" }
    },
    {
      id: 22,
      title: "Inception",
      originalTitle: "Inception",
      description: "Um ladrão especializado em extrair segredos do subconsciente.",
      releaseDate: "2010-07-16T00:00:00.000Z",
      duration: 148,
      budget: 160000000,
      imageUrl: "https://br.web.img3.acsta.net/medias/nmedia/18/90/93/20/20120876.jpg",
      createdAt: "2025-01-17T20:05:42.229Z",
      updatedAt: "2025-01-17T20:05:42.229Z",
      userId: "8e0334a3-55cc-4fba-9d9f-72fce3450773",
      user: { id: "8e0334a3-55cc-4fba-9d9f-72fce3450773", name: "joao", email: "jo.soares@hotmail.com" }
    },
    {
      id: 23,
      title: "O Cavaleiro das Trevas",
      originalTitle: "The Dark Knight",
      description: "Batman enfrenta o Coringa em uma batalha épica por Gotham.",
      releaseDate: "2008-07-18T00:00:00.000Z",
      duration: 152,
      budget: 185000000,
      imageUrl: "https://br.web.img3.acsta.net/medias/nmedia/18/90/93/20/20120876.jpg",
      createdAt: "2025-01-17T20:05:42.229Z",
      updatedAt: "2025-01-17T20:05:42.229Z",
      userId: "8e0334a3-55cc-4fba-9d9f-72fce3450773",
      user: { id: "8e0334a3-55cc-4fba-9d9f-72fce3450773", name: "joao", email: "jo.soares@hotmail.com" }
    },
    {
      id: 24,
      title: "Gladiador",
      originalTitle: "Gladiator",
      description: "Um general romano busca vingança contra o imperador que matou sua família.",
      releaseDate: "2000-05-05T00:00:00.000Z",
      duration: 155,
      budget: 103000000,
      imageUrl: "https://br.web.img3.acsta.net/medias/nmedia/18/90/93/20/20120876.jpg",
      createdAt: "2025-01-17T20:05:42.229Z",
      updatedAt: "2025-01-17T20:05:42.229Z",
      userId: "8e0334a3-55cc-4fba-9d9f-72fce3450773",
      user: { id: "8e0334a3-55cc-4fba-9d9f-72fce3450773", name: "joao", email: "jo.soares@hotmail.com" }
    },
    {
      id: 25,
      title: "Os Infiltrados",
      originalTitle: "The Departed",
      description: "Um policial infiltrado e um criminoso infiltrado se enfrentam.",
      releaseDate: "2006-10-06T00:00:00.000Z",
      duration: 151,
      budget: 90000000,
      imageUrl: "https://br.web.img3.acsta.net/medias/nmedia/18/90/93/20/20120876.jpg",
      createdAt: "2025-01-17T20:05:42.229Z",
      updatedAt: "2025-01-17T20:05:42.229Z",
      userId: "8e0334a3-55cc-4fba-9d9f-72fce3450773",
      user: { id: "8e0334a3-55cc-4fba-9d9f-72fce3450773", name: "joao", email: "jo.soares@hotmail.com" }
    },
    {
      id: 26,
      title: "Whiplash",
      originalTitle: "Whiplash",
      description: "Um jovem baterista busca a perfeição sob a tutela de um instrutor implacável.",
      releaseDate: "2014-10-15T00:00:00.000Z",
      duration: 106,
      budget: 3300000,
      imageUrl: "https://br.web.img3.acsta.net/medias/nmedia/18/90/93/20/20120876.jpg",
      createdAt: "2025-01-17T20:05:42.229Z",
      updatedAt: "2025-01-17T20:05:42.229Z",
      userId: "8e0334a3-55cc-4fba-9d9f-72fce3450773",
      user: { id: "8e0334a3-55cc-4fba-9d9f-72fce3450773", name: "joao", email: "jo.soares@hotmail.com" }
    },
    {
      id: 27,
      title: "Blade Runner 2049",
      originalTitle: "Blade Runner 2049",
      description: "Um novo blade runner descobre um segredo que pode mergulhar a sociedade no caos.",
      releaseDate: "2017-10-06T00:00:00.000Z",
      duration: 164,
      budget: 150000000,
      imageUrl: "https://br.web.img3.acsta.net/medias/nmedia/18/90/93/20/20120876.jpg",
      createdAt: "2025-01-17T20:05:42.229Z",
      updatedAt: "2025-01-17T20:05:42.229Z",
      userId: "8e0334a3-55cc-4fba-9d9f-72fce3450773",
      user: { id: "8e0334a3-55cc-4fba-9d9f-72fce3450773", name: "joao", email: "jo.soares@hotmail.com" }
    },
    {
      id: 28,
      title: "Mad Max: Estrada da Fúria",
      originalTitle: "Mad Max: Fury Road",
      description: "Em um mundo pós-apocalíptico, Max ajuda Furiosa a escapar de um tirano.",
      releaseDate: "2015-05-15T00:00:00.000Z",
      duration: 120,
      budget: 150000000,
      imageUrl: "https://br.web.img3.acsta.net/medias/nmedia/18/90/93/20/20120876.jpg",
      createdAt: "2025-01-17T20:05:42.229Z",
      updatedAt: "2025-01-17T20:05:42.229Z",
      userId: "8e0334a3-55cc-4fba-9d9f-72fce3450773",
      user: { id: "8e0334a3-55cc-4fba-9d9f-72fce3450773", name: "joao", email: "jo.soares@hotmail.com" }
    }
  ];

  const loadMovies = async (page: number = currentPage, filters: any = appliedFilters) => {
    try {
      setLoading(true);
      setError('');

      // Simula delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Aplica filtros aos filmes mock
      let filteredMovies = mockMovies;
      
      if (filters.title) {
        filteredMovies = filteredMovies.filter(movie => 
          movie.title.toLowerCase().includes(filters.title.toLowerCase()) ||
          movie.originalTitle.toLowerCase().includes(filters.title.toLowerCase())
        );
      }
      
      if (filters.releaseYear) {
        filteredMovies = filteredMovies.filter(movie => 
          new Date(movie.releaseDate).getFullYear() === filters.releaseYear
        );
      }
      
      if (filters.minDuration) {
        filteredMovies = filteredMovies.filter(movie => movie.duration >= filters.minDuration);
      }
      
      if (filters.maxDuration) {
        filteredMovies = filteredMovies.filter(movie => movie.duration <= filters.maxDuration);
      }
      
      if (filters.minBudget) {
        filteredMovies = filteredMovies.filter(movie => movie.budget >= filters.minBudget);
      }
      
      if (filters.maxBudget) {
        filteredMovies = filteredMovies.filter(movie => movie.budget <= filters.maxBudget);
      }

      // Simula a resposta da API com paginação
      const startIndex = (page - 1) * moviesPerPage;
      const endIndex = startIndex + moviesPerPage;
      const paginatedMovies = filteredMovies.slice(startIndex, endIndex);

      setMovies(paginatedMovies);
      setCurrentPage(page);
      setTotalMovies(filteredMovies.length);
    } catch (err) {
      setError('Erro ao carregar filmes. Tente novamente.');
      console.error('Erro ao carregar filmes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleMovieClick = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  const handleApplyFilters = (filters: any) => {
    setAppliedFilters(filters);
    setIsFiltersModalOpen(false);
    loadMovies(1, filters); // Recarrega na primeira página com os novos filtros
  };

  const handleToggleFilters = () => {
    setIsFiltersModalOpen(prev => !prev);
  };

  const handleCloseFilters = () => {
    setIsFiltersModalOpen(false);
  };

  // Funções de paginação
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      loadMovies(page);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // Aplica filtro de busca local (já que os filtros principais são aplicados na API)
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.originalTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.description.toLowerCase().includes(searchTerm.toLowerCase())
  );


 


  return (
    <S.MoviesContainer>
      <S.ControlBar>
        <S.SearchAndButtons>
          <Input
            type="text"
            placeholder="Pesquisar por filmes"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="search"
            icon={<Search size={16} fill="currentColor" />}
          />
          <S.ButtonsRow>
            <Button variant="filter-toggle" onClick={handleToggleFilters}>
              Filtros
            </Button>
            <Button variant="add-movie" onClick={() => navigate('/movies/new')}>
              Adicionar Filme
            </Button>
          </S.ButtonsRow>
        </S.SearchAndButtons>
      </S.ControlBar>

      <S.MoviesContent>
        <S.Header>
        </S.Header>

        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

        {loading ? (
          <S.LoadingContainer>
            ⏳ Carregando filmes...
          </S.LoadingContainer>
        ) : filteredMovies.length === 0 ? (
          <S.EmptyState>
            <S.EmptyTitle>🎭 Nenhum filme encontrado</S.EmptyTitle>
            <S.EmptyDescription>
              {searchTerm ? 'Tente uma busca diferente.' : 'Comece adicionando seu primeiro filme!'}
            </S.EmptyDescription>
            {!searchTerm && (
              <Button variant="add-movie" onClick={() => navigate('/movies/new')}>
                ➕ Adicionar Primeiro Filme
              </Button>
            )}
          </S.EmptyState>
        ) : (
          <S.MoviesGrid>
            {filteredMovies.map((movie) => (
              <S.MovieCard 
                key={movie.id} 
                onClick={() => handleMovieClick(movie.id)}
                style={{
                  backgroundImage: movie.imageUrl 
                    ? `url(${movie.imageUrl})` 
                    : 'linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-secondary) 100%)'
                }}
              >
                <S.MovieOverlay>
                  <S.MovieTitle>{movie.title}</S.MovieTitle>
                </S.MovieOverlay>
              </S.MovieCard>
            ))}
          </S.MoviesGrid>
        )}
      </S.MoviesContent>

      {filteredMovies.length > 0 && (
        <S.PaginationContainer>
          <Button 
            variant={currentPage === 1 ? "pagination-disabled" : "pagination-arrow"}
            disabled={currentPage === 1}
            onClick={handlePreviousPage}
          >
            ‹
          </Button>
          
          {/* Renderiza os números das páginas */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
            if (isSmallScreen && totalPages > 5) {
              // Em telas pequenas, mostra apenas algumas páginas
              if (page === 1 || page === totalPages || 
                  (page >= currentPage - 1 && page <= currentPage + 1)) {
                return (
                  <Button
                    key={page}
                    variant={page === currentPage ? "pagination-active" : "pagination"}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return <Button key={page} variant="pagination">...</Button>;
              }
              return null;
            } else {
              // Em telas maiores, mostra todas as páginas
              return (
                <Button
                  key={page}
                  variant={page === currentPage ? "pagination-active" : "pagination"}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              );
            }
          })}
          
          <Button 
            variant={currentPage === totalPages ? "pagination-disabled" : "pagination-arrow"}
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          >
            ›
          </Button>
        </S.PaginationContainer>
      )}
      
      <FiltersModal
        isOpen={isFiltersModalOpen}
        onClose={handleCloseFilters}
        onApplyFilters={handleApplyFilters}
      />
    </S.MoviesContainer>
  );
};

export default MoviesPage;

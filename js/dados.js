/* ============================================================
   DADOS DO SITE — edite aqui sem mexer no resto do código
   ============================================================ */

const PACE_ZERO = {
  // Ponto de partida usado para calcular a distância até cada corrida
  base: { nome: "Santa Cruz do Rio Pardo", lat: -22.8986, lon: -49.6325 },

  contato: {
    instagram: "pacezeros",
    whatsapp: "5514999999999", // trocar pelo número real (55 + DDD + número)
    email: "contato@pacezero.com.br",
    strava: "#",
  },

  numeros: [
    { valor: "06/2026", rotulo: "Fundação" },
    { valor: "40+", rotulo: "Atletas" },
    { valor: "12", rotulo: "Provas disputadas" },
    { valor: "3.200", rotulo: "Km corridos juntos" },
  ],

  /* PRÓXIMAS CORRIDAS
     - data: "AAAA-MM-DD", hora: "HH:MM"
     - cidade: a distância a partir de Santa Cruz é calculada sozinha
     - distanciaKm: opcional, só preencha se quiser forçar um valor */
  corridas: [
    {
      nome: "Corrida de Irapé",
      data: "2026-10-24",
      hora: "07:00",
      cidade: "Irapé, Chavantes - SP",
      distancias: ["5 km"],
      link: "#",
      imagem: "assets/galeria/frutap/2.jpg",
    },
    {
      nome: "Corrida Noturna de Assis",
      data: "2026-11-21",
      hora: "19:30",
      cidade: "Assis - SP",
      distancias: ["5 km", "10 km"],
      link: "#",
      imagem: "assets/galeria/avenida-assis/2.jpg",
    },
    {
      nome: "Meia Maratona de Ourinhos",
      data: "2026-12-06",
      hora: "06:30",
      cidade: "Ourinhos - SP",
      distancias: ["5 km", "10 km", "21 km"],
      link: "#",
      imagem: "assets/galeria/espirito-santo-do-turvo/1.jpg",
    },
  ],

  /* EVENTOS DO GRUPO
     - Datas futuras aparecem em "Eventos Pace Zero"
     - Depois que a data passa, o evento vai sozinho para "Eventos realizados"
     - fotos: opcional, aparecem no card do evento realizado */
  eventos: [
    {
      nome: "Lançamento do Pace Zero",
      data: "2026-06-13",
      hora: "07:00",
      local: "Praça da Matriz — Santa Cruz do Rio Pardo",
      descricao: "Primeiro treino oficial do grupo, com apresentação do uniforme e café da manhã.",
      emoji: "🚀",
      fotos: ["assets/galeria/avenida-assis/3.jpg", "assets/galeria/avenida-assis/1.jpg"],
    },
    {
      nome: "Treinão Outubro Rosa",
      data: "2026-10-04",
      hora: "06:30",
      local: "Lago Municipal",
      descricao: "Todo mundo de rosa em apoio à campanha de prevenção ao câncer de mama.",
      emoji: "🎀",
      fotos: ["assets/galeria/avenida-assis/2.jpg"],
    },
    {
      nome: "Treino de Halloween",
      data: "2026-10-30",
      hora: "19:00",
      local: "Praça central — Santa Cruz do Rio Pardo",
      descricao: "Todo mundo fantasiado! Treino leve, fotos e premiação para a melhor fantasia.",
      emoji: "🎃",
      destaque: true,
    },
    {
      nome: "Treinão de Fim de Ano",
      data: "2026-12-19",
      hora: "06:30",
      local: "Lago Municipal",
      descricao: "Longão coletivo com café da manhã para fechar o ano juntos.",
      emoji: "🏃",
    },
  ],

  galeria: [
    {
      nome: "Corrida Espírito Santo do Turvo",
      data: "2026-10",
      fotos: ["assets/galeria/espirito-santo-do-turvo/1.jpg"],
    },
    {
      nome: "Corrida Avenida Assis",
      data: "2026-10-19",
      fotos: [
        "assets/galeria/avenida-assis/1.jpg",
        "assets/galeria/avenida-assis/2.jpg",
        "assets/galeria/avenida-assis/3.jpg",
      ],
    },
    {
      nome: "Corrida Frutap",
      data: "2026-10-13",
      fotos: ["assets/galeria/frutap/1.jpg", "assets/galeria/frutap/2.jpg"],
    },
  ],

  /* PÓDIOS — posicao: 1, 2 ou 3 (define a cor da medalha)
     categoria: ex. "Geral", "Feminino 30-39" */
  podios: [
    {
      atleta: "Jordana",
      posicao: 1,
      categoria: "Feminino 25-29",
      corrida: "Corrida Frutap",
      distancia: "5 km",
      tempo: "24:38",
      foto: "assets/galeria/frutap/1.jpg",
    },
    {
      atleta: "Uelton",
      posicao: 2,
      categoria: "Masculino 35-39",
      corrida: "Corrida Avenida Assis",
      distancia: "10 km",
      tempo: "44:12",
      foto: "assets/galeria/avenida-assis/1.jpg",
    },
    {
      atleta: "Keli",
      posicao: 3,
      categoria: "Feminino 40-44",
      corrida: "Corrida Espírito Santo do Turvo",
      distancia: "5 km",
      tempo: "27:05",
      foto: "assets/galeria/espirito-santo-do-turvo/1.jpg",
    },
  ],

  parceiros: ["Seu Logo Aqui", "Academia Parceira", "Loja de Esportes", "Nutricionista"],
};

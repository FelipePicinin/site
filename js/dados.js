/* ============================================================
   DADOS DO SITE — edite aqui sem mexer no resto do código
   ============================================================ */

const PACE_ZERO = {
  // Ponto de partida usado para calcular a distância até cada corrida
  base: { nome: "Santa Cruz do Rio Pardo", lat: -22.8986, lon: -49.6325 },

  contato: {
    instagram: "pacezerosantacruz",
    whatsapp: "5514991889998", // trocar pelo número real (55 + DDD + número)
    email: "pacezerosantacruz@gmail.com",
    strava: "https://www.strava.com/clubs/2081699",
  },

  // Contador de visitas: crie a conta grátis em goatcounter.com e coloque aqui o código escolhido
  // (ex.: "pacezero" para pacezero.goatcounter.com). Vazio = desligado.
  goatcounter: "felipepicinin",

  /* NÚMEROS
     - "Provas disputadas" e "Km corridos juntos" sobem sozinhos: cada corrida
       da lista que já passou (com data depois de contarDesde) soma 1 prova
       e distância × atletas em km
     - o valor escrito aqui é o total até a data de contarDesde */
  contarDesde: "2026-10-29",
  numeros: [
    { valor: "06/2026", rotulo: "Fundação" },
    { valor: "200+", rotulo: "Atletas" },
    { valor: "20", rotulo: "Provas disputadas", auto: "provas" },
    { valor: "3.200", rotulo: "Km corridos juntos", auto: "km" },
  ],

  /* PRÓXIMAS CORRIDAS
     - data: "AAAA-MM-DD", hora: "HH:MM"
     - cidade: a distância a partir de Santa Cruz é calculada sozinha
     - distanciaKm: opcional, só preencha se quiser forçar um valor
     - atletas: depois da prova, coloque quantos do grupo correram. Ex.: atletas: 12
       Com mais de uma distância: atletas: { "7 km": 8, "21 km": 3 }
       Sem atletas, a prova soma só a maior distância nos km
     - não apague corridas que já passaram: elas somam nos números */
  corridas: [
    {
      nome: "Corrida de Irapé",
      data: "2026-10-24",
      hora: "17:00",
      cidade: "Irapé, Chavantes - SP",
      distancias: ["5 km"],
      link: "https://tvcomrunning.com.br/1-corrida-de-irape-117-anos-distrito-de-chavantes-sp",
      imagem: "assets/galeria/Corridas/Irape.jpg",
    },
    {
      nome: "Meia Maratona de Barra Bonita",
      data: "2026-11-01",
      hora: "06:00",
      cidade: "Barra Bonita - SP",
      distancias: ["7 km", "21 km"],
      link: "https://inscricoes.corridaeaventura.com.br/event/corrida-pedestre/1168-meia-maratona-solidaria-barra-bonita-2026",
      imagem: "assets/galeria/Corridas/barra.jpg",
    },
    {
      nome: "Unesp de Ourinhos",
      data: "2026-11-08",
      hora: "07:30",
      cidade: "Ourinhos - SP",
      distancias: ["5 km"],
      link: "https://tvcomrunning.com.br/7-circuito-de-corrida-e-caminhada-unesp-ourinhos",
      imagem: "assets/galeria/Corridas/unesp.jpg",
    },

      {
      nome: "Flash Back Night Run",
      data: "2026-11-14",
      hora: "19:00",
      cidade: "Assis - SP",
      distancias: ["5 km"],
      link: "https://tvcomrunning.com.br/flash-back-night-run-assis-sp",
      imagem: "assets/galeria/Corridas/assis.jpg",
    },

      {
      nome: "Aniversário de Ourinhos",
      data: "2026-12-13",
      hora: "08:00",
      cidade: "Ourinhos - SP",
      distancias: ["6 km"],
      link: "https://streetracebrasil.com.br/vi-corrida-em-comemoracao-ao-aniversario-de-ourinhos",
      imagem: "assets/galeria/Corridas/our.jpg",
    },

      {
      nome: "Bora Corrida 4ª Etapa",
      data: "2026-12-20",
      hora: "07:30",
      cidade: "Assis - SP",
      distancias: ["5 km"],
      link: "https://streetracebrasil.com.br/desafio-2026-bora-corrida-4-etapa-conquista",
      imagem: "assets/galeria/Corridas/bc4.jpg",
    },

    {
      nome: "Corrida de São Pedro do Turvo",
      data: "2027-01-10",
      hora: "08:00",
      cidade: "São Pedro do Turvo - SP",
      distancias: ["5 km"],
      link: "https://streetracebrasil.com.br/2-sao-pedro-fest-run",
      imagem: "assets/galeria/Corridas/spt.jpg",
    },

    {
      nome: "Corrida São Sebastião",
      data: "2027-01-31",
      hora: "07:30",
      cidade: "Santa Cruz do Rio Pardo - SP",
      distancias: ["6 km"],
      link: "https://streetracebrasil.com.br/1-corrida-sao-sebastiao-2027",
      imagem: "assets/galeria/Corridas/sss.jpg",
    },
     
  ],

  /* EVENTOS DO GRUPO
     - Datas futuras aparecem em "Eventos Pace Zero"
     - Depois que a data passa, o evento vai sozinho para "Eventos realizados"
     - fotos: opcional, aparecem no card do evento realizado */
  eventos: [
   /* {
      nome: "Lançamento do Pace Zero",
      data: "2026-06-13",
      hora: "07:00",
      local: "Praça da Matriz — Santa Cruz do Rio Pardo",
      descricao: "Primeiro treino oficial do grupo, com apresentação do uniforme e café da manhã.",
      emoji: "🚀",
      fotos: ["assets/galeria/avenida-assis/3.jpg", "assets/galeria/avenida-assis/1.jpg"],
    }, */
    {
      nome: "Treinão Outubro Rosa",
      data: "2026-10-04",
      hora: "06:30",
      local: "Lago Municipal",
      descricao: "Todo mundo de rosa em apoio à campanha de prevenção ao câncer de mama.",
      emoji: "🎀",
      fotos: ["assets/galeria/eventos/or.jpg"],
    },
    {
      nome: "Treino de Halloween",
      data: "2026-10-30",
      hora: "20:00",
      local: "Bairro Estação — Santa Cruz do Rio Pardo",
      descricao: "Todo mundo fantasiado! Treino leve, fotos e premiação para a melhor fantasia.",
      emoji: "🎃",
      destaque: true,
    },
   /* {
      nome: "Treinão de Fim de Ano",
      data: "2026-12-19",
      hora: "06:30",
      local: "Lago Municipal",
      descricao: "Longão coletivo com café da manhã para fechar o ano juntos.",
      emoji: "🏃",
    }, */
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

     {
      nome: "Corrida Irape",
      data: "2026-10-24",
      fotos: [
        "assets/galeria/Irape/1.jpg",
        "assets/galeria/Irape/2.jpg",
        "assets/galeria/Irape/3.jpg",
         "assets/galeria/Irape/4.jpg",
         "assets/galeria/Irape/5.jpg",
      ],
    },
  ],

  /* PÓDIOS — posicao: 1º ouro, 2º prata, 3º bronze; do 4º em diante a medalha fica laranja
     categoria: ex. "Geral feminino", "Categoria 35 a 39"
     tempo: opcional
     Lista vazia [] esconde a seção. */
  podios: [
    {
      atleta: "Equipe Pace Zero",
      posicao: 2,
      categoria: "Maior equipe",
      corrida: "Corrida de Irapé",
      distancia: "5 km",
      foto: "assets/galeria/Irape/3.jpg",
    },
    {
      atleta: "Leandro",
      posicao: 2,
      categoria: "Categoria 35 a 39",
      corrida: "Corrida de Irapé",
      distancia: "5 km",
      foto: "assets/galeria/Podi/i1.jpg",
    },
    {
      atleta: "Jordana",
      posicao: 4,
      categoria: "Geral feminino",
      corrida: "Corrida de Irapé",
      distancia: "5 km",
      foto: "assets/galeria/Podi/i3.jpg",
    },
    {
      atleta: "Rayanne",
      posicao: 5,
      categoria: "Categoria 30 a 34",
      corrida: "Corrida de Irapé",
      distancia: "5 km",
      foto: "assets/galeria/Podi/i2.jpg",
    },
  ],

  parceiros: [
    {
      nome: "Guacira Alimentos",
      logo: "assets/parceiros/Guacira.jpg",
      link: "https://instagram.com/alimentosguacira",
    },
    {
      nome: "Anhanguera",
      logo: "assets/parceiros/anhanguera.jpeg",
      link: "https://instagram.com/anhanguera_santa_cruz_01",
    },

    {
      nome: "Pegasus",
      logo: "assets/parceiros/pegasus.jpg",
      link: "https://instagram.com/pegasusservicoscontabeis",
    },

    {
      nome: "Santa cruz utilidades",
      logo: "assets/parceiros/sc.jpg",
      link: "https://instagram.com/santacruzutilidades",
    },

    {
      nome: "Bruna Honorato Studio de Pilates",
      logo: "assets/parceiros/bruna.jpeg",
      link: "",
    },
  ],
  
};

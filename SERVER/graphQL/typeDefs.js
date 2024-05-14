// typeDefs.js
const { gql } = require("apollo-server-express");

module.exports = gql`
  type Utilisateur {
    id: ID!
    nom: String!
    prenom: String!
    email: String!
    password: String!
    numero_de_telephone: String!
    grade: String!
    sexe: String!
  }

  type Typefamille {
    id: ID!
    type: String!
    famille: [Famille!]
  }

  type Famille {
    c_famille: ID!
    nom: String!
    type_id: [Typefamille!]!
    sous_famille: [Sousfamille!]!
    article: [Articles!]!
  }
  type Direction {
    numero: Int!
    nom: String!
    abs: ID!
    bureau: [Bureau!]!
  }
  type Bureau {
    c_bureau: ID!
    nom: String!
    abs: [Direction!]!
  }
  type Sousfamille {
    c_sous_famille: ID!
    nom: String!
    c_famille: [Famille!]!
    articles: [Articles!]!
  }
  type Articles {
    id_article: ID!
    nom: String!
    reference: String
    um: String
    dateentre: String!
    quantite: Int!
    sousFamille: [Sousfamille!]!
    c_famille: [Famille!]!
  }
  type Pc{
    n_serie: ID!
    marque:String!
    c_technique:String!
    date_entre_magasin:String!
    service_affecte:[Bureau]!
    date_affectation:String!
    c_famille:[Famille]!
  }
  type Pannes {
    id:ID!
    pc_n_serie:[Pc]!
    date_panee:String!
    description:String!
  }
  type Commandes{
    id_commande:ID!
    id_article:[Articles]!
    c_bureau:[Bureau]!
    date_commande:String!
    quantite:Int!
  }
  type Query {
    utilisateurs: [Utilisateur]
    utilisateur(id: ID!): Utilisateur
    typefamille: [Typefamille]
    familles: [Famille]
    famille(id: ID!): Famille
    directions: [Direction]
    direction(id: ID!): Direction
    bureaux: [Bureau]
    bureau(id: ID!): Bureau
    sousfamilles: [Sousfamille]
    sousfamille(id: ID!): Sousfamille
    articles: [Articles]
    article(id: ID!): Articles
    pcs:[Pc]
    pc(id:ID!):Pc
    pannes:[Pannes]
    panne(id:ID!):Pannes
    commandes:[Commandes]
    commande(id:ID!):Commandes
  }
  type Mutation{
    addArticle(article:inputArticle!):Articles
    deleteArticle(id:ID!):[Articles]
    addCommande(commande:inputCommande!):Commandes
  }
  input inputArticle{
    nom:String!
    c_sous_famille :Int!
    c_famille :Int!
    quantite :Int!
    reference:String!
    um :String!
    dateentre :String!
# la forme de la requete:
#{
#   "article": {
#     "nom":"Test product mutation",
#     "c_sous_famille" :6,
#     "c_famille" :2,
#     "quantite" :300,
#     "reference":"A4 90g/m²",
#     "um" :"R",
#     "dateentre" :"2022-01"
#   }
# }
# { 
#   "deleteArticleId": 99
# }
}
input inputCommande{
  c_bureau:Int!
  id_article:Int!
  date_commande:String!
  quantite:Int!
#   {
#   "commande": {
#     "c_bureau":350010010,
#   "id_article":2,
#   "date_commande":"2024-03-23",
#   "quantite":4
#   }
# }
}
`;

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
  }
`;

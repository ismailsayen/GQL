// resolvers.js
const Utilisateur = require("../sequelize/Utilisateurs");
const Famille = require("../sequelize/Famille");
const Typefamille = require("../sequelize/TypeFamille");
const Direction = require("../sequelize/Direction");
const Bureau = require("../sequelize/Bureau");
const Sousfamille = require("../sequelize/Sousfamille");
const Articles = require("../sequelize/Articles");
const Pc = require("../sequelize/Pc");
const Commandes = require("../sequelize/Commandes");
const Pannes = require("../sequelize/Pannes");
//----------------------------------------------------------
const resolvers = {
  Query: {
    utilisateurs: async () => {
      try {
        const utilisateurs = await Utilisateur.findAll();
        return utilisateurs;
      } catch (error) {
        throw new Error("Erreur lors de la récupération des utilisateurs");
      }
    },
    utilisateur: async (_, args) => {
      try {
        const utilisateur = await Utilisateur.findByPk(parseInt(args.id));
        if (!utilisateur) {
          throw new Error("Utilisateur non trouvé");
        }
        return utilisateur;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    // tous les types de familles
    typefamille: async () => {
      try {
        const typefamilles = await Typefamille.findAll();
        return typefamilles;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    // tous les familles
    familles: async () => {
      try {
        const familles = await Famille.findAll();
        return familles;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    //famile par id
    famille: async (_, args) => {
      try {
        const famille = await Famille.findByPk(parseInt(args.id));
        if (!famille) {
          throw new Error("Famille non trouvée");
        }
        return famille;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    // tous les directions
    directions: async () => {
      try {
        const directions = await Direction.findAll();
        return directions;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    // direction by id
    direction: async (_, args) => {
      try {
        const direction = await Direction.findByPk(args.id);
        return direction;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    // tous les bureaux
    bureaux: async () => {
      try {
        const bur = await Bureau.findAll();
        return bur;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    // bureau by id
    bureau: async (_, args) => {
      try {
        const br = await Bureau.findByPk(parseInt(args.id));
        return br;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    //tous les sousfamilles
    sousfamilles: async () => {
      try {
        const sfms = await Sousfamille.findAll();
        return sfms;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    // sousfamilles byId
    sousfamille: async (_, args) => {
      try {
        const sfm = await Sousfamille.findByPk(args.id);
        return sfm;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    // tous les articles
    articles: async () => {
      try {
        const arts = await Articles.findAll();
        return arts;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    //article by id
    article: async (_, args) => {
      try {
        const art = await Articles.findByPk(args.id);
        return art;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    pcs:async (_,args)=>{
      try {
        const pcs=await Pc.findAll();
        return pcs
      } catch (err) {
        throw new Error(err.message);
      }
    },
    pc:async (_,args)=>{
      try {
        const pc = await Pc.findByPk(args.id);
        return pc;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    commandes:async (_,args)=>{
      try {
        const commandes=await Commandes.findAll();
        return commandes
      } catch (err) {
        throw new Error(err.message);
      }
    },
    commande:async (_,args)=>{
      try {
        const commande=await Commandes.findByPk(args.id);
        return commande
      } catch (err) {
        throw new Error(err.message);
      }
    },
    pannes:async (_,args)=>{
      try {
        const pannes=await Pannes.findAll();
        return pannes
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
  // les relation entre les tables
  Famille: {
    type_id: async (parent) => {
      try {
        const typefamilles = await Typefamille.findAll({
          where: { id: parent.type_id },
        });
        return typefamilles;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    sous_famille:async (parent) => {
      try {
        const sfm = await Sousfamille.findAll({
          where: { c_famille: parent.c_famille },
        });
        return sfm;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    article:async (parent) => {
      try {
        const sfm = await Articles.findAll({
          where: { c_famille: parent.c_famille },
        });
        return sfm;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
  Typefamille: {
    famille: async (parent) => {
      try {
        const dt = await Famille.findAll({
          where: {
            type_id: parent.id,
          },
        });
        return dt;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
  Direction: {
    bureau: async (parent) => {
      try {
        const br = Bureau.findAll({
          where: { abs: parent.abs },
        });
        return br;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
  Bureau: {
    abs: async (parent) => {
      try {
        const par = Direction.findAll({
          where: { abs: parent.abs },
        });
        return par;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
  Sousfamille: {
    c_famille: async (parent) => {
      try {
        const sfm = await Famille.findAll({
          where: { c_famille: parent.c_famille },
        });
        return sfm;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    articles: async (parent) => {
      try {
        const arts = await Articles.findAll({
          where: { c_sous_famille: parent.c_sous_famille },
        });
        return arts;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
  Articles: {
    sousFamille: async (parent) => {
      try {
        const sfms = await Sousfamille.findAll({
          where: { c_sous_famille: parent.c_sous_famille },
        });
        return sfms;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    c_famille: async (parent) => {
      try {
        const cfm = await Famille.findAll({
          where: { c_famille: parent.c_famille },
        });
        return cfm;
      } catch (error) {
        throw new Error(err.message);
      }
    },
  },
  Commandes:{
    id_article: async (parent) => {
      try {
        const artc = await Articles.findAll({
          where: { id_article: parent.id_article },
        });
        return artc;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    c_bureau: async (parent) => {
      try {
        const brx = await Bureau.findAll({
          where: { c_bureau: parent.c_bureau },
        });
        return brx;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
  Pannes:{
      pc_n_serie:async (parent) => {
        try {
          const pc = await Pc.findAll({
            where: { n_serie: parent.pc_n_serie },
          });
          return pc;
        } catch (err) {
          throw new Error(err.message);
        }
    },
  },
  Pc:{
    service_affecte:async (parent) => {
        try {
          const  bureau= await Bureau.findAll({
            where: { c_bureau: parent.servie_affecte },
          });
          return bureau;
        } catch (err) {
          throw new Error(err.message);
        }
    },
    c_famille: async (parent) => {
      try {
        const cfm = await Famille.findAll({
          where: { c_famille: parent.c_famille },
        });
        return cfm;
      } catch (error) {
        throw new Error(err.message);
      }
    },
  },
 
  //Mutation
  Mutation :{
    addArticle: async (_,args)=>{
      try {
        const newArticle = await Articles.create(args.article);
        return newArticle;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    addCommande: async (_,args)=>{
      try {
        const newCommande = await Commandes.create(args.commande);
        return newCommande;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    deleteArticle: async (_,args)=>{
      try {
        return await Articles.destroy({where:{id_article: args.id}});
         
      } catch (err) {
        throw new Error(err.message);
      }
    }
  }
};

module.exports = resolvers;

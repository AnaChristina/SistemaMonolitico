import { Like, createQueryBuilder, getConnection } from "typeorm";
import { MariaDBDataSource, dataSourceStart } from "./data_source";
import { Livros } from "./model";

export class Service {
  start() {
    dataSourceStart();
  }

  insert(livros: Livros) {
    MariaDBDataSource.manager.save(livros);
    return livros;
  }

  async listAll() {
    let list = await MariaDBDataSource.manager.find(Livros);
    return list;
  }

  async searchBooks(termoPesquisa: string): Promise<Livros[]> {
    try {
      const livrosEncontrados = await MariaDBDataSource.manager.find(Livros, {
        where: [
          { titulo: Like(`%${termoPesquisa}%`) },
          { autor: Like(`%${termoPesquisa}%`) },
          { categoria: Like(`%${termoPesquisa}%`) }
        ]
      });
      return livrosEncontrados;
    } catch (error) {
      throw new Error(`Erro ao pesquisar livros: ${error}`);
    }
  }
}
import "reflect-metadata"
import { DataSource } from "typeorm"
import { Livros} from "./model"

export const MariaDBDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "web_orm_insert_ts",
    synchronize: true,
    logging: false,
    entities: [Livros],
    migrations: [],
    subscribers: [],
})

export function dataSourceStart(){
    MariaDBDataSource.initialize().then( ()=>{
        console.log("Inicializada a fonte de dados...");
    }).catch((err)=>{
        console.error("Erro de inicialização da fonte de dados");
    }) 
}
import { options } from './configDB.js';
import knex from 'knex';

const productos = [
    {
        "nombre": "Play Station 5",
        "codigo": 24567,
        "precio": 350999,
    },
    {
        "nombre": "Xbox Series S",
        "codigo": 24987,
        "precio": 363999,
    },
    {
        "nombre": "Sega Genesis",
        "codigo": 36987,
        "precio": 10000,
    },
];

const carritos = [
    {
        "timestamp": new Date(),
    },
    {
        "timestamp": new Date(),
    },
];

(async () => {
    const db = knex(options.mysql);
    try {
        await db.schema.createTableIfNotExists('productos', (table) => {
            table.increments('id').primary();
            table.string('nombre');
            table.integer('precio');
            table.string('codigo');
            table.dateTime('timestamp').defaultTo(db.fn.now());
        });
        await db('productos').insert(productos);
        console.log("Datos de productos insertados con éxito");
    } catch (err) {
        console.log(err);
    }
})();

(async () => {
const db = knex(options.mysql);
try {
    await db.schema.createTableIfNotExists("carritos", (table) => {
    table.increments("id").primary();
    table.dateTime("timestamp").defaultTo(db.fn.now());
    });
    await db("carritos").insert(carritos);
    console.log("Datos de carrito insertados con éxito");
} catch (err) {
    console.log(err);
}
})();

(async () => {
    const db = knex(options.mysql);
    try {
        await db.schema.createTableIfNotExists("carritos_productos", (table) => {
        table.increments("id").primary();
        table.integer("carrito_id").unsigned().references("id").inTable("carritos");
        table.integer("producto_id").unsigned().references("id").inTable("productos");
        });
        console.log("Tabla intermedia creada con éxito");
    } catch (err) {
        console.log(err);
    }
})();

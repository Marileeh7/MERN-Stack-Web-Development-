const { MongoClient } = require('mongodb');

async function main() {
    const uri = 'mongodb://localhost:27017/';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('my_first_db');
        const students = db.collection('students');

        // Insertar 5 estudiantes con la información adecuada
        await students.insertMany([
            { name: "Juan", home_state: "California", lucky_number: 7, birthday: { month: 5, day: 20, year: 1995 } },
            { name: "Ana", home_state: "Washington", lucky_number: 4, birthday: { month: 7, day: 15, year: 1993 } },
            { name: "Carlos", home_state: "California", lucky_number: 10, birthday: { month: 8, day: 10, year: 1992 } },
            { name: "María", home_state: "Oregon", lucky_number: 2, birthday: { month: 1, day: 5, year: 1990 } },
            { name: "Luis", home_state: "Nevada", lucky_number: 9, birthday: { month: 12, day: 25, year: 1989 } }
        ]);

        console.log("Inserted 5 students");

        // Consigue todos los estudiantes
        const allStudents = await students.find().toArray();
        console.log("All students:", allStudents);

        // Recupera a todos los estudiantes que son de California o Washington
        const caOrWaStudents = await students.find({ home_state: { $in: ["California", "Washington"] } }).toArray();
        console.log("Students from California or Washington:", caOrWaStudents);

        // Obtener todos los estudiantes cuyo número de la suerte sea mayor que 3
        const luckyNumberGt3 = await students.find({ lucky_number: { $gt: 3 } }).toArray();
        console.log("Students with lucky number > 3:", luckyNumberGt3);

        // Obtener todos los estudiantes cuyo número de la suerte sea menor o igual a 10
        const luckyNumberLte10 = await students.find({ lucky_number: { $lte: 10 } }).toArray();
        console.log("Students with lucky number <= 10:", luckyNumberLte10);

        // Obtener todos los estudiantes cuyo número de la suerte esté entre 1 y 9 (inclusive)
        const luckyNumberBetween1And9 = await students.find({ lucky_number: { $gte: 1, $lte: 9 } }).toArray();
        console.log("Students with lucky number between 1 and 9:", luckyNumberBetween1And9);

        // Agrega un campo a cada colección de estudiantes llamado 'intereses' que es un ARRAY
        await students.updateMany({}, { $set: { intereses: ['codificación', 'brunch', 'MongoDB'] } });
        console.log("Added interests to all students");

        // Agrega algunos intereses únicos para cada estudiante
        await students.updateOne({ name: "Juan" }, { $addToSet: { intereses: "fútbol" } });
        await students.updateOne({ name: "Ana" }, { $addToSet: { intereses: "leer" } });
        await students.updateOne({ name: "Carlos" }, { $addToSet: { intereses: "viajar" } });
        await students.updateOne({ name: "María" }, { $addToSet: { intereses: "cine" } });
        await students.updateOne({ name: "Luis" }, { $addToSet: { intereses: "música" } });
        console.log("Added unique interests to each student");

        // Agrega 'impuestos' a los intereses de alguien
        await students.updateOne({ name: "Juan" }, { $addToSet: { intereses: "impuestos" } });
        console.log("Added 'impuestos' to Juan's interests");

        // Elimina los intereses de 'impuestos'
        await students.updateOne({ name: "Juan" }, { $pull: { intereses: "impuestos" } });
        console.log("Removed 'impuestos' from Juan's interests");

        // Elimina a todos los estudiantes que son de California
        await students.deleteMany({ home_state: "California" });
        console.log("Deleted all students from California");

        // Eliminar a un alumno por su nombre
        await students.deleteOne({ name: "Luis" });
        console.log("Deleted student named Luis");

        // Retira a un estudiante cuyo número de la suerte sea mayor que 5 (SOLO UNO)
        await students.deleteOne({ lucky_number: { $gt: 5 } });
        console.log("Deleted one student with lucky number greater than 5");

        // Agrega un campo a cada colección de estudiantes llamado 'number_of_belts' y configúralo en 0
        await students.updateMany({}, { $set: { number_of_belts: 0 } });
        console.log("Added number_of_belts set to 0 for all students");

        // Incrementa este campo en 1 para todos los estudiantes en Washington
        await students.updateMany({ home_state: "Washington" }, { $inc: { number_of_belts: 1 } });
        console.log("Incremented number_of_belts by 1 for students in Washington");

        // Cambia el nombre del campo 'number_of_belts' a 'belts_earned'
        await students.updateMany({}, { $rename: { 'number_of_belts': 'belts_earned' } });
        console.log("Renamed number_of_belts to belts_earned");

        // Elimina el campo 'lucky_number'
        await students.updateMany({}, { $unset: { lucky_number: "" } });
        console.log("Removed lucky_number field from all students");

        // Agrega un campo 'updated_on' y establece el valor como la fecha actual
        await students.updateMany({}, { $set: { updated_on: new Date() } });
        console.log("Added updated_on field with current date to all students");

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

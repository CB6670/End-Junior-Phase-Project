const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || `postgres://localhost:5432/schools-project`);

const School = db.define('school',{
    id: {
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        primaryKey: true,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    imageURL:{
        type:Sequelize.TEXT,
        allowNull:false
    }
});

const Student = db.define('student',{
    id:{
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        primaryKey:true,
    },
    firstName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    lastName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        validate:{
            isEmail:true,
        },
        unique:true
    },
    GPA:{
        type:Sequelize.FLOAT,
        allowNull:false
    }
})

Student.belongsTo(School);
School.hasMany(Student);

const syncAndSeed = async() =>{
    await db.sync({force:true});
    const schools = [{name:'Harvard',imageURL:"https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2Fthumb%2F2%2F29%2FHarvard_shield_wreath.svg%2F1200px-Harvard_shield_wreath.svg.png&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FHarvard_University&docid=-Hwdrpag_NSOpM&tbnid=QtDHsH7m31Il1M%3A&vet=10ahUKEwis4orr5qPjAhVUKH0KHbqMDNgQMwidASgVMBU..i&w=1200&h=1166&bih=821&biw=1440&q=harvard&ved=0ahUKEwis4orr5qPjAhVUKH0KHbqMDNgQMwidASgVMBU&iact=mrc&uact=8"}];
    const students = [{firstName:"Conner",lastName:'Stennett',email:'connerstennett@gmail.com',GPA:3.5,}];
    await Promise.all(schools.map(school => {
        School.create(school);
    }))
    await Promise.all(students.map(student => {
        Student.create(student);
    }))
}

syncAndSeed();

module.exports = {
    syncAndSeed,
    models:{
        School,
        Student
    }
}
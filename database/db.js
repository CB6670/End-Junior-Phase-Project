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

Student.belongsTo(School, {constraints: false});
School.hasMany(Student);

const syncAndSeed = async() =>{
        try{
            await db.sync({force:true});
            const schools = [{name: 'Harvard', imageURL:"https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2Fthumb%2F2%2F29%2FHarvard_shield_wreath.svg%2F1200px-Harvard_shield_wreath.svg.png&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FHarvard_University&docid=-Hwdrpag_NSOpM&tbnid=QtDHsH7m31Il1M%3A&vet=10ahUKEwis4orr5qPjAhVUKH0KHbqMDNgQMwidASgVMBU..i&w=1200&h=1166&bih=821&biw=1440&q=harvard&ved=0ahUKEwis4orr5qPjAhVUKH0KHbqMDNgQMwidASgVMBU&iact=mrc&uact=8"}, {name: "Yale", imageURL:"https://www.google.com/imgres?imgurl=https%3A%2F%2Fd13b2ieg84qqce.cloudfront.net%2F434ea0cf202f117a61f0afa7c59fc73c70355446.jpg&imgrefurl=https%3A%2F%2Fwww.niche.com%2Fcolleges%2Fyale-university%2F&docid=QTocfj4Hnb7__M&tbnid=HH_5KqKxBQ5D6M%3A&vet=10ahUKEwiCtafNwrLjAhVllVQKHcuyAvoQMwiAASgFMAU..i&w=1800&h=942&bih=682&biw=1200&q=yale%20university&ved=0ahUKEwiCtafNwrLjAhVllVQKHcuyAvoQMwiAASgFMAU&iact=mrc&uact=8"}, {name:"UCLA", imageURL:"https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.vox-cdn.com%2Fthumbor%2F0Wg8nw-3UCsAsVCRoqjPkku4vQM%3D%2F0x0%3A6115x4081%2F1200x800%2Ffilters%3Afocal(2569x1552%3A3547x2530)%2Fcdn.vox-cdn.com%2Fuploads%2Fchorus_image%2Fimage%2F57059063%2Fshutterstock_560011798.0.jpg&imgrefurl=https%3A%2F%2Fla.curbed.com%2F2017%2F10%2F8%2F16444920%2Fucla-student-housing-expansion-tower-20&docid=OTYl5Oyz8aUAxM&tbnid=CKcqQtNGEm3izM%3A&vet=10ahUKEwjt_ZCww7LjAhWDEXwKHSS4Co8QMwiBASgDMAM..i&w=1200&h=800&bih=682&biw=1200&q=UCLA&ved=0ahUKEwjt_ZCww7LjAhWDEXwKHSS4Co8QMwiBASgDMAM&iact=mrc&uact=8"}];
            await Promise.all(schools.map(school => {
                School.create(school);
            }))
            const Harvard = await School.findOne({
                where: {
                    name: "Harvard"
                }
            })
            console.log(Harvard);
            //const HarvardId = Harvard.id;
            //const students = [{firstName:"Conner",lastName:'Stennett',email:'connerstennett@gmail.com',GPA: 3.5, schoolId: HarvardId }];
            // await Promise.all(students.map(student => {
            //     Student.create(student);
            // }))
    }catch(err){
        console.error(err);
}
}

module.exports = {
    syncAndSeed,
    models: {
        School,
        Student
    }
}

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const database = require("./../models");

const otorisasi = async (request, response, next) => {
    try 
    {
        const bearerToken = request.headers.authorization;
        const token = bearerToken.split("Bearer ")[1];
        const isiToken = jwt.verify(token, "secret");
        request.user = await database.User.findByPk(isiToken.id);
        request.role = isiToken.role;
        request.userId = isiToken.id;
        next();
    }
    catch (err) 
    {
        response.status(402).json({ message: "Otorisasi gagal!" });
    }
};

const siapakahAku = async (request, response) => {
    return response.status(200).json({ message: "Anda berhak mengaksees", role: request.role });
};

const masuk = async (request, response) => {
    const { email, password} = request.body;
    const cekData = await database.Authentication.findOne({ where: { email } })

    if(!cekData)
    {
        return response.status(422).json({ message: "Email atau password anda tidak ditemukan!"})
    }
    
    const bandingkanPass = await bcrypt.compare(password, cekData.password);
    if(!bandingkanPass) {
        return response.status(422).json({ message: "Email atau password anda tidak ditemukan!"})
    }
    const token = jwt.sign({id: cekData.id,email:cekData.email,password:cekData.password}, process.env.JWT_SECRET_ENV);
    return response.status(200).json({ message: "login Berhasil!", token});
}


function checkPass(enkripPassword, pass) 
{
    return new Promise((resolve, reject) => 
    {
        bcrypt.compare(
            pass,
            enkripPassword,
            (err, isPasswordCorrect) => 
            {
                if (!!err) 
                {
                    reject(err);
                    return;
                }
                resolve(isPasswordCorrect);
            }
        );
    });
}

const pendaftaranAdmin = async (request, response) => {
    if (request.role !== "superadmin") {
        return res.status(403).json({ message: "Anda tidak berhak" });
    }
    const { name, email, password } = request.body;

    const validasiEmail = await database.User.findOne({ where: { email } });
    if (validasiEmail) {
        return response.json({ message: "email sudah terdaftar" });
    }
    const Passwordhash = await bcrypt.hash(password, 12);
    const responseAdd = await database.User.create({
        name,
        email,
        encryptedPassword: Passwordhash,
        role: "admin",
    });
    return response.status(201).json({
        message: "Pendaftaran Berhasil!",
        data: responseAdd,
    });
};
const pendaftaran = async (request, response) => {
    const { name, email, password } = request.body;

    const validasiEmail = await database.Authentication.findOne({ where: { email}})
    if(validasiEmail) 
    {
        return response.json({ message: "email sudah terdaftar!"})
    }
    const Passwordhash = await bcrypt.hash(password, 12);
    const responseAdd = await database.Authentication.create({ name, email, password: Passwordhash });
    return response.status(201).json({
        message: "Pendaftaran anda berhasil!!",
        data: responseAdd,
    })
} 



const superAdminLogin = async (request, response) => {
    const { email, password } = request.body;
    const userSuperAdmin = await database.User.findOne({ where: { email } });
    if (!userSuperAdmin) 
    {
        return response
            .status(422)
            .json({ message: "Email atau password anda tidak ditemukan!" });
    }

    const ApakahPassBenar = await checkPass(
        user.encryptedPassword,
        password
    );

    if (!ApakahPassBenar) 
    {
        response.status(401).json({ message: "Password anda salah!" });
        return;
    }

    if (user.role !== "superadmin") 
    {
        return response.status(401).json({ message: "Anda bukan superadmin!" });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        "secret",
        {
            expiresIn: "1h",
        }
    );
    return response.status(200).json({
        message: "login Berhasil!",
        id: user.id,
        email: user.email,
        role: user.role,
        token,
    });
};

const adminLogin = async (request, response) => {
    const { email, password } = request.body;
    const userAdmin = await database.User.findOne({ where: { email } });

    if (!userAdmin) {
        return response
            .status(422)
            .json({ message: "Email atau Password tidak ditemukan!" });
    }

    const ApakahPassBenar = await checkPass(
        userAdmin.encryptedPassword,
        password
    );

    if (!ApakahPassBenar) {
        response.status(401).json({ message: "Password salah!" });
        return;
    }

    if (user.role !== "admin") 
    {
        return response.status(401).json({ message: "Anda bukan admin!" });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        "secret",
        {
            expiresIn: "1h",
        }
    );

    return response.status(200).json({
        message: "login Berhasil!",
        id: user.id,
        email: user.email,
        role: user.role,
        token,
    });
};

module.exports = {
    siapakahAku,
    pendaftaran,
    masuk,
    adminLogin,
    otorisasi,
    pendaftaranAdmin,
    superAdminLogin, 
};

const User = require("../../models/user");

const mockUser = [
    {
        id: "dfb1daa1-1dc7-4dec-a45c-02738c3bc034",
        name: "Örnek",
        email: "test@gmail.com",
        roleID: "dfb1daa1-1dc7-4dec-a45c-02738c3bc034",
        password: "123"
    }
];

const fillMockUserData = async () => {
    await Promise.all(
        mockUser.map(async (user) => {
            const _user = await User.findOne({
                where: {
                    id: user.id
                }
            });

            if (!_user) {
                const isComplete = await User.create(user);

                if (isComplete) {
                    console.log("Sahte kullanıcı verisi kaydedildi.");
                }
                else {
                    console.log("Sahte kullanıcı verisi kaydedilemedi.");
                }
            }
        })
    );
};

module.exports = fillMockUserData;

module.exports = (sequelize, DataTypes) => {
	let alias = 'users';

	let columns = {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
        fullName: DataTypes.STRING,
        direccion: DataTypes.STRING,
        ciudad: DataTypes.STRING,
        estadoProvincia: DataTypes.STRING,
        pais: DataTypes.STRING,
        codigoPostal: DataTypes.STRING,
        telefono: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        categoria: DataTypes.STRING,
        avatar: DataTypes.STRING,
	};

	const user = sequelize.define(alias, columns);

	/*brand.associate = (models) => {
		// hasMany
		brand.hasMany(models.products, {
			as: 'products',
			foreignKey: 'brandId'
		})
	}*/

	return user;
}
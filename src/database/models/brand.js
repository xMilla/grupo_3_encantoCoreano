module.exports = (sequelize, DataTypes) => {
	let alias = 'brands';

	let columns = {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
        tipo: DataTypes.STRING,
        descripcion: DataTypes.STRING,
	};

	const brand = sequelize.define(alias, columns);

	brand.associate = (models) => {
		// hasMany
		brand.hasMany(models.products, {
			as: 'products',
			foreignKey: 'brandId'
		})
	}

	return brand;
}
module.exports = (sequelize, DataTypes) => {
	const category = sequelize.define('categories', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		nombre: DataTypes.STRING,
		idProduct: DataTypes.INTEGER,
	}, {
		 tableName: 'categories',
		 timestamps: false
	});


	return category;
}
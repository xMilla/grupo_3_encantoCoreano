module.exports = (sequelize, DataTypes) => {
	const marca = sequelize.define('marcas', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		tipo: DataTypes.STRING,
		descripcion: DataTypes.STRING,
		idProduct: DataTypes.INTEGER,
	}, {
		 tableName: 'marcas',
		 timestamps: false
	});


	return marca;
}
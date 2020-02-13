module.exports = (sequelize, DataTypes) => {
	const product = sequelize.define('products', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		nombre_product: DataTypes.STRING,
		idCategory: DataTypes.INTEGER,
		idMarca: DataTypes.INTEGER,
		tamaño: DataTypes.INTEGER,
		color: DataTypes.STRING,
		precio: DataTypes.INTEGER,
		stock: DataTypes.INTEGER,
		descripcion: DataTypes.STRING,
		descripcion_larga: DataTypes.STRING,
		foto: DataTypes.STRING,
	}, {
		 tableName: 'products',
		 timestamps: false
	});

	product.associate = (models) => {
		product.belongsTo(models.categories, {
			as: 'category',
			foreignKey: 'idCategory'
		});
	}

	product.associate = (models) => {
		product.belongsTo(models.marcas, {
			as: 'marca',
			foreignKey: 'idMarca'
		});
	}

	return product;
	
}
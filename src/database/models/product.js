module.exports = (sequelize, DataTypes) => {
	let alias = 'products';

	let columns = {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		nombre_product: DataTypes.STRING,
        tamaño: DataTypes.INTEGER,
		color: DataTypes.STRING,
		precio: DataTypes.INTEGER,
		stock: DataTypes.INTEGER,
		descripcion: DataTypes.STRING,
		descripcion_larga: DataTypes.STRING,
		foto: DataTypes.STRING,
		userId: DataTypes.INTEGER,
		brandId: DataTypes.INTEGER
	};

	/* let config = {
		tableName: 'productos',
		timestamps: false, // createdAt - updatedAt
	}; */

	const product = sequelize.define(alias, columns);

	product.associate = (models) => {
		// belongsTo 
		product.belongsTo(models.brands, {
			as: 'brand',
			foreignKey: 'brandId'
		});
		
		// belongsToMany
		product.belongsToMany(models.categories, {
			as: 'categories',
			through: 'category_product',
			foreignKey: 'productId',
			otherKey: 'categoryId',
		});
	}

	product.prototype.getRoundPrice = function () {
		return Number(this.price).toFixed();
	}
 
	return product;
}
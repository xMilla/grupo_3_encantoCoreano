module.exports = (sequelize, DataTypes) => {
	let alias = 'categories';

	let columns = {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		nombre: DataTypes.STRING,
	};

	const category = sequelize.define(alias, columns);

	category.associate = (models) => {
		// hasMany
		category.belongsToMany(models.products,{
			as: "products",
			through: "category_product",
			foreignKey: "categoryId",
			otherKey: "productId",
		})
	}

	return category;
}